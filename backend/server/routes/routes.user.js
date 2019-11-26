const express = require('express');
const app = express();
const { tokenCheckerByHeader } = require('../middlewares/token-validation.middleware');
const { userCtrlsPost, userCtrlsGet, userCtrlsPut, userCtrlsDelete } = require('../controllers/user/index');
const { adminRoleVerificator } = require('../middlewares/role-verification.middleware');

app.get('/user', [tokenCheckerByHeader, adminRoleVerificator, userCtrlsGet.getUsers]);
app.get('/user/:id', [tokenCheckerByHeader, userCtrlsGet.getUserById]);
app.post('/user', [tokenCheckerByHeader, adminRoleVerificator, userCtrlsPost.createUser]);
app.put('/user/:id', [tokenCheckerByHeader, adminRoleVerificator, userCtrlsPut.editUser]);
app.delete('/user/:id', [tokenCheckerByHeader, adminRoleVerificator, userCtrlsDelete.removeUser]);

module.exports = app;