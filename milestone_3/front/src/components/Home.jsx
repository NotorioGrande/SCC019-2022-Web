import React from 'react';
// import { Link } from 'react-router-dom'; // dps eu vejo
import "./Home.css"
import Card from './Card';
import banner from './banner.png';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//objeto de game de exemplo

const Home = () => {
    const [homeGames, setHomeGames] = useState([{}]);
	useEffect(() => {
	    //pegar os 3 jogos

        const pegarTop3 = async () =>{
            try{
            let response = await axios.get("http://localhost:3001/api/productTop3");
            let games = response.data
            setHomeGames(games);
            console.log(games)
            }
            catch(e){
                setHomeGames([])
            }
    }
        pegarTop3();
	}, []); // so vai rodar quando carregar pela primeira vez
    
    return (
        <div id='home'>
            <img id='banner' src={banner} alt="Banner" />
            <div id='featured'>
                Destaques
                <div id='featured-cards'>
                    { (homeGames.length === 0) ? <p>Sem jogos no sistema.</p> :
                    homeGames.map((element,index) => {
                        return(
                            <div className='item' key={index} id={'item-' + index}>
                                <Link className='linkHome' to={"/product/" + element._id}>
                                    <Card name={element.nome} price={element.preco} img={element.img && require('./../../../uploads/' + element.img)} console={element.plataforma}/>
                                </Link>
                            </div>
                        )
                    })
                    
                    } 
                </div>
            </div>
        </div>
      );
}
 
export default Home;