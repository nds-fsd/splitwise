const express = require("express");
const expensesController = require("../controllers/expensesController");

const router = express.Router();

router.get("/:userId/expenses", expensesController.getExpensesByUserId);

module.exports = router;