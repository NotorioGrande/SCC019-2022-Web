import React from 'react';
import "./Cadastro.css"
import { useNavigate } from 'react-router-dom';
import {delay} from '../helpers/system.js';

const Cadastro = () => {
    const navigate = useNavigate();

    const handleCadastro = async (e) => {
        e.preventDefault();
        //primeiro checar se as senhas coincidem
        let campoSenha = document.getElementById("campo-senha").value;
        let campoConfirmarSenha = document.getElementById("campo-confirmar-senha").value;
        if(campoConfirmarSenha !== campoSenha){
            window.alert("Senhas não coincidem")
            return;
        }
       
        //pegando os valores
        let campoEmail = document.getElementById("campo-email").value;
        let campoUsername = document.getElementById("campo-username").value;
        let campoNome = document.getElementById("campo-nome").value;
        let campoEndereco = document.getElementById("campo-logradouro").value;
        let campoTelefone = document.getElementById("campo-telefone").value;
        //nova usuario a ser colocado no localStorage
        let newUser = {
            email : campoEmail,
            nome : campoNome,
            username : campoUsername,
            senha : campoSenha,
            endereco : campoEndereco,
            telefone : campoTelefone,
            adm : false
        };
        await delay();
        let userList = localStorage.getItem("userList");
        if(userList){
            //se salva o email para facilitar a retribuicao dos dados depois
            localStorage.setItem("userList", userList + " " + newUser.email);
        }
        else{
            localStorage.setItem("userList", newUser.email)
        }
        //salva no storage o usuario
        localStorage.setItem(newUser.email, JSON.stringify(newUser));
        navigate("/login");
        return;
    }

    return ( 
        <>
        <div className="cadastro-div">
            <form className='cadastro-form' action="" onSubmit={handleCadastro}>
                <div className="nome">
                    <p>Nome</p>
                    <input required type="text" name="nome" id="campo-nome" className='campo'/>
                </div>
                <div className="username">
                    <p>Username</p>
                    <input required type="text" name="username" id="campo-username" className='campo'/>
                </div>
                <div className="email">
                    <p>Email</p>
                    <input required type="email" name="email" id="campo-email" className='campo'/>
                </div>
                <div className="telefone">
                    <p>Telefone</p>
                    <input required type="text" name="telefone" id="campo-telefone" className='campo'/>
                </div>
                <div className="cep">
                    <p>Cep</p>
                    <input required type="text" name="cep" id="campo-cep" className='campo'/>
                </div>
                <div className="logradouro">
                    <p>Logradouro</p>
                    <input  required type="text" name="logradouro" id="campo-logradouro" className='campo'/>
                </div>
                <div className="senha">
                    <p>Senha</p>
                    <input required type="password" name="senha" id="campo-senha" className='campo'/>
                </div>
                <div className="confirmar-senha">
                    <p>Confirmar Senha</p>
                    <input required type="password" name="senha" id="campo-confirmar-senha" className='campo'/>
                </div>
                <input type="submit"  className='cadastro-button' value="Cadastro"/>
                </form>
        </div>

        </>
        
     );
}
 
export default Cadastro;