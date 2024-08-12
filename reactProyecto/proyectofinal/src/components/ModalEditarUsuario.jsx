import React, { useState, useEffect } from 'react';
import '../styles/modal.css';

function ModalEditarUsuario({ isOpen, onClose, onSave, usuario }) {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [genero, setGenero] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [departamento, setDepartamento] = useState('');

  useEffect(() => {
    if (usuario) {
      setNombre(usuario.nombre);
      setApellidos(usuario.apellidos);
      setGenero(usuario.genero);
      setFechaNacimiento(usuario.fechaNacimiento);
      setEmail(usuario.email);
      setUsername(usuario.username);
      setTipoUsuario(usuario.tipoUsuario);
      setDepartamento(usuario.departamento);
    }
  }, [usuario]);

  if (!isOpen) return null;

  const handleSave = () => {
    const updatedUser = {
      nombre,
      apellidos,
      genero,
      fechaNacimiento,
      email,
      username,
      tipoUsuario,
      departamento,
    };
    onSave(updatedUser);
    onClose(); // Cerrar el modal después de guardar
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Usuario</h2>
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
        <div className="modal-actions">
          <button className="button" onClick={handleSave}>Guardar</button>
          <button className="button button-cancel" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default ModalEditarUsuario;
