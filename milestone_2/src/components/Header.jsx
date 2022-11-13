import React from 'react';
import { Link } from 'react-router-dom';
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
                <div className="parte-esquerda-wrapper">
                <Link className='link' to="/">Home</Link>
         {/* logica para mostrar botoes diferentes se estiver logado ou nao */}
                {(logged ? (
                <span>Logout</span>) :
                (<>
                <Link className='link' to='/login'>Login</Link>
                <Link className='link' to='/cadastro'>Cadastro</Link>
                </>))}
                </div>

                <div className='pesquisa parte-direita-wrapper'>
                <input id="pesquisar" type="text" />
                <span>Pesquisar</span>
                </div>
            </div>
        </nav>



      );
    

}
 
export default Header;