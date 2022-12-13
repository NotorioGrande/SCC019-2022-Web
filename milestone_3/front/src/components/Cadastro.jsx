import React from 'react';
import "./Cadastro.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { telefone_validation } from '../helpers/system';

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
        let campoEndereco = document.getElementById("campo-endereco").value;
        let campoTelefone = document.getElementById("campo-telefone").value;

        if (!telefone_validation(campoTelefone)){
            window.alert("Telefone inválido");
            return;
        }

        let newUser = {
            nome : campoNome,
            email : campoEmail,
            username : campoUsername,
            senha : campoSenha,
            endereco : campoEndereco,
            telefone : campoTelefone,
            adm : false
        };

        if(campoEmail === 'admin@admin.com' && campoSenha === 'admin'){
            newUser.adm = true
        }

        await axios.post('http://localhost:3001/api/user', newUser)
        .catch(error => console.log('Erro na requisição : ' + error.message));

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
                <div className="endereco">
                    <p>Endereço</p>
                    <input  required type="text" name="endereco" id="campo-endereco" className='campo'/>
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