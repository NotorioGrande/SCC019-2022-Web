const express = require('express');
const router = express.Router();
const productController = require("../controllers/productController.js");

router.post("/api/product", productController.cadastrarProduct);
router.get("/api/product", productController.getAllProducts);
router.get("/api/product/:id", productController.getProduct);
router.delete("/api/product/:id", productController.deleteProduct);
router.put("/api/product/:id", productController.updateProduct);

module.exports = router;