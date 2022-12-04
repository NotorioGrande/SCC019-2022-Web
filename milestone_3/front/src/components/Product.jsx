import React, { useState } from 'react';
import Card from './Card';
import "./Product.css";
import smw from './smw.png';

//objeto de game de exemplo
let game = {
    name: 'Super Mario World',
    price: 56.90,
    stock: 16,
    img: smw,
    console: 'SNES',
    description: 'Jogo usado em perfeito estado. Versão dos Estados Unidos',
    tags: ['Ação', 'Aventura', 'RPG', 'Arcade', 'Beat em up', 'Side Scroller', 'Shoot em up', 'Action RPG']
}

const buyProduct = () => {
    alert("O produto foi comprado :)")
}

const addToCart = () => {

    let cart = localStorage.getItem("cart")
    cart = JSON.parse(cart)

    if(!cart) cart = []

    let isOnCart = false

    let n = document.getElementsByClassName('quantity-number')[0]
    n = parseInt(n.innerHTML)
    
    cart.forEach(function(element,i){
        if(element.game.name === game.name){
            isOnCart = true
            if(parseInt(element.quantidade) + n <= game.stock){
                element.quantidade = parseInt(element.quantidade) + n
            }
            else{
                element.quantidade = game.stock
            }
        }
    })

    if(!isOnCart){
        let cartItem = {
            game,
            quantidade: n
        }

        cart.push(cartItem)
    }

    console.log(cart)

    localStorage.setItem("cart",JSON.stringify(cart))

    alert("Produto adicionado ao carrinho")
}

const Product = () => {

    const [cost, setCost] = useState(game.price)

    const addProduct = () => {
        let productNumber = document.getElementsByClassName('quantity-number')[0]
        let n = parseInt(productNumber.innerHTML)
    
        if(n < 99 && n < game.stock){
            n++
        }
    
        productNumber.innerHTML = n
    
        setCost(n*game.price)
    }
    
    const subtractProduct = () => {
        let productNumber = document.getElementsByClassName('quantity-number')[0]
        let n = parseInt(productNumber.innerHTML)
    
        if(n > 1){
            n--
        }
    
        productNumber.innerHTML = n

        setCost(n*game.price)
    }

    const renderStock = (stock) => {
        if(stock > 0){
            if(stock > 1){
                return(
                    <>
                        <p className='stock-number'>{stock}</p>
                        <p className='stock-number'>unidades</p>
                    </>
                )
            }
            else{
                return(
                    <>
                        <p className='stock-number'>{stock}</p>
                        <p className='stock-number'>unidade</p>
                    </>
                )
            }
        }
        else{
            return <p className='stock-number'>Esgotado :/</p>
        }
    }

    return (
        <div className='product-page'>
            <div className='informations'>
                <div className='informations-left'>
                    <Card name={game.name} price={game.price} img={game.img} console={game.console}/>
                    <div className='all-tags'>
                        {game.tags.map((element,index) => {
                            return(
                                <div className='tag' key={index}>
                                    <p>{element}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='informations-right'>
                    <div className='row-1'>
                        <p>{game.name}</p>
                        <p>[{game.console}]</p>
                    </div>
                    <div className='row-2'>
                        <div className='values'>
                            <div className='value-1'>
                                <p>R$ {cost.toFixed(2)}</p>
                            </div>
                            <div className='value-2'>
                                <p>5x de R$ {(cost/5).toFixed(2)}</p>
                            </div>
                        </div>
                        {/* <div>
                            Em estoque:
                        </div> */}
                        <div className='quantity'>
                            <div onClick={addProduct} className='add-quantity'>
                                +
                            </div>
                            <p> Quantidade: </p>
                            <p className='quantity-number'> 1 </p>
                            <div onClick={subtractProduct} className='subtract-quantity'>
                                -
                            </div>
                        </div>
                    </div>
                    <div className='row-3'>
                        <p>Estoque: </p>
                        {renderStock(game.stock)}
                    </div>
                    <div className='row-4'>
                        <p>Descrição: </p>
                    </div>
                    <div className='row-5'>
                        <p>{game.description}</p>
                    </div>
                </div>
            </div>
            <div className='all-buttons'>
                <button onClick={buyProduct}> Comprar </button>
                <button onClick={addToCart}> Carrinho </button>
            </div>
        </div>
    );
}
 
export default Product;