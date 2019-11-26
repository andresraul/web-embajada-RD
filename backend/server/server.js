const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// Config
require('../config/config');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// parse application/json
app.use(bodyParser.json({ limit: '50mb' }));

// Cross
app.use(cors());

// public folder
app.use(express.static(path.resolve(__dirname, '../../backend/public')));

app.use(express.static(path.resolve(__dirname, '../../dist/web-embajada-frontend')));


// api routes
app.use('/api', require('./routes/index'));

// home route
app.use(require('./routes/routes.home'))


mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true }, (err, res) => {
    if (err) throw err;
    console.log(`DB ONLINE. URL DB: ${process.env.URLDB}`);
});

app.listen(process.env.PORT, () => {
    console.log(`Server listening. Port: ${process.env.PORT}`);
});