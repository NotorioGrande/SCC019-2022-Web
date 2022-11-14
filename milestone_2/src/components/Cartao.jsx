import React from 'react';
import { Link } from 'react-router-dom';
import "./Cartao.css";

//objeto de usuario de exemplo
let user = {
    name: 'Fulano da Silva',
    username: 'fulano_gamer1234',
    title: 'O mago do retrô',
    email: 'fulanodasilva@gmail.com',
    adress: 'Alameda dos Fulanos, 1234',
    phone: '+55 16 9 1234-5678',
    card: 'Mastercard final 1234',
    level: '999'
}

const Cartao = ({/*user*/}) => { //recebe o objeto de um usuario
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
                        <input type="text" name="card-number" id="card-number" className='campo'/>
                    </div>
                    <div className='edit-campo'>
                        <p>CVV </p>
                        <input type="text" name="card-number" id="card-number" className='campo'/>
                    </div>
                    <div className='edit-campo'>
                        <p>Bandeira </p>
                        <input type="text" name="card-number" id="card-number" className='campo'/>
                    </div>
                </div>
                <div className='edit-campo'>
                    <p>Nome do titular </p>
                    <input type="text" name="card-number" id="card-number" className='campo'/>
                </div>
                <div className='edit-campo'>
                    <p>CPF do titular </p>
                    <input type="text" name="card-number" id="card-number" className='campo'/>
                </div>
            </div>
            <button className='edit-button'>
                <Link className='button' to="/usuario">Cadastrar </Link>
            </button>
        </div>
      );
}
 
export default Cartao;