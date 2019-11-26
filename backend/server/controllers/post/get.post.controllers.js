const Post = require('../../models/post');


const postCtrlsGet = {};

postCtrlsGet.getPosts = async(req, res, next) => {

    let limit = req.query.limit || 10;
    let skip = req.query.skip || 0;
    const category = req.query.category;

    limit = Number(limit);
    skip = Number(skip);

    if (limit == 0 || limit < 0) {

        limit = 10;
    }


    Post.find({ category: category })
        .limit(limit)
        .skip(skip)
        .sort({ created: -1 })
        .exec((err, categoriesDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!categoriesDB) {
                return res.status(500).json({
                    ok: false,
                    err: {
                        message: 'No existen registros.'
                    }
                });
            }

            Post.countDocuments({ category: category }, (err, count) => {

                let shown = limit;

                if (limit > count) {
                    shown = count;
                }

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }
                res.json({
                    ok: true,
                    data: categoriesDB,
                    total: `${shown}/${count}`
                });

            });

        });
}



postCtrlsGet.getPostById = (req, res, next) => {
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
                    message: 'No existe el registro.'
                }
            });
        }

        res.json({
            ok: true,
            data: postDB
        });

    });


}



module.exports = postCtrlsGet;