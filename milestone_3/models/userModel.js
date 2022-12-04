const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    nome: String,
    email: String,
    username: String,
    senha: String,
    endereco: String,
    telefone: String,
    adm : Boolean

})

module.exports = mongoose.model("User", userSchema);