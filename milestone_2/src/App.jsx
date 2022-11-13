import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Cadastro from './components/Cadastro';

function App() {
  return (
    <div className="App">
      <Router>
      <Header name="usuario"/>
        <Routes>
            <Route path="/" />
            <Route path="/login" element={<Login />}/>
            <Route path="/cadastro" element={<Cadastro />}/>          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
