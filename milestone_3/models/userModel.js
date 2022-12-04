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
    adm : Boolean

})

module.exports = mongoose.model("User", userSchema)