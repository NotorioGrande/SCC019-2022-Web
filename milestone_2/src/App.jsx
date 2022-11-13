import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Router>
      <Header location="home" name="usuario"  />
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="login" element={<Login />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
