const express = require('express');
const { builtinModules } = require('module');
const router = express.Router();
const userController = require("../controllers/userController.js");

router.post("/api/user", userController.cadastrarUser);
router.get("/api/user", userController.getAllUsers);
router.get("/api/user/:id", userController.getUser);
router.delete("/api/user/:id", userController.deleteUser);
router.put("/api/user/:id", userController.updateUser);

module.exports = router;