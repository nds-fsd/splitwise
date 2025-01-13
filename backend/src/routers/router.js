const express = require('express');
const userRoutes = require('./userrouter');
const groupExpensesRouter = require('./groupExpensesRouter');
const userExpensesRouter = require('./userExpensesRouter');

const router = express.Router();

router.use('/group', groupExpensesRouter);
router.use('/user', userExpensesRouter);
router.use('/users', userRoutes);

module.exports = router;
