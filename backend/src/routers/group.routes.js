const express = require('express');
const groupController = require('../controllers/group.controller');

const router = express.Router();


router.post('/', groupController.createGroup);
router.get('/', groupController.getGroups);
router.put('/:id', groupController.updateGroup);
router.delete('/:id', groupController.deleteGroup);


router.get('/user/:userId', groupController.getUserGroups);  
router.get('/:id/validate', groupController.validateGroupExists, (req, res) => {
  res.status(200).json({ success: true, message: 'Grupo válido', data: req.group });
}); 

module.exports = router;

