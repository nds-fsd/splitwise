const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    profilePicture: {  // Campo adicional para la foto
        type: String, // Guardará una URL o ruta de la imagen
        default: '', // Opcional: Valor por defecto en caso de no incluir imagen
    },
    }, 
    { timestamps:true}
);

module.exports = mongoose.model('User', user);

