import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import "./PesquisaAdm.css";
import smw from './smw.png';
import {getProductsArray, removeProduct} from '../helpers/products.js'
import { useState } from 'react';

const PesquisaAdm = ({setInputPesquisa}) => {
    let products = getProductsArray();
    console.log(localStorage);

    const [recarregarPesquisaAdm, setRecarregarPesquisaAdm] = useState(true);

    if (products == null){
        return(
            <div className='page-search-adm'>
                <h2>Sem produtos cadastrados</h2>
            </div>
        )
    }

    else{
        return (
            <div className="page-search-adm">
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
                    {
                        products.map((element, index) => {
                            if (element){
                                return(
                                    <div className='result-item' key={index} id={'item-' + element.id}>
                                        <Link className='button-game' to="/product">
                                            <Card name={element.nome} price={element.preco} img={smw} console={element.plataforma}/>
                                        </Link>
                                        <p>Id: {element.id}</p>
                                        <p>Vendidos: {element.vendido}</p>
                                        <p>Estoque: {element.estoque}</p>
                                        <button className='edit-button'>
                                            <Link className='button' to={"/admin/products/edit/" + element.id}>Alterar</Link>
                                        </button>
                                        <button className='edit-button' id={element.id} onClick={()=> {removeProduct(element.id); setRecarregarPesquisaAdm(!recarregarPesquisaAdm);}}>
                                            <Link className='button' to="/admin/products/search">Apagar</Link>
                                        </button>
                                    </div>
                                )
                            }   
                        })
                    }
                </div>
            </div>
        );
    }
}

export default PesquisaAdm;