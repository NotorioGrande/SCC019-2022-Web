import React from 'react';
import "./Cadastro.css"
const Cadastro = () => {
    return ( 
        <>
        <div className="cadastro-form">
                <div className="nome">
                    <p>Nome</p>
                    <input type="text" name="nome" id="" className='campo'/>
                </div>
                <div className="username">
                    <p>Username</p>
                    <input type="text" name="username" id="" className='campo'/>
                </div>
                <div className="email">
                    <p>Email</p>
                    <input type="email" name="email" id="" className='campo'/>
                </div>
                <div className="telefone">
                    <p>Telefone</p>
                    <input type="text" name="telefone" id="" className='campo'/>
                </div>
                <div className="cep">
                    <p>Cep</p>
                    <input type="text" name="cep" id="" className='campo'/>
                </div>
                <div className="logradouro">
                    <p>Logradouro</p>
                    <input type="text" name="logradouro" id="" className='campo'/>
                </div>
                <div className="senha">
                    <p>Senha</p>
                    <input type="password" name="senha" id="" className='campo'/>
                </div>
                <div className="confirmar-senha">
                    <p>Confirmar Senha</p>
                    <input type="password" name="senha" id="" className='campo'/>
                </div>
                <button className='cadastro-button'>Cadastro</button>
        </div>

        </>
        
     );
}
 
export default Cadastro;