const User = require('../../models/user');
const getUserValidator = require('../../validators/get-user.validator');
const userCtrlsGet = {};

userCtrlsGet.getUsers = async(req, res, next) => {

    let limit = req.query.limit || 20;
    let skip = req.query.skip || 0;
    let status = getUserValidator.status(req.query.status);

    if (isNaN(limit)) {
        limit = 0;
    }

    limit = Number(limit);
    skip = Number(skip);

    User.find(status)
        .limit(limit)
        .skip(skip)
        .exec()
        .then((usersDB) => {
            User.countDocuments(status, (err, count) => {

                let totalFound = getUserValidator.limitValue(limit, count);

                return res.json({
                    ok: true,
                    users: usersDB,
                    total: totalFound + '/' + count
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

userCtrlsGet.getUserById = async(req, res, next) => {

    const id = req.params.id;

    User.findById(id)
        .then((userDB) => {
            if (!userDB) {
                return res.status(500).json({
                    ok: false,
                    err: {
                        message: 'Este usuario no existe.'
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

module.exports = userCtrlsGet;