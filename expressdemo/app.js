// Imports de referencias que necesitamos para la aplicación
const express = require('express');  // Módulo principal para la app de Express
const cors = require('cors');  // Para permitir el Cross Domain
const dateFns = require('date-fns');  // Manejo de fechas
const db = require('./db');  // para trabajar con DB

const app = express();
const port = 3030;  // Podemos modificar el puerto según necesitamos

// Middlewares
app.use(cors());   
app.use(express.json());

// GET /  :: Regresamos texto de prueba, solo para testing de nuestra API
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// GET /saludo-json  ::  Regresa una respuseta JSON de prueba
app.get('/saludo-json', (req, res) => {
    let resObj = {
        saludo: 'Hola Mundo!'
    };    
    res.json(resObj);
});

// GET /datos-arr   :: Para datos de prueba
app.get("/datos-arr", (req, res) => {

  // generación de datos de prueba
  const arr = [];
  for (let i = 0; i < 10; i++) {
    arr.push({
      id: i + 1,
      nombre: `data ${i + 1}`
    });
  }

  // Para simular el proceso de consulta o consumo de IO
  setTimeout(() => { res.json(arr) }, 500);
});

// GET /saludo-html  :: regresamos texto HTML
app.get('/saludo-html', (req, res) => {
    // Si queremos regresar HTML normalmente usamos un template y un template engine
    // para llenar con datos ese template
    res.send('<html><body><h1>Hola Mundo!</h1></body></html>');
});

// POST /datos  ::  Recibir un JSON, recibir datos en obj { "message": "Hola!" }
app.post('/datos', (req, res) => {
    console.log(req.body.message);
    res.json({
      message: "Datos Recibidos", 
      messageRecibido: req.body.message
    });
});

// GET /tasks  ::  Obtiene todas las tareas consultando DB
app.get('/tasks', async (req, res) => {

  // Obteniendo los datos de la DB
  const sqlCmd = "SELECT * FROM tareas";
  const [rows, fields] = await db.query(sqlCmd);

  // De los registros obtenidos de la DB, creamos los objetos que necesitamos
  // regresar, para esto tranformamos con la función map del array de rows
  // que se regresó de la consulta.
  const rowToObjR = row => {  // función para convertir el row de la consulta al obj que necesitamos en la resuesta
    return {
      id: row.id, 
      descripcion: row.descripcion, 
      fechaCaduca: row.fecha_caduca, 
      concluido: row.concluido != 0
    };
  };
  const jsonRes = rows.map(rowToObjR);  // array de obj que vamos a regresar

  // return de la respuesta como JSON
  res.json(jsonRes);
});

// POST /tasks  ::  Para agregar una tarea, con datos enviados en JSON
app.post('/tasks', async (req, res) => {

  // Datos que necesitamos para hacer el insert en DB
  const now = new Date();
  const nowStr = dateFns.format(now, 'yyyy-MM-dd HH:mm:ss');
  const { nombre } = req.body;

  // Llamada a DB de la operación insert
  const sqlCmdInsert = 
    'INSERT INTO tareas' +
    '  (Nombre, fecha_registro, concluido)' +
    ' VALUES (?, ?, 0)';
  const p = [nombre, nowStr];  // parámetros a enviar
  const [result] = await db.query(sqlCmdInsert, p);  // obtenemos un result obj

  const resObj = {   // obj que vamos a regresaar
    id: result.insertId
  };

  res.json(resObj);  // return del obj como JSON
});

// PATCH /tasks/task-concluido  para actualizar tarea como concluida
// se envía un JSON  { "id": 1, "concluido": true}
app.patch('/tasks/task-concluido', async (req, res) => {
  
  // Datos que necesitamos para acutalizar el task/tarea como completado
  const { id, concluido } = req.body;

  // Actualización del registro en DB
  const sqlCmd = 'UPDATE tareas SET concluido = ? WHERE id = ?';
  const sqlParams = [concluido ? 1 : 0, id];
  const [result] = await db.query(sqlCmd, sqlParams);

  // Si no se han actualizado registros
  if (result.affectedRows === 0) {
    res.status(404).json({message: `Tarea con id ${id} no encontrada.`});
    return;
  }

  // registro actualizado correctamente
  res.json({message: "Tarea marcada"});
});

// DELETE /tasks/:id  ::  Borrar una tarea por su id
app.delete('/tasks/:id', async (req, res) => {

  // De la ruta del endpoint obtenemos el id de la tarea a borrar
  const id = req.params.id;

  // Ejecución de la operación de borrar en DB
  const sqlCmd = 'DELETE FROM tareas WHERE id = ?';
  await db.query(sqlCmd, [id]);
  
  res.send();  // se termina la ejecución
});

// Ejecución de la app
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
