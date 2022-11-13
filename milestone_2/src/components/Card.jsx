import React from 'react';
// import { Link } from 'react-router-dom'; // dps eu vejo
import "./Card.css"
const Card = ({name,price,img,console}) => {
    return (
        <div id='card'>
            <img src={img} alt="game" />
            <div id='price'>R$ {price}</div>
            <div id='console'>{console}</div>
            <div id='name'>{name}</div>
        </div>
      );
}
 
export default Card;