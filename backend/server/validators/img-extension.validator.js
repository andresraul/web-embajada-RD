const imgExtensionValidator = (image, allowedExtensions) => {
    let extension = image.split(".")[image.split(".").length - 1];
    if (allowedExtensions.indexOf(extension) < 0) {
        return false;
    }
    return extension
}


module.exports = imgExtensionValidator;