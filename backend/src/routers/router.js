const express = require('express');
const groupExpensesRouter = require('./groupExpensesRouter');
const userExpensesRouter = require('./userExpensesRouter');

const router = express.Router();

router.use('/group', groupExpensesRouter);
router.use('/user', userExpensesRouter);

module.exports = router;
