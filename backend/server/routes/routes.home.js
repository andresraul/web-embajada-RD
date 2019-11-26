const express = require('express');
const app = express();

const { homeCtrlsGet } = require('../controllers/home/index');

app.get('/*', [homeCtrlsGet.deliverIndex]);

module.exports = app;