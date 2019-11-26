const User = require('../../models/user');
const emptyStringValidator = require('../../validators/empty-string.validator');
const _ = require('underscore');
const userCtrlsPut = {};


userCtrlsPut.editUser = async(req, res, next) => {
    const body = req.body;
    const id = req.params.id;
    const bodyObject = _.pick(body, 'name', 'lastname', 'email', 'role', 'access', 'status');

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


    User.findByIdAndUpdate(id, bodyObject, { new: true, runValidators: true, context: 'query' })
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

}

module.exports = userCtrlsPut;