import React ,{ useState , useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Card from './Card';
import "./EditProduct.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import NotFound from './NotFound';

const EditProduct = ({user}) => {

    let {id} = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState({})
    const [price, setPrice] = useState()
    const [name, setName] = useState()
    const [plataforma, setPlataforma] = useState()

    let tags = ["Ação", "Aventura", "Arcade", "RPG"]
    // let tags = ["Ação", "Aventura", "Arcade", "RPG", "Beat'em up", "Shoot'em up", 'Plataforma', 'Metroidvania', 'Furtivo', 'FPS',
    // 'Mundo aberto', 'Action RPG', 'Tactical RPG', 'Corrida', 'Horror', 'Top-Down', '3D', 'Puzzle']

    let selectedTags = []
    
    useEffect(() => {
        axios.get('http://localhost:3001/api/product/' + id)
        .then(response => {
            setGame(response.data)
        })
    }, [])

    let loadFile = (event) => {
        var output = document.getElementById('card-img');
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function() {
            URL.revokeObjectURL(output.src)
        }
    };

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
            event.currentTarget.className = 'tag'
        }
        else{
            selectedTags.push(tag)
            event.currentTarget.className = 'selected-tag'
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
        formData.append("oldImage", game.img);
        formData.append("nome", campoNome);
        formData.append("estoque", campoEstoque);
        formData.append("vendido", game.vendido);
        formData.append("preco", campoPreco);
        formData.append("plataforma", campoPlataforma);
        formData.append("descricao", campoDescricao);
        formData.append("tags", selectedTags.toString());
        
        await axios.put("/api/product/" + id, formData)
        .then(res => {
            alert('Produto atualizado')
            navigate("/admin/products/search");
            
            return;
        })
        .catch(err => {
            alert('Erro ao atualizar produto')
            console.log(err)
            return;
        });
    }

    let image
    try{
        image = require('./../../../uploads/' + game.img)
    }
    catch{
        image = ''
    }

    return (
        user === undefined ? (
            <NotFound/>
        ):(
            !user.adm ? (
                <NotFound/>
            ):(
                game === undefined ? (
                    <NotFound/>
                ):(
                    <div className='edit-product-page'>
                        <div className='informations'>
                            <div className='informations-left'>
                                {name === undefined || price === undefined || plataforma === undefined ? (
                                    <Card name={game.nome} price={game.preco} img={image} console={game.plataforma}/>
                                ):(
                                    <Card name={name} price={price} img={image} console={plataforma}/>
                                )}
                                <label htmlFor='inputFile' className='edit-button'>
                                    <p>Carregar imagem</p>
                                    <input onChange={loadFile} type="file" name="image" accept="image/*" id='inputFile'/>
                                </label>
                            </div>
                            <div className='informations-right'>
                                <div className='row'>
                                    <div className='edit-campo'>
                                        <p>Nome</p>
                                        <input onKeyUp={refresh_product} type="text" name="name" id="newproduct-name" className='campo' defaultValue={game.nome}/>
                                    </div>
                                    <div className='edit-campo'>
                                        <p>Estoque</p>
                                        <input type="text" name="stock" id="newproduct-stock" className='campo' defaultValue={game.estoque}/>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='edit-campo'>
                                        <p>Preço</p>
                                        <input onKeyUp={refresh_product} type="text" name="price" id="newproduct-price" className='campo' defaultValue={game.preco}/>
                                    </div>
                                    <div className='edit-campo'>
                                        <p>Plataforma</p>
                                        <select onChange={refresh_product} name="console" id="newproduct-console" className='campo'>
                                            <optgroup label="8 Bits">
                                                {game.plataforma === 'Nes' ? (<option value="Nes" selected="selected">Nes</option>):(<option value="Nes">Nes</option>)}
                                                {game.plataforma === 'Master System' ? (<option value="Master System" selected="selected">Master System</option>):(<option value="Master System">Master System</option>)}
                                            </optgroup>
                                            <optgroup label="16 Bits">
                                                {game.plataforma === 'Snes' ? (<option value="Snes" selected="selected">Snes</option>):(<option value="Snes">Snes</option>)}
                                                {game.plataforma === 'Mega Drive' ? (<option value="Mega Drive" selected="selected">Mega Drive</option>):(<option value="Mega Drive">Mega Drive</option>)}
                                            </optgroup>
                                            <optgroup label="Portátil">
                                                {game.plataforma === 'GB' ? (<option value="GB" selected="selected">GB</option>):(<option value="GB">GB</option>)}
                                                {game.plataforma === 'GBC' ? (<option value="GBC" selected="selected">GBC</option>):(<option value="GBC">GBC</option>)}
                                                {game.plataforma === 'GBA' ? (<option value="GBA" selected="selected">GBA</option>):(<option value="GBA">GBA</option>)}
                                            </optgroup>
                                            <optgroup label="64 Bits">
                                                {game.plataforma === 'Nintendo 64' ? (<option value="Nintendo 64" selected="selected">Nintendo 64</option>):(<option value="Nintendo 64">Nintendo 64</option>)}
                                            </optgroup>
                                            <optgroup label="Sony">
                                                {game.plataforma === 'PS1' ? (<option value="PS1" selected="selected">PS1</option>):(<option value="PS1">PS1</option>)}
                                                {game.plataforma === 'PS2' ? (<option value="PS2" selected="selected">PS2</option>):(<option value="PS2">PS2</option>)}
                                            </optgroup>
                                        </select>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='edit-campo'>
                                        <p>Descrição: </p>
                                        <textarea name="description" cols="21" rows="5" className='campo' id="newproduct-description" defaultValue={game.descricao}></textarea>
                                    </div>
                                    <div className='columns'>
                                        <p>Tags: </p>
                                        <div className='all-tags'>
                                            {game.tags === undefined ? (
                                                <></>
                                            ):(
                                                tags.map((element,index) => {
                                                    if(game.tags[0].split(',').includes(element)){
                                                        selectedTags.push(element)
                                                        return(
                                                            <div onClick={addTag} className='selected-tag' key={index}>
                                                                <p>{element}</p>
                                                            </div>
                                                        )
                                                    }
                                                    else{
                                                        return(
                                                            <div onClick={addTag} className='tag' key={index}>
                                                                <p>{element}</p>
                                                            </div>
                                                        )
                                                    }
                                                    
                                                })
                                            )}
                                        </div>
                                        <div className='edit-campo'>
                                            <button className='edit-button' onClick={saveProduct}>
                                                Salvar produto
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )
        )
    );
}
 
export default EditProduct;