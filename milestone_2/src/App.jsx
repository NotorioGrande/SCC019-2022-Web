import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Router>
      <Header location="home" name="usuario"  />
        <Routes>
            <Route path="/" />
            <Route path="login" element={<Login />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
