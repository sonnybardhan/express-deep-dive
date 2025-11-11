const http = require('http');
const fs = require('fs');
const PORT = 3000;

const server = http.createServer((req, res) => {
  // console.log('req:', req);

  console.log(req.url);

  if (req.url === '/') {
    //HTTP message
    //1. startLine (Method, GET by default)
    //2. headers
    //3. body

    //takes in
    // 1. statusCode,
    // 2. MIME type
    const homePage = fs.readFileSync('node.html');
    res.writeHead(200, { 'Content-Type': 'text/HTML' });
    // res.write('<H1>Hey there!</H1>');
    // console.log('homePage: ', homePage);
    res.write(homePage);
    res.end();
  } else if (req.url === '/styles.css') {
    const styles = fs.readFileSync('styles.css');
    res.writeHead(200, {
      'content-type': 'text/css',
    });
    res.write(styles);
    res.end();
  } else if (req.url === '/me.jpg') {
    const image = fs.readFileSync('me.jpg');
    res.writeHead(200, {
      'content-type': 'image/jpg',
    });
    res.write(image);
    res.end();
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/HTML',
    });
    res.write('<H4>Sorry, this page does not exist!</H4>');
    res.end();
  }
});

server.listen(PORT);
