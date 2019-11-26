const _ = require('underscore');

const emptyHtmlValidator = (obj) => {

    const htmlObj = _.pick(obj, 'body');
    const valueArray = _.values(htmlObj);
    let text;

    if (valueArray[0]) {
        text = valueArray[0].replace(/<[^>]*>?/gm, '');

    }

    if (valueArray[0] && text.trim().length < 1) {

        return 'El texto principal no puede estar vacío.'

    }

    return false;

}

module.exports = emptyHtmlValidator;