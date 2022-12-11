import React , { useState } from 'react';
import Card from './Card';
import "./NewProduct.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import NotFound from './NotFound'

let loadFile = (event) => {
    var output = document.getElementById('card-img');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
        URL.revokeObjectURL(output.src)
    }
};

const NewProduct = ({user}) => {

    const [price, setPrice] = useState(0)
    const [name, setName] = useState('Jogo')
    const [plataforma, setPlataforma] = useState('Plataforma')
    const navigate = useNavigate();

    let tags = ['Ação', "Beat'em up", "Shoot'em up", 'Plataforma', 'Metroidvania', 'Furtivo', 'FPS', 'Mundo aberto',
    'Aventura', 'RPG', 'Action RPG', 'Tactical RPG', 'Corrida', 'Horror', 'Top-Down', '3D', 'Puzzle']

    let selectedTags = []

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
            setPlataforma('Console')
        }
        else{
            setPlataforma(newConsole)
        }
    }

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
    }

    const saveProduct = async (e) => {
        e.preventDefault()

        //pegando os valores
        let campoNome = document.getElementById("newproduct-name").value;
        let campoEstoque = document.getElementById("newproduct-stock").value;
        let campoPreco = document.getElementById("newproduct-price").value;
        let campoPlataforma = document.getElementById("newproduct-console").value;
        let campoDescricao = document.getElementById("newproduct-description").value;
        let campoImagem = document.getElementById("inputFile").files[0]

        if(campoImagem === undefined){
            alert('Insira uma imagem no produto');
            return;
        }
    
        if(campoNome === '' || campoEstoque === '' || campoPreco === '' ||
        campoPlataforma === '' || campoDescricao === '' || selectedTags.length === 0){
            alert('Um ou mais campos não foram preenchidos');
            return;
        }
    
        if(isNaN(campoEstoque)){
            alert('Estoque deve ser um número');
            return;
        }
    
        if(!Number.isInteger(Number(campoEstoque))){
            alert('Estoque deve ser inteiro');
            return;
        }
    
        if(isNaN(campoPreco)){
            alert('Preço deve ser um número');
            return;
        }

        const formData = new FormData();

        //adicionando valores para o formato FormData
        formData.append("image", campoImagem);
        formData.append("nome", campoNome);
        formData.append("estoque", campoEstoque);
        formData.append("vendido", '0');
        formData.append("preco", campoPreco);
        formData.append("plataforma", campoPlataforma);
        formData.append("descricao", campoDescricao);
        formData.append("tags", selectedTags.toString());
        
        await axios.post("/api/product", formData)
        .then(res => {
            alert('O produto foi cadastrado')
            navigate("/admin/products");
            
            return;
        })
        .catch(err => {
            alert('Erro ao inserir o produto')
            console.log(err)
            return;
        });
    }

    return (
        user === undefined ? (
            <NotFound/>
        ):(
            !user.adm ? (
                <NotFound/>
            ):(
                <div className='new-product-page'>
                    <div className='informations'>
                        <div className='informations-left'>
                            <Card name={name} price={price.toFixed(2)} console={plataforma}/>
                            <label htmlFor='inputFile' className='edit-button'>
                                <p>Carregar imagem</p>
                                <input onChange={loadFile} type="file" name="image" accept="image/*" id='inputFile'/>
                            </label>
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
                                            Adicionar Produto
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        )
    );
}
 
export default NewProduct;