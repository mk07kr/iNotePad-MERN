const connectToMongo = require('./db');
const express = require('express');

const app = express();
const PORT = 5000;

connectToMongo(); // Call the function to connect to MongoDB

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
