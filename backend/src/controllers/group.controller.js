const Group = require("../schemas/group.schema");

const createGroup = async (req, res) => {
  try {
    const { name, description } = req.body;
    const group = new Group({ name, description });
    await group.save();
    res
      .status(201)
      .json({ success: true, message: "Grupo creado", data: group });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error creando el grupo" });
  }
};

const getGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(200).json({ success: true, data: groups });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error obteniendo los grupos" });
  }
};

const updateGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const group = await Group.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    if (!group) {
      return res
        .status(404)
        .json({ success: false, message: "Grupo no encontrado" });
    }
    res
      .status(200)
      .json({ success: true, message: "Grupo actualizado", data: group });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error actualizando el grupo" });
  }
};

const deleteGroup = async (req, res) => {
  try {
    const { id } = req.params;
    await Group.findByIdAndDelete(id);

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error eliminando el grupo" });
  }
};

const validateGroupExists = async (req, res, next) => {
  try {
    const { id } = req.params;
    const group = await Group.findById(id);
    if (!group) {
      return res
        .status(404)
        .json({ success: false, message: "Grupo no encontrado" });
    }
    req.group = group;
    next();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error validando el grupo" });
  }
};

const getUserGroups = async (req, res) => {
  try {
    const { userId } = req.params;
    const groups = await Group.find({ members: userId });
    if (!groups.length) {
      return res.status(404).json({
        success: false,
        message: "No se encontraron grupos para este usuario",
      });
    }
    res.status(200).json({ success: true, data: groups });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error obteniendo los grupos del usuario",
    });
  }
};

module.exports = {
  createGroup,
  getGroups,
  updateGroup,
  deleteGroup,
  validateGroupExists,
  getUserGroups,
};
