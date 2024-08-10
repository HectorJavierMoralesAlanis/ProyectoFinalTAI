import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login.jsx'; // Actualiza la extensión aquí
import Register from './components/Register.jsx'; // Actualiza la extensión aquí

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
