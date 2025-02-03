const Expense = require("../schemas/expense.schema");
const User = require("../schemas/user.schema");
const Group = require("../schemas/group.schema");
const mongoose = require("mongoose");

const createExpense = async (req, res) => {
    try {
        const { groupId } = req.params;
        const { description, totalAmount, paidBy, participants } = req.body;

        if (!mongoose.Types.ObjectId.isValid(groupId)) {
            return res.status(400).json({ error: "Invalid group or expense ID" });
        }

        if (!description || !totalAmount || !groupId || !paidBy || !participants || participants.length === 0) {
            return res.status(400).json({ error: "Incomplete data" });
        }

        const groupExists = await Group.findById(groupId).populate("members", "_id");
        if (!groupExists) {
            return res.status(400).json({ error: "Group does not exist" });
        }

        const payer = await User.findById(paidBy);
        if (!payer) {
            return res.status(400).json({ error: "User paying the expense does not exist" });
        }

        const groupMembers = groupExists.members.map((m) => m.user.toString());
        if (!groupMembers.includes(paidBy.toString())) {
            return res.status(400).json({ error: "Payer is not part of the group" });
        }

        // Format Participants
        const formatedParticipants = participants.map((participant) => ({ user: participant }))

        // Verify participants exists as users
        const participantIds = formatedParticipants.map((p) => p.user);
        const participantsExist = await User.find({ _id: { $in: participantIds } });
        if (participantsExist.length !== participantIds.length) {
            return res.status(400).json({ error: "One or more participants are not valid users" });
        }

        const participantsNotInGroup = participantIds.filter((p) => !groupMembers.includes(p));
        if (participantsNotInGroup.length > 0) {
            return res.status(400).json({ error: "One or more participants are not part of the group" });
        }

        if (totalAmount <= 0) {
            return res.status(400).json({ error: "Total amount must be greater than 0" });
        }

        const totalParticipants = participants.length;
        const amountPerParticipant = totalAmount / totalParticipants;
        const roundedAmount = amountPerParticipant.toFixed(2);

        const updatedParticipants = formatedParticipants.map((p) => ({
            user: p.user,
            amountOwed: roundedAmount,
        }));

        const newExpense = await Expense.create({
            description,
            totalAmount,
            group: groupId,
            paidBy: paidBy,
            participants: updatedParticipants,
        });

        const expense = await Expense.findById(newExpense._id).populate("participants.user", "name").populate({ path: "group", select: "name description members", populate: { path: "members.user", select: "name" } }).populate("paidBy", "name");

        res.status(201).json(expense);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error creating expense" });
    }
};

const updateExpense = async (req, res) => {
    try {
        const { expenseId, groupId } = req.params;
        const { description, totalAmount, paidBy, participants } = req.body;

        if (!mongoose.Types.ObjectId.isValid(groupId) || !mongoose.Types.ObjectId.isValid(expenseId)) {
            return res.status(400).json({ error: "Invalid group or expense ID" });
        }

        if (!description || !totalAmount || !participants || participants.length === 0) {
            return res.status(400).json({ error: "Some required fields are missing" });
        }

        const expense = await Expense.findOne({ _id: expenseId, group: groupId });
        if (!expense) {
            return res.status(404).json({ error: "Expense not found in this group" });
        }

        const payer = await User.findById(paidBy);
        if (!payer) {
            return res.status(400).json({ error: "User paying the expense does not exist" });
        }

        const groupExists = await Group.findById(groupId).populate("members", "_id");
        if (!groupExists) {
            return res.status(400).json({ error: "Group does not exist" });
        }

        const groupMembers = groupExists.members.map((m) => m.user.toString());
        if (!groupMembers.includes(paidBy.toString())) {
            return res.status(400).json({ error: "Payer is not part of the group" });
        }

        // Format Participants
        const formatedParticipants = participants.map((participant) => ({ user: participant }))

        // Verify participants exists as users
        const participantIds = formatedParticipants.map((p) => p.user);
        const participantsExist = await User.find({ _id: { $in: participantIds } });
        if (participantsExist.length !== participantIds.length) {
            return res.status(400).json({ error: "One or more participants are not valid users" });
        }

        const participantsNotInGroup = participantIds.filter((p) => !groupMembers.includes(p));
        if (participantsNotInGroup.length > 0) {
            return res.status(400).json({ error: "One or more participants are not part of the group" });
        }

        if (totalAmount <= 0) {
            return res.status(400).json({ error: "Total amount must be greater than 0" });
        }

        const totalParticipants = participants.length;
        const amountPerParticipant = totalAmount / totalParticipants;
        const roundedAmount = amountPerParticipant.toFixed(2);

        const updatedParticipants = formatedParticipants.map((p) => ({
            user: p.user,
            amountOwed: roundedAmount,
        }));

        const updatedExpense = await Expense.findByIdAndUpdate(expenseId, {
            description,
            totalAmount,
            paidBy,
            participants: updatedParticipants,
        },
            { new: true }
        );

        const newExpense = await Expense.findById(updatedExpense._id).populate("participants.user", "name").populate({ path: "group", select: "name description members", populate: { path: "members.user", select: "name" } }).populate("paidBy", "name");

        return res.status(200).json(newExpense);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error editing expense" });
    }
}

const getExpensesByGroupId = async (req, res) => {
    try {
        const { groupId } = req.params;

        if (!groupId || !mongoose.Types.ObjectId.isValid(groupId)) {
            return res.status(400).json({ error: "Invalid group ID" });
        }

        const expenses = await Expense.find({ group: groupId }).populate("participants.user", "name").populate({ path: "group", select: "name description members", populate: { path: "members.user", select: "name" } }).populate("paidBy", "name");

        if (!expenses) { return res.status(404).json({ error: "Expenses not found for this group" }) }

        res.status(200).json(expenses);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error getting expenses" });
    }
};

const getExpensesByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }

        const expenses = await Expense.find({ "participants.user": userId }).populate("participants.user", "name").populate("group", "name description").populate("paidBy", "name");

        if (!expenses) { return res.status(404).json({ error: "Expenses not found for this user" }) }

        res.status(200).json(expenses);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error getting expenses" });
    }
};

const deleteExpense = async (req, res) => {
    try {
        const { groupId, expenseId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(groupId) || !mongoose.Types.ObjectId.isValid(expenseId)) {
            return res.status(400).json({ error: "Invalid group or expense ID" });
        }

        const expense = await Expense.findOne({ _id: expenseId, group: groupId });
        if (!expense) {
            return res.status(404).json({ error: "Expense not found in this group" });
        }

        // TODO: validate if the payer is deleting the expense when JWT is implemented

        await Expense.findByIdAndDelete(expenseId);
        res.status(200).json({ message: "Expense successfully deleted" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Error deleting the expense" });
    }
}


module.exports = { createExpense, updateExpense, getExpensesByGroupId, getExpensesByUserId, deleteExpense };