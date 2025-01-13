const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema(
    {
        description: {
            type: String,
            required: true,
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        group: {
            type: Schema.Types.ObjectId,
            ref: "Group",
            required: true,
        },
        paidBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        participants: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                amountOwed: {
                    type: Number,
                    required: true,
                },
            },
        ],
    },
    { timestamps: true },
);

const Expense = mongoose.model("Expense", ExpenseSchema);
module.exports = Expense;