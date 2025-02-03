const express = require("express");
const groupController = require("../controllers/group.controller");

const router = express.Router();

router.post("/", groupController.createGroup);
router.get("/:groupId", groupController.getGroupById);
router.get("/user/:userId", groupController.getUserGroups);
router.put("/:groupId", groupController.updateGroup);
router.delete("/:groupId", groupController.deleteGroup);


module.exports = router;
