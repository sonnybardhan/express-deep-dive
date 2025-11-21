//bring in required imports
const path = require('path');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

//setup middleware
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());
app.use((req, res, next) => {
  if (req.query.msg === 'fail') {
    res.locals.msg = `Sorry, this username & password doesn't exist`;
  } else {
    res.locals.msg = ``;
  }
  next();
});

//set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//set paths
app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/login', (req, res, next) => {
  console.log('req.query', req.query);
  res.render('login');
});

app.post('/process_login', (req, res, next) => {
  // res.json('hello');

  const { username, password } = req.body;

  if (password === 'x') {
    res.cookie('username', username);
    res.redirect('/welcome');
  } else {
    res.redirect('/login?msg=fail');
  }
});

app.param('id', (req, res, next, id) => {
  console.log('params called: ', id);
  next();
});

app.get('/welcome', (req, res, next) => {
  const { username = 'n/a' } = req.cookies;

  res.render('welcome', {
    username,
  });
});

app.get('/story/:id', (req, res, next) => {
  console.log('req.params', req.params);
  const { id } = req.params;
  res.send(`welcome to story: (id) ${id}`);
});

app.get('/story/:blogId', (req, res, next) => {
  console.log('req.params', req.params);
  const { blogId } = req.params;
  res.send(`welcome to story: (blogId) ${blogId}`);
});

app.get('/logout', (req, res, next) => {
  res.clearCookie('username');
  res.redirect('/login');
});

app.get('/statement', (req, res, next) => {
  // res.sendFile();

  //adds the attachments header
  //allows optionally renaming of the file
  //optionally takes in an error callback
  res.download(
    path.join(__dirname, 'userStatements', 'image.png'),
    'myStatement.png',
    (err) => {
      console.log('there was an error!', err);

      if (!res.headersSent) {
        res.redirect('/welcome');
      }
    }
  );
});

//listen
app.listen(3000, () => {
  console.log('listening on port 3000');
});
