const express = require('express');
const app = express();

function validateUser(req, res, next) {
  res.locals.validateUser = true;
  console.log('validate user ran ... ');
  next();
}

app.use('/admin', validateUser);

app.get('/', (req, res) => {
  res.send('<h1>Home Page</h1>');
  console.log('res.locals', res.locals.validateUser);
});

app.get('/admin', (req, res) => {
  res.send('<h1>Admin Page</h1>');
  console.log('[admin]res.locals', res.locals.validateUser);
});

app.listen(3000, () => {
  console.log('listening on port 3000 ... ');
});
