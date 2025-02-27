const express = require("express");
const { jwtMiddleware } = require("../security/jwt")
const groupController = require("../controllers/group.controller");

const router = express.Router();

router.post("/", jwtMiddleware, groupController.createGroup);
router.get("/user", jwtMiddleware, groupController.getUserGroups);
router.put("/:groupId", jwtMiddleware, groupController.updateGroup);
router.delete("/:groupId", jwtMiddleware, groupController.deleteGroup);
router.get("/:groupId", jwtMiddleware, groupController.getGroupById);
router.get("/:groupId/balance", groupController.getBalance);


module.exports = router;
