import React from 'react';
import { Link } from 'react-router-dom';
import "./User.css";
import userImg from './anonymous-user.png';
import NotFound from './NotFound'

const User = ({user}) => {
    //titulo e nivek depende de xp, é pro titulo avançar de 5 em 5 níveis
    const titulos = ["Noob", "Aventureiro Iniciante", "Clérigo Intermediário", "Paladino Avançado", "Mago do Retro", "Arquimago do Retrô"];
    let nivel = Math.floor(user.xp/10 + 1);
    const titulo = nivel < 25? titulos[Math.floor(nivel/5)] : titulos[titulos.length - 1];
    return (
        user === undefined ? (
            <NotFound/>
        ):(
            <div className='user-page'>
                <div className='informations'>
                    <div className='informations-left'>
                        <p>Email: {user.email}</p>
                        <p>Username: {user.username}</p>
                        <p>Endereço: {user.endereco}</p>
                        <p>Telefone: {user.telefone}</p>
                        <p>Cartão: placeholder</p>
                    </div>
                    <div className='informations-right'>
                        <p>{user.nome},</p>
                        <p>{titulo}</p>
                        <div className='user-img'>
                            <img src={userImg} alt="" />
                        </div>
                        <p>Nível: {nivel}</p>
                    </div>
                </div>
                <button className='edit-button'>
                    <Link className='editar' to="/editar">Editar</Link>
                </button>
            </div>
        )
    );
}
 
export default User;