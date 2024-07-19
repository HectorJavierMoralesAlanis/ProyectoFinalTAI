const express = require('express');
const cors = require('cors');
//const db = require('./db');

const app = express();
const port = 3030;

//Middlewares
app.use(cors());
app.use(express.json());

//Get / 
app.get('/',(req,res)=>{
    res.send('root');
});

app.get('/datos',(req,res)=>{
    console.log(req.body.message);
    res.json({
        message: "Datos Recibidos",
        messageRecibido: req.body.message
    });
});


//Ejecuta la app
app.listen(port,()=>{
    console.log(`Executandose en el puerto ${port}`);
});