const express = require('express');
const cors = require('cors');
const dateFns = require('date-fns')
const db = require('./db');
const crypto = require('crypto');
const argon2 = require('argon2');
const {pbkdf2Sync} = require('crypto');
const bcrypt = require('bcrypt');
const app = express();
const port = 3030;

//Middlewares
app.use(cors());
app.use(express.json());

//Get / 
app.get('/',(req,res)=>{
    res.send('root');
});

app.get("/mostrar-users",async(req,res)=>{
    
    //Traer usuarios
    const sqlCmd = "SELECT * FROM username";
    const [rows, filds] = await db.query(sqlCmd);

    const rowToObjR = row =>{
        return {
            id: row.id,
            username: row.username,
            password: row.password,
            nombre: row.nombre,
            apellidos: row.apellidos,
            fechaDeNacimiento: row.fechaDeNacimiento,
            genero: row.genero,
            email: row.email,
            tipoDeUsuario: row.tipoDeUsuario,
            departamento: row.departamento,
            fechaHoraDeRegistro: row.fechaHoraDeRegistro,
            fechaDeUltimaModificacion: row.fechaDeUltimaModificacion
        };
    };
    //console.log(rowToObjR);
    const jsonRes = rows.map(rowToObjR);
    //console.log(jsonRes);
    res.json(jsonRes);
});
function hashPassword(password){
    return crypto.pbkdf2(password,'salt',100000,64,'sha512',(err,derivedKey)=>{
        if(err)throw err;
        return console.log("final " + derivedKey.toString('hex'));
        //return 'aux';
    })
    //return 'si';
}
app.post('/ingresar-datos',async(req,res)=>{
    //req.body.password = "FaltoPassoword";
    console.log("Nombre"+req.body.username);

    const hashingConfig={
        parallelism: 1,
        memoryCost:64000,
        timeCost:4
    }
    async function hashPassword(password){
        let salt = crypto.randomBytes(16);
        return await argon2.hash(password,{
            ...hashingConfig,
            salt,
        })
    }
    async function verifyPasswordWithHash(password,hash){
        return await argon2.verify(hash,password,hashingConfig);
    }
    hashPassword("somePassword1").then(async (hash)=>{
        console.log("HASH + SALT OF THE PASSWORD"+hash)
        console.log("Password verication succes: ",await verifyPasswordWithHash("somePassword1",hash))
    })
    const newpass = hashPassword(req.body.password).then(async(hash)=>{
        var nh = hash;
    
        console.log(newpass);
        console.log(nh)
        const username = req.body.username;
        const nombre = req.body.nombre;
        const apellidos = req.body.apellidos;
        const genero = req.body.genero;
        const fechaDeNacimiento = req.body.fechaNacimiento;
        const email = req.body.email;
        const tipoDeUsuario = req.body.tipoUsuario;
        const departamento = req.body.departamento;
        const now = new Date();
        const fechaHoraDeRegistro =dateFns.format(now,'yyyy-MM-dd HH:mm:ss');
        const sqlCmdInsert = 
            'INSERT INTO username (username,password,nombre,apellidos,genero,fechaDeNacimiento,email,tipoDeUsuario,departamento,fechaHoraDeRegistro,fechaDeUltimaModificacion) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
        const p = [username,hash,nombre,apellidos,genero,fechaDeNacimiento,email,tipoDeUsuario,departamento,fechaHoraDeRegistro,fechaHoraDeRegistro];
        const [result] = await db.query(sqlCmdInsert,p);
        const resObj = {
            id:result.insertId
        }
        console.log(resObj);
        res.json({
            menssage:"si",
            userRecibido: req.body.username
        });
    });
});
//Ingresar a la cuenta
app.post('/login', async(req, res) => {
    console.log(req.body.username);
    const hashingConfig={
        parallelism:1,
        memoryCost: 64000,
        timeCost:4
    }
    async function verifyPasswordWithHash(password,hash){
        return await argon2.verify(hash,password,hashingConfig);
    }
    //const password = await verifyPasswordWithHash();
    //if(username=="")
    const sqlCmdSelect = "SELECT * FROM username WHERE username = ?";
    const p = [req.body.username];
    const [result] = await db.query(sqlCmdSelect,p);
    console.log(result);
    const password = await verifyPasswordWithHash(req.body.password,result[0]['password']);
    console.log(password)
    if(result.length>0){
        //console.log('si');
        if(result[0]['tipoDeUsuario']=="admin"&&password){
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