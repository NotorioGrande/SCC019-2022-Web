const express = require('express');
const { builtinModules } = require('module');
const router = express.Router();
const userController = require("../controllers/userController.js");

router.post("/api/user", userController.cadastrarUser);

module.exports = router;