// multer.config.js
const multer = require('multer');

// Almacenamiento en memoria para manejar los archivos en buffer
const storage = multer.memoryStorage(); 

const upload = multer({ storage: storage });

module.exports = upload;
