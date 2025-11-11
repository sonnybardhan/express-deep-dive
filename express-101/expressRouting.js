const express = require('express');
const app = express();

// app.use((req, res) => {
//   res.send('<h1>Hello from the `use` route</h1>');
// });

app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('<h1>hello from the get route</h1>');
// });

app.post('/', (req, res) => {
  console.log('req.body', req.body);
  res.send('<h1>hello from the post route</h1>');
});

app.delete('/', (req, res) => {
  res.send('<h1>hello from the delete route</h1>');
});

app.put('/', (req, res) => {
  res.send('<h1>hello from the put route</h1>');
});

app.listen(3000, () => {
  console.log('listening on port 3000 ...');
});
