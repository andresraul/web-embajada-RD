const express = require('express');
const app = express();
const { loginCtrlsPost } = require('../controllers/login/index');


app.post('/login', [loginCtrlsPost.loginUser]);

module.exports = app;