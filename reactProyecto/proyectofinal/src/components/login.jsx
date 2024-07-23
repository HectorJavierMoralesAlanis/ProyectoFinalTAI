import {useState} from "react";

function Login() {
    
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [respuesta,setRespuesta ] = useState(null);
    //
    async function inicioS(){
        if(!username){
            alert('Escriba un username');
            return;
        }

        //Los datos que se envian username y password
        const data = {username,password};
        const res = await fetch(
            'http://127.0.0.1:3030/datos',
            {
                body: JSON.stringify(data),
                method: 'POST',
                headers: {'Content-Type':'application/json'}
            }
        );
        const resObj = await res.json();
        setRespuesta(resObj);
        setUsername('');
    }
    
    //Formulario para el inicio de sesion
    return (
    <div>
        
        <div className="flex items-center justify-center">
            <div class="relative z-0">
                <input 
                  type="text" 
                  id="username" 
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                  placeholder="" 
                  value={username}
                  onChange={(e)=>setUsername(e.target.value)}/>
                <label for="username" class="absolute text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                    Username
                </label>
            </div>
        </div>
        <br/>
        <div className="flex items-center justify-center">
            <div class="relative z-0">
                <input 
                  type="password" 
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                  placeholder="" 
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
                <label for="password" class="absolute text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Password</label>
            </div>
        </div>
        <br/>
        <div className="flex items-center justify-center">
          <button onClick={inicioS} type="submit" className="text-white bg-blue-700  hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Iniciar Sesion
          </button>
        </div>
        <h1>{respuesta ? respuesta.message:"[No]"}</h1>
    </div>
    )
}
export default Login;