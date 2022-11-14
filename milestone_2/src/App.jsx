import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import User from './components/User';
import user_img from './components/anonymous-user.png';

let user = {
  name: 'Fulano da Silva',
  username: 'fulano_gamer1234',
  title: 'O mago do retrô',
  email: 'fulanodasilva@gmail.com',
  adress: 'Alameda dos Fulanos, 1234',
  phone: '+55 16 9 1234-5678',
  card: 'Mastercard final 1234',
  level: '999',
  img: user_img
}

function App() {
  return (
    <div className="App">
      <Router>
      <Header name="usuario"/>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/cadastro" element={<Cadastro />}/>
            <Route path="/usuario" element={<User email={user.email}
            username={user.username} adress={user.adress} phone={user.phone}
            card={user.card} name={user.name} title={user.title} img={user.img}
            level={user.level} />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
