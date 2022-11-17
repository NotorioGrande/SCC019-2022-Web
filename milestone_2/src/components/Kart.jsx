import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import "./Kart.css";
import smw from './smw.png';

//o kart é um array de objeto game e quantidade
let kart = [{
    game: {
        name: 'Super Mario World',
        price: 'R$ 56,90',
        img: smw,
        console: 'SNES'
    },
    quantidade: 2
}]

const Kart= ({/*kart*/}) => {
    return (
        <div className='kart-page'>
            <div className='informations'>
                <div className='informations-left'>
                    <div className='kart-item'>
                        <button className='close-button'>X</button>
                        <Card name={kart[0].game.name} price={kart[0].game.price} img={kart[0].game.img} console={kart[0].game.console}/>
                        <p>Quantidade: {kart[0].quantidade}</p>
                        <button className='edit-button'>
                            <Link className='button' to="/alterar">Alterar</Link>  {/*Não é rota, só botar um bglh ai pra alterar a quantidade*/}
                        </button>
                    </div>
                    <div className='kart-item'>
                        <button className='close-button'>X</button>
                        <Card name={kart[0].game.name} price={kart[0].game.price} img={kart[0].game.img} console={kart[0].game.console}/>
                        <p>Quantidade: {kart[0].quantidade}</p>
                        <button className='edit-button'>
                            <Link className='button' to="/alterar">Alterar</Link>  {/*Não é rota, só botar um bglh ai pra alterar a quantidade*/}
                        </button>
                    </div>
                    <div className='kart-item'>
                        <button className='close-button'>X</button>
                        <Card name={kart[0].game.name} price={kart[0].game.price} img={kart[0].game.img} console={kart[0].game.console}/>
                        <p>Quantidade: {kart[0].quantidade}</p>
                        <button className='edit-button'>
                            <Link className='button' to="/alterar">Alterar</Link>  {/*Não é rota, só botar um bglh ai pra alterar a quantidade*/}
                        </button>
                    </div>
                    <div className='kart-item'>
                        <button className='close-button'>X</button>
                        <Card name={kart[0].game.name} price={kart[0].game.price} img={kart[0].game.img} console={kart[0].game.console}/>
                        <p>Quantidade: {kart[0].quantidade}</p>
                        <button className='edit-button'>
                            <Link className='button' to="/alterar">Alterar</Link>  {/*Não é rota, só botar um bglh ai pra alterar a quantidade*/}
                        </button>
                    </div>
                    <div className='kart-item'>
                        <button className='close-button'>X</button>
                        <Card name={kart[0].game.name} price={kart[0].game.price} img={kart[0].game.img} console={kart[0].game.console}/>
                        <p>Quantidade: {kart[0].quantidade}</p>
                        <button className='edit-button'>
                            <Link className='button' to="/alterar">Alterar</Link>  {/*Não é rota, só botar um bglh ai pra alterar a quantidade*/}
                        </button>
                    </div>
                    <div className='kart-item'>
                        <button className='close-button'>X</button>
                        <Card name={kart[0].game.name} price={kart[0].game.price} img={kart[0].game.img} console={kart[0].game.console}/>
                        <p>Quantidade: {kart[0].quantidade}</p>
                        <button className='edit-button'>
                            <Link className='button' to="/alterar">Alterar</Link>  {/*Não é rota, só botar um bglh ai pra alterar a quantidade*/}
                        </button>
                    </div>
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
                        <Link className='button' to="/home">FINALIZAR COMPRA</Link>  {/*Não é rota, só botar um bglh ai pra alterar a quantidade*/}
                    </button>
                </div>
            </div>
        </div>
    );
}
 
export default Kart;