const express = require('express');
const router = express.Router();
const productController = require("../controllers/productController.js");
const upload = require('./../middlewares/upload')

router.post("/api/product", upload.single('image'), productController.cadastrarProduct);
router.get("/api/product", productController.getAllProducts);
router.get("/api/product/:id", productController.getProduct);
router.delete("/api/product/:id", productController.deleteProduct);
router.put("/api/product/:id", upload.single('image'), productController.updateProduct);

module.exports = router;