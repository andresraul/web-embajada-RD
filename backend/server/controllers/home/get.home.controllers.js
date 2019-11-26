const path = require('path');

const homeCtrlsGet = {};

homeCtrlsGet.deliverIndex = async(req, res, next) => {


    res.sendFile(path.resolve(__dirname + '../../../../../dist/web-embajada-frontend/index.html'));


}

module.exports = homeCtrlsGet;