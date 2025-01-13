const express = require("express");
const billsController = require("../controllers/expensesController");

const router = express.Router();

router.post("/:groupId", billsController.createBill);
router.patch("/:groupId/:billId", billsController.updateBill);
router.get("/:groupId", billsController.getBillsByGroupId);
router.get("/entity/id", billsController.getBillsByUserId); // Query string if userID will be passed by JWT??
router.delete("/:groupId/:billId", billsController.deleteBill);

router.post("/:groupId", billsController.createBill);
router.patch("/:groupId/:billId", billsController.updateBill);
router.get("/:groupId", billsController.getBillsByGroupId);
router.delete("/:groupId/:billId", billsController.deleteBill);

module.exports = router;

// router.post("/group/:id/bill", billsController.CreateBill);
// router.post("/group/:id/bill/:billId", billsController.updateBill);
// router.get("/group/:id/bills", billsController.getBillsByGroupId);
// router.get("/user/:userId/bills", billsController.getBillsByUserId);
// router.delete("/group/:id/bill/:id", billsController.deleteBill);