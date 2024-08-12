const mysql = require('mysql2');

// Crea un pool de conexiones
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test',
  connectionLimit: 1000,
  dateStrings: true
});

// Promisify para usar async/await
const promisePool = pool.promise();
module.exports = promisePool;
