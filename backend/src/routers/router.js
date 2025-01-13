const express = require('express');
const groupRoutes = require('./group.routes')


const router = express.Router();


router.use('/groups', groupRoutes);

module.exports = router;
