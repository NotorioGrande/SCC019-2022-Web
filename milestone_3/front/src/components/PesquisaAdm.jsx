import React, { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import "./PesquisaAdm.css";
import axios from 'axios'
import NotFound from './NotFound';

const PesquisaAdm = ({user, inputPesquisa, pesquisaBool}) => {

    const [games,setGames] = useState([{}])

    const fazerPesquisa = () => {
        //essa funcao é chamada quando se clica na pesquisa
        let tags="";
        //pegas as tags   
        const inputsTags = document.querySelectorAll(".filtros .tag-input");
        for(let input of inputsTags){
            if(input.checked) tags += `${input.value} `;
        }
        const inputPlataformas = document.querySelectorAll(".filtros .plataforma");
        let plataforma= "";
        for(let input of inputPlataformas){
            if (input.checked){
                plataforma = input.value;
                break;
            }
        }
        axios.get(`http://localhost:3001/api/product?nome=${inputPesquisa.trim()}&tags=${tags.trim()}&plataforma=${plataforma}`)
        .then(response => {
            setGames(response.data)
        })
        .catch((err) => {
            setGames([])
        })

        
    }
    const handlePlataformInputClick = (e) =>{
        const inputsplataformas = document.querySelectorAll(".filtros .plataforma");
        console.log(inputsplataformas);
        for(let input of inputsplataformas){
            if(input != e.target) input.checked= false;
        }

    }

    useEffect(() => {
        fazerPesquisa();
    }, [inputPesquisa, pesquisaBool])

    const deleteGame = async (e) => {
        e.preventDefault()

        let id = e.target.parentNode.id

        await axios.delete('http://localhost:3001/api/product/' + id)
        .then(() => {
            alert('O produto foi deletado')

            return;
        })
        .catch(err => {
            console.log(err)
            alert('Erro ao deletar o produto')

            return;
        })
    }

    return(
        user === undefined ? (
            <NotFound/>
        ):(
            !user.adm ? (
                <NotFound/>
            ):(
                <div className="page-search-adm">
                    <div className="filtros">
                        <p className='filtro-titulo'>Console</p>
                        <div className="atari-filter">
                            <input value="Atari" type="checkbox" className="plataforma" id="atari-check" onChange={handlePlataformInputClick}/> 
                            <label  for="atari-check">Atari</label>
                        </div>
                        <div className="nes-filter">
                            <input value="NES" type="checkbox" className="plataforma" id="nes-check" onChange={handlePlataformInputClick}/> 
                            <label for="nes-check">NES</label>
                        </div>
                        <div className="snes-filter">
                            <input value="SNES" type="checkbox" className="plataforma" id="snes-check" onChange={handlePlataformInputClick}/> 
                            <label for="snes-check">SNES</label>
                        </div>
                        <div className="megadrive-filter">
                            <input value="Mega Drive" type="checkbox" className="plataforma" id="megadrive-check" onChange={handlePlataformInputClick}/> 
                            <label for="megadrive-check">Mega Drive</label>
                        </div>
                        <div className="genesis-filter">
                            <input value="Genesis" type="checkbox" className="plataforma" id="genesis-check" onChange={handlePlataformInputClick}/> 
                            <label for="genesis-check">Genesis</label>
                        </div>
                        <div className="ps1-filter">
                            <input value="PS1" type="checkbox" className="plataforma" id="ps1-check" onChange={handlePlataformInputClick}/> 
                            <label for="ps1-check">PS1</label>
                        </div>
                        <div className="ps2-filter">
                            <input value="PS2" type="checkbox" className="plataforma" id="ps2-check" onChange={handlePlataformInputClick}/> 
                            <label for="ps2-check">PS2</label>
                        </div>
                        <p className='filtro-titulo'>Gênero</p>
                        <div className="action-filter">
                            <input className='tag-input' type="checkbox" name="action" value="Ação" id="action-check"/> 
                            <label for="action-check">Ação</label>
                        </div>
                        <div className="adventure-filter">
                            <input className='tag-input' type="checkbox" name="adventure" value="Aventura" id="adventure-check"/> 
                            <label for="adventure-check">Aventura</label>
                        </div>
                        <div className="arcade-filter">
                            <input className='tag-input' type="checkbox" name="arcade" value="Arcade" id="arcade-check"/> 
                            <label for="arcade-check">Arcade</label>
                        </div>
                        <div className="rpg-filter">
                            <input className='tag-input' type="checkbox" name="rpg" value="RPG" id="rpg-check"/> 
                            <label for="rpg-check">RPG</label>
                        </div>
            </div>
                    {games.length === 0 ? (
                        <div className='content'>
                            <h2>Nenhum jogo foi encontrado</h2>
                        </div>
                    ):(
                        <div className='content'>
                            {games.map((element, index) => {
                                return(
                                    <div className='item' key={index} id={element._id}>
                                        <Link className='button-game' to={"/product/" + element._id}>
                                            <Card name={element.nome} price={element.preco} img={element.img && require('./../../../uploads/' + element.img)} console={element.plataforma}/>
                                        </Link>
                                        <p>Vendidos: {element.vendido}</p>
                                        <p>Estoque: {element.estoque}</p>
                                        <button className='edit-button'>
                                            <Link className='button' to={"/admin/products/edit/" + element._id}>Alterar</Link>
                                        </button>
                                        <button className='edit-button' onClick={deleteGame}>
                                            Apagar
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            )
        )
    )
}

export default PesquisaAdm;