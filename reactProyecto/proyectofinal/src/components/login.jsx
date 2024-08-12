import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/login.css';
import '../styles/styles.css';

function Login() {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [respuesta, setRespuesta] = useState(null);
    const navigate = useNavigate();

    // Usuario predefinido
    const predefinedUser = {
        username: "admin",
        password: "123456",
        nombre: "Administrador",
        email: "admin@example.com"
    };
    
    function inicioS() {
        if (!username || !password) {
            alert('Por favor, complete todos los campos');
            return;
        }

        // Validar las credenciales
        if (username === predefinedUser.username && password === predefinedUser.password) {
            setRespuesta({ message: `Bienvenido, ${predefinedUser.nombre}` });
            // Redirigir a la página de usuarios después de iniciar sesión
            setTimeout(() => navigate('/usuarios'), 2000); // Navega a la página de Usuarios
        } else {
            setRespuesta({ message: 'Credenciales incorrectas' });
        }

        // Limpiar los campos después de intentar iniciar sesión
        setUsername('');
        setPassword('');
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
