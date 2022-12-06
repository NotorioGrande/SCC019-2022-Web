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
        adm :req.body.adm,
        xp: 0
    })
    //para caso o usuario tente criar conta com username ou email ja existente, vai dar erro pq no model foi definido como unique as propriedades email e username
    try{
    var userCreated = await newUser.save();
    }
    catch(e){
        console.log(e)
        //primeiro descobrir o caso de erro de duplicata
        const userByEmail = await userModel.findOne({email : req.body.email});
        if(userByEmail){
            return res.status(404).json({
                error : "email"
            });
        }
        const userByUsername = await userModel.findOne({username : req.body.username});
        if(userByUsername){
            return res.status(404).json({
                error : "username"
            });
            
        }
    }
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
        return res.status(404).json({error : "id"});
    }
    const userFound = await userModel.findOne({_id : id});
    if(userFound){
        return res.status(200).json(userFound);
    }
    return res.status(404).json({error : "id"});
    


}

module.exports.getUserByEmail  = async (req, res) => {
    const email = req.params.email;
    const userFound = await userModel.findOne({email : email});
    if(userFound){
        return res.status(200).json(userFound);
    }
    return res.status(404).json({error : "email"});
}

module.exports.deleteUser = async (req, res) =>{
    const id = req.params.id;
    if(!mongoose.isValidObjectId(id)){
        return res.status(404).json({error : "id"});
    }
    const userFound = await userModel.findOneAndDelete({_id : id});
    if(userFound){
        return res.status(200).json(userFound);
    }
    return res.status(404).json({error : "id"});
    
}

module.exports.updateUser = async (req, res) => {
    const id = req.params.id;
    if(!mongoose.isValidObjectId(id)){
        return res.status(404).json({error : "id"});
    }
    try{
    var updatedUser = await userModel.findOneAndUpdate({_id : id}, {
        nome: req.body.nome,
        email: req.body.email,
        username: req.body.username,
        senha: req.body.senha,
        endereco: req.body.endereco,
        telefone: req.body.telefone,
        adm :req.body.adm 
    }, {
        new: true
    });
    }
    catch(e){
        console.log(e);
        //descobrir se deu erro pelo email ou username
        const userByEmail = await userModel.findOne({email : req.body.email});
        //a desigualdade precisa ser !=, pq o _id é um object e n uma string
        //se o id for o mesmo é o user tentou mudar seus dados sem alterar o email
        if(userByEmail && userByEmail._id != id){
            console.log(userByEmail)
            return res.status(404).json({
                error : "email"
            });
        }
        const userByUsername = await userModel.findOne({username : req.body.username});
        //se o id for o mesmo é o user tentou mudar seus dados sem alterar o email
        if(userByUsername && userByUsername._id != id){
            return res.status(404).json({
                error : "username"
            });
            
        }
            
       
    }
    if(updatedUser) {
        return res.status(200).json(updatedUser);
    }
    return res.status(404).json({error : "id"});
    

}