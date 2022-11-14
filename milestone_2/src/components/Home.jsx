import React from 'react';
// import { Link } from 'react-router-dom'; // dps eu vejo
import "./Home.css"
import Card from './Card';
import banner from './banner.png';
import smw from './smw.png';

let game_name = 'Super Mario World';
let game_price = '56,90';
let game_img = smw;
let game_console = 'SNES';

const Home = ({location, name, logged}) => {
    return (
        <div id='home'>
            <img id='banner' src={banner} alt="Banner" />
            <div id='featured'>
                Destaques
                <div id='featured-cards'>
                    <Card name={game_name} price={game_price} img={game_img} console={game_console}/>
                    <Card name={game_name} price={game_price} img={game_img} console={game_console}/>
                    <Card name={game_name} price={game_price} img={game_img} console={game_console}/>
                </div>
            </div>
        </div>
      );
}
 
export default Home;