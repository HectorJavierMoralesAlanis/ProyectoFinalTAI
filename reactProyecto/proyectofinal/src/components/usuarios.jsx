import React, { useState,useEffect } from "react";
import ModalAgregarUsuario from "./ModalAgregarUsuario";
import ModalEditarUsuario from "./ModalEditarUsuario";
import '../styles/usuarios.css';
import {Link} from 'react-router-dom';

function ButtonLink({to,children,className}){
    return <Link to={to} className={className}>{children}</Link>
}
function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [respuesta, setRespuesta] = useState(null);

    
    async function mostrar(){
        const res = await fetch('http://127.0.0.1:3030/mostrar-users');
        const jsonRes = await res.json();
        setUsuarios(jsonRes);
    }

    const [isAgregarModalOpen, setIsAgregarModalOpen] = useState(false);
    const [isEditarModalOpen, setIsEditarModalOpen] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

    const handleAddUser = (newUser) => {
        setUsuarios([...usuarios, newUser]);
    };

    const handleEditUser = (updatedUser) => {
        setUsuarios(
            usuarios.map((usuario) =>
                usuario.username === usuarioSeleccionado.username ? updatedUser : usuario
            )
        );
    };

    const handleOpenEditModal = (usuario) => {
        setUsuarioSeleccionado(usuario);
        setIsEditarModalOpen(true);
    };
    useEffect(()=>{
        mostrar()
        
    },[])
    return (
        <div className="usuarios-container">
            <div className="header">
                <h1 className="title">Usuarios</h1>
                <div className="actions">
                    <button className="button" onClick={() => setIsAgregarModalOpen(true)}>Agregar Usuario</button>
                </div>
            </div>

            <table className="usuarios-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Correo Electrónico</th>
                        <th>Nombre de Usuario</th>
                        <th>Género</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Tipo de Usuario</th>
                        <th>Departamento</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario, index) => (
                        <tr key={index}>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.apellidos}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.username}</td>
                            <td>{usuario.genero}</td>
                            <td>{usuario.fechaDeNacimiento}</td>
                            <td>{usuario.tipoDeUsuario}</td>
                            <td>{usuario.departamento}</td>
                            <td>
                                <button className="button-action" onClick={() => handleOpenEditModal(usuario)}>Editar</button>
                                <button className="button-action">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ButtonLink to="/" className="button-action">
                Regresar
            </ButtonLink>
            <ModalAgregarUsuario
                isOpen={isAgregarModalOpen}
                onClose={() => setIsAgregarModalOpen(false)}
                onSave={handleAddUser}
            />

            <ModalEditarUsuario
                isOpen={isEditarModalOpen}
                onClose={() => setIsEditarModalOpen(false)}
                onSave={handleEditUser}
                usuario={usuarioSeleccionado}
            />
        </div>
    );
}

export default Usuarios;
