const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

router.get("/api/items", itemController.list);
router.post("/api/items", itemController.save);
router.delete("/api/items/:id", itemController.delete);
router.put("/api/items/:id", itemController.update);

module.exports = router;
