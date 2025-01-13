const express = require('express');
const userRoutes = require('./userrouter');

const router = express.Router();

router.use('/users', userRoutes);

module.exports = router;
