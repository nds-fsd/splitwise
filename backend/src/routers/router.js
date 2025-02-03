const express = require("express");
const userRoutes = require("./user.routes")
const groupExpensesRouter = require("./expense.routes");
const groupRoutes = require("./group.routes");
const authRouter = require("./auth.routes")

const router = express.Router();

router.use("/group", groupExpensesRouter);
router.use("/user", userRoutes);
router.use("/group", groupRoutes);
router.use('/auth', authRouter);

module.exports = router;
