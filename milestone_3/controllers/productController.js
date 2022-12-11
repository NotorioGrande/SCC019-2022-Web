const mongoose = require('mongoose');
const productModel = require('../models/productModel');
const fs = require("fs");

module.exports.cadastrarProduct = async (req, res) => {

    const newProduct = new productModel({
        nome: req.body.nome,
        estoque: req.body.estoque,
        vendido: req.body.vendido,
        img: req.file.filename,
        preco: req.body.preco,
        plataforma: req.body.plataforma,
        descricao: req.body.descricao,
        tags: req.body.tags
    });
    const productCreated = await newProduct.save();
    return res.status(200).json(productCreated);
}

module.exports.getAllProducts = async (req, res ) =>{
    const productsFound = await productModel.find();
    
    if(productsFound.length > 0)
        return res.status(200).json(productsFound);
    
    return res.status(404).send("Sem produtos no sistema");
}

module.exports.getProduct = async (req, res) => {
    const id = req.params.id;
    if(!mongoose.isValidObjectId(id)){
        return res.status(404).json({error : "id"});
    }
    const productFound = await productModel.findOne({_id: id});
    if(productFound){
        return res.status(200).json(productFound);
    }
    return res.status(404).json({error : "id"});
    

}

module.exports.deleteProduct = async (req, res) => {
    const id = req.params.id;
    if(!mongoose.isValidObjectId(id)){
        return res.status(404).json({error : "id"});
    }
    const productFound = await productModel.findOneAndDelete({_id : id});
    if(productFound){
        let path = 'uploads/' + productFound.img
        try{
            fs.unlink(path, () => { //se tirar isso da erro
                
            })
        }
        finally{
            return res.status(200).json(productFound);
        }
        
    }
    return res.status(404).json({error : "id"});
    
}

module.exports.updateProduct = async (req, res) => {
    const id = req.params.id;
    if(!mongoose.isValidObjectId(id)){
        return res.status(404).json({error : "id"});
    }
    const updatedProduct = await productModel.findOneAndUpdate({_id: id},{
        nome: req.body.nome,
        estoque: req.body.estoque,
        vendido: req.body.vendido,
        img: req.body.img,
        preco: req.body.preco,
        plataforma: req.body.plataforma,
        descricao: req.body.descricao,
    }, {
        new: true
    });
    if(updatedProduct){
        return res.status(200).json(updatedProduct);
    }
    return res.status(404).json({error : "id"});
}   