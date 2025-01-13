const express = require('express');
const {addDateMiddleware, validateUser} = require('../middlewares/index');

const userController = require('../controllers/usercontroller');
const router = express.Router();
// Ruta para crear un usuario
router.post('/create', validateUser, userController.createUser);

// Ruta para obtener todos los usuarios
router.get('/', addDateMiddleware, userController.getAllUsers);
//eliminar
router.delete('/:id',  addDateMiddleware, userController.deleteUser);
//actualizar
router.patch('/:id', addDateMiddleware, userController.updateUser);
router.get('/:id', userController.getUserById);

module.exports = router;