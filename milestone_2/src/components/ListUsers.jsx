import React from 'react';
import { Link } from 'react-router-dom'; // dps eu vejo
import "./ListUsers.css"
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
    name: 'Fulano da Silva',
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
    name: 'Fulano da Silva',
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
    name: 'Fulano da Silva',
    username: 'vetor_r4_plays',
    title: 'O mago do retrô',
    email: 'fulanodasilva@gmail.com',
    address: 'Alameda dos Fulanos, 1234',
    phone: '+55 16 9 1234-5678',
    card: 'Mastercard final 1234',
    level: '999',
    img: userImg
}]

const ListUsers = ({/*users*/}) => { // recebe um array de objetos dos usuarios
                                     // na vdd agora é pra dar um query no banco de dados e retornar o array com os objetos dos usuários
    return (
        <div className='list-users'>
            <div className='filter-list'>
                <p className='filtro-titulo'>Filtros</p>
                <div className="row">
                    <input type="checkbox" name="username" className='checkbox'/>
                    <p>Username</p>
                </div>
                <div className='edit-campo'>
                    <input type="text" name="username" id="filter-username" className='campo'/>
                </div>
                <div className="row">
                    <input type="checkbox" name="name" className='checkbox'/>
                    <p>Nome</p>
                </div>
                <div className='edit-campo'>
                    <input type="text" name="name" id="filter-name" className='campo'/>
                </div>
                <div className="row">
                    <input type="checkbox" name="email" className='checkbox'/>
                    <p>Email</p>
                </div>
                <div className='edit-campo'>
                    <input type="text" name="username" id="filter-email" className='campo'/>
                </div>
                <div className="row">
                    <input type="checkbox" name="cep" className='checkbox'/>
                    <p>CEP</p>
                </div>
                <div className='edit-campo'>
                    <input type="text" name="cep" id="filter-cep" className='campo'/>
                </div>
            </div>
            <div className='content'>
                <p>Usuários</p>
                {users.map((element,index) => {
                    return(
                        <button className='edit-button' key={index} id={'user-' + index}>
                            <Link className='button' to={'/admin/users/' + index} state={{element}}> {element.username} </Link> {/*N sei passar o usuario como parametro por aqui*/}
                        </button>
                    )
                })}
            </div>
        </div>
      );
}
 
export default ListUsers;