const Group = require("../schemas/group.schema");
const User = require("../schemas/user.schema");
const mongoose = require("mongoose");

const createGroup = async (req, res) => {
  try {
    const { name, description, members } = req.body;
    if (!name || !description || !members || members.length === 0) {
      return res.status(400).json({ error: "incomplete data" })
    }

    if (name.length > 30) { return res.status(400).json({ error: 'name is to large' }) };
    if (description.length > 50) { return res.status(400).json({ error: 'description is to large' }) };

    // members to array of strings
    const emailMembers = members.map((m) => m.email)

    // verify members exists as users
    const existingUsers = await User.find({ email: { $in: emailMembers } });
    if (existingUsers.length !== members.length) {
      return res.status(400).json({ error: 'One or more members do not exist' })
    }

    // format members
    const formattedMembers = existingUsers.map((user) => ({ user: user._id }));

    const group = await Group.create({
      name,
      description,
      members: formattedMembers
    })

    const newGroup = await Group.findById(group._id).populate("members.user", "name email")
    res.status(201).json(newGroup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating group" });
  }
};

const updateGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { name, description, members } = req.body;

    if (!groupId || !mongoose.Types.ObjectId.isValid(groupId)) {
      return res.status(400).json({ error: "Invalid group ID" });
    }
    if (!name || !description || !members || members.length === 0) {
      return res.status(400).json({ error: "incomplete data" })
    }

    if (name.length > 30) { return res.status(400).json({ error: 'name is to large' }) };
    if (description.length > 50) { return res.status(400).json({ error: 'description is to large' }) };

    // members to array of strings
    const emailMembers = members.map((m) => m.email)

    // verify members exists as users
    const existingUsers = await User.find({ email: { $in: emailMembers } });
    if (existingUsers.length !== emailMembers.length) {
      return res.status(400).json({ error: 'One or more members do not exist' })
    }

    // format members
    const formattedMembers = existingUsers.map((user) => ({ user: user._id }));

    const group = await Group.findByIdAndUpdate(groupId, {
      name,
      description,
      members: formattedMembers
    },
      { new: true }
    );
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    const newGroup = await Group.findById(group._id).populate("members.user", "name email");
    res.status(200).json(newGroup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating group" });
  }
};

const getUserGroups = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid group ID" });
    }

    const groups = await Group.find({ "members.user": userId }).populate("members.user", "name email");
    if (groups.length === 0) {
      return res.status(404).json({ error: "Groups not found" });
    }
    res.status(200).json(groups);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error obteniendo los grupos del usuario",
    });
  }
};

const getGroupById = async (req, res) => {
  try {
    const { groupId } = req.params;

    if (!groupId || !mongoose.Types.ObjectId.isValid(groupId)) {
      return res.status(400).json({ error: "Invalid group ID" });
    }
    const group = await Group.findById(groupId).populate("members.user", "name");

    if (!group) {
      return res.status(400).json({ error: "Group does not exist" })
    }
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ error: "Error getting group" });
  }
};

const deleteGroup = async (req, res) => {
  try {
    const { groupId } = req.params;

    if (!groupId || !mongoose.Types.ObjectId.isValid(groupId)) {
      return res.status(400).json({ error: "Invalid group ID" });
    }

    // validate if a member is deleting the group when JWT is implemented

    const group = await Group.findById(groupId)
    if (!group) { return res.status(404).json({ error: 'group not found' }) }

    await Group.findByIdAndDelete(groupId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error deleting group" });
  }
};

module.exports = {
  createGroup,
  getGroupById,
  updateGroup,
  deleteGroup,
  getUserGroups,
};
