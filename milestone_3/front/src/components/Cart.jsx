import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import "./Cart.css";
import smw from './smw.png';

let cart = []

//o cart é um array de objeto game e quantidade
// let cart = [{
//     game: {
//         name: 'Super Mario World',
//         price: '56.90',
//         img: smw,
//         console: 'SNES'
//     },
//     quantidade: 1
// },
// {
//     game: {
//         name: 'Super Mario World',
//         price: '56.90',
//         img: smw,
//         console: 'SNES'
//     },
//     quantidade: 1
// },
// {
//     game: {
//         name: 'Super Mario World',
//         price: '56.90',
//         img: smw,
//         console: 'SNES'
//     },
//     quantidade: 1
// }]

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
        if(cart[i].game.name == removeName){
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

const Cart= () => {

    cart = localStorage.getItem("cart")
    cart = JSON.parse(cart)

    if(!cart) cart = []

    let totalPrice = 0
    let totalItens = 0

    cart.forEach(function(element, i){
        totalPrice += parseFloat((element.game.price).replace(',','.')) * parseInt(element.quantidade)
        totalItens += parseInt(element.quantidade)
    })

    return (
        <div className='cart-page'>
            <div className='informations'>
                <div className='informations-left'>
                    {cart.map((element,index) => {
                        return(
                            <div className='cart-item' key={index} id={'item-' + index}>
                                <button onClick={remove} className='close-button'>X</button>
                                <Card name={element.game.name} price={element.game.price} img={element.game.img} console={element.game.console}/>
                                <p>Quantidade: {element.quantidade}</p>
                                <button className='edit-button'>
                                    <Link className='button' to="/alterar">Alterar</Link>  {/*Não é rota, só botar um bglh ai pra alterar a quantidade*/}
                                </button>
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