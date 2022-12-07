import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom';
import "./AdminUsersEdit.css";
import userImg from './anonymous-user.png'; //coloca foto, tira esse coment dps
import Cookies from 'universal-cookie';

const AdminEdit = ({}) => {
    let { id } = useParams();

    const [user,setUser] = useState({})

    useEffect(() => {
        axios.get('http://localhost:3001/api/user/' + id)
        .then(response => {
            setUser(response.data)
        })
    }, [])

    const navigate = useNavigate();
    const cookies = new Cookies();
    
    // funcao que deleta o usuario
    const handleDeleteUser = () => {
        // if(cookies.get("logged_user") && cookies.get("logged_user").email === currentUser.email){
        //     window.alert("Não é possível se remover");
        //     return;
        // }

        fetch('http://localhost:3001/api/user/' + id, { method: 'DELETE' })
        .then(response => response.json())
        
        window.alert(user.nome + " deletado");
        navigate("/admin/users");
    }

    //funcao que mudas os privilégios
    const handlePrivilegeChange = () => {
        // if(cookies.get("logged_user") && cookies.get("logged_user").email === currentUser.email){
        //     window.alert("Não é possível alterar a própria permissão");
        //     return;
        // }

        user.adm = !user.adm //inverte as permissões de admnistrador

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        };

        fetch('http://localhost:3001/api/user/' + id, requestOptions)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log('Fail : ' + error.message));

        if(user.adm){
            window.alert(user.nome + ' se tornou admin')
        }
        else{
            window.alert(user.nome + ' não é mais admin')
        }

        window.location.reload(false);
    }

    return (
        <>
        {(user.error) ? (
            <div className='admin-edit-page'>
                <h1>Usuário não encontrado</h1>
            </div>
        ):(
            <div className='admin-edit-page'>
                <div className='informations'>
                    <div className='informations-top'>
                        <p>{user.nome},</p>
                        <p>noob</p>
                        <div className='user-img'>
                            <img src={user.img}/>
                        </div>
                        <p>Nível: {user.level}</p>
                    </div>
                    <div className='informations-down'>
                        <p>Email: {user.email}</p>
                        <p>Username: {user.username}</p>
                        <p>Nome: {user.nome}</p>
                        <p>Administrador: {user.adm ? "Sim" : "Não" }</p>
                    </div>
                </div>
                <div className='all-buttons'>
                    <button onClick={handleDeleteUser} className='edit-button' id='delete-button'>
                        Excluir
                    </button>
                    <button onClick={handlePrivilegeChange} className='edit-button'>
                        Tornar Administrador
                    </button>
                </div>
            </div>
        )}
        </>
    );
}
 
export default AdminEdit;