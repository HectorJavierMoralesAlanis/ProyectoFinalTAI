import React from 'react';
import GestionDocumentos from './gestionDocumentos';
import axios from 'axios';


const Documentos = () => {
  return (
    <div>
      <GestionDocumentos onUpload={onUpload} />
    </div>
  );
};
const onUpload = async (formData) => {
  try {
    const response = await axios.post('http://localhost:3030/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200) {
      alert('Expediente subido correctamente');
    }
  } catch (error) {
    alert('Error al subir el expediente');
  }
};

export default Documentos;