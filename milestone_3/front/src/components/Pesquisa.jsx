import React , {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import axios from 'axios'
import "./Pesquisa.css";

const Pesquisa = ({setInputPesquisa, inputPesquisa}) => {

    const [games,setGames] = useState([{}])

    useEffect(() => {
        
        axios.get(`http://localhost:3001/api/product/?nome=${inputPesquisa.trim()}`)
        .then(response => {
            setGames(response.data)
        })
        .catch((err) => {
            setGames([])
        })
    }, [inputPesquisa])

    return (
        <div className="div-pesquisa">
            <div className="filtros">
                <p className='filtro-titulo'>Console</p>
                <div className="atari-filter">
                    <input type="radio" name="plataforma"/> 
                    <p>Atari</p>
                </div>
                <div className="nes-filter">
                    <input type="radio" name="plataforma"/> 
                    <p>NES</p>
                </div>
                <div className="snes-filter">
                    <input type="radio" name="plataforma"/> 
                    <p>SNES</p>
                </div>
                <div className="megadrive-filter">
                    <input type="radio" name="plataforma"/> 
                    <p>Mega Drive</p>
                </div>
                <div className="genesis-filter">
                    <input type="radio" name="plataforma"/> 
                    <p>Genesis</p>
                </div>
                <div className="ps1-filter">
                    <input type="radio" name="plataforma"/> 
                    <p>PS1</p>
                </div>
                <div className="ps2-filter">
                    <input type="radio" name="plataforma"/> 
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
                {games.length === 0 ? (
                    <h2>Nenhum jogo foi encontrado</h2>
                ):(
                    games.map((element,index) => {
                        return(
                            <div className='item' key={index} id={'item-' + index}>
                                <Link className='button' to={"/product/" + element._id}>
                                    <Card name={element.nome} price={element.preco} img={element.img && require('./../../../uploads/' + element.img)} console={element.plataforma}/>
                                </Link>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    );
}
 
export default Pesquisa;