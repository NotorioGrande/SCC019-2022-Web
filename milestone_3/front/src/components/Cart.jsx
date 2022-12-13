import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import "./Cart.css";
import axios from 'axios'
import smw from './smw.png';

let cart = []

const refresh = () => {
    let campos = document.getElementsByClassName('value-2')

    let totalPrice = 0
    let totalItens = 0

    cart.forEach(function(element, i){
        totalPrice += parseFloat((element.game.price).replace(',','.')) * parseInt(element.quantidade)
        totalItens += parseInt(element.quantidade)
    })

    campos[0].innerHTML = totalItens.toString()
    campos[2].innerHTML = "R$ " + totalPrice.toFixed(2).toString()
    campos[4].innerHTML = "5x de R$ " + (totalPrice/5).toFixed(2).toString()
}

const remove = (event) => {

    let removeName = event.currentTarget.nextSibling.children[3].innerHTML

    for(let i = 0; i < cart.length; i++){
        if(cart[i].game.name === removeName){
            cart.splice(i,1)
            break;
        }
    }

    window.localStorage.setItem("cart",JSON.stringify(cart));

    event.currentTarget.parentNode.remove()
    refresh()
}

const endCart = () => {
    alert("Compra finalizada :)")

    document.getElementsByClassName('informations-left')[0].innerHTML = ""

    cart = []
    window.localStorage.setItem("cart",JSON.stringify(cart));

    refresh()
}

const Cart = ({user}) => {

    if(user === undefined){
        cart = localStorage.getItem("guestCart")
    }
    else{
        cart = localStorage.getItem(user._id + "Cart")
    }

    cart = JSON.parse(cart)

    if(!cart) cart = []

    let totalPrice = 0
    let totalItens = 0

    cart.forEach(function(element, i){
        totalPrice += parseFloat(element.game.price) * parseInt(element.quantidade)
        totalItens += parseInt(element.quantidade)
    })

    return (
        <div className='cart-page'>
            <div className='informations'>
                <div className='informations-left'>
                    {cart.map((element,index) => {
                        let game = {}
                        axios.get('http://localhost:3001/api/product/' + element.game)
                        .then(response => {
                            console.log(response.data)
                            game = response.data
                            return(
                                <div className='cart-item' key={index} id={'item-' + index}>
                                    <button onClick={remove} className='close-button'>X</button>
                                    <Card name={game.nome} price={game.preco} img={game.img} console={game.plataforma}/>
                                    <p>Quantidade: {element.quantidade}</p>
                                </div>
                            )
                        })
                        .catch(err => {
                            console.log('Deu ruim : ' + err)
                        })
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