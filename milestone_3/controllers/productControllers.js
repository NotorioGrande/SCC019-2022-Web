const mongoose = require('mongoose');
const productModel = require('../models/productModel');
module.exports.cadastrarProduct = async (req, res) => {
    const newProduct = new productModel({
        nome: req.body.nome,
        estoque: req.body.estoque,
        vendido: req.body.vendido,
        img: req.body.img,
        preco: req.body.preco,
        plataforma: req.body.plataforma,
        descricao: req.body.descricao,
    })
}

module.exports.deletarProduct = async (req, res) => {
    const id = req.params.id;
    if(!mongoose.isValidObjectId(id)){
        return res.status(404).json({error : "id"});
    }
    const productFound = await productModel.findOneAndDelete({_id : id});
    if(productFound){
        return res.status(200).json(productFound);
    }
    return res.status(404).json({error : "id"});
    
}