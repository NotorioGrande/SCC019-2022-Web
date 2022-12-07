import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Edit.css";
import user_img from './anonymous-user.png';
import axios from 'axios'
import Cookies from 'universal-cookie';
import NotFound from './NotFound'

const Edit = ({user}) => {

    const navigate = useNavigate();
    const handleEdit = async (e) => {

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
            
            let isValidEmail = false

            await axios.get('http://localhost:3001/api/user/email/' + campoEmail)
            .then(() => {
                window.alert("Este email já está sendo usado")
            })
            .catch(() => {
                isValidEmail = true
                newUser.email = campoEmail;
            })
            
            if(!isValidEmail) return;
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

        let cookies = new Cookies();
		let userCookie = cookies.get("logged_user");

        await axios.put('http://localhost:3001/api/user/' + userCookie, newUser)
        .catch((err) => {
            console.log('Erro na requisição: ' + err)
            alert('Algo de errado aconteceu')
        })

        navigate("/usuario")
        window.location.reload(false); //acho q isso aqui n é bom se é s.p.a.
        
        return;
    }

    return (
        user === undefined ? (
            <NotFound/>
        ):(
            <div className='edit-page'>
                <div className='informations'>
                    <div className='informations-left'>
                        <div className='row'>
                            <div className='edit-campo'>
                                <p>Email</p>
                                <input required type="email" name="email" id="edit-email" className='campo' placeholder={user.email}/>
                            </div>
                            <div className='edit-campo'>
                                <p>Username</p>
                                <input type="text" name="username" id="edit-username" className='campo' placeholder={user.username}/>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='edit-campo'>
                                <p>Telefone</p>
                                <input type="tel" name="telefone" id="edit-telefone" className='campo' placeholder={user.telefone}/>
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
                                    <p>Senha atual</p>
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
                    <button onClick={handleEdit} className='edit-button' id='save-button'>
                        Salvar
                    </button>
                </div>
            </div>
        )
    );
}
 
export default Edit;