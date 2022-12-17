import React from 'react';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import "./Login.css"
import Cookies from 'universal-cookie';

/*Para acessar o admin root, crie na aba de cadastro um usuario com
email: 'admin@admin.com' e senha 'admin'*/

const Login = ({setUser}) => {
    
    const navigate = useNavigate();

    const handleLogin = async (e) =>{
        
        e.preventDefault();

        let cookies = new Cookies();
        let email = document.getElementById("campo-email").value;
        let senha = document.getElementById("campo-senha").value;

        axios.get('http://localhost:3001/api/user/email/' + email)
        .then(response => {
            console.log(response.data)

            if(senha !== response.data.senha){
                window.alert("email e/ou senha incorretos");
                return;
            }

            let id = response.data._id
            
            cookies.set("logged_user", id, {path: '/'});
            if(response.data.cartao){
                setUser({... response.data, cartao: JSON.parse(response.data.cartao)});
            }
            else{
                setUser(response.data);
            }
            window.alert("Logado com sucesso.");
            navigate("/");
        })
        .catch((e) => {
            console.log(e)
            window.alert("email e/ou senha incorretos");
            return;
        })
    }
    return (
        <>
        <div className="login-div">
            <form onSubmit={handleLogin} className="login-form">
                <div className="email">
                    <p>Email</p>
                    <input required type="email" name="email" id="campo-email" className='campo'/>
                </div>
                <div className="senha">
                    <p>Senha</p>
                    <input required type="password" name="senha" id="campo-senha" className='campo'/>
                </div>
                <input type="submit" className='login-button' value="Login"/>
            </form>
        </div>
        <div className='sem-conta'>
            <p>Não tem uma conta?</p>
            <Link className='cadastro' to="/cadastro">Cadastro</Link>

        </div>

        </>

      );
}
 
export default Login;