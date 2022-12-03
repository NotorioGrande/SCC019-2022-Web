import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import "./NewProduct.css";
import { useNavigate } from 'react-router-dom';
import {delay} from '../helpers/system.js';

const refresh_product = () => {
    let card_price = document.getElementById('card-price')
    let card_console = document.getElementById('card-console')
    let card_name = document.getElementById('card-name')

    card_price.innerHTML = document.getElementById('newproduct-price').value
    card_console.innerHTML = document.getElementById('newproduct-console').value
    card_name.innerHTML = document.getElementById('newproduct-name').value
}

let loadFile = (event) => {
    var output = document.getElementById('card-img');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
        URL.revokeObjectURL(output.src)
    }
};

const NewProduct = ({admin}) => {
    const navigate = useNavigate();

    const saveProduct = async () => {
        //pegando os valores
        let campoNome = document.getElementById("newproduct-name").value;
        let campoEstoque = document.getElementById("newproduct-stock").value;
        let campoPreco = document.getElementById("newproduct-price").value;
        let campoPlataforma = document.getElementById("newproduct-console").value;
        let campoDescricao = document.getElementById("newproduct-description").value;

        let campoId = localStorage.getItem("id");

        if(campoId){
            localStorage.setItem("id", parseInt(campoId) + 1);
        }
        else{
            localStorage.setItem("id", 1);
        }

        campoId = localStorage.getItem("id");

        //novo produto a ser colocado no localStorage
        let newProduct = {
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

        let productList = localStorage.getItem("productList");

        if(productList){
            //se salva o id para facilitar a retribuicao dos dados depois
            localStorage.setItem("productList", productList + " " + newProduct.id);
        }
        else{
            localStorage.setItem("productList", newProduct.id);
        }
        //salva no storage o produto
        localStorage.setItem(newProduct.id, JSON.stringify(newProduct));
        navigate("/admin/products");
        return;
    }

    return (
        <div className='new-product-page'>
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
                            <input onKeyUp={refresh_product} type="text" name="name" id="newproduct-name" className='campo'/>
                        </div>
                        <div className='edit-campo'>
                            <p>Estoque</p>
                            <input type="text" name="stock" id="newproduct-stock" className='campo'/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='edit-campo'>
                            <p>Preço</p>
                            <input onKeyUp={refresh_product} type="text" name="price" id="newproduct-price" className='campo'/>
                        </div>
                        <div className='edit-campo'>
                            <p>Plataforma</p>
                            <input onKeyUp={refresh_product} type="text" name="console" id="newproduct-console" className='campo'/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='edit-campo'>
                            <p>Descrição: </p>
                            <textarea name="description" cols="21" rows="5" className='campo' id="newproduct-description"></textarea>
                        </div>
                        <div className='edit-campo'>
                            <button className='edit-button' onClick={saveProduct}>
                                <Link className='button' to="/admin/products">Adicionar Produto</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default NewProduct;