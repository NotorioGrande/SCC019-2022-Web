const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    nome:{
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true
        },
    username:{
        type: String,
        unique: true,
        trim: true},
    senha: String,
    endereco: {
        type: String,
        trim: true
    },
    telefone: {
        type: String,
        trim: true
    },
    adm : Boolean,
    xp : Number,
    //cartao fica stringfado em json
    cartao : {
        type : String
    }
    
    

})

module.exports = mongoose.model("User", userSchema)