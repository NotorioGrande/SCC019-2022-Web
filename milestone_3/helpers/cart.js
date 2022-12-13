const mongoose = require('mongoose');
const userModel = require('../models/userModel');
const productModel = require('../models/productModel');
//funcao que faz a compra individual, atualizando o estoque
const comprar = async (idProduto, quantidade, idUsuario) => {
    if(!mongoose.isValidObjectId(idProduto)){

        throw new Error("idProduto");

    }
    if(!mongoose.isValidObjectId(idUsuario)){

        throw new Error("idUsuario");
    }
    const produto = await productModel.findOne({_id: idProduto});
    const usuario = await userModel.findOne({_id: idUsuario});
    if(!produto){
        throw new Error("idProduto");
    }
    if(!usuario){
        throw new Error("idUsuario")
    }    
    if(quantidade <= 0 || produto.estoque < quantidade){
        throw new Error("quantidade");
    }
    produto.estoque -= quantidade;
    produto.vendido += quantidade;
    await produto.save();
    usuario.xp += (produto.preco*quantidade);
    await usuario.save();
    return [produto, usuario];


}
exports.comprar = comprar;