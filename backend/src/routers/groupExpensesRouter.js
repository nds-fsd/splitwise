const express = require("express");
const expensesController = require("../controllers/expensesController");

const router = express.Router();

router.post("/:groupId/expenses", expensesController.createExpense);
router.patch("/:groupId/expenses/:expenseId", expensesController.updateExpense);
router.get("/:groupId/expenses", expensesController.getExpensesByGroupId);
router.delete("/:groupId/expenses/:expenseId", expensesController.deleteExpense);

module.exports = router;