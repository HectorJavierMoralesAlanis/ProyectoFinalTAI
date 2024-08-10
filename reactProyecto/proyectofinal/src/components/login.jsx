import {useState} from "react";
import {useNavigate} from 'react-router-dom';
import '../styles/login.css';   // Ruta correcta si el archivo está en una carpeta styles
import '../styles/styles.css';

function Login() {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [respuesta, setRespuesta] = useState(null);
    const navigate = useNavigate();
    
    async function inicioS() {
        if (!username) {
            alert('Escriba un username');
            return;
        }

        const data = {username, password};
        const res = await fetch(
            'http://127.0.0.1:3030/datos',
            {
                body: JSON.stringify(data),
                method: 'POST',
                headers: {'Content-Type':'application/json'}
            }
        );
        const resObj = await res.json();
        setRespuesta(resObj);
        setUsername('');
    }

    return (
        <div className="login-background">
            <div className="container">
                <h2 className="form-heading">Iniciar Sesión</h2>
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
                <button onClick={inicioS} className="button">Iniciar Sesión</button>
                <a onClick={() => navigate('/register')} className="link">¿No tienes una cuenta? Regístrate</a>
                {respuesta && <p className="form-message">{respuesta.message}</p>}
            </div>
        </div>
    );
}

export default Login;
