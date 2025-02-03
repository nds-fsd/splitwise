const User = require('../schemas/user.schema');

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
    try {
        const { name, email, password, profilePicture } = req.body;

        const newUser = new User({
            name,
            email,
            password,
            profilePicture, // Asignamos el valor de la foto de perfil
        });

        await newUser.save();
        res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el usuario', error });
    }
};
exports.getCurrentUser = async (req, res) => {
    try {
        const userId = req.jwtPayload.id;
        const CurrentUser = await User.findById(userId);
        res.status(200).json(CurrentUser);    
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al cargar el usuario solicitado', error });
    }
}

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
};

// Actualizar un usuario
exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Devuelve el usuario actualizado
        });
        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario actualizado exitosamente', user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el usuario', error });
    }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado exitosamente', user: deletedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el usuario', error });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {return res.status(404).json({message: 'User not found'})}
            res.status(200).json(user)
    } catch (error) {
        console.log(error)
            res.status(500).json({ message: 'Error al obtener el usuario', error })
    }
}