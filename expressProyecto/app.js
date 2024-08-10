const express = require('express');
const cors = require('cors');
const db = require('./db');
 
const app = express();
const port = 3030;

//Middlewares
app.use(cors());
app.use(express.json());

//Get / 
app.get('/',(req,res)=>{
    res.send('root');
});

app.get("/datos-arr",(req,res)=>{
    const arr=[];
    for(let i = 0; i<10;i++){
        arr.push({
            id:i+1,
            nombre:`data ${i+1}`
        });
    }
    setTimeout(()=>{res.json(arr)},500);
})
/*app.post('/datos',async(req,res)=>{
    console.log(req.body);
    const {username} = req.body;
    const sqlCmdInsert = 
        'INSERT INTO aux (username) VALUES (?)';
    const p = [username];
    const [result] = await db.query(sqlCmdInsert,p);
    const resObj = {
        id:result.insertId
    }
    console.log(resObj);
    res.json({
        menssage:"si",
        userRecibido: req.body.username
    });
});*/
app.post('/datos', async(req, res) => {
    console.log(req.body.username);
    //if(username=="")
    const sqlCmdSelect = "SELECT * FROM username WHERE username = ? and password = ?";
    const p = [req.body.username,req.body.password];
    const [result] = await db.query(sqlCmdSelect,p);
    console.log(result);
    if(result.length>0){
        //console.log('si');
        if(result[0]['tipo']=="admin"){
            console.log("ES ADMINISTRADOR");
            res.json({
            message: "Datos Recibidos Admin", 
            });
        }else{
            res.json({
                message:"Datos Recidos No Admin"
            })
        }
    }else{
        res.json({
            message:"Usuario No Encontrado"
        })
    }
});


//Ejecuta la app
app.listen(port,()=>{
    console.log(`Executandose en el puerto ${port}`);
});