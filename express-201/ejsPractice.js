const path = require('path');
const express = require('express');
const app = express();
const helmet = require('helmet');

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(express.json());
app.use(express.urlencoded());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

function validateUser(req, res, next) {
  res.locals.isValidated = true;
  next();
}

app.use(validateUser);
app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, 'public'));
  res.render('index', {
    msg1: 'Welcome',
    msg2: 'Unauthorized',
    html: `<p><img src="https://images.unsplash.com/photo-1762923634107-52d04a74c0cf?q=80&w=2681&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width='500px'></p>`,
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    msg: 'Something about us ...',
  });
});

app.listen(3000, () => {
  console.log('listening on port 3000 ... ');
});
