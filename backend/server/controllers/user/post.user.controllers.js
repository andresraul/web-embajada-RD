const User = require('../../models/user');
const emptyStringValidator = require('../../validators/empty-string.validator');

// json web token
const jwt = require('jsonwebtoken');

// config
require('../../../config/config');

// sendgrid
const helper = require('sendgrid').mail;

const userCtrlsPost = {};

userCtrlsPost.createUser = async(req, res, next) => {

    const { name, lastname, email, role, access } = req.body;
    const date = new Date().getTime();


    let failedVilidation = await emptyStringValidator(req.body);

    if (failedVilidation) {
        return res.status(400).json({
            ok: false,
            err: {
                message: failedVilidation
            }
        });
    }


    const user = new User({
        date,
        name,
        lastname,
        email,
        role,
        access
    });

    await user.save()
        .then((userDB) => {
            res.json({
                ok: true,
                user: userDB
            })

            let token = jwt.sign({ user: userDB }, process.env.SEED, { expiresIn: '3h' });

            // sendgrid
            const bodyEmail = `Hola ${userDB.name}. Para completar tu registro, debes ingresar al sigiente enlace y crear tu contraseña: ${process.env.HOME_URL}confirmacion/${token}
            Este enlace caduca en 3 horas. En caso de que haya pasado este tiempo, puedes dirigirte a ${process.env.HOME_URL}login e indicar que has olvidado tu contraseña y se te enviará un nuevo enlace.`

            const from_email = new helper.Email('xxxx@xxxx.com');
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
        })
        .catch((err) => {
            return res.status(500).json({
                ok: false,
                err
            })
        });


}



module.exports = userCtrlsPost;