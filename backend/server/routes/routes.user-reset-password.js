const express = require('express');
const app = express();
const { userRestPwdCtrlsPost } = require('../controllers/user/user-reset-password/index');

app.post('/reset', userRestPwdCtrlsPost.resetPwd);


module.exports = app;