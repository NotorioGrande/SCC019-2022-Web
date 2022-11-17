import React from 'react';
import { Link, useParams } from 'react-router-dom';
import "./AdminEdit.css";
import userImg from './anonymous-user.png';

//objeto de users de exemplo
let users = [{
    name: 'Fulano da Silva',
    username: 'fulano_gamer1234',
    title: 'O mago do retrô',
    email: 'fulanodasilva@gmail.com',
    address: 'Alameda dos Fulanos, 1234',
    phone: '+55 16 9 1234-5678',
    card: 'Mastercard final 1234',
    level: '999',
    img: userImg
},
{
    name: 'Rafinha',
    username: 'rafinha_headshotRJ',
    title: 'O mago do retrô',
    email: 'fulanodasilva@gmail.com',
    address: 'Alameda dos Fulanos, 1234',
    phone: '+55 16 9 1234-5678',
    card: 'Mastercard final 1234',
    level: '999',
    img: userImg
},
{
    name: 'Grande',
    username: 'grande_gameplay',
    title: 'O mago do retrô',
    email: 'fulanodasilva@gmail.com',
    address: 'Alameda dos Fulanos, 1234',
    phone: '+55 16 9 1234-5678',
    card: 'Mastercard final 1234',
    level: '999',
    img: userImg
},
{
    name: 'Vetor',
    username: 'vetor_r4_plays',
    title: 'O mago do retrô',
    email: 'fulanodasilva@gmail.com',
    address: 'Alameda dos Fulanos, 1234',
    phone: '+55 16 9 1234-5678',
    card: 'Mastercard final 1234',
    level: '999',
    img: userImg
}]

const AdminEdit = ({}) => { //Aqui tem que fazer uma query no banco de dados pelo id do usuário e pegar os dados, no array acima estão eles.
    let { id } = useParams();

    return (

        <div className='admin-edit-page'>
            <div className='informations'>
                <div className='informations-top'>
                    <p>{users[id].name},</p>
                    <p>{users[id].title}</p>
                    <div className='user-img'>
                        <img src={users[id].img}/>
                    </div>
                    <p>Nível: {users[id].level}</p>
                </div>
                <div className='informations-down'>
                    <p>Email: {users[id].email}</p>
                    <p>Username: {users[id].username}</p>
                    <p>Nome: {users[id].name}</p>
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