import React from 'react';
// import { Link } from 'react-router-dom'; // dps eu vejo
import "./Card.css"
const Card = ({name,price,img,console}) => {
    return (
        <div id='card'>
            <img id='card-img' src={img} alt="game" />
            <div id='card-price'>R$ {price}</div>
            <div id='card-console'>{console}</div>
            <div id='card-name'>{name}</div>
        </div>
      );
}
 
export default Card;