const fs = require('fs');
const path = require('path');
const Post = require('../../../../models/post');



const savingPostImage = (id, res, imageName, category, previousImage = null) => {

    const bodyObject = {
        image: imageName
    }

    Post.findByIdAndUpdate(id, bodyObject, { new: true, runValidators: true, context: 'query' })
        .then((postDB) => {

            if (!postDB) {
                removeImage(imageName, category);
                return res.status(500).json({
                    ok: false,
                    err: {
                        message: 'Este post no existe'
                    }
                });
            }



            removeImage(previousImage, category);
            res.json({
                ok: true,
                message: 'Imagen guardada correctamente.'
            });

        })

    .catch((err) => {

        removeImage(imageName, category);
        return res.status(501).json({
            ok: false,
            err
        });

    });

}


let removeImage = async(imageName, category) => {
    let pathImage = path.resolve(__dirname + `../../../../../../public/images/posts/${category}/${imageName}`);

    if (fs.existsSync(pathImage)) {
        fs.unlinkSync(pathImage);
    }
}

module.exports = savingPostImage;