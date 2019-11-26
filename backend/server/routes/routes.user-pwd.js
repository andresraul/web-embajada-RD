const express = require('express');
const app = express();
const { userPwdCtrlsPost } = require('../controllers/user/user-pwd/index');
const { tokenCheckerByParams } = require('../middlewares/token-validation.middleware');


app.post('/password/:token', [tokenCheckerByParams, userPwdCtrlsPost.createPwd]);

module.exports = app;