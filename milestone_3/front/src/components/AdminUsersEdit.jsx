import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import "./AdminUsersEdit.css";
import { getUsersArray } from '../helpers/users';
import userImg from './anonymous-user.png';
import Cookies from 'universal-cookie';

//objeto de users de exemplo

const AdminEdit = ({}) => { //Aqui tem que fazer uma query no banco de dados pelo id do usuário e pegar os dados, no array acima estão eles.
    let { id } = useParams();
    let users = getUsersArray();
    const navigate = useNavigate();
    const cookies = new Cookies();
    //usuario sendo editado
    const [currentUser, setCurrentUser] = useState(users[id]);
    
    // funcao que deleta o usuario
    const handleDeleteUser = () => {
        let userEmailList = localStorage.getItem("userList").split(" ");
        if(cookies.get("logged_user") && cookies.get("logged_user").email === currentUser.email){
            window.alert("Não é possível se remover");
            return;

        }
        localStorage.removeItem(currentUser.email);
        //remove o elemento da posicao id
        userEmailList.splice(id, 1);
        userEmailList = userEmailList.join(" ");
        localStorage.setItem("userList", userEmailList);
        navigate("/admin/users");
    }
    //funcao que mudas os privilégios
    const handlePrivilegeChange = () => {
        if(cookies.get("logged_user") && cookies.get("logged_user").email === currentUser.email){
            window.alert("Não é possível alterar a própria permissão");
            return;
        }
        //so muda a permissao de adm
        let updatedUser = {
            ...currentUser,
            adm : !currentUser.adm
        };
        localStorage.setItem(updatedUser.email, JSON.stringify(updatedUser));
        setCurrentUser(updatedUser);
        return;


    }


    return (

        <div className='admin-edit-page'>
            <div className='informations'>
                <div className='informations-top'>
                    <p>{currentUser.nome},</p>
                    <p>noob</p>
                    <div className='user-img'>
                        <img src={currentUser.img}/>
                    </div>
                    <p>Nível: {currentUser.level}</p>
                </div>
                <div className='informations-down'>
                    <p>Email: {currentUser.email}</p>
                    <p>Username: {currentUser.username}</p>
                    <p>Nome: {currentUser.nome}</p>
                    <p>Administrador: {currentUser.adm ? "Sim" : "Não" }</p>
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
    );
}
 
export default AdminEdit;