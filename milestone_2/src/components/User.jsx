import React from 'react';
import { Link } from 'react-router-dom';
import "./User.css";
import userImg from './anonymous-user.png';
//objeto de usuario de exemplo
/*let user = {
    name: 'Fulano da Silva',
    username: 'fulano_gamer1234',
    title: 'O mago do retrô',
    email: 'fulanodasilva@gmail.com',
    address: 'Alameda dos Fulanos, 1234',
    phone: '+55 16 9 1234-5678',
    card: 'Mastercard final 1234',
    level: '999',
    img: user_img
}*/

const User = ({user}) => { //recebe o objeto de um usuario

    
    return (
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
      );
}
 
export default User;