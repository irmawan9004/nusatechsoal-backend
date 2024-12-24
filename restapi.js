const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let products = [];
let idCounter = 1;


app.get('/products', (req, res) => {
  res.json(products);
});

app.post('/products', (req, res) => {
  const { name, price } = req.body;
  
  if (!name || typeof price !== 'number' || price <= 0) {
    return res.status(400).json({ error: 'Name is required and price must be a positive number.' });
  }

  const product = { id: idCounter++, name, price };
  products.push(product);
  res.status(201).json(product);
});


app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});


app.delete('/products/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  products.splice(productIndex, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
