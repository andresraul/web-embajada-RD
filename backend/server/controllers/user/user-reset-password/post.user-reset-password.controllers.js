const User = require('../../../models/user');
const emptyStringValidator = require('../../../validators/empty-string.validator');
const _ = require('underscore');

// json web token
const jwt = require('jsonwebtoken');

// config
require('../../../../config/config');

// sendgrid
const helper = require('sendgrid').mail;

const userRestPwdCtrlsPost = {}

userRestPwdCtrlsPost.resetPwd = async(req, res, next) => {
    const body = req.body;
    const bodyObject = _.pick(body, 'email');

    let failedVilidation = await emptyStringValidator(bodyObject);

    if (failedVilidation) {
        return res.status(400).json({
            ok: false,
            err: {
                message: failedVilidation
            }
        });
    }

    if (!bodyObject.email) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se ha recibido ninguna información'
            }
        });

    }

    User.findOne({ email: bodyObject.email })
        .then((userDB) => {
            if (!userDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: `No se ha encontrado el usuario ${bodyObject.email}`
                    }
                });

            }

            if (!userDB.status) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Usuario inactivo'
                    }
                });
            }

            let token = jwt.sign({ user: userDB }, process.env.SEED, { expiresIn: '3h' });

            // sendgrid

            let bodyEmail;

            if (!userDB.validatedUser) {

                bodyEmail = `Hola ${userDB.name}. Para completar tu registro, debes ingresar al sigiente enlace y crear tu contraseña: ${process.env.HOME_URL}confirmacion/${token}
                Este enlace caduca en 3 horas. En caso de que haya pasado este tiempo, puedes dirigirte a ${process.env.HOME_URL}login e indicar que has olvidado tu contraseña y se te enviará un nuevo enlace.`
            } else {

                bodyEmail = `Hola ${userDB.name}. Has solicitado crear una nueva contraseña. Drígete al siguiente enlace y completa los pasos que se te indican: ${process.env.HOME_URL}confirmacion/${token}
                En caso de no haber realizado esta solicitud omite este correo.
                Este enlace caduca en 3 horas. En caso de que haya pasado este tiempo, puedes dirigirte a ${process.env.HOME_URL}login e indicar que has olvidado tu contraseña y se te enviará un nuevo enlace.`

            }

            const from_email = new helper.Email('xxxx@xxxxx.com');
            const to_email = new helper.Email(userDB.email);
            const subject = 'Correo de validación de la Embajada de República Dominicana Ante el Reino de España.';
            const content = new helper.Content('text/plain', bodyEmail);
            const mail = new helper.Mail(from_email, subject, to_email, content);

            const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
            const request = sg.emptyRequest({
                method: 'POST',
                path: '/v3/mail/send',
                body: mail.toJSON(),
            });

            sg.API(request, function(error, response) {
                console.log(response.statusCode);
                console.log(response.body);
                console.log(response.headers);
            });

            const bodyObject = {
                pwdLink: token
            }

            User.findByIdAndUpdate(userDB._id, bodyObject, { new: true, runValidators: true, context: 'query' })
                .then((userUpdated) => {

                    if (!userUpdated) {
                        return res.status(400).json({
                            ok: false,
                            err: {
                                message: `El usuario ${userUpdated.email} no fue encontrado.`
                            }
                        });

                    }

                    if (userDB.validatedUser) {
                        res.json({
                            ok: true,
                            message: `Se ha enviado un correo a la dirección ${userUpdated.email} con los datos para actualizar su contraseña.`
                        })

                    } else {
                        res.json({
                            ok: true,
                            message: `Se ha enviado un correo a la dirección ${userDB.email} con los datos para crear su contraseña.`
                        });
                    }
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




module.exports = userRestPwdCtrlsPost;