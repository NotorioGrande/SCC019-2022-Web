const comprasHelper = require('../helpers/cart')
//lida com a requisicao de comprar
module.exports.lidarCompra = async (req, res) => {
    const idProduto = req.body.idProduto;
    const idUsuario = req.body.idUsuario;
    const quantidade = req.body.quantidade;
    try{
        result = await comprasHelper.comprar(idProduto, quantidade, idUsuario);
    }
    catch(e){
        console.log(e.message)
        let errorObj = {error : e.message}
        return res.status(404).json(errorObj);
    }
    return res.status(200).json(result);
}