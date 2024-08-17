import express from 'express';
import cors from 'cors'; // Importa cors
import multer from 'multer';
import mysql from 'mysql2';
import path from 'path';

const app = express();
const port = 5000;

// Habilitar CORS para todas las rutas
app.use(cors());

// Configuración de multer para manejar archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Configuración de la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'proyecto',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos');
});

// Endpoint para subir documentos
app.post('/upload', upload.single('archivo'), (req, res) => {
  const { titulo, descripcion, fecha, url } = req.body;
  const archivo = req.file ? req.file.filename : null;

  const query = 'INSERT INTO documentos (titulo, descripcion, fecha, tipoArchivo, archivo, url, fechaHoraRegistro) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [
    titulo,
    descripcion,
    fecha,
    archivo ? req.file.mimetype : 'URL',
    archivo,
    url,
    new Date().toISOString()
  ];

  db.query(query, values, (err, result) => {
    if (err) throw err;
    res.json({ message: 'Documento agregado', id: result.insertId });
  });
});

// Configurar directorio de archivos subidos
app.use('/uploads', express.static('uploads'));

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

// Endpoint para obtener la lista de documentos
app.get('/documentos', (req, res) => {
    const query = 'SELECT * FROM documentos';
    
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error al obtener documentos:', err);
        res.status(500).json({ error: 'Error al obtener documentos' });
        return;
      }
      
      res.json(results);
    });
  });
  
