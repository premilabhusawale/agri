const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/Authenticate.js");
const admin = require("../middleware/Admin.js");
const AdminController = require("../controllers/AdminController.js");

router.get("/admin/stats", authenticate, admin("ADMIN"), AdminController.getAdminStats);

module.exports = router;
