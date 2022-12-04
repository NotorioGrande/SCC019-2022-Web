const mongoose = require('mongoose');
const userModel = require('../models/userModel');
module.exports.cadastrarUser= async (req, res) => {

    const newUser = new userModel({
        nome: req.body.nome,
        email: req.body.email,
        username: req.body.username,
        senha: req.body.senha,
        endereco: req.body.endereco,
        telefone: req.body.telefone,
        adm :req.body.adm 
    })
    
    const userCreated = await newUser.save();
    return res.status(200).json(userCreated);
}