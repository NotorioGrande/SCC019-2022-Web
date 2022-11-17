import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import "./Cart.css";
import smw from './smw.png';

//o cart é um array de objeto game e quantidade
let cart = [{
    game: {
        name: 'Super Mario World',
        price: 'R$ 56,90',
        img: smw,
        console: 'SNES'
    },
    quantidade: 2
},
{
    game: {
        name: 'Super Mario World',
        price: 'R$ 56,90',
        img: smw,
        console: 'SNES'
    },
    quantidade: 2
},{
    game: {
        name: 'Super Mario World',
        price: 'R$ 56,90',
        img: smw,
        console: 'SNES'
    },
    quantidade: 2
}]

const remove = (event) => {
    event.currentTarget.parentNode.remove()
}

const Cart= ({/*cart*/}) => {
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
                        <p className='value-2'>2</p>
                    </div>
                    <div className='row'>
                        <p className='value-1'>Frete: </p>
                        <p className='value-2'>R$ 27,87</p>
                    </div>
                    <div className='row'>
                        <p className='value-1'>Total: </p>
                        <p className='value-2'>R$ 141,66</p>
                    </div>
                    <div className='row'>
                        <p className='value-1'>Pagamento: </p>
                        <p className='value-2'>Cartão</p>
                    </div>
                    <div className='row'>
                        <p className='value-1'>Parcelamento: </p>
                        <p className='value-2'>3x de R$ 47,22</p>
                    </div>
                    <div className='row'>
                        <p className='value-1'>Juros: </p>
                        <p className='value-2'>R$ 00,00</p>
                    </div>
                    <button className='edit-button'>
                        <Link className='button' to="/">FINALIZAR COMPRA</Link>  {/*Não é rota, só botar um bglh ai pra alterar a quantidade*/}
                    </button>
                </div>
            </div>
        </div>
    );
}
 
export default Cart;