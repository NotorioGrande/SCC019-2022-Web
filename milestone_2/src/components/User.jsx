import React from 'react';
import { Link } from 'react-router-dom';
import "./User.css";

const User = ({email,username,adress,phone,card,name,title,img,level}) => {
    return (
        <div className='user-page'>
            <div className='informations'>
                <div className='informations-left'>
                    <p>Email: {email}</p>
                    <p>Username: {username}</p>
                    <p>Endereço: {adress}</p>
                    <p>Telefone: {phone}</p>
                    <p>Cartão: {card}</p>
                </div>
                <div className='informations-right'>
                    <p>{name}</p>
                    <p>{title}</p>
                    <div className='user-img'>
                        <img src={img} alt="user" />
                    </div>
                    <p>Nível: {level}</p>
                </div>
            </div>
            <button className='edit-button'>
                <Link className='editar' to="/editar">Editar</Link>
            </button>
        </div>
      );
}
 
export default User;