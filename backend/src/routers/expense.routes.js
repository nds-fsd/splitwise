const express = require("express");
const { jwtMiddleware } = require("../security/jwt")
const expensesController = require("../controllers/expense.controller");

const router = express.Router();

router.post("/:groupId/expenses", jwtMiddleware, expensesController.createExpense);
router.patch("/:groupId/expenses/:expenseId", jwtMiddleware, expensesController.updateExpense);
router.get("/:groupId/expenses", jwtMiddleware, expensesController.getExpensesByGroupId);
router.delete("/:groupId/expenses/:expenseId", jwtMiddleware, expensesController.deleteExpense);

module.exports = router;