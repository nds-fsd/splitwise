const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    expense: {
        type: Schema.Types.ObjectId,
        ref: "Expense",
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    paymentMethod: {
        type: String,
        enum: ["card", "bank_transfer", "cash", "manual"],
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending",
    },
    stripeTransactionId: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

// const PaymentSchema = new Schema({
//     expense: { type: Schema.Types.ObjectId, ref: "Expense" },  // opcional
//     fromUser: { type: Schema.Types.ObjectId, ref: "User", required: true },
//     toUser: { type: Schema.Types.ObjectId, ref: "User", required: true },
//     amount: { type: Number, required: true },
//     date: { type: Date, default: Date.now },
// });

const Payment = mongoose.model("Payment", PaymentSchema);
module.exports = Payment;
