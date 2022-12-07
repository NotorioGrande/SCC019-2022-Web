import React from 'react';
import { Link, useParams} from 'react-router-dom';
import Card from './Card';
import "./EditProduct.css";
import { useNavigate } from 'react-router-dom';
import {delay} from '../helpers/system.js';
import {getProduct} from '../helpers/products.js'
import NotFound from './NotFound';

const refresh_product = () => {
    let card_price = document.getElementById('card-price')
    let card_console = document.getElementById('card-console')
    let card_name = document.getElementById('card-name')

    card_price.innerHTML = document.getElementById('editproduct-price').value
    card_console.innerHTML = document.getElementById('editproduct-console').value
    card_name.innerHTML = document.getElementById('editproduct-name').value
}

let loadFile = (event) => {
    var output = document.getElementById('card-img');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
        URL.revokeObjectURL(output.src)
    }
};

const EditProduct = ({user}) => {
    const navigate = useNavigate();
    let {id} = useParams();

    let product = getProduct(id);

    const saveProduct = async () => {
        //pegando os valores
        let campoNome = document.getElementById("editproduct-name").value;
        let campoEstoque = document.getElementById("editproduct-stock").value;
        let campoPreco = document.getElementById("editproduct-price").value;
        let campoPlataforma = document.getElementById("editproduct-console").value;
        let campoDescricao = document.getElementById("editproduct-description").value;

        let campoId = id;

        //produto atualizado
        let editproduct = {
            nome: campoNome,
            estoque: campoEstoque,
            vendido: null,
            img: null,
            preco: campoPreco,
            plataforma: campoPlataforma,
            descricao: campoDescricao,
            id: campoId
        };

        await delay();

        //salva no storage o produto
        localStorage.setItem(editproduct.id, JSON.stringify(editproduct));
        navigate("/admin/products");
        return;
    }

    return (
        user === undefined ? (
            <NotFound/>
        ):(
            !user.adm ? (
                <NotFound/>
            ):(
                <div className='edit-product-page'>
                    <div className='informations'>
                        <div className='informations-left'>
                            <Card />
                            <button className='edit-button'>
                                <label htmlFor='file'>Carregar imagens</label>
                                <input onChange={loadFile} type="file" name="file" accept="image/*" className='button' id="imgInp"/>
                            </button>
                        </div>
                        <div className='informations-right'>
                            <div className='row'>
                                <div className='edit-campo'>
                                    <p>Nome</p>
                                    <input onKeyUp={refresh_product} type="text" name="name" id="editproduct-name" className='campo' defaultValue={product.nome}/>
                                </div>
                                <div className='edit-campo'>
                                    <p>Estoque</p>
                                    <input type="text" name="stock" id="editproduct-stock" className='campo' defaultValue={product.estoque}/>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='edit-campo'>
                                    <p>Preço</p>
                                    <input onKeyUp={refresh_product} type="text" name="price" id="editproduct-price" className='campo' defaultValue={product.preco}/>
                                </div>
                                <div className='edit-campo'>
                                    <p>Plataforma</p>
                                    <input onKeyUp={refresh_product} type="text" name="console" id="editproduct-console" className='campo' defaultValue={product.plataforma}/>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='edit-campo'>
                                    <p>Descrição: </p>
                                    <textarea name="description" cols="21" rows="5" className='campo' id="editproduct-description" defaultValue={product.descricao}></textarea>
                                </div>
                                <div className='edit-campo'>
                                    <button className='edit-button' onClick={saveProduct}>
                                        <Link className='button' to="/admin/products">Salvar</Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        )
    );
}
 
export default EditProduct;