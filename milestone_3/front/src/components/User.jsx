import React from 'react';
import { Link } from 'react-router-dom';
import "./User.css";
import userImg from './anonymous-user.png';
import NotFound from './NotFound'

const User = ({user}) => {
    
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
                        <p>Noob</p>
                        <div className='user-img'>
                            <img src={userImg} alt="" />
                        </div>
                        <p>Nível: 1</p>
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