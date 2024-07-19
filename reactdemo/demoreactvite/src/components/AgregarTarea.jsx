import {useState} from "react";

function InsertarTareas(){
    const [nombre,setMessage] = useState('');
    const [setRespuesta] = useState(null);
    async function enviar(){
        if(!nombre){
            alert('Ingrese una tarea');
            return;
        }
        const data = {nombre};
        console.log(nombre);
        const res = await fetch('http://127.0.0.1:3030/tasks',
        {
            body: JSON.stringify(data),
            method:'POST',
            headers:{'Content-Type': 'application/json'}
        });
        const resObj = await res.json();
        
    }
    return (
        <div>
            <table>
                <tr>
                    <td><label htmlFor="txtTarea">Tarea</label></td>
                    <td>
                        <input
                            id="txtTarea"
                            type="text"
                            value={nombre}
                            onChange={(e)=>setMessage(e.target.value)}
                        />
                    </td>
                    <td>
                        <button onClick={enviar}>Enviar</button>
                    </td>
                </tr>
            </table>
        </div>
    )
}
export default InsertarTareas;