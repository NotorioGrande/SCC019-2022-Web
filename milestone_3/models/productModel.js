const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nome: String,
    estoque: Number,
    vendido: Number,
    img: String,
    preco: Number,
    plataforma: String,
    descricao: String,
    tags: [String]

})

module.exports = mongoose.model("Product", productSchema);