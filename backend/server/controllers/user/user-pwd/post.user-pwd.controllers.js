const User = require('../../../models/user');
const emptyStringValidator = require('../../../validators/empty-string.validator');
const bcrypt = require('bcrypt');
const _ = require('underscore');


const userPwdCtrlsPost = {};

userPwdCtrlsPost.createPwd = async(req, res, next) => {
    const body = req.body;
    const bodyObject = _.pick(body, 'password');

    if (_.isEmpty(bodyObject)) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se ha recibido ninguna información.'
            }
        });
    }

    let failedVilidation = await emptyStringValidator(bodyObject);

    if (failedVilidation) {
        return res.status(400).json({
            ok: false,
            err: {
                message: failedVilidation
            }
        });
    }

    if (body.password.indexOf(' ') >= 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'La contraseña no puede tener espacios en blanco.'
            }
        });
    }

    User.findOne({ email: req.user.email })
        .then(async(userDB) => {
            if (!userDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: `El usuario ${req.user.email} no existe.`
                    }
                });
            }

            const token = req.params.token;

            if (userDB.pwdLink && userDB.pwdLink !== token) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El link ha expirado.'
                    }
                });

            }


            encryptedPassword = await bcrypt.hash(bodyObject.password, 12)
                .catch((err) => {
                    return res.status(500).json({
                        ok: false,
                        err: {
                            message: 'Error en el servidor'
                        }
                    });
                });

            bodyObject.password = encryptedPassword;
            bodyObject.pwdLink = 'PASSWORD_CHANGED';

            if (!userDB.validatedUser) {
                bodyObject.validatedUser = true;
            }

            User.findByIdAndUpdate(req.user._id, bodyObject, { new: true, runValidators: true, context: 'query' })
                .then((userDB) => {
                    if (!userDB) {
                        return res.status(400).json({
                            ok: false,
                            err: {
                                message: 'El usuario que intenta modificar no existe.'
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




        })
        .catch((err) => {
            return res.status(500).json({
                ok: false,
                err
            });
        });


}


module.exports = userPwdCtrlsPost;