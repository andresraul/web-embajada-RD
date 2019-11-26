const mongoose = require('mongoose');
require('../../mongoose-types/mongoose-type-email');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

let validRoles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}

let validAccess = {
    values: ["NOTICIAS", "EVENTOS"],
    message: '{VALUE} es un acceso inválido'
}


let userSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio.']
    },
    lastname: {
        type: String,
        required: [true, 'Al menos un apellido es requerido.']
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        required: [true, 'El correo es obligatorio y debe tener un formato válido.'],
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        enum: validRoles
    },
    access: {
        type: [String],
        required: false,
        enum: validAccess
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    validatedUser: {
        type: Boolean,
        default: false,
        required: true
    },
    pwdLink: {
        type: String,
        required: false
    }
});

// Removing password property from returned DB
userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    delete userObject.pwdLink;
    delete userObject.__v;

    return userObject;
}

// mongoose-unique-validator plugin
userSchema.plugin(uniqueValidator, { message: 'Otra cuenta ya está utilizando este correo.' });

module.exports = mongoose.model('User', userSchema);