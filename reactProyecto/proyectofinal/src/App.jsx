import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './components/login'
import './App.css'

function App() {

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="w-1/2 py-4 mx-auto bg-slate-200 ">
          <h1 className="text-4xl text-center py-8 font-bold">Login</h1>
          <Login />
        </div>
      </div>
    
    </>
  )
}

export default App
