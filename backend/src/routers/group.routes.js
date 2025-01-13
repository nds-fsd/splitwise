const express = require("express");
const groupController = require("../controllers/group.controller");

const router = express.Router();

router.post("/", groupController.createGroup);
router.get("/", groupController.getGroups);
router.put(
  "/:id",
  groupController.validateGroupExists,
  groupController.updateGroup
);
router.delete(
  "/:id",
  groupController.validateGroupExists,
  groupController.deleteGroup
);

router.get("/user/:userId", groupController.getUserGroups);

module.exports = router;
