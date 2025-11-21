const express = require('express');
const app = express();
const helmet = require('helmet');

app.use(helmet());
// app.use(
//   helmet({
//     contentSecurityPolicy: false,
//     xDownloadOptions: false,
//   })
// );
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/ajax', (req, res) => {
  // console.log(req);
  console.log('req.body: ', req.body);
  console.log('req.ip: ', req.ip);
  // console.log('name: ', req.body?.name);
  // console.log('req.headers: ', req.headers);

  res.json(['test', 1, 23]);
});

app.listen(3000, () => {
  console.log('listening on port 3000 ... ');
});
