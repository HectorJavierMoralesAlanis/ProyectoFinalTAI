import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

const GestionDocumentos = ({onUpload})=>{
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    tag: '',
    fechaCreacion: '',
    tipo: '',
    descripcion:'',
    tipoArchivo:'',
    file: null,
    url: '',
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
    <form className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-primary mb-4">Gestión de Documentos</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-muted-foreground">Título del Documento</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-border rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-muted-foreground">Descripción</label>
          <textarea
            type="text"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-border rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-muted-foreground">Tag</label>
          <input
            type="text"
            name="tag"
            value={formData.tag}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-border rounded-md p-2"
          />
        </div>
    
        <div className="mb-4">
          <label className="block text-sm font-medium text-muted-foreground">Fecha del Documento</label>
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
          <label className="block text-sm font-medium text-muted-foreground">Tipo</label>
          <input
            type="text"
            name="tipo"
            value={formData.tipo}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-border rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-muted-foreground">Subir Archivo</label>
          <input
            type="file"
            name="file"
            accept=".pdf,.doc,.txt,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.tiff,.gif"
            onChange={handleFileChange}
            className="mt-1 block w-full border border-border rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-muted-foreground">O URL del Documento</label>
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-border rounded-md p-2"
          />
        </div>

        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white font-semibold p-3 rounded-md shadow-md hover:bg-blue-600 transition duration-300 w-full"
          >
            Agregar Documento
          </button>
        </div>
        <br></br>
        <button
            onClick={handleCancel}
            className="bg-red-500 text-white font-semibold p-3 rounded-md shadow-md hover:bg-red-600 transition duration-300 w-full"
          >
            Cancelar
          </button>
        
    </form>
    

    
  );
};

export default GestionDocumentos;
