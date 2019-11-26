const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let validCategory = {
    values: ['EVENTOS', 'NOTICIAS'],
    message: '{VALUE} no es categoría válida'
}


let postSchema = new Schema({
    created: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        required: [true, 'La categoría es obligatoria.'],
        enum: validCategory
    },
    title: {
        type: String,
        required: [true, 'El título es obligatorio.']
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Es obligatorio especificar el usiario que ha creado el post.']
    },
    desc: {
        type: String,
        required: [true, 'La descripción es obligatoria.']
    },
    body: {
        type: String,
        required: [true, 'El texto principal es obligatorio.']
    },
    image: {
        type: String,
        required: false
    },
    docs: {
        type: [String],
        required: false
    },
    updated: {
        type: Date,
        required: false
    }
});

module.exports = mongoose.model('Post', postSchema);