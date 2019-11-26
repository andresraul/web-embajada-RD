const express = require('express');
//const fileUpload = require('express-fileupload');
const app = express();

const { tokenCheckerByHeader } = require('../middlewares/token-validation.middleware');

//app.use(fileUpload());

const { imagePostCtrlsPut, imagePostCtrlsDelete } = require('../controllers/post/post-image/index');

app.put('/upload/post-img/:id', [tokenCheckerByHeader, imagePostCtrlsPut.catchAndSaveImage]);
app.delete('/upload/post-img/:id', [tokenCheckerByHeader, imagePostCtrlsDelete.removePostMainImage])


module.exports = app;