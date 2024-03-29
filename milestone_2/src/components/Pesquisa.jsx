import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import "./Pesquisa.css";
import smw from './smw.png';

let games = [{
    name: 'Super Mario World',
    price: '56,90',
    img: smw,
    console: 'SNES',
    stock: '100',
    sold: '10',
    id: '0'
},
{
    name: 'Super Mario World',
    price: '56,90',
    img: smw,
    console: 'SNES',
    stock: '100',
    sold: '10',
    id: '1'
},
{
    name: 'Super Mario World',
    price: '56,90',
    img: smw,
    console: 'SNES',
    stock: '100',
    sold: '10',
    id: '2'
},
{
    name: 'Super Mario World',
    price: '56,90',
    img: smw,
    console: 'SNES',
    stock: '100',
    sold: '10',
    id: '3'
},
{
    name: 'Super Mario World',
    price: '56,90',
    img: smw,
    console: 'SNES',
    stock: '100',
    sold: '10',
    id: '4'
},
{
    name: 'Super Mario World',
    price: '56,90',
    img: smw,
    console: 'SNES',
    stock: '100',
    sold: '10',
    id: '5'
},
{
    name: 'Super Mario World',
    price: '56,90',
    img: smw,
    console: 'SNES',
    stock: '100',
    sold: '10',
    id: '6'
},
{
    name: 'Super Mario World',
    price: '56,90',
    img: smw,
    console: 'SNES',
    stock: '100',
    sold: '10',
    id: '7'
},
{
    name: 'Super Mario World',
    price: '56,90',
    img: smw,
    console: 'SNES',
    stock: '100',
    sold: '10',
    id: '8'
}]

const Pesquisa = ({setInputPesquisa}) => {

    return (
        <div className="div-pesquisa">
            <div className="filtros">
                <p className='filtro-titulo'>Console</p>
                <div className="atari-filter">
                    <input type="checkbox" name="atari"/> 
                    <p>Atari</p>
                </div>
                <div className="nes-filter">
                    <input type="checkbox" name="nes"/> 
                    <p>NES</p>
                </div>
                <div className="snes-filter">
                    <input type="checkbox" name="snes"/> 
                    <p>SNES</p>
                </div>
                <div className="megadrive-filter">
                    <input type="checkbox" name="megadrive"/> 
                    <p>Megadrive</p>
                </div>
                <div className="genesis-filter">
                    <input type="checkbox" name="genesis"/> 
                    <p>Genesis</p>
                </div>
                <div className="ps1-filter">
                    <input type="checkbox" name="ps1"/> 
                    <p>PS1</p>
                </div>
                <div className="ps2-filter">
                    <input type="checkbox" name="ps2"/> 
                    <p>PS2</p>
                </div>
                <p className='filtro-titulo'>Gênero</p>
                <div className="action-filter">
                    <input type="checkbox" name="action"/> 
                    <p>Ação</p>
                </div>
                <div className="adventure-filter">
                    <input type="checkbox" name="adventure"/> 
                    <p>Aventura</p>
                </div>
                <div className="arcade-filter">
                    <input type="checkbox" name="arcade"/> 
                    <p>Arcade</p>
                </div>
                <div className="rpg-filter">
                    <input type="checkbox" name="rpg"/> 
                    <p>RPG</p>
                </div>
            </div>
            <div className='content'>
                {games.map((element,index) => {
                    return(
                        <div className='cart-item' key={index} id={'item-' + index}> {/* Dps eu mudo o nome da classe*/}
                            <Link className='button' to="/product">
                                <Card name={element.name} price={element.price} img={element.img} console={element.console}/>
                            </Link>
                            <p>Quantidade: {element.stock}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
 
export default Pesquisa;