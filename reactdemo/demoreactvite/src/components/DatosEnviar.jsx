import { useState } from "react";

/**
 * Componente para enviar datos mediante AJAX al servidor
 */
function DatosEnviar() {

  // para manejar el estao del componente
  const [message, setMessage] = useState('');
  const [respuesta, setRespuesta] = useState(null);

  // función que hace el handle del click del boton "Enviar"
  async function enviar() {

    if (!message) {
      alert('Escriba un mensaje a enviar');
      return;
    }

    // lo que vamos a enviar por POST
    const data = { message };  // { message: message }
    const res = await fetch(
        'http://127.0.0.1:3030/datos',
        {
          body: JSON.stringify(data),  // para convertir nuestro object de javascript en JSON
          method: 'POST',
          headers: {'Content-Type': 'application/json'}
        });
    const resObj = await res.json();  // para obtener el object de respuesta
    
    // cambiamos el estado del componente
    setRespuesta(resObj);
    setMessage('');
  }

  return (
  <div>
    <table>
      <tr>
        <td><label htmlFor="txtMessage">Message: </label></td>
        <td>
          <input 
              id="txtMessage"
              type="text" 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} />
        </td>
        <td>
          <button onClick={enviar}>ENVIAR</button>
        </td>
      </tr>
      <tr>
        <td>message: </td>
        <td>{respuesta ? respuesta.message : '[SIN RESPUESTA]'}</td>
      </tr>
      <tr>
        <td>messageOriginal: </td>
        <td>{respuesta ? respuesta.messageRecibido : '[SIN RESPUESTA]'}</td>
      </tr>
    </table>
  </div>);
}

export default DatosEnviar;
