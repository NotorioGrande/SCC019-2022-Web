import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import "./Product.css";
import smw from './smw.png';

//objeto de game de exemplo
let game = {
    name: 'Super Mario World',
    price: 'R$ 56,90',
    img: smw,
    console: 'SNES',
    description: 'Jogo usado em perfeito estado. Versão dos Estados Unidos'
}

const Product = ({/*game*/}) => {
    return (
        <div className='product-page'>
            <div className='informations'>
                <div className='informations-left'>
                    <Card name={game.name} price={game.price} img={game.img} console={game.console}/>
                </div>
                <div className='informations-right'>
                    <div className='row-1'>
                        <p>{game.name} <br/> [{game.console}]</p>
                    </div>
                    <div className='row-2'>
                        <div className='values'>
                            <div className='value-1'>
                                <p>{game.price}</p>
                            </div>
                            <div className='value-2'>
                                <p>5x de R$ 11,38</p>
                            </div>
                        </div>
                        <div className='all-buttons'>
                            <button className='edit-button'>
                                <Link className='button' to="/admin/products">Comprar</Link>
                            </button>
                            <button className='edit-button'>
                                <Link className='button' to="/admin/products">Carrinho</Link>
                            </button>
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