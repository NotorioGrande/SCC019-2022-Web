import React from 'react';
import "./Cadastro.css"
import { useNavigate } from 'react-router-dom';

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

        let newUser = {
            nome : campoNome,
            email : campoEmail,
            username : campoUsername,
            senha : campoSenha,
            endereco : campoEndereco,
            telefone : campoTelefone,
            adm : false
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(newUser)
        };

        fetch('http://localhost:3001/api/user', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log('Fail : ' + error.message));

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