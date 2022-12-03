import React from 'react';
import { Link } from 'react-router-dom';
import "./AdminProduct.css";

const AdminProducts = ({admin}) => {
    return (
        <div className='admin-product-page'>
            <p>Gerenciar Produtos</p>
            <button className='acess-button'>
                <Link className='button' to="/admin/products/new">Adicionar novo</Link>
            </button>
            <button className='acess-button'>
                <Link className='button' to="/admin/products/search">Gerenciar existentes</Link>
            </button>
        </div>
    );
}
 
export default AdminProducts;