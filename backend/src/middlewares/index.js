const Group = require('../mongo/schemas/group.model');


const validateGroupExists = async (req, res, next) => {
  try {
    const { id } = req.params;
    const group = await Group.findById(id);

    if (!group) {
      return res.status(404).json({ success: false, message: 'Grupo no encontrado' });
    }

    req.group = group; // Agregar el grupo al request para reutilizarlo si es necesario //
    next(); // Continuar con la siguiente función en la cadena //
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error validando el grupo' });
  }
};

module.exports = {
  validateGroupExists,
};

