import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/login.css';
import '../styles/styles.css';

function Register() {

    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [genero, setGenero] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [email, setEmail] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('');
    const [departamento, setDepartamento] = useState('');
    const navigate = useNavigate();

    async function registrar() {
        if (!nombre || !apellidos || !genero || !fechaNacimiento || !email || !tipoUsuario) {
            alert('Por favor, complete todos los campos obligatorios');
            return;
        }

        const data = { 
            nombre,
            apellidos,
            genero,
            fechaNacimiento,
            email,
            tipoUsuario,
            departamento
        };

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
                    className="input-field"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />

                <input 
                    type="text" 
                    className="input-field"
                    placeholder="Apellidos"
                    value={apellidos}
                    onChange={(e) => setApellidos(e.target.value)}
                />

                <select 
                    className="input-field"
                    value={genero}
                    onChange={(e) => setGenero(e.target.value)}
                >
                    <option value="" disabled>Seleccione su género</option>
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                </select>

                <input 
                    type="date" 
                    className="input-field"
                    value={fechaNacimiento}
                    onChange={(e) => setFechaNacimiento(e.target.value)}
                />

                <input 
                    type="email" 
                    className="input-field"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <select 
                    className="input-field"
                    value={tipoUsuario}
                    onChange={(e) => setTipoUsuario(e.target.value)}
                >
                    <option value="" disabled>Seleccione el tipo de usuario</option>
                    <option value="administrador">Administrador</option>
                    <option value="usuario normal">Usuario Normal</option>
                </select>

                <input 
                    type="text" 
                    className="input-field"
                    placeholder="Departamento (opcional)"
                    value={departamento}
                    onChange={(e) => setDepartamento(e.target.value)}
                />

                <button onClick={registrar} className="button button-secondary">Registrarse</button>
                <a onClick={() => navigate('/login')} className="link">¿Ya tienes una cuenta? Inicia Sesión</a>
            </div>
        </div>
    );
}

export default Register;
