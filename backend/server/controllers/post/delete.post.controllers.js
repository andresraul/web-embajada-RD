const fs = require('fs');
const path = require('path');

const Post = require('../../models/post');


const postCtrlsDelete = {};


postCtrlsDelete.removePost = async(req, res, next) => {

    const id = req.params.id;

    Post.findByIdAndDelete(id, (err, postDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!postDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Registro no encontrado.'
                }
            });
        }

        if (postDB.image) {

            removeImage(postDB.image, postDB.category)
        }

        res.json({
            ok: true,
            data: postDB
        });

    });

}

let removeImage = (imageName, category) => {
    let pathImage = path.resolve(__dirname + `../../../../public/images/posts/${category}/${imageName}`);

    if (fs.existsSync(pathImage)) {
        fs.unlinkSync(pathImage);
    }
}



module.exports = postCtrlsDelete;