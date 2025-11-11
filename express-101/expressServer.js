const express = require('express');
const app = express();

// app.all('/:path(*)', (req, res) => {
//   res.send('<h1>Hello from Express!</h1>');
// });

app.use((req, res) => {
  res.send('<h1>hello from express 5</h1>');
});

app.listen(3000, () => {
  console.log('listening on port 3000 ...');
});
