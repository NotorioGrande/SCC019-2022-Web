import React from 'react';
import { Link } from 'react-router-dom';
import "./Cartao.css";
import { useNavigate } from 'react-router-dom';
import { validarCPF, cartaoVencido } from '../helpers/system';
import axios from 'axios';
import Cookies from 'universal-cookie';

const Cartao = () => {
    const navigate = useNavigate();

    const handleCadastrar = async (e) =>{
        e.preventDefault();
        let cookies = new Cookies();
		let userCookie = cookies.get("logged_user");

        let cartaoNumero = document.getElementById("card-number").value;
        let cartaoVencimento = document.getElementById("card-date").value;
        let cartaoCVV = document.getElementById("card-cvv").value;
        let cartaoBandeira = document.getElementById("card-flag").value;
        let cartaoTitular = document.getElementById("card-titular").value;
        let cartaoTitularCPF = document.getElementById("card-titular-cpf").value;

        if (cartaoVencido(cartaoVencimento)){
            window.alert("Cartão vencido");
            return;
        }

        if (!validarCPF(cartaoTitularCPF)){
            window.alert("CPF inválido");
            return;
        }

        let cartao = {
            numero: cartaoNumero,
            vencimento: cartaoVencimento,
            cvv: cartaoCVV,
            bandeira: cartaoBandeira,
            titular: cartaoTitular,
            titularCpf: cartaoTitularCPF
        }

        console.log(cartao);

        cartao = JSON.stringify(cartao);
        let objAtualizacao = {
            cartao: cartao
        }
        await axios.put('http://localhost:3001/api/user/' + userCookie + "/card", objAtualizacao);
        navigate("/usuario");
        return;
    }

    return (
        <div className='edit-card-page'>
            <form onSubmit={handleCadastrar} action="">
                <div className='informations'>
                    <div className='edit-campo'>
                        <p>Nº do cartão </p>
                        <input required type="text" pattern="[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}" name="card-number" id="card-number" className='campo' placeholder='XXXX XXXX XXXX XXXX'/>
                    </div>
                    <div className='row'>
                        <div className='edit-campo'>
                            <p>Vencimento </p>
                            <input required type="month" name="card-date" id="card-date" className='campo'/>
                        </div>
                        <div className='edit-campo'>
                            <p>CVV </p>
                            <input required type="text" pattern="[0-9]{3}" name="card-cvv" id="card-cvv" className='campo' placeholder='XXX'/>
                        </div>
                        <div className='edit-campo'>
                            <p>Bandeira </p>
                            <select required name="card-flag" id="card-flag" className='campo'>
                                <option value="Master">Master</option>
                                <option value="Visa">Visa</option>
                            </select>
                        </div>
                    </div>
                    <div className='edit-campo'>
                        <p>Nome do titular </p>
                        <input required type="text" name="card-titular" id="card-titular" className='campo'/>
                    </div>
                    <div className='edit-campo'>
                        <p>CPF do titular </p>
                        <input required type="text" pattern="[0-9]{11}" name="card-titular-cpf" id="card-titular-cpf" className='campo' placeholder="XXXXXXXXXXX"/>
                    </div>
                </div>
                <input type="submit" className='edit-button' value="Cadastrar"/>
            </form>
        </div>
      );
}
 
export default Cartao;