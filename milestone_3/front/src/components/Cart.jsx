import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import "./Cart.css";
import axios from 'axios'

let cart = []

const getGames = async () => {
    let tempGamesArray = [];

    for(let game of cart){
        let response = await axios.get("http://localhost:3001/api/product/" + game.game);
        if(response.status === 200){
            response.data.quantidade = game.quantidade
            tempGamesArray.push({... response.data})
        }
    }

    return tempGamesArray;
}

const Cart = ({user}) => {
    const [games, setGames] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalItens, setTotalItens] = useState(0)
    const navigate = useNavigate()

    const loadGames = async () => {
        
        let gamesArray;
        let price = 0;
        let itens = 0;

        gamesArray = await getGames();

        gamesArray.forEach((element) => {
            itens += element.quantidade
            price += element.preco * element.quantidade
        })

        setGames(gamesArray)
        setTotalItens(itens)
        setTotalPrice(price)
    }

    const remove = (event) => {

        console.log(cart)

        let cardId = event.currentTarget.parentNode.id
    
        for(let i = 0; i < cart.length; i++){
            console.log(cart[i].game)
            if(cart[i].game === cardId){
                cart.splice(i,1)
                break;
            }
        }

        if(user === undefined){
            localStorage.setItem("guestCart",JSON.stringify(cart))
        }
        else{
            localStorage.setItem(user._id + "Cart",JSON.stringify(cart))
        }
    }
    
    const endCart = () => {

        if(user === undefined){
            alert('Faça login antes de comprar')
            navigate('/login')
        }
        else if(!user.cartao){
            alert("É necessário cadastrar um cartão antes de poder fazer a compra");
            return;
        }
        else{

            let produtos = []
            cart.forEach((element) => {
                produtos.push({
                    idProduto:element.game,
                    idUsuario:user._id,
                    quantidade:element.quantidade
                })
            })

            axios.post('http://localhost:3001/api/carrinho', {
                produtos: produtos
            })
            .then(() => {
                alert("Compra finalizada :)")
                cart = []
                localStorage.setItem(user._id + "Cart",JSON.stringify(cart))
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    if(user === undefined){
        cart = localStorage.getItem("guestCart")
    }
    else{
        cart = localStorage.getItem(user._id + "Cart")
    }

    if(!cart){
        cart = []
    }
    else{
        cart = JSON.parse(cart);
    }

    useEffect(()=>{loadGames()})

    return (
        <div className='cart-page'>
            <div className='informations'>
                <div className='informations-left'>
                    {games.map((element,index) => {
                        return(
                            <div className='cart-item' key={index} id={element._id}>
                                <button onClick={remove} className='close-button'>X</button>
                                <Card name={element.nome} price={element.preco} img={element.img && require('./../../../uploads/' + element.img)} console={element.plataforma}/>
                                <p>Quantidade: {element.quantidade}</p>
                            </div>
                        )
                    })}
                </div>
                <div className='informations-right'>
                    <div className='row'>
                        <p className='value-1'>Itens: </p>
                        <p className='value-2'>{totalItens}</p>
                    </div>
                    <div className='row'>
                        <p className='value-1'>Frete: </p>
                        <p className='value-2'>R$ 00,00</p>
                    </div>
                    <div className='row'>
                        <p className='value-1'>Total: </p>
                        <p className='value-2'>R$ {totalPrice.toFixed(2)}</p>
                    </div>
                    <div className='row'>
                        <p className='value-1'>Pagamento: </p>
                        <p className='value-2'>Cartão</p>
                    </div>
                    <div className='row'>
                        <p className='value-1'>Parcelamento: </p>
                        <p className='value-2'>5x de R$ {(totalPrice/5).toFixed(2)}</p>
                    </div>
                    <div className='row'>
                        <p className='value-1'>Juros: </p>
                        <p className='value-2'>R$ 00,00</p>
                    </div>
                    <button onClick={endCart} className='edit-button'>
                        FINALIZAR COMPRA
                    </button>
                </div>
            </div>
        </div>
    );
}
 
export default Cart;