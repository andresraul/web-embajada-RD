const Post = require('../../../models/post');
const fs = require('fs');
const path = require('path');

const imagePostCtrlsDelete = {};

imagePostCtrlsDelete.removePostMainImage = async(req, res, next) => {
    const id = req.params.id;

    Post.findById(id)
        .then((postDB) => {
            if (!postDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'La imagen no existe.'
                    }
                });
            }
            let imageName = postDB.image;
            let imageCategory = postDB.category;
            postDB.image = undefined;

            postDB.save()
                .then(async(resp) => {

                    await removeImage(imageName, imageCategory);
                    res.json({
                        ok: true,
                        message: 'La imagen ha sido eliminada correctamente.'
                    });


                })
                .catch((err) => {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                });

        })
        .catch((err) => {
            return res.status(500).json({
                ok: false,
                err
            });
        });

}

let removeImage = async(imageName, category) => {
    let pathImage = path.resolve(__dirname + `../../../../../public/images/posts/${category}/${imageName}`);


    if (fs.existsSync(pathImage)) {
        fs.unlinkSync(pathImage);
    }
}

module.exports = imagePostCtrlsDelete;