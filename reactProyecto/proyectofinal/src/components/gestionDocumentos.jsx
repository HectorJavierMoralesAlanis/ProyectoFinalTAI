import React, { useState } from 'react';

function GestionDocumentos() {
  const [documentos, setDocumentos] = useState([]);
  const [nuevoDocumento, setNuevoDocumento] = useState({
    titulo: '',
    descripcion: '',
    fecha: '',
    tipoArchivo: '',
    archivo: null,
    url: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoDocumento({ ...nuevoDocumento, [name]: value });
  };

  const handleFileChange = (e) => {
    setNuevoDocumento({ ...nuevoDocumento, archivo: e.target.files[0] });
  };

  const handleAgregarDocumento = async () => {
    const formData = new FormData();
    formData.append('titulo', nuevoDocumento.titulo);
    formData.append('descripcion', nuevoDocumento.descripcion);
    formData.append('fecha', nuevoDocumento.fecha);
    formData.append('url', nuevoDocumento.url);
    if (nuevoDocumento.archivo) {
      formData.append('archivo', nuevoDocumento.archivo);
    }
  
    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
  
      const result = await response.json();
      console.log(result.message); // Mostrar mensaje de éxito
    } catch (error) {
      console.error('Error al agregar documento:', error);
    }
  
    setNuevoDocumento({
      titulo: '',
      descripcion: '',
      fecha: '',
      tipoArchivo: '',
      archivo: null,
      url: '',
    });
  };
  
  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-primary mb-4">Gestión de Documentos</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-muted-foreground">Título del Documento</label>
        <input
          type="text"
          name="titulo"
          value={nuevoDocumento.titulo}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-border rounded-md p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-muted-foreground">Descripción</label>
        <textarea
          name="descripcion"
          value={nuevoDocumento.descripcion}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-border rounded-md p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-muted-foreground">Fecha del Documento</label>
        <input
          type="date"
          name="fecha"
          value={nuevoDocumento.fecha}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-border rounded-md p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-muted-foreground">Subir Archivo</label>
        <input
          type="file"
          name="archivo"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.tiff,.gif"
          onChange={handleFileChange}
          className="mt-1 block w-full border border-border rounded-md p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-muted-foreground">O URL del Documento</label>
        <input
          type="url"
          name="url"
          value={nuevoDocumento.url}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-border rounded-md p-2"
        />
      </div>

      <div className="text-center">
        <button
          onClick={handleAgregarDocumento}
          className="bg-red-500 text-white font-semibold p-3 rounded-md shadow-md hover:bg-red-600 transition duration-300 w-full"
        >
          Agregar Documento
        </button>
      </div>
    </div>
  );
}

export default GestionDocumentos;
