const fs = require('fs');
const path = require('path');
const User = require('../../../../models/user');



const savingUserImage = (id, res, imageName) => {

    User.findById(id)
        .then((userDB) => {

            if (!userDB) {
                removeImage(imageName);
                return res.status(500).json({
                    ok: false,
                    err: {
                        message: 'Este usuario no existe'
                    }
                });
            }

            let previousImage = userDB.img;
            userDB.img = imageName;
            userDB.save((err, userUpdated) => {

                if (err) {
                    removeImage(imageName);
                    return res.status(501).json({
                        ok: false,
                        err
                    });

                }
            });

            removeImage(previousImage);
            res.json({
                ok: true,
                message: 'Imagen guardada correctamente.'
            });

        })

    .catch((err) => {

        removeImage(imageName);
        return res.status(501).json({
            ok: false,
            err
        });

    });

}


let removeImage = (imageName) => {
    let pathImage = path.resolve(__dirname + `../../../../../../uploads/user_photos/${imageName}`);

    if (fs.existsSync(pathImage)) {
        fs.unlinkSync(pathImage);
    }
}

module.exports = savingUserImage;