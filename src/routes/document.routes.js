const express = require("express");
const router = express.Router();
const docController = require("../controllers/document.controller");

// Public route
router.get("/:qrcode", docController.getDocumentByQr);

// Admin routes
router.post("/", docController.createDocument);
router.put("/:id", docController.updateDocument);
router.delete("/:id", docController.deleteDocument);
router.get("/", docController.getAllDocuments);

module.exports = router;
