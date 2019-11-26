const _ = require('underscore');

const emptyStringValidator = (bodyObjeckt) => {

    const objValidation = _.pick(bodyObjeckt, 'name', 'lastname', 'email', 'password', 'category', 'title', 'desc');
    const keysArray = _.keys(objValidation);
    const valuesArray = _.values(objValidation);

    return new Promise((resolve, reject) => {

        valuesArray.forEach((value, i) => {
            if (value.trim().length == 0) {
                let campo = toSpanish(keysArray[i]);
                return resolve(`El campo ${campo} no puede estar vacío`);
            }
        });

        return resolve(false);
    });
}


const toSpanish = (key) => {

    switch (key) {

        case 'name':
            return key.replace(key, 'Nombre');
            break
        case 'lastname':
            return key.replace(key, 'Apellidos');
            break
        case 'email':
            return key.replace(key, 'Correo');
            break
        case 'password':
            return key.replace(key, 'Contraseña');
            break
        case 'category':
            return key.replace(key, 'Categoría');
            break
        case 'title':
            return key.replace(key, 'Título');
            break
        case 'desc':
            return key.replace(key, 'Descripción');
    }
}

module.exports = emptyStringValidator;