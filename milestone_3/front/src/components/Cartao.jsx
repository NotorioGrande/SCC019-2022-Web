import React from 'react';
import { Link } from 'react-router-dom';
import "./Cartao.css";

const Cartao = () => {
    const handleCadastrar = ()=>{
        let cartaoNumero = document.getElementById("card-number").value;
        let cartaoVencimento = document.getElementById("card-date").value;
        let cartaoCVV = document.getElementById("card-cvv").value;
        let cartaoBandeira = document.getElementById("card-flag").value;
        let cartaoTitular = document.getElementById("card-titular").value;
        let cartaoTitularCPF = document.getElementById("card-titular-cpf").value;

        let cartao = {
            numero: cartaoNumero,
            vencimento: cartaoVencimento,
            cvv: cartaoCVV,
            bandeira: cartaoBandeira,
            titular: cartaoTitular,
            titularCpf: cartaoTitularCPF
        }

        cartao = JSON.stringify(cartao);
    }

    return (
        <div className='edit-card-page'>
            <div className='informations'>
                <div className='edit-campo'>
                    <p>Nº do cartão </p>
                    <input type="text" name="card-number" id="card-number" className='campo'/>
                </div>
                <div className='row'>
                    <div className='edit-campo'>
                        <p>Vencimento </p>
                        <input type="text" name="card-date" id="card-date" className='campo'/>
                    </div>
                    <div className='edit-campo'>
                        <p>CVV </p>
                        <input type="text" name="card-cvv" id="card-cvv" className='campo'/>
                    </div>
                    <div className='edit-campo'>
                        <p>Bandeira </p>
                        <input type="text" name="card-flag" id="card-flag" className='campo'/>
                    </div>
                </div>
                <div className='edit-campo'>
                    <p>Nome do titular </p>
                    <input type="text" name="card-titular" id="card-titular" className='campo'/>
                </div>
                <div className='edit-campo'>
                    <p>CPF do titular </p>
                    <input type="text" name="card-titular-cpf" id="card-titular-cpf" className='campo'/>
                </div>
            </div>
            <button className='edit-button' onClick={handleCadastrar}>
                <Link className='button' to="/usuario">Cadastrar </Link>
            </button>
        </div>
      );
}
 
export default Cartao;