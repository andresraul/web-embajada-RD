const jwt = require('jsonwebtoken');
require('../../config/config');

const tokenCheckerByHeader = async(req, res, next) => {
    let token;

    if (req.get('authorization')) {
        token = req.get('authorization').split(' ')[1];
    }

    if (req.get('token')) {
        token = req.get('token');
    }

    if (typeof token != 'string') {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'Petición no autorizada.'
            }
        });
    }

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Petición no autorizada.'
                }
            });
        }
        req.user = decoded.user;
        next();
    });
}


const tokenCheckerByParams = async(req, res, next) => {
    const token = req.params.token;

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Petición no autorizada'
                }
            });
        }
        req.user = decoded.user;
        next();
    });
}

module.exports = {
    tokenCheckerByHeader,
    tokenCheckerByParams
}