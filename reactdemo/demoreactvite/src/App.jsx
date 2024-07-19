import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import DataItem from './components/DataItem'
import DatosEnviar from './components/DatosEnviar'
import AgregarTarea from './components/AgregarTarea'
import './App.css'

/**
 * Componente principal de la aplicación de React
 */
function App() {

  // para manejar el estado del componente
  const [count, setCount] = useState(0)
  const [lista, setLista] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Función handler del click del button btnAjax
  const btnAjaxClick = async () => {
    
    setIsLoading(true);
    setLista([]);
    
    // Llamada AJAX
    const res = await fetch('http://127.0.0.1:3030/datos-arr');
    const jsonRes = await res.json();

    // Para establecer el estado del componente con los datos devueltos
    setLista(jsonRes);
    setIsLoading(false);
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={btnAjaxClick}>
          AJAX Call
        </button>
        <DatosEnviar />
        <AgregarTarea />
        
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        {isLoading ? <p>Cargando...</p> : <p></p>}
        {lista.map(item => <DataItem key={item.id} item={item} />)}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p>
        Este es el primer ejemplo de creación de un proyecto usando Vite
      </p>
    </>
  )
}

export default App