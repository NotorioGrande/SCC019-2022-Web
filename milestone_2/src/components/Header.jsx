import React from 'react';
import "./Header.css"
const Header = ({location, name, logged}) => {
    return (
        <nav>
            <div className='parte-vermelha'>
                <div className="parte-esquerda-wrapper">
                    <h1>Retro Archive Store &gt; </h1>
                    <span id="location">{location} </span>
                </div>
                <div className="parte-direita-wrapper">
                    <span id='name'>{name}</span>
                    <span>cog</span>
                    <span>cart</span>
                </div>

            </div>
            <div className='parte-cinza'> 
                <span>home</span>
                <div className="parte-esquerda-wrapper">
                {(logged ? <span>logout</span> : <span>login</span>)}
                </div>

                <div className='pesquisa'>
                <input id="pesquisar" type="text" />
                <span>Pesquisar</span>
                </div>
            </div>
        </nav>



      );
    

}
 
export default Header;