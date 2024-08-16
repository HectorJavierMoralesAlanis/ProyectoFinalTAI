import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom'; // Importar el hook useNavigate
import axios from 'axios';

function ButtonLink(){
  return <Link></Link>
}

const SubirExpediente = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    tag: '',
    fechaCreacion: '',
    tipo: '',
    descripcion:'',
  });

  const navigate = useNavigate(); // Inicializar el hook useNavigate

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const uploadData = new FormData();
      uploadData.append('expediente', file);
      Object.keys(formData).forEach((key) => {
        uploadData.append(key, formData[key]);
      });
      //const user = 'aux';
      //const data = {user};
      // Llamada a la función onUpload, que debería manejar el proceso de subir el archivo y el formulario
      onUpload(uploadData);
    } else {
      alert('Por favor selecciona un archivo');
    }
  };

  const handleCancel = () => {
    navigate(-1); // Redirige a la página anterior
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Agregar Expediente</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Nombre</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          placeholder="Nombre"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Descripcion</label>
        <input
          type="text"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          placeholder="Descripcion"
          required
        ></input>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Seleccione el tag</label>
        <select
          name="tag"
          value={formData.tag}
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        >
          <option value="">Seleccione su tag</option>
          <option value="masculino">tag1</option>
          <option value="femenino">tag2</option>
          <option value="otro">Otro</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Fecha de Creacion</label>
        <input
          type="date"
          name="fechaCreacion"
          value={formData.fechaCreacion}
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Tipo de archivo</label>
        <input
          type="text"
          name="tipo"
          value={formData.tipo}
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          placeholder="Tipo de archivo"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Seleccionar Expediente</label>
        <input
          type="file"
          onChange={handleFileChange}
          className="mt-1 block w-full border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="flex justify-between">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Guardar
        </button>
        <button
          type="button"
          onClick={handleCancel} // Agregar el evento onClick para cancelar
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default SubirExpediente;