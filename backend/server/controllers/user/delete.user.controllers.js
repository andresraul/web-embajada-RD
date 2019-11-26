const User = require('../../models/user');
const userCtrlsDelete = {};
const fs = require('fs');
const path = require('path');

userCtrlsDelete.removeUser = async(req, res, next) => {
    const id = req.params.id;
    let fromdb = req.query.fromdb || false;

    if (fromdb == 'true') {

        User.findOneAndDelete({ _id: id })
            .then((userDB) => {

                if (!userDB) {

                    return res.status(400).json({
                        ok: false,
                        err: {
                            message: 'El usuario que intenta eliminar no existe.'
                        }
                    });
                }

                if (userDB.img) {

                    removeImage(userDB.img);
                }

                return res.json({
                    ok: true,
                    user: userDB
                });

            })
            .catch((err) => {
                return res.status(500).json({
                    ok: false,
                    err
                });
            });

    } else {

        User.findByIdAndUpdate(id, { status: false }, { new: true })
            .then((userDB) => {
                if (!userDB) {
                    return res.status(400).json({
                        ok: false,
                        err: {
                            message: 'El usuario que intenta eliminar no existe.'
                        }
                    });
                }
                return res.json({
                    ok: true,
                    user: userDB
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    ok: false,
                    err
                });
            });
    }

}

let removeImage = (imageName) => {
    let pathImage = path.resolve(__dirname + `../../../../uploads/user_photos/${imageName}`);

    if (fs.existsSync(pathImage)) {
        fs.unlinkSync(pathImage);
    }
}


module.exports = userCtrlsDelete;