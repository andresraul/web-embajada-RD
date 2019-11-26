const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const { tokenCheckerByHeader, tokenCheckerByParams } = require('../middlewares/token-validation.middleware');

app.use(fileUpload());

const { imageUserCtrlsGet, imageUserCtrlsPut } = require('../controllers/user/user-image/index');

app.get('/upload/user-img/:img/:token', [tokenCheckerByParams, imageUserCtrlsGet.imageDeliveryService]);
app.put('/upload/user-img/:id', [tokenCheckerByHeader, imageUserCtrlsPut.catchAndSaveImage]);


module.exports = app;