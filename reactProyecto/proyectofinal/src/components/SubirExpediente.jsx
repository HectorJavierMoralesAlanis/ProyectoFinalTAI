import React, { useState } from 'react';
import axios from 'axios';

const SubirExpediente = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('expediente', file);

      // Llamada a la función onUpload, que debería manejar el proceso de subir el archivo
      onUpload(formData);
    } else {
      alert('Por favor selecciona un archivo');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded">
      <div className="mb-4">
        <label className="block text-gray-700">Seleccionar Expediente</label>
        <input
          type="file"
          onChange={handleFileChange}
          className="mt-1 block w-full border border-gray-300 rounded-md"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Subir Expediente
      </button>
    </form>
  );
};

export default SubirExpediente;