const path = require('path');
const express = require('express');
const app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));

app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, 'me.jpg'));
  console.log(path.join(__dirname, 'node.html'));
  res.sendFile(path.join(__dirname, 'node.html'));
});

app.use((req, res) => {
  res.status(404).send(`<h2>Sorry, page not found!</h2>`);
});

app.listen(3000, () => {
  console.log('listening on port 3000 ...');
});
