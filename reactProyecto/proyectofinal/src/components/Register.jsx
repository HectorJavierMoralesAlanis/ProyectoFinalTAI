import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/login.css';  // Ruta correcta
import '../styles/styles.css'; // Ruta correcta

function Register() {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    async function registrar() {
        if (!username || !password) {
            alert('Complete todos los campos');
            return;
        }

        const data = {username, password};
        const res = await fetch(
            'http://127.0.0.1:3030/register',
            {
                body: JSON.stringify(data),
                method: 'POST',
                headers: {'Content-Type':'application/json'}
            }
        );
        const resObj = await res.json();
        alert(resObj.message);
        if (resObj.success) {
            navigate('/login');
        }
    }

    return (
        <div className="login-background">
            <div className="container">
                <h2 className="form-heading">Registrarse</h2>
                <input 
                    type="text" 
                    id="username" 
                    className="input-field"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                    type="password" 
                    id="password"
                    className="input-field"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={registrar} className="button button-secondary">Registrarse</button>
                <a onClick={() => navigate('/login')} className="link">¿Ya tienes una cuenta? Inicia Sesión</a>
            </div>
        </div>
    );
}

export default Register;
