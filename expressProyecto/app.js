const express = require('express');
const cors = require('cors');
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
            apellidos: row.fechaDeNacimiento,
            email: row.email,
            tipoDeUsuario: row.tipoDeUsuario,
            departamento: row.departamento,
            fechaHoraDeRegistro: row.fechaHoraDeRegistro,
            fechaDeUltimaModificacion: row.fechaDeUltimaModificacion
        };
    };
    console.log(rowToObjR);
    const jsonRes = rows.map(rowToObjR);
    console.log(jsonRes);
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
    var passwordaux = "HOlA";

    console.log(req.body);
    //Creacion del salt y del hash
    const salt = await bcrypt.genSalt(10);
    const hash = crypto.createHash('sha512');
    console.log(salt);
    //Hash password
    //const hashedPassword = hash.update(passwordaux+salt,'utf-8');
    /*const isPassword=await bcrypt.compare(passwordaux,hashedPassword);
    if(isPassword){
        console.log('dskjfbn');
    }else{
        console.log('no')
    }*/
    const hashedPassword = await bcrypt.hash(passwordaux,salt);
    //gen_hash = hashedPassword.digest('hex');
    const key = pbkdf2Sync('secret','salt',100000,64,'sha512')
    console.log("COn la funcion nueva "+key.toString('hex'));
    //console.log('contra hash: '+gen_hash);
    const isPassword = await bcrypt.compare(passwordaux,hashedPassword);
    if(isPassword){
        console.log("dskjfb");
    }else{
        console.log("no");
    }
    //Creacion del objeto hash
    //var hash = crypto.createHash('sha512');
    //var contra;
    ///////
    console.log("Contra Original: "+req.body.password);
    //var resultado = hashPassword(req.body.password);
    //console.log(resultado);
    /*aux=crypto.pbkdf2(req.body.password,'salt',100000,64,'sha512',(err,derivedKey)=>{
        if(err)throw err;
        aux = derivedKey.toString('hex');
        console.log("final "+ aux);
        hashPassword();
        return aux;
    });*/
    //console.log("hash contra: "+aux);
    //////

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
    
        //console.log(newpass);
        console.log(nh)
        const {username} = req.body;
        const sqlCmdInsert = 
            'INSERT INTO aux (username,password) VALUES (?,?)';
        const p = [username,hash];
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
    //if(username=="")
    const sqlCmdSelect = "SELECT * FROM username WHERE username = ? and password = ?";
    const p = [req.body.username,req.body.password];
    const [result] = await db.query(sqlCmdSelect,p);
    console.log(result);
    if(result.length>0){
        //console.log('si');
        if(result[0]['tipoDeUsuario']=="admin"){
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