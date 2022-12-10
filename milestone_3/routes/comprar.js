const express= require('express');
const router = express.Router();
const compraControler = require('../controllers/comprarController');
router.post("/api/comprar", compraControler.lidarCompra);
router.post("/api/carrinho", compraControler.processarCarrinho);

module.exports = router;