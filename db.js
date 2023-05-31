const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Theteachings90',
  database: 'bakery'
});

function createTableIfNotExists() {
  const sql = 'CREATE TABLE IF NOT EXISTS products (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, category VARCHAR(255) NOT NULL, description TEXT)';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log('Table created or already exists');
  });
}

db.connect((err) => {
  if (err) throw err;
  createTableIfNotExists();
  console.log('Connected to the database');
});

module.exports = db;
