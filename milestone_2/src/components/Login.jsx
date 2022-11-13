import React from 'react';
import { Link } from 'react-router-dom';
import "./Login.css"
const Login = () => {
    return (
        <>
        <div className="login-form">
                <div className="email">
                    <p>Email</p>
                    <input type="email" name="email" id="" className='campo'/>
                </div>
                <div className="senha">
                    <p>Senha</p>
                    <input type="password" name="senha" id="" className='campo'/>
                </div>
                <button className='login-button'>Login</button>
        </div>
        <div className='sem-conta'>
            <p>Não tem uma conta?</p>
            <Link className='cadastro' to="/cadastro">Cadastro</Link>

        </div>

        </>

      );
}
 
export default Login;