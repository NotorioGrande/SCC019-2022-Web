import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import User from './components/User';
import Edit from './components/Edit';
import Pesquisa from './components/Pesquisa';
import PesquisaAdm from './components/PesquisaAdm';
import Cartao from './components/Cartao';
import ListUsers from './components/ListUsers';
import AdminUsersEdit from './components/AdminUsersEdit'
import AdminProducts from './components/AdminProduct'
import NewProduct from './components/NewProduct'
import EditProduct from './components/EditProduct'
import Admin from './components/Admin'
import Product from './components/Product';
import Cart from './components/Cart';
import NotFound from './components/NotFound'
import { useState, useEffect } from 'react';
import axios from 'axios'
import Cookies from 'universal-cookie';

function App() {
  const [inputPesquisa, setInputPesquisa] = useState("");
  const [user, setUser] = useState(undefined);

	const handleLoad = async () =>{
		let cookies = new Cookies();
		let userCookie = cookies.get("logged_user");

		if(userCookie === undefined) return;
		
		axios.get('http://localhost:3001/api/user/' + userCookie)
		.then(response => {
			if(response !== undefined){
				setUser(response.data)
			}
		})
		.catch()
	}

	useEffect(() => {
		handleLoad();
	}, []); // so vai rodar quando carregar pela primeira vez
  
	return (
		<div className="App">
		<Router>
		<Header setInputPesquisa={setInputPesquisa} setUser={setUser} user={user}/>
			<Routes>
				<Route path="/" element={<Home />}/>
				<Route path="/login" element={<Login setUser={setUser} />}/>
				<Route path="/cadastro" element={<Cadastro />}/>
				<Route path="/usuario" element={<User user={user} />}/>
				<Route path="/editar" element={<Edit user={user} setUser={setUser} />}/>
				<Route path="/pesquisa" element={<Pesquisa />}/>
				<Route path="/cartao" element={<Cartao />}/>
				<Route path="/admin" element={<Admin user={user} />}/>
				<Route path="/admin/products" element={<AdminProducts user={user} />}/>
				<Route path="/admin/products/search" element={<PesquisaAdm user={user} />}/>
				<Route path="/admin/products/new" element={<NewProduct user={user} />}/>
				<Route path="/admin/products/edit/:id" element={<EditProduct user={user} />}/>
				<Route path="/admin/users" element={<ListUsers user={user} />}/>
				<Route path="/admin/users/:id" element={<AdminUsersEdit user={user} />}/>
				<Route path="/product/:id" element={<Product />}/>
				<Route path="/cart" element={<Cart />}/>
				<Route path="*" element={<NotFound />}/>
			</Routes>
		</Router>
		</div>
	);
}

export default App;
