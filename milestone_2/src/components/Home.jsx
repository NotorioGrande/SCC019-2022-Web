import React from 'react';
// import { Link } from 'react-router-dom'; // dps eu vejo
import "./Home.css"
import Card from './Card';
import banner from './banner.png';
import smw from './smw.png';

//objeto de game de exemplo
let game = {
    name: 'Super Mario World',
    price: '56,90',
    img: smw,
    console: 'SNES'
}

const Home = ({games}) => { // recebe um array de objetos dos principais games
    return (
        <div id='home'>
            <img id='banner' src={banner} alt="Banner" />
            <div id='featured'>
                Destaques
                <div id='featured-cards'>
                    <Card name={game.name} price={game.price} img={game.img} console={game.console}/>
                    <Card name={game.name} price={game.price} img={game.img} console={game.console}/>
                    <Card name={game.name} price={game.price} img={game.img} console={game.console}/>
                </div>
            </div>
        </div>
      );
}
 
export default Home;