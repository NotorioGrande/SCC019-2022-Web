import React , { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import "./NewProduct.css";
import { useNavigate } from 'react-router-dom';
import {delay} from '../helpers/system.js';

let loadFile = (event) => {
    var output = document.getElementById('card-img');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
        URL.revokeObjectURL(output.src)
    }
};

const NewProduct = ({admin}) => {

    const [price, setPrice] = useState(0)
    const [name, setName] = useState('Jogo')
    const [console, setConsole] = useState('Plataforma')

    const refresh_product = () => {
    
        setPrice(Number(document.getElementById('newproduct-price').value))

        let newName = document.getElementById('newproduct-name').value
        if(newName === ''){
            setName('Jogo')
        }
        else{
            setName(newName)
        }
        
        let newConsole = document.getElementById('newproduct-console').value
        if(newConsole === ''){
            setConsole('Console')
        }
        else{
            setConsole(newConsole)
        }
    }

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

    let tags = ['Ação', "Beat'em up", "Shoot'em up", 'Plataforma', 'Metroidvania', 'Furtivo', 'FPS', 'Mundo aberto',
    'Aventura', 'RPG', 'Action RPG', 'Tactical RPG', 'Corrida', 'Horror', 'Top-Down', '3D', 'Puzzle']

    let selectedTags = []

    const addTag = (event) => {
        let tag = event.currentTarget.children[0].innerHTML

        if(selectedTags.includes(tag)){
            const index = selectedTags.indexOf(tag);
            selectedTags.splice(index, 1);
            event.currentTarget.style.backgroundColor = 'white'
            event.currentTarget.style.color = 'black'
        }
        else{
            selectedTags.push(tag)
            event.currentTarget.style.backgroundColor = '#EC5939'
            event.currentTarget.style.color = 'white'
        }

        console.log(selectedTags)
    }

    return (
        <div className='new-product-page'>
            <div className='informations'>
                <div className='informations-left'>
                    <Card name={name} price={price.toFixed(2)} console={console}/>
                    <button className='edit-button'>
                        <label htmlFor='file'>Carregar imagem</label>
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
                            <select onChange={refresh_product} name="console" id="newproduct-console" className='campo'>
                                <optgroup label="8 Bits">
                                    <option value="Nes">Nes</option>
                                    <option value="Master System">Master System</option>
                                </optgroup>
                                <optgroup label="16 Bits">
                                    <option value="Snes">Snes</option>
                                    <option value="Mega Drive">Mega Drive</option>
                                </optgroup>
                                <optgroup label="Portátil">
                                    <option value="GB">GB</option>
                                    <option value="GBC">GBC</option>
                                    <option value="GBA">GBA</option>
                                </optgroup>
                                <optgroup label="64 Bits">
                                    <option value="Nintendo 64">Nintendo 64</option>
                                </optgroup>
                                <optgroup label="Sony">
                                    <option value="PS1">PS1</option>
                                    <option value="PS2">PS2</option>
                                </optgroup>
                            </select>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='edit-campo'>
                            <p>Descrição: </p>
                            <textarea name="description" cols="21" rows="5" className='campo' id="newproduct-description"></textarea>
                        </div>
                        <div className='columns'>
                            <p>Tags: </p>
                            <div className='all-tags'>
                                {tags.map((element,index) => {
                                    return(
                                        <div onClick={addTag} className='tag' key={index}>
                                            <p>{element}</p>
                                        </div>
                                    )
                                })}
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
        </div>
    );
}
 
export default NewProduct;