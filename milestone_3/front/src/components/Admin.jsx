import React from 'react';
import { Link } from 'react-router-dom';
import "./Admin.css";

const AdminEdit = ({}) => {
    return (
        <div className='admin-page'>
            <p>Área do Administrador</p>
            <button className='acess-button'>
                <Link className='button' to="/admin/users">Gerenciar usuarios</Link>
            </button>
            <button className='acess-button'>
                <Link className='button' to="/admin/products">Gerenciar produtos</Link>
            </button>
        </div>
    );
}
 
export default AdminEdit;