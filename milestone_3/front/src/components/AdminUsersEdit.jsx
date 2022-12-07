import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom';
import "./AdminUsersEdit.css";
import userImg from './anonymous-user.png'; //coloca foto, tira esse coment dps
import Cookies from 'universal-cookie';
import NotFound from './NotFound';

const AdminEdit = ({user}) => {
    let { id } = useParams();

    const [data,setData] = useState({})

    useEffect(() => {
        axios.get('http://localhost:3001/api/user/' + id)
        .then(response => {
            setData(response.data)
        })
    }, [])

    const navigate = useNavigate();
    const cookies = new Cookies();
    
    // funcao que deleta o usuario
    const handleDeleteUser = async () => {
        if(user.email === data.email){
            window.alert("Não é possível se remover");
            return;
        }

        await fetch('http://localhost:3001/api/user/' + id, { method: 'DELETE' })
        .then(response => response.json())
        
        window.alert(data.nome + " deletado");
        navigate("/admin/users");
    }

    //funcao que mudas os privilégios
    const handlePrivilegeChange = async () => {
        if(user.email === data.email){
            window.alert("Não é possível alterar a própria permissão");
            return;
        }

        data.adm = !data.adm //inverte as permissões de admnistrador

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        };

        await fetch('http://localhost:3001/api/user/' + id, requestOptions)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log('Fail : ' + error.message));

        if(data.adm){
            window.alert(data.nome + ' se tornou admin')
        }
        else{
            window.alert(data.nome + ' não é mais admin')
        }

        window.location.reload(false);
    }

    return (
        user === undefined ? (
            <NotFound/>
        ):(
            !user.adm ? (
                <NotFound/>
            ):(
                (data.error) ? (
                    <div className='admin-edit-page'>
                        <h1>Usuário não encontrado</h1>
                    </div>
                ):(
                    <div className='admin-edit-page'>
                        <div className='informations'>
                            <div className='informations-top'>
                                <p>{data.nome},</p>
                                <p>noob</p>
                                <div className='user-img'>
                                    <img src={userImg}/>
                                </div>
                                <p>Nível: {data.level}</p>
                            </div>
                            <div className='informations-down'>
                                <p>Email: {data.email}</p>
                                <p>Username: {data.username}</p>
                                <p>Nome: {data.nome}</p>
                                <p>Administrador: {data.adm ? "Sim" : "Não" }</p>
                            </div>
                        </div>
                        <div className='all-buttons'>
                            <button onClick={handleDeleteUser} className='edit-button' id='delete-button'>
                                Excluir
                            </button>
                                {!data.adm ? (
                                    <button onClick={handlePrivilegeChange} className='edit-button'>
                                        Tornar Administrador
                                    </button>
                                ):(
                                    <button onClick={handlePrivilegeChange} className='edit-button'>
                                        Tirar Administrador
                                    </button>
                                )}
                        </div>
                    </div>
                )
            )
        )
    );
}
 
export default AdminEdit;