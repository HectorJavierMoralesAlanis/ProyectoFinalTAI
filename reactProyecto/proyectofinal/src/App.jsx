import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  async function enviar(){
   //alert(username);
    if(!password){
      alert("USername incorrecto");
      return;
    }
    const data = {username,password};
    console.log(data);
    //const res = await fetch('http://127.0.0.1:3030/saludo-html',{});
    const res = await fetch('http://127.0.0.1:3030/datos',
    {
      body: JSON.stringify(data),
      method: 'POST',
      headers:{'content-Type': 'application/json'}
    });
    const resObj = await res.json();
    console.log(resObj);
    alert(resObj);
    //alert('dsjhfbv');
  }
  /*const onSubmit = (data)=>{
    console.log(data);
  };*/

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="w-1/2 py-4 mx-auto bg-slate-200 ">
          <h1 className="text-4xl text-center py-8 font-bold">Login</h1>
          <form action="POST" onSubmit={enviar}>
            <div className="flex items-center justify-center">
              <div class="relative z-0">
                <input 
                  type="text" 
                  id="username" 
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                  placeholder="" 
                  value={username}
                  onChange={(e)=>setUsername(e.target.value)}/>
                <label for="username" class="absolute text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Username</label>
              </div>
            </div>
            <br/>
            <div className="flex items-center justify-center">
              <div class="relative z-0">
                <input 
                  type="password" 
                  id="password" 
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
              <button type="submit" className="text-white bg-blue-700  hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Iniciar Sesion</button>
            </div>
          </form>
        </div>
      </div>
      
    </>
  )
}

export default App
