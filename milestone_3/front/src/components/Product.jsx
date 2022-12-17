import React, { useState , useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from './Card';
import "./Product.css";
import axios from 'axios'
import NotFound from './NotFound';

const Product = ({user}) => {

    let { id } = useParams();
    const navigate = useNavigate();

    const [game,setGame] = useState({})
    const [cost, setCost] = useState()
    
    useEffect(() => {
        axios.get('http://localhost:3001/api/product/' + id)
        .then(response => {
            setGame(response.data)
        })
    }, [])

    const buyProduct = () => {

        if(user === undefined){
            alert('Faça login antes de comprar o produto');
            navigate("/login");

        }
        else if(!user.cartao){
            alert("É necessário cadastrar um cartão antes de poder fazer a compra");
            return;
        }

        let quantidade = Number(document.getElementsByClassName('quantity-number')[0].innerHTML)
        
        axios.post('http://localhost:3001/api/comprar', {
            idProduto: id,
            idUsuario: user._id,
            quantidade: quantidade,

        })
        .then(() => {
            alert("O produto foi comprado :)")
            window.location.reload();
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    const addToCart = () => {

        let cart

        if(user === undefined){
            cart = localStorage.getItem("guestCart")
        }
        else{
            cart = localStorage.getItem(user._id + "Cart")
        }
    
        cart = JSON.parse(cart)
    
        if(!cart) cart = []
    
        let isOnCart = false
    
        let n = document.getElementsByClassName('quantity-number')[0]
        n = parseInt(n.innerHTML)
        
        cart.forEach(function(element,i){
            if(element.game === game._id){
                isOnCart = true
                if(parseInt(element.quantidade) + n <= game.estoque){
                    element.quantidade = parseInt(element.quantidade) + n
                }
                else{
                    element.quantidade = game.estoque
                }
            }
        })
    
        if(!isOnCart){
            let cartItem = {
                game: game._id,
                quantidade: n
            }
    
            cart.push(cartItem)
        }
    
        console.log(cart)

        if(user === undefined){
            localStorage.setItem("guestCart",JSON.stringify(cart))
        }
        else{
            localStorage.setItem(user._id + "Cart",JSON.stringify(cart))
        }
    
        alert("Produto adicionado ao carrinho")
    }

    const addProduct = () => {
        let productNumber = document.getElementsByClassName('quantity-number')[0]
        let n = parseInt(productNumber.innerHTML)
    
        if(n < 99 && n < game.estoque){
            n++
        }
    
        productNumber.innerHTML = n
    
        setCost(n*game.preco)
    }
    
    const subtractProduct = () => {
        let productNumber = document.getElementsByClassName('quantity-number')[0]
        let n = parseInt(productNumber.innerHTML)
    
        if(n > 1){
            n--
        }
    
        productNumber.innerHTML = n

        setCost(n*game.preco)
    }

    const renderStock = (stock) => {
        if(stock > 0){
            if(stock > 1){
                return(
                    <>
                        <p className='stock-number'>{stock}</p>
                        <p className='stock-number'>unidades</p>
                    </>
                )
            }
            else{
                return(
                    <>
                        <p className='stock-number'>{stock}</p>
                        <p className='stock-number'>unidade</p>
                    </>
                )
            }
        }
        else{
            return <p className='stock-number'>Esgotado :/</p>
        }
    }

    return (
        game === undefined ? (
            <NotFound/>
        ):(
            <div className='product-page'>
                <div className='informations'>
                    <div className='informations-left'>
                        <Card name={game.nome} price={game.preco} img={game.img && require('./../../../uploads/' + game.img)} console={game.plataforma}/>
                        <div className='all-tags'>
                            {game.tags === undefined ? (
                                <></>
                            ):(
                                game.tags.map((element,index) => {
                                    return(
                                        <div className='tag' key={index}>
                                            <p>{element}</p>
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    </div>
                    <div className='informations-right'>
                        <div className='row-1'>
                            <p>{game.nome}</p>
                            <p>[{game.plataforma}]</p>
                        </div>
                            <div className='row-2'>
                                <div className='values'>
                                    <div className='value-1'>
                                        <p>R$ {
                                        cost === undefined ? (
                                            Number(game.preco).toFixed(2)
                                        ):(
                                            cost.toFixed(2)
                                        )
                                        }</p>
                                    </div>
                                    <div className='value-2'>
                                        <p>5x de R$ {
                                        cost === undefined ? (
                                            (Number(game.preco)/5).toFixed(2)
                                        ):(
                                            (cost/5).toFixed(2)
                                        )
                                        }</p>
                                    </div>
                                </div>
                                <div className='quantity'>
                                    <div onClick={subtractProduct} className='subtract-quantity'>
                                        -
                                    </div>
                                    <p> Quantidade: </p>
                                    <p className='quantity-number'> 1 </p>
                                    <div onClick={addProduct} className='add-quantity'>
                                        +
                                    </div>
                                </div>
                            </div>
                        <div className='row-3'>
                            <p>Estoque: </p>
                            {renderStock(game.estoque)}
                        </div>
                        <div className='row-4'>
                            <p>Descrição: </p>
                        </div>
                        <div className='row-5'>
                            <p>{game.descricao}</p>
                        </div>
                    </div>
                </div>
                {game.estoque === 0 ?(
                    <div className='all-buttons'>
                        <button className='forbidden-button'> Comprar </button>
                        <button className='forbidden-button'> Carrinho </button>
                    </div>
                ):(
                    <div className='all-buttons'>
                        <button onClick={buyProduct}> Comprar </button>
                        <button onClick={addToCart}> Carrinho </button>
                    </div>
                )}
            </div>
        )
    );
}
 
export default Product;