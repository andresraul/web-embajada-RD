const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('../../../config/config');
const emptyStringValidator = require('../../validators/empty-string.validator');

const loginCtrlsPost = {};

loginCtrlsPost.loginUser = async(req, res, next) => {

    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Datos no recibidos.'
            }
        });
    }

    if (typeof req.body.email != 'string' || typeof req.body.password != 'string') {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Tipo de datos recibidos incorrectos.'
            }
        });
    }

    let failedEmptyStringVilidation = await emptyStringValidator(req.body);

    if (failedEmptyStringVilidation) {
        return res.status(400).json({
            ok: false,
            err: {
                message: failedEmptyStringVilidation
            }
        });
    }

    let body = req.body;

    const exp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let patt = new RegExp(exp);
    let emailFormatValidation = patt.test(body.email);

    if (!emailFormatValidation) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Formato de correo inválido.'
            }
        });
    }


    User.findOne({ email: body.email })
        .then((userDB) => {
            if (!userDB) {
                return res.status(500).json({
                    ok: false,
                    err: {
                        message: 'Usuario o contraseña incorrecto.'
                    }
                });
            }
            if(!userDB.password) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Usuario no validado.'
                    }
                });
            }
            if (!bcrypt.compareSync(body.password, userDB.password)) {
                return res.status(500).json({
                    ok: false,
                    err: {
                        message: 'Usuario o contraseña incorrecto.'
                    }
                });
            }

            if (!userDB.status) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: `El usuario ${userDB.email} ya no existe.`
                    }
                });
            }

            let token = jwt.sign({ user: userDB }, process.env.SEED, { expiresIn: process.env.EXPIRATION_TOKEN });

            res.json({
                ok: true,
                user: userDB,
                token
            });
        })
        .catch((err) => {
            return res.status(500).json({
                ok: false,
                err
            });

        });

}


module.exports = loginCtrlsPost;