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
  
