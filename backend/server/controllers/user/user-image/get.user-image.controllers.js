const fs = require('fs');
const path = require('path');

const imageUserCtrlsGet = {};

imageUserCtrlsGet.imageDeliveryService = async(req, res, next) => {
    const img = req.params.img;
    const imagePath = path.resolve(__dirname + `../../../../../uploads/user_photos/${img}`);

    if (fs.existsSync(imagePath)) {

        res.sendFile(imagePath);

    } else {
        let noImagePath = path.resolve(__dirname + '../../../../../uploads/user_photos/no_image.png');
        res.sendFile(noImagePath)
    }
}



module.exports = imageUserCtrlsGet;