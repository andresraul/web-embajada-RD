const Post = require('../../models/post');
const emptyStringValidator = require('../../validators/empty-string.validator');
const emptyHtmlValidator = require('../../validators/empty-html.validator');
const _ = require('underscore');



const postCtrlsPut = {};

postCtrlsPut.editPost = async(req, res, next) => {
    const id = req.params.id;
    const body = req.body;

    const bodyObject = _.pick(body, 'title', 'desc', 'body');

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

    const failedEmptyHtmlValidator = emptyHtmlValidator(req.body);

    if (failedEmptyHtmlValidator) {
        return res.status(400).json({
            ok: false,
            err: {
                message: failedEmptyHtmlValidator
            }
        });
    }

    bodyObject.updated = new Date().getTime();

    const setting = { new: true, runValidators: true, context: 'query' }

    Post.findByIdAndUpdate(id, bodyObject, setting, (err, postDB) => {

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
                    message: 'No Existen registros.'
                }
            });
        }

        res.json({
            ok: true,
            data: postDB
        });

    });


}

module.exports = postCtrlsPut;