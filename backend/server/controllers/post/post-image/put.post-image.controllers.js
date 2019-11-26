const Post = require('../../../models/post');
const imgExtensionValidator = require('../../../validators/img-extension.validator');

const savingPostImage = require('./utilities/put.post-image.utilities');

const imagePostCtrlsPut = {};


imagePostCtrlsPut.catchAndSaveImage = async(req, res, next) => {

    const id = req.params.id;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            err: {
                messaje: 'No ha seleccionado ningún archivo.'
            }
        });
    }

    if (!req.files.postPhoto) {
        return res.status(400).json({
            ok: false,
            err: {
                messaje: 'postPhoto no existe.'
            }
        });
    }


    let postPhoto = req.files.postPhoto;

    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    let validatedExtension = imgExtensionValidator(postPhoto.name, allowedExtensions);

    if (!validatedExtension) {
        return res.status(400).json({
            ok: false,
            err: {
                messaje: 'Esta extensión no es permitidas. Estas son las únicas extensiones permitidas: ' + allowedExtensions.join(', ')
            }
        })
    }

    Post.findById(id)
        .then((postDB) => {

            if (!postDB) {
                return res.status(500).json({
                    ok: false,
                    err: {
                        messaje: 'El post no existe en la base de datos.'
                    }
                });
            }

            if (req.user.access.indexOf(postDB.category) < 0) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        messaje: 'No tine permisos para esta categoría.'
                    }
                });
            }

            let imageCreationDate = new Date().getTime();
            let randomNumber = Math.floor((Math.random() * 10000000000) + 1)
            let imgName = `${imageCreationDate}-${randomNumber}.${validatedExtension}`


            postPhoto.mv(`backend/public/images/posts/${postDB.category}/${imgName}`, (err) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }

                savingPostImage(id, res, imgName, postDB.category, postDB.image);
            });

        })
        .catch((err) => {
            return res.status(500).json({
                ok: false,
                err
            });
        });


};



module.exports = imagePostCtrlsPut;