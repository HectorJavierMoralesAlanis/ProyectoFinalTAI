import {useState} from "react";
function MostrarDatos(){
    const [lista,setLista] = useState([]);
    const [isLOading,setIsLoading] = useState(false);
    const btnLista = async() => {
        setIsLoading(true);
        setLista([]);
        const res =await fetch('http://127.0.0.1:3030/tasks');
        const jsonRes=await res.json();

        setLista(jsonRes);
        setIsLoad(false);
    }
    return(
        <div>
            <button onclick={btnLista}>Mostrar Tareas</button>
        </div>
    )
}