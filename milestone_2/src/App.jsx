import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import User from './components/User';
import Edit from './components/Edit';
import Pesquisa from './components/Pesquisa';
import Cartao from './components/Cartao';
import { useState } from 'react';

function App() {
  const [inputPesquisa, setInputPesquisa] = useState("");

  return (
    <div className="App">
      <Router>
      <Header name="usuario" setInputPesquisa={setInputPesquisa}/>
        <Routes>
            <Route path="/" element={<Home /*games={games}*/ />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/cadastro" element={<Cadastro />}/>
            <Route path="/usuario" element={<User /*user={user}*/ />}/>
            <Route path="/editar" element={<Edit /*user={user}*/ />}/>
            <Route path="/pesquisa" element={<Pesquisa/>}/>
            <Route path="/cartao" element={<Cartao />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
