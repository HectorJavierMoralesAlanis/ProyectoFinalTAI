import React, { useState } from 'react';
import '../styles/modal.css'; 

function ModalAgregarUsuario({ isOpen, onClose, onSave }) {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [genero, setGenero] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [password,setPassword]=useState('');
  const [departamento, setDepartamento] = useState('');

  if (!isOpen) return null;

  async function agregarUsuario(){
    const data = {username,nombre,apellidos,genero,fechaNacimiento,email,username,tipoUsuario,password,departamento};
    const res = await fetch('http://127.0.0.1:3030/ingresar-datos',
    {
      body:JSON.stringify(data),
      method:'POST',
      headers:{'Content-Type':'application/json'}
    })
    const resObj = await res.json();
    onClose();
  }

  const handleSave = () => {
    const newUser = {
      nombre,
      apellidos,
      genero,
      fechaNacimiento,
      email,
      username,
      tipoUsuario,
      departamento,
    };
    onSave(newUser);
    onClose(); // Cerrar el modal después de guardar
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Agregar Usuario</h2>
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
        <input
          type="text"
          className="input-field"
          placeholder="Nombre de Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <select
          className="input-field"
          value={tipoUsuario}
          onChange={(e) => setTipoUsuario(e.target.value)}
        >
          <option value="" disabled>Seleccione el tipo de usuario</option>
          <option value="admin">Administrador</option>
          <option value="usuario normal">Usuario Normal</option>
        </select>
        <input
          type="password"
          className="input-field"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
        <input
          type="text"
          className="input-field"
          placeholder="Departamento (opcional)"
          value={departamento}
          onChange={(e) => setDepartamento(e.target.value)}
        />
        <div className="modal-actions">
          <button className="button" onClick={agregarUsuario}>Guardar</button>
          <button className="button button-cancel" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default ModalAgregarUsuario;
