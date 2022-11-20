import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Edit.css";
import user_img from './anonymous-user.png';
import {delay} from '../helpers/system';
import Cookies from 'universal-cookie';

//objeto de usuario de exemplo

const Edit = ({user, setUser}) => { //recebe o objeto de um usuario
    const navigate = useNavigate();
    const handleEdit = async (e) => {
        let cookies = new Cookies();
        e.preventDefault();
        //primeiro checar se as senhas coincidem
        let campoConfirmarSenha = document.getElementById("confirm-password").value;
        if(campoConfirmarSenha !== user.senha){
            window.alert("Senha errada")
            return;
        }
       
        //pegando os valores
        let campoEmail = document.getElementById("edit-email").value;
        let campoUsername = document.getElementById("edit-username").value;
        let campoTelefone = document.getElementById("edit-telefone").value;
        let campoNovaSenha1 = document.getElementById("newpassword1").value;
        let campoNovaSenha2 = document.getElementById("newpassword2").value;
        if(campoNovaSenha1 !== campoNovaSenha2){
            window.alert("Nova senha difere")
            return;

        }

        //atualiza o que nao estiver vazio
        let newUser = {
            ...user
        };
        if(campoEmail !== ""){
            newUser.email = campoEmail;
        };
        if(campoUsername !== ""){
            newUser.username = campoUsername;
        };
        if(campoTelefone !== ""){
            newUser.telefone = campoTelefone;

        };
        if(campoNovaSenha1 !== ""){
            newUser.senha = campoNovaSenha1;
        };
        await delay();
        let userList = localStorage.getItem("userList").split(" ");
        //se o email for diferente
        if(newUser.email != user.email){
            for(let i = 0; i < userList.length; i++){
                if(userList[i] === user.email){
                    userList[i] = newUser.email;
                }
            }
            localStorage.setItem("userList", userList);
        }
        //salva no storage o usuario
        localStorage.setItem(newUser.email, JSON.stringify(newUser));
        setUser(undefined);
        cookies.remove("logged_user")
        navigate("/login")
        
        return;



        }


    return (
        <div className='edit-page'>
            <div className='informations'>
                <div className='informations-left'>
                    <div className='row'>
                        <div className='edit-campo'>
                            <p>Email</p>
                            <input type="email" name="email" id="edit-email" className='campo'/>
                        </div>
                        <div className='edit-campo'>
                            <p>Username</p>
                            <input type="text" name="username" id="edit-username" className='campo'/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='edit-campo'>
                            <p>Telefone</p>
                            <input type="tel" name="telefone" id="edit-telefone" className='campo'/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='edit-campo'>
                            <p>Nova senha </p>
                            <input type="password" name="nova-senha" id="newpassword1" className='campo'/>
                        </div>
                        <div className='edit-campo'>
                            <p>Digite novamente a nova senha </p>
                            <input type="password" name="nova-senha" id="newpassword2" className='campo'/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='edit-campo'>
                            <div className='required-field'>
                                <p className='asterisk'>*</p>
                                <p>Senha atual </p>
                            </div>
                            <input type="password" name="senha" id="confirm-password" className='campo'/>
                        </div>
                    </div>
                </div>
                <div className='informations-right'>
                    <p>{user.nome},</p>
                    <p>noob</p>
                    <div className='user-img'>
                        <img src={user_img} alt="" />
                    </div>
                    <p>Nível: 1</p>
                </div>
            </div>
            <div className='all-buttons'>
                <button className='edit-button'>
                    <Link className='button' to="/cartao">Alterar cartão</Link>
                </button>
                <button className='edit-button'>
                    <Link className='button' to="/upload">Upload de imagem</Link>
                </button>
                <button onClick={handleEdit} className='edit-button'>
                    Salvar
                </button>
            </div>
        </div>
    );
}
 
export default Edit;