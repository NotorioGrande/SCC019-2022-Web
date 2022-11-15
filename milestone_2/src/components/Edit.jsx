import React from 'react';
import { Link } from 'react-router-dom';
import "./Edit.css";
import user_img from './anonymous-user.png';

//objeto de usuario de exemplo
let user = {
    name: 'Fulano da Silva',
    username: 'fulano_gamer1234',
    title: 'O mago do retrô',
    email: 'fulanodasilva@gmail.com',
    adress: 'Alameda dos Fulanos, 1234',
    phone: '+55 16 9 1234-5678',
    card: 'Mastercard final 1234',
    level: '999',
    img: user_img
}

const Edit = ({/*user*/}) => { //recebe o objeto de um usuario
    return (
        <div className='edit-page'>
            <div className='informations'>
                <div className='informations-left'>
                    <div className='row'>
                        <div className='edit-campo'>
                            <p>Email</p>
                            <input type="email" name="email" id="edit-email" className='campo'/>
                        </div>
                        <div className='edit-campo'>
                            <p>Username</p>
                            <input type="text" name="username" id="edit-username" className='campo'/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='edit-campo'>
                            <p>Endereço</p>
                            <input type="text" name="adress" id="edit-adress" className='campo'/>
                        </div>
                        <div className='edit-campo'>
                            <p>Telefone</p>
                            <input type="tel" name="senha" id="edit-phone" className='campo'/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='edit-campo'>
                            <p>Nova senha </p>
                            <input type="password" name="nova-senha" id="newpassword1" className='campo'/>
                        </div>
                        <div className='edit-campo'>
                            <p>Digite novamente a nova senha </p>
                            <input type="password" name="nova-senha" id="newpassword2" className='campo'/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='edit-campo'>
                            <div className='required-field'>
                                <p className='asterisk'>*</p>
                                <p>Senha atual </p>
                            </div>
                            <input type="password" name="senha" id="confirm-password" className='campo'/>
                        </div>
                    </div>
                </div>
                <div className='informations-right'>
                    <p>{user.name},</p>
                    <p>{user.title}</p>
                    <div className='user-img'>
                        <img src={user.img} alt="" />
                    </div>
                    <p>Nível: {user.level}</p>
                </div>
            </div>
            <div className='all-buttons'>
                <button className='edit-button'>
                    <Link className='button' to="/cartao">Alterar cartão</Link>
                </button>
                <button className='edit-button'>
                    <Link className='button' to="/upload">Upload de imagem</Link>
                </button>
                <button className='edit-button'>
                    <Link className='button' to="/usuario">Salvar</Link>
                </button>
            </div>
        </div>
    );
}
 
export default Edit;