// const path = require('path');

// const express = require('express');
// const app = express();

// const helmet = require('helmet');
// app.use(
//   helmet({
//     contentSecurityPolicy: false,
//   })
// );

// app.use(express.json());
// app.use(express.urlencoded());

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// app.get('/', (req, res) => {
//   res.render('index');
//   // res.send('hi');
// });

// app.listen(3000, () => {
//   console.log('listening on port: 3000');
// });

const express = require('express');
const app = express();
const path = require('path');
const helmet = require('helmet');

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(express.json());
app.use(express.urlencoded());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'viewsx'));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => {
  console.log('listening on port 3000 ... ');
});
