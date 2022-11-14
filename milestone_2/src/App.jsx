import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import Pesquisa from './components/Pesquisa';
import { useState } from 'react';

function App() {
  const [inputPesquisa, setInputPesquisa] = useState("");


  return (
    <div className="App">
      <Router>
      <Header name="usuario" setInputPesquisa={setInputPesquisa}/>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/cadastro" element={<Cadastro />}/>          
            <Route path="/pesquisa" element={<Pesquisa/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
