 import { useState, useEffect } from "react";
 import {Link} from 'react-router-dom';


 function ButtonLink({to,children,className}){
  return <Link to={to}><button className={className}>{children}</button></Link>
}

 function Expediente() {
   const [tipoExpediente, setTipoExpediente] = useState("");
   const [numeroExpediente, setNumeroExpediente] = useState("");
   const [tags, setTags] = useState([]);
   const [expedientes, setExpedientes] = useState([]);
   const [editIndex, setEditIndex] = useState(null);
   const [mostrarModal, setMostrarModal] = useState(false);

   useEffect(() => {
     async function fetchExpedientes() {
       const res = await fetch("http://127.0.0.1:3030/expediente");
       const data = await res.json();
       setExpedientes(data);
     }
     fetchExpedientes();
   }, []);

   async function guardarExpediente() {
     if (!tipoExpediente || !numeroExpediente) {
       alert("Completa todos los campos");
       return;
     }

     const nuevoExpediente = { tipoExpediente, numeroExpediente, tags };

     if (editIndex !== null) {
       const updatedExpedientes = [...expedientes];
       updatedExpedientes[editIndex] = nuevoExpediente;
       setExpedientes(updatedExpedientes);
       setEditIndex(null);
     } else {
       const res = await fetch("http://127.0.0.1:3030/expediente", {
         body: JSON.stringify(nuevoExpediente),
         method: "POST",
         headers: { "Content-Type": "application/json" },
       });
       const data = await res.json();
       setExpedientes([...expedientes, data]);
     }

     setTipoExpediente("");
     setNumeroExpediente("");
     setTags([]);
     setMostrarModal(false);
   }

   function editarExpediente(index) {
     const expediente = expedientes[index];
     setTipoExpediente(expediente.tipoExpediente);
     setNumeroExpediente(expediente.numeroExpediente);
     setTags(expediente.tags);
     setEditIndex(index);
     setMostrarModal(true);
   }

   async function eliminarExpediente(index) {
     const expediente = expedientes[index];
     const res = await fetch(`http://127.0.0.1:3030/expediente/${expediente.id}`, {
       method: "DELETE",
     });

     if (res.ok) {
       const updatedExpedientes = expedientes.filter((_, i) => i !== index);
       setExpedientes(updatedExpedientes);
     }
   }

   function agregarTag() {
     if (tags.includes("")) return;
     setTags([...tags, ""]);
   }

   function manejarCambioTag(index, value) {
     const newTags = [...tags];
     newTags[index] = value;
     setTags(newTags);
   }

   function eliminarTag(index) {
     const newTags = tags.filter((_, i) => i !== index);
     setTags(newTags);
   }

   return (
     <div className="container mx-auto p-4">
       <div className="flex justify-between items-center mb-6">
         <h1 className="text-2xl font-bold">Expedientes</h1>
         <div className="flex items-center space-x-2">
         <ButtonLink to="/agregarExpediente" className="bg-red-500 text-white font-semibold p-3 rounded-md shadow-md hover:bg-red-600 transition duration-300 w-full">
            Agregar Expediente
          </ButtonLink>
           <button
             onClick={() => setMostrarModal(true)}
             className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
           >
             Crear Expediente
           </button>
           <button
             className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
           >
             Tipos de Expediente
           </button>
           <button
             className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
           >
             Tags
           </button>
         </div>
       </div>

       {/* Modal para el formulario de creación/edición */}
       {mostrarModal && (
         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
           <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
             <div className="flex justify-between items-center mb-4">
               <h2 className="text-xl font-bold">{editIndex !== null ? "Editar Expediente" : "Crear Expediente"}</h2>
               <button
                 onClick={() => setMostrarModal(false)}
                 className="text-gray-500 hover:text-gray-700"
               >
                 &times;
               </button>
             </div>

             <div className="grid grid-cols-1 gap-4">
               <div className="relative z-0 w-full mb-6 group">
                 <select
                   id="tipoExpediente"
                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                   value={tipoExpediente}
                   onChange={(e) => setTipoExpediente(e.target.value)}
                 >
                   <option value="" disabled hidden>Seleccione un tipo</option>
                   <option value="ABC">ABC</option>
                   <option value="DEF">DEF</option>
                   <option value="GHI">GHI</option>
                 </select>
                 <label
                   htmlFor="tipoExpediente"
                   className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                 >
                   Tipo de Expediente
                 </label>
               </div>

               <div className="relative z-0 w-full mb-6 group">
                 <input
                   type="text"
                   id="numeroExpediente"
                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                   placeholder=" "
                   value={numeroExpediente}
                   onChange={(e) => setNumeroExpediente(e.target.value)}
                 />
                 <label
                   htmlFor="numeroExpediente"
                   className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                 >
                   Número de Expediente
                 </label>
               </div>
             </div>

             <div className="grid grid-cols-1 gap-4 mb-4">
               {tags.map((tag, index) => (
                 <div key={index} className="relative z-0 flex items-center group">
                   <select
                     className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                     value={tag}
                     onChange={(e) => manejarCambioTag(index, e.target.value)}
                   >
                     <option value="" disabled hidden>Seleccione un tag</option>
                     <option value="123">123</option>
                     <option value="456">456</option>
                     <option value="789">789</option>
                   </select>
                   <button
                     type="button"
                     className="ml-2 text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
                     onClick={() => eliminarTag(index)}
                   >
                     Eliminar
                   </button>
                 </div>
               ))}
               <button
                 type="button"
                 className="text-gray-900 bg-gray-200 px-4 py-2 rounded-lg w-full hover:bg-gray-300"
                 onClick={agregarTag}
               >
                 Agregar Tag
               </button>
             </div>

             <div className="flex justify-end">
               <button
                 onClick={guardarExpediente}
                 type="submit"
                 className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
               >
                Guardar
               </button>
             </div>
           </div>
         </div>
       )}

       {/* Tabla para mostrar expedientes */}
       <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md">
         <table className="min-w-full bg-white border">
           <thead>
             <tr>
               <th className="px-6 py-2 text-gray-500 text-left">Tipo</th>
               <th className="px-6 py-2 text-gray-500 text-left">Número de Expediente</th>
               <th className="px-6 py-2 text-gray-500 text-left">Status</th>
               <th className="px-6 py-2 text-gray-500 text-left">Ultima actualización</th>
               <th className="px-6 py-2 text-gray-500 text-left">Acceso</th>
               <th className="px-6 py-2 text-gray-500 text-left">Acciones</th>
             </tr>
           </thead>
           <tbody>
             {expedientes.length > 0 ? (
               expedientes.map((expediente, index) => (
                 <tr key={index} className="border-t">
                   <td className="px-6 py-4">{expediente.tipoExpediente}</td>
                   <td className="px-6 py-4">{expediente.numeroExpediente}</td>
                   <td className="px-6 py-4">{expediente.status}</td>
                   <td className="px-6 py-4">{expediente.ultimaActualizacion}</td>
                   <td className="px-6 py-4">{expediente.acceso}</td>
                   <td className="px-6 py-4 flex space-x-4">
                     <button
                       onClick={() => editarExpediente(index)}
                       className="text-blue-600 hover:text-blue-900"
                     >
                       Editar
                     </button>
                     <button
                       onClick={() => eliminarExpediente(index)}
                       className="text-red-600 hover:text-red-900"
                     >
                       Eliminar
                     </button>
                   </td>
                 </tr>
               ))
             ) : (
               <tr>
                 <td
                   colSpan="6"
                   className="px-6 py-4 text-center text-gray-500"
                 >
                   No hay expedientes disponibles.
                 </td>
               </tr>
             )}
           </tbody>
         </table>
       </div>
     </div>
   );
 }

export default Expediente;
