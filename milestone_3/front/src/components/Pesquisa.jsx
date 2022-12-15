import React , {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import axios from 'axios'
import "./Pesquisa.css";

const Pesquisa = ({inputPesquisa, pesquisaBool}) => {

    const [games,setGames] = useState([{}]);

    useEffect(() => {
        let tags="";
        //pegas as tags   
        const inputsTags = document.querySelectorAll(".filtros .tag-input");
        for(let input of inputsTags){
            if(input.checked) tags += `${input.value} `;
        }
        console.log(tags)
        axios.get(`http://localhost:3001/api/product/?nome=${inputPesquisa.trim()}&tags=${tags.trim()}`)
        .then(response => {
            setGames(response.data)
        })
        .catch((err) => {
            setGames([])
        })
    }, [inputPesquisa, pesquisaBool])
    //funcao para desclicar  o input raddio
    const handlePlataformInputClick = (e) =>{
        const inputsplataformas = document.querySelectorAll(".filtros .plataforma");
        console.log(inputsplataformas);
        for(let input of inputsplataformas){
            if(input != e.target) input.checked= false;
        }

    }


    return (
        <div className="div-pesquisa">
            <div className="filtros">
                <p className='filtro-titulo'>Console</p>
                <div className="atari-filter">
                    <input type="checkbox" className="plataforma" id="atari-check" onChange={handlePlataformInputClick}/> 
                    <label  for="atari-check">Atari</label>
                </div>
                <div className="nes-filter">
                    <input type="checkbox" className="plataforma" id="nes-check" onChange={handlePlataformInputClick}/> 
                    <label for="nes-check">NES</label>
                </div>
                <div className="snes-filter">
                    <input type="checkbox" className="plataforma" id="snes-check" onChange={handlePlataformInputClick}/> 
                    <label for="snes-check">SNES</label>
                </div>
                <div className="megadrive-filter">
                    <input type="checkbox" className="plataforma" id="megadrive-check" onChange={handlePlataformInputClick}/> 
                    <label for="megadrive-check">Mega Drive</label>
                </div>
                <div className="genesis-filter">
                    <input type="checkbox" className="plataforma" id="genesis-check" onChange={handlePlataformInputClick}/> 
                    <label for="genesis-check">Genesis</label>
                </div>
                <div className="ps1-filter">
                    <input type="checkbox" className="plataforma" id="ps1-check" onChange={handlePlataformInputClick}/> 
                    <label for="ps1-check">PS1</label>
                </div>
                <div className="ps2-filter">
                    <input type="checkbox" className="plataforma" id="ps2-check" onChange={handlePlataformInputClick}/> 
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