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
module.exports.getAllUsers = async (req, res) => {
    const usersFound = await userModel.find();
    
    if(usersFound.length > 0)
        return res.status(200).json(usersFound);
    
    return res.status(404).send("Sem usuários no sistema");
}

module.exports.getUser = async (req, res) =>{
    const id = req.params.id;
    if(!mongoose.isValidObjectId(id)){
        return res.status(404).send("Nenhum usuário com esse ID")
    }
    const userFound = await userModel.find({_id : id});
    if(userFound){
        return res.status(200).json(userFound);
    }
    return res.status(404).send("Nenhum usuário com esse ID")
    


}
module.exports.deleteUser = async (req, res) =>{
    const id = req.params.id;
    if(!mongoose.isValidObjectId(id)){
        return res.status(404).send("Nenhum usuário com esse ID")
    }
    const userFound = await userModel.findOneAndDelete({_id : id});
    if(userFound){
        return res.status(200).json(userFound);
    }
    return res.status(404).send("Nenhum usuário com esse ID")
    
}

module.exports.updateUser = async (req, res) => {
    const id = req.params.id;
    if(!mongoose.isValidObjectId(id)){
        return res.status(404).send("Nenhum usuário com esse ID")
    }
    const updatedUser = await userModel.findOneAndUpdate({_id : id}, {
        nome: req.body.nome,
        email: req.body.email,
        username: req.body.username,
        senha: req.body.senha,
        endereco: req.body.endereco,
        telefone: req.body.telefone,
        adm :req.body.adm 
    }, {
        new: true
    })
    if(updatedUser) {
        return res.status(200).json(updatedUser);
    }
    return res.status(404).send("Nenhum usuário com esse ID");
    

}