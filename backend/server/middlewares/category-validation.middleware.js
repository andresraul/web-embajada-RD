const Post = require('../models/post');

const categoryVerificator = (req, res, next) => {

    if (req.body.category && typeof req.body.category == 'string') {
        const text = 'No tiene autorización para esta categoría.';
        req.user.access.indexOf(req.body.category) < 0 ? res.status(400).json({ ok: false, err: { message: text } }) : next();
        return;
    }

    next();

}



const categoryVerificatorByQuery = (req, res, next) => {

    const category = req.query.category;
    let validCategory = ['EVENTOS', 'NOTICIAS'];

    if (category && typeof category == 'string' && validCategory.indexOf(category) >= 0) {
        next();
        return;
    }

    res.status(400).json({
        ok: false,
        err: {
            message: 'Debe especificar una categoría válida.'
        }
    });



}

categoryVerificatorThroughMatch = (req, res, next) => {
    const id = req.params.id;

    Post.findById(id, (err, postDB) => {

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

        if (req.user.access && req.user.access.indexOf(postDB.category) >= 0) {
            next();
        } else {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No tiene permisos para esta categoría.'
                }
            });
        }

    });

}


module.exports = {
    categoryVerificator,
    categoryVerificatorByQuery,
    categoryVerificatorThroughMatch
}