import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ButtonLink({to,children,className}){
  return <Link to={to}><button className={className}>{children}</button></Link>
}
const Main = () => {
  const [archivos, setArchivos] = useState([]);

  useEffect(() => {
    // Solicitud para obtener los documentos
    const fetchArchivos = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3030/documentos');
        const data = await response.json();
        //console.log('dsfj')
        console.log(data);
        setArchivos(data);
      } catch (error) {
        console.error('Error al obtener los archivos:', error);
      }
    };

    fetchArchivos();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <aside className="w-64 bg-white dark:bg-gray-800 p-6 shadow-lg">
        <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-6">Apartados</h2>
        <div className="space-y-4">
          <ButtonLink to="/expediente" className="bg-blue-500 text-white font-semibold p-3 rounded-md shadow-md hover:bg-blue-600 transition duration-300 w-full">
            Crear carpeta
          </ButtonLink>
          <ButtonLink to="/users" className="bg-green-500 text-white font-semibold p-3 rounded-md shadow-md hover:bg-green-600 transition duration-300 w-full">
            Gestión de usuario
          </ButtonLink>
          <ButtonLink to="/expediente" className="bg-yellow-500 text-white font-semibold p-3 rounded-md shadow-md hover:bg-yellow-600 transition duration-300 w-full">
            Gestión de Expedientes
          </ButtonLink>
          <ButtonLink to="/documentos" className="bg-green-500 text-white font-semibold p-3 rounded-md shadow-md hover:bg-green-600 transition duration-300 w-full">
            Documentos
          </ButtonLink>
          <ButtonLink to="/logout" className="bg-red-500 text-white font-semibold p-3 rounded-md shadow-md hover:bg-red-600 transition duration-300 w-full">
            Logout
          </ButtonLink>
        </div>
      </aside>

      <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-800">
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Buscar"
            className="border border-gray-300 dark:border-gray-700 rounded-md p-2 w-1/3 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">Todos los archivos</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {archivos.map((archivo) => (
            <div key={archivo.id} className="p-4 bg-white dark:bg-gray-700 shadow-md rounded-md">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">{archivo.titulo_del_documento}</h3>
              <p className="text-gray-600 dark:text-gray-400">{archivo.descripcion}</p>
              <p className="text-sm text-gray-500 dark:text-gray-300">Fecha: {new Date(archivo.fecha_del_documento).toLocaleDateString()}</p>
              {archivo.archivo && (
                <a
                  href={`http://127.0.0.1:3030/uploads/${archivo.archivo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 dark:text-blue-300 hover:underline"
                >
                  Ver archivo
                </a>
              )}
              {archivo.url && (
                <a
                  href={archivo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 dark:text-blue-300 hover:underline"
                >
                  Ver URL
                </a>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Main;



