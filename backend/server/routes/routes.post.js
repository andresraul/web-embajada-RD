const express = require('express');
const app = express();
const { postCtrlsGet, postCtrlsPost, postCtrlsPut, postCtrlsDelete } = require('../controllers/post/index');
const { tokenCheckerByHeader } = require('../middlewares/token-validation.middleware');
const {
    categoryVerificator,
    categoryVerificatorByQuery,
    categoryVerificatorThroughMatch
} = require('../middlewares/category-validation.middleware');

app.post('/post', [tokenCheckerByHeader, categoryVerificator, postCtrlsPost.createPost]);
app.get('/post', [categoryVerificatorByQuery, postCtrlsGet.getPosts]);
app.get('/post/:id', [postCtrlsGet.getPostById]);
app.put('/post/:id', [tokenCheckerByHeader, categoryVerificatorThroughMatch, postCtrlsPut.editPost]);
app.delete('/post/:id', [tokenCheckerByHeader, categoryVerificatorThroughMatch, postCtrlsDelete.removePost]);



module.exports = app;