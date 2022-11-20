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
import Admin from './components/Admin'
import Product from './components/Product';
import Cart from './components/Cart';
import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';

function App() {
  const [inputPesquisa, setInputPesquisa] = useState("");
  const [user, setUser] = useState(undefined);

  const handleLoad = () =>{
      let cookies = new Cookies();
      let retorno = cookies.get("logged_user");
      if(retorno !== undefined){
          setUser(retorno);
      }

  }
  useEffect(() => {
      handleLoad();
  }, []); // so vai rodar quando carregar pela primeira vez
  
  return (
    <div className="App">
      <Router>
      <Header setInputPesquisa={setInputPesquisa} setUser={setUser} user={user}/>
        <Routes>
            <Route path="/" element={<Home /*games={games}*/ />}/>
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/cadastro" element={<Cadastro />}/>
            <Route path="/usuario" element={<User user={user} />}/>
            <Route path="/editar" element={<Edit user={user} setUser={setUser} />}/>
            <Route path="/pesquisa" element={<Pesquisa/>}/>
            <Route path="/cartao" element={<Cartao />}/>
            <Route path="/admin" element={<Admin />}/>
            <Route path="/admin/products" element={<AdminProducts />}/>
            <Route path="/admin/products/search" element={<PesquisaAdm />}/>
            <Route path="/admin/products/new" element={<NewProduct />}/>
            <Route path="/admin/users" element={<ListUsers /*users={users}*//>}/>
            <Route path="/admin/users/:id" element={<AdminUsersEdit /*user={user}*/ />}/>
            <Route path="/product" element={<Product /*game={game}*/ />}/>
            <Route path="/cart" element={<Cart /*cart={cart}*/ />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
