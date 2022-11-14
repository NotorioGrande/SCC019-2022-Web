import React from 'react';
import { Link } from 'react-router-dom';
import "./AdminEdit.css";
import user_img from './anonymous-user.png';

//objeto de usuario de exemplo
let user = {
    name: 'Fulano da Silva',
    username: 'fulano_gamer1234',
    title: 'O mago do retrô',
    email: 'fulanodasilva@gmail.com',
    adress: 'Alameda dos Fulanos, 1234',
    phone: '+55 16 9 1234-5678',
    card: 'Mastercard final 1234',
    level: '999',
    img: user_img,
    admin: false
}

const AdminEdit = ({/*user*/}) => { //recebe o objeto de um usuario
    return (
        <div className='admin-edit-page'>
            <div className='informations'>
                <div className='informations-top'>
                    <p>{user.name},</p>
                    <p>{user.title}</p>
                    <div className='user-img'>
                        <img src={user.img} alt="user" />
                    </div>
                    <p>Nível: {user.level}</p>
                </div>
                <div className='informations-down'>
                    <p>Email: {user.email}</p>
                    <p>Username: {user.username}</p>
                    <p>Nome: {user.adress}</p>
                </div>
            </div>
            <div className='all-buttons'>
                <button className='edit-button' id='delete-button'>
                    <Link className='button' to="/admin/users">Excluir</Link>
                </button>
                <button className='edit-button'>
                    <Link className='button' to="/admin/users">Tornar Administrador</Link>
                </button>
            </div>
        </div>
    );
}
 
export default AdminEdit;