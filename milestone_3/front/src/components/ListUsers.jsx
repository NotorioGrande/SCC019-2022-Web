import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'; // dps eu vejo
import "./ListUsers.css"
import NotFound from './NotFound';

const ListUsers = ({user}) => {

    const [data,setData] = useState([{}])

    useEffect(() => {
        axios.get('http://localhost:3001/api/user')
        .then(response => {
            setData(response.data)
        })
    }, [])

    if (data == null){
        return(
        <div className='list-users'>
            <h2>Sem usuários cadastrados</h2>
        </div>
        )
    }

    else{
        return (
            user === undefined ? (
                <NotFound/>
            ):(
                !user.adm ? (
                    <NotFound/>
                ):(
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
                        </div>
                        <div className='content'>
                            <p>Usuários</p>
                            {data.map((element,index) => {
                                return(
                                    <button className='edit-button' key={index} id={'user-' + index}>
                                        <Link className='button' to={'/admin/users/' + element._id}> {element.username} </Link>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                )
            )
        );
    }
}
 
export default ListUsers;