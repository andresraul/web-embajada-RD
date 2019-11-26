const imgExtensionValidator = require('../../../validators/img-extension.validator');

const savingUserImage = require('./utilities/put.user-image.utilities');

const imageUserCtrlsPut = {};


imageUserCtrlsPut.catchAndSaveImage = async(req, res, next) => {

    const id = req.params.id;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            err: {
                messaje: 'No ha seleccionado ningún archivo.'
            }
        });
    }

    if (!req.files.userPhoto) {
        return res.status(400).json({
            ok: false,
            err: {
                messaje: 'userPhoto no existe.'
            }
        });
    }

    let userPhoto = req.files.userPhoto;

    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    let validatedExtension = imgExtensionValidator(userPhoto.name, allowedExtensions);

    if (!validatedExtension) {
        return res.status(400).json({
            ok: false,
            err: {
                messaje: 'Esta extensión no es permitidas. Estas son las únicas extensiones permitidas: ' + allowedExtensions.join(', ')
            }
        })
    }

    let imageCreationDate = new Date().getTime();
    let randomNumber = Math.floor((Math.random() * 10000000000) + 1)
    let imgName = `${imageCreationDate}-${randomNumber}.${validatedExtension}`


    userPhoto.mv(`backend/uploads/user_photos/${imgName}`, (err) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        savingUserImage(id, res, imgName);
    });



};



module.exports = imageUserCtrlsPut;