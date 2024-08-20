const express = require('express');
const cors = require('cors');
const dateFns = require('date-fns');
const db = require('./db');
const crypto = require('crypto');
const argon2 = require('argon2');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3030;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
    res.send('root');
});

// Mostrar todos los usuarios
app.get('/mostrar-users', async (req, res) => {
    const sqlCmd = "SELECT * FROM username";
    const [rows, fields] = await db.query(sqlCmd);

    const rowToObjR = row => {
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

    const jsonRes = rows.map(rowToObjR);
    res.json(jsonRes);
});

// Ingresar datos de un nuevo usuario
app.post('/ingresar-datos', async (req, res) => {
    const hashingConfig = {
        parallelism: 1,
        memoryCost: 64000,
        timeCost: 4
    };

    async function hashPassword(password) {
        let salt = crypto.randomBytes(16);
        return await argon2.hash(password, {
            ...hashingConfig,
            salt,
        });
    }

    const newpass = await hashPassword(req.body.password);

    const username = req.body.username;
    const nombre = req.body.nombre;
    const apellidos = req.body.apellidos;
    const genero = req.body.genero;
    const fechaDeNacimiento = req.body.fechaNacimiento;
    const email = req.body.email;
    const tipoDeUsuario = req.body.tipoUsuario;
    const departamento = req.body.departamento;
    const now = new Date();
    const fechaHoraDeRegistro = dateFns.format(now, 'yyyy-MM-dd HH:mm:ss');
    
    const sqlCmdInsert = 
        'INSERT INTO username (username, password, nombre, apellidos, genero, fechaDeNacimiento, email, tipoDeUsuario, departamento, fechaHoraDeRegistro, fechaDeUltimaModificacion) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
    const p = [username, newpass, nombre, apellidos, genero, fechaDeNacimiento, email, tipoDeUsuario, departamento, fechaHoraDeRegistro, fechaHoraDeRegistro];
    
    const [result] = await db.query(sqlCmdInsert, p);
    const resObj = { id: result.insertId };
    
    res.json({
        message: "Usuario ingresado correctamente",
        userRecibido: req.body.username
    });
});

// Iniciar sesión
app.post('/login', async (req, res) => {
    const hashingConfig = {
        parallelism: 1,
        memoryCost: 64000,
        timeCost: 4
    };

    async function verifyPasswordWithHash(password, hash) {
        return await argon2.verify(hash, password, hashingConfig);
    }

    const sqlCmdSelect = "SELECT * FROM username WHERE username = ?";
    const p = [req.body.username];
    const [result] = await db.query(sqlCmdSelect, p);

    if (result.length > 0) {
        const password = await verifyPasswordWithHash(req.body.password, result[0]['password']);
        if (result[0]['tipoDeUsuario'] === "admin" && password) {
            res.json({ message: "Datos Recibidos Admin" });
        } else {
            res.json({ message: "Datos Recibidos No Admin" });
        }
    } else {
        res.json({ message: "Usuario No Encontrado" });
    }
});

// Ruta para eliminar un usuario
app.delete('/eliminar-user/:username', async (req, res) => {
    const username = req.params.username;
    console.log('Intentando eliminar usuario:', username);  // Para verificar que el nombre de usuario es correcto

    try {
        const sqlCmdDelete = 'DELETE FROM username WHERE username = ?';
        const [result] = await db.query(sqlCmdDelete, [username]);

        if (result.affectedRows > 0) {
            res.status(200).send({ message: `Usuario ${username} eliminado con éxito` });
        } else {
            res.status(404).send({ message: `Usuario ${username} no encontrado` });
        }
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).send({ message: 'Error al eliminar el usuario' });
    }
});

app.put('/editar-user/:username', async (req, res) => {
    const username = req.params.username;
    console.log('Intentando editar usuario:', username);  // Para verificar el nombre de usuario

    const { nombre, apellidos, email, genero, fechaDeNacimiento, tipoDeUsuario, departamento } = req.body;

    try {
        const sqlCmdUpdate = 'UPDATE username SET nombre = ?, apellidos = ?, email = ?, genero = ?, fechaDeNacimiento = ?, tipoDeUsuario = ?, departamento = ? WHERE username = ?';
        const values = [nombre, apellidos, email, genero, fechaDeNacimiento, tipoDeUsuario, departamento, username];
        const [result] = await db.query(sqlCmdUpdate, values);

        if (result.affectedRows > 0) {
            res.status(200).send({ message: `Usuario ${username} actualizado con éxito` });
        } else {
            res.status(404).send({ message: `Usuario ${username} no encontrado` });
        }
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).send({ message: 'Error al actualizar el usuario' });
    }
});







// Configuración de almacenamiento para multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos subidos
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

// Ruta para manejar la subida del archivo
app.post('/upload', upload.single('expediente'), async (req, res) => {
    const url = "none";
    const now = new Date();
    const fechaHoraDeRegistro = dateFns.format(now, 'yyyy-MM-dd HH:mm:ss');
    
    const sqlCmdInsert = 
        'INSERT INTO documentos (clave_unica, titulo_del_documento, descripcion_del_documento, fecha_del_documento, tipo_de_archivo, size, nombre_original, url, sha256, fecha_hora_regitro) VALUES (?,?,?,?,?,?,?,?,?,?)';
    const parametros = [req.file.filename, req.body.nombre, req.body.descripcion, req.body.fechaCreacion, req.body.tipo, req.file.size, req.file.originalname, url, uuidv4(), fechaHoraDeRegistro];
    
    const [result] = await db.query(sqlCmdInsert, parametros);
    
    try {
        res.status(200).json({ message: 'Expediente subido correctamente', filePath: req.file.path });
    } catch (error) {
        res.status(500).json({ message: 'Error al subir el expediente', error });
    }
});

// Endpoint para obtener la lista de documentos
app.get('/documentos', async (req, res) => {
    const query = 'SELECT * FROM documentos';
    const [rows, fields] = await db.query(query);

    const rowToObjR = row => {
        return {
            id: row.id,
            clave_unica: row.clave_unica,
            titulo_del_documento: row.titulo_del_documento,
            descripcion_del_documento: row.descripcion_del_documento,
            fecha_del_documento: row.fecha_del_documento,
            tipo_de_archivo: row.tipo_de_archivo,
            size: row.size,
            nombre_original: row.nombre_original,
            url: row.url,
            sha256: row.sha256,
            fecha_hora_registro: row.fecha_hora_registro,
        };
    };

    const jsonRes = rows.map(rowToObjR);
    res.json(jsonRes);
});

// Ejecutar la app
app.listen(port, () => {
    console.log(`Ejecutándose en el puerto ${port}`);
});
