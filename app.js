'use strict';

const PORT = 8000

const express = require('express');
const morgan = require('morgan');
const path = require('path');

let app = express();

app.use(morgan('dev'));

// example Middleware Function:
app.use(function(req, res, next) {
  // next is a callback
  // invoke next to trigger next Middleware
  console.log('method:', req.method);
  console.log('url:', req.url);;
  console.log('query:', req.query);
  req.monkey = 'primate';

  next();
});

function authMiddleWare(req, res, next) {
  console.log(req.query.password);
  if (req.query.password !== 'tree') {
    res.status(401);
    res.send('WRONG PASSWORD!');
    return;
  }
          next();
}

//app.use(authMiddleWare);

//////////////////


app.get('/', function (req, res) {
  let file = path.join(__dirname, 'index.html');
  res.sendFile(file)
  // res.send('Hello World!');
});

app.get('/test', (req, res) => {
  res.send('this is a test');
});

app.post('/', (req, res) => {

  console.log('req.monkey:', req.monkey);

  res.send('posted!');
});

app.listen(PORT, function (err) {
  console.log(err || 'Example app listening on port 8000!');
});
