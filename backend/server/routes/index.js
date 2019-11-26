const express = require('express');
const app = express();


app.use(require('./routes.user'));
app.use(require('./routes.user-pwd'));
app.use(require('./routes.user-reset-password'));
app.use(require('./routes.user-main-img'));
app.use(require('./routes.login'));
app.use(require('./routes.post'));
app.use(require('./routes.post-main-img'));


module.exports = app