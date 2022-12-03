import React from 'react';
import Card from './Card';
import "./Product.css";
import smw from './smw.png';

//objeto de game de exemplo
let game = {
    name: 'Super Mario World',
    price: '56,90',
    img: smw,
    console: 'SNES',
    description: 'Jogo usado em perfeito estado. Versão dos Estados Unidos'
}

const buyProduct = () => {
    alert("O produto foi comprado :)")
}

const addToCart = () => {

    let cart = localStorage.getItem("cart")
    cart = JSON.parse(cart)

    if(!cart) cart = []

    let isOnCart = false
    
    cart.forEach(function(element,i){
        if(element.game.name === game.name){
            isOnCart = true
            element.quantidade = parseInt(element.quantidade) + 1
        }
    })

    if(!isOnCart){
        let cartItem = {
            game,
            quantidade: 1
        }

        cart.push(cartItem)
    }

    console.log(cart)

    localStorage.setItem("cart",JSON.stringify(cart))

    alert("Produto adicionado ao carrinho")
}

const Product = () => {
    return (
        <div className='product-page'>
            <div className='informations'>
                <div className='informations-left'>
                    <Card name={game.name} price={game.price} img={game.img} console={game.console}/>
                </div>
                <div className='informations-right'>
                    <div className='row-1'>
                        <p>{game.name}</p>
                        <p>[{game.console}]</p>
                    </div>
                    <div className='row-2'>
                        <div className='values'>
                            <div className='value-1'>
                                <p>R$ {game.price}</p>
                            </div>
                            <div className='value-2'>
                                <p>5x de R$ 11,38</p>
                            </div>
                        </div>
                        <div className='all-buttons'>
                            <div className='quantity'>
                                <div className='add-quantity'>
                                    +
                                </div>
                                <p> Quantidade: </p>
                                <p className='quantity-number'> 1 </p>
                                <div className='subtract-quantity'>
                                    -
                                </div>
                            </div>
                            <button onClick={buyProduct} className='edit-button'> Comprar </button>
                            <button onClick={addToCart} className='edit-button'> Carrinho </button>
                        </div>
                    </div>
                    <div className='row-3'>
                        <p>Descrição: </p>
                    </div>
                    <div className='row-4'>
                        <p>{game.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Product;