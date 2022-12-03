import React from 'react';
import { Link } from 'react-router-dom'; // dps eu vejo
import "./ListUsers.css"
import userImg from './anonymous-user.png';
import {getUsersArray} from '../helpers/users.js'

const ListUsers = () => { // recebe um array de objetos dos usuarios
    // na vdd agora é pra dar um query no banco de dados e retornar o array com os objetos dos usuários
    let users = getUsersArray();

    if (users == null){
        return(
        <div className='list-users'>
            <h2>Sem usuários cadastrados</h2>

        </div>
        )
    }

    else{
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
}
 
export default ListUsers;