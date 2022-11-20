import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Login.css"
import Cookies from 'universal-cookie';
function delay(){
  return new Promise(function(resolve) {
      setTimeout(resolve, 100);
  });
}
const Login = ({setUser}) => {
    
    const navigate = useNavigate();

    const handleLogin = async () =>{
        let cookies = new Cookies();
        let email = document.getElementById("campo-email").value;
        let senha = document.getElementById("campo-senha").value;
        await delay();
        let retorno = localStorage.getItem(email);
        if(retorno){
            retorno = JSON.parse(retorno);
        }
        if(retorno === null || senha !== retorno.senha){
            //usuario inicial é definido aqui no nível lógico e nao no sentido de storage
            if (email === "admin@admin.com" && senha === "admin"){
                var adm = {
                    email : "admin@admin.com",
                    nome : "admin",
                    username : "admin",
                    senha : "admin",
                    endereco : "",
                    telefone : "",
                    adm : true
                };

                retorno = adm;
            }

            else{
                window.alert("email ou senha incorretos");
                return;
            }
        }
        cookies.set("logged_user", retorno);
        setUser(retorno);
        window.alert("logado");
        navigate("/");

    }
    return (
        <>
        <div className="login-form">
                <div className="email">
                    <p>Email</p>
                    <input type="email" name="email" id="campo-email" className='campo'/>
                </div>
                <div className="senha">
                    <p>Senha</p>
                    <input type="password" name="senha" id="campo-senha" className='campo'/>
                </div>
                <button onClick={handleLogin} className='login-button'>Login</button>
        </div>
        <div className='sem-conta'>
            <p>Não tem uma conta?</p>
            <Link className='cadastro' to="/cadastro">Cadastro</Link>

        </div>

        </>

      );
}
 
export default Login;