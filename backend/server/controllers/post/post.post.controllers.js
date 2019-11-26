const Post = require('../../models/post');
const emptyStringValidator = require('../../validators/empty-string.validator');
const emptyHtmlValidator = require('../../validators/empty-html.validator');

const postCtrlsPost = {};

postCtrlsPost.createPost = async(req, res, next) => {

    const { category, title, desc, body } = req.body;
    const created = new Date().getTime();
    const author = req.user._id;

    let failedEmptyStringVilidation = await emptyStringValidator(req.body);

    if (failedEmptyStringVilidation) {
        return res.status(400).json({
            ok: false,
            err: {
                message: failedEmptyStringVilidation
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


    const post = new Post({
        created,
        category,
        title,
        author,
        desc,
        body
    });

    await post.save()
        .then((postDB) => {
            res.json({
                ok: true,
                data: postDB
            });
        })
        .catch((err) => {
            return res.status(500).json({
                ok: false,
                err
            })
        });






}


module.exports = postCtrlsPost;