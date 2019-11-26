const mongoose = require('mongoose');

let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function validateEmail(val, options) {
    let required = (typeof options.required === 'function') ? options.required() : options.required
    let passedAllowBlank = options.allowBlank && (val === '' || val === null)
    if (passedAllowBlank && !required) {
        return true
    }
    return regEmail.test(val)
}

function Email(path, options) {
    this.options = options;
    this.path = path;
    mongoose.SchemaTypes.String.call(this, path, options)
    this.validate(function(val) { return validateEmail(val, options) }, options.message || Email.defaults.message || 'invalid email address')
}

Email.defaults = {}

Object.setPrototypeOf(Email.prototype, mongoose.SchemaTypes.String.prototype)

Email.prototype.cast = function(val) {
    return val.toLowerCase()
}

Email.prototype.get = function(val) {
    return val.toLowerCase()
}

Email.prototype.checkRequired = function(val) {
    return typeof val === 'string' && validateEmail(val, this.options);
};

mongoose.SchemaTypes.Email = module.exports = Email
mongoose.Types.Email = String