const mongoose = require('mongoose');
const Expense = require('./expense.schema');
const Payment = require('./payment.schema');


const GroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },

    members: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      }],
    balance: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        amount: {
          type: Number,
          default: 0
        }
      }
    ]
  },
  {
    timestamps: true,
  }
);

GroupSchema.methods.updateBalance = async function () {
  const expenses = await Expense.find({ group: this._id }).populate("participants.user", "name").populate({ path: "group", select: "name description members", populate: { path: "members.user", select: "name" } }).populate("paidBy", "name");

  if (expenses.length === 0) {
    this.balance = this.members.map(member => ({
      user: member.user._id,
      amount: 0
    }));
  } else {
    const balance = {}

    expenses.forEach((expense) => {
      const { paidBy, participants, totalAmount } = expense;
      if (!balance[paidBy._id]) {
        balance[paidBy._id] = { user: paidBy._id, amount: totalAmount };
      } else {
        balance[paidBy._id].amount += totalAmount;
      }

      participants.forEach((participant) => {
        const { user, amountOwed } = participant;
        if (!balance[user._id]) {
          balance[user._id] = { user: user._id, amount: -amountOwed };
        } else {
          balance[user._id].amount -= amountOwed;
        }
      });
    });
    this.balance = Object.values(balance);
  }
  await this.save();
  return this.balance;
}

GroupSchema.methods.generateDebts = async function () {
  await Payment.deleteMany({
    group: this._id,
    status: 'pending'
  });

  const balanceCopy = JSON.parse(JSON.stringify(this.balance));
  let debts = [];
  let debtors = balanceCopy.filter(person => person.amount < 0);
  let creditors = balanceCopy.filter(person => person.amount > 0);

  for (let debtor of debtors) {
    for (let creditor of creditors) {
      if (debtor.amount === 0) break;

      let amountToPay = Math.min(Math.abs(debtor.amount), creditor.amount);

      const newPayment = await Payment.create({
        group: this._id,
        from: debtor.user,
        to: creditor.user,
        amount: amountToPay,
        status: 'pending'
      });

      debts.push(newPayment);

      debtor.amount += amountToPay;
      creditor.amount -= amountToPay;
    }
  }

  return debts;
};

const Group = mongoose.model('Group', GroupSchema);
module.exports = Group;