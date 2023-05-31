const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app.use(bodyParser.json());

app.post('/products', addProduct);
app.get('/products', getProducts);
app.put('/products/:id', updateProduct);
app.delete('/products/:id', deleteProduct);

app.get('/', (req, res) => {
    res.send('Hello, World!');
  });



function addProduct(req, res) {
  const { name, category, description } = req.body;
  const sql = 'INSERT INTO products (name, category, description) VALUES (?, ?, ?)';
  db.query(sql, [name, category, description], (err, result) => {
    if (err) throw err;
    res.status(201).json(result);
  });
}

function getProducts(req, res) {
  const sql = 'SELECT * FROM products';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
}

function updateProduct(req, res) {
  const { id } = req.params;
  const { name, category, description } = req.body;
  const sql = 'UPDATE products SET name = ?, category = ?, description = ? WHERE id = ?';
  db.query(sql, [name, category, description, id], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
}

function deleteProduct(req, res) {
  const { id } = req.params;
  const sql = 'DELETE FROM products WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
}

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

