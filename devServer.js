var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
require('dotenv').load()

var app = express();

if (process.env.NODE_ENVIRONMENT !== 'production') {
  var compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))

  app.use(require('webpack-hot-middleware')(compiler))
}

app.get('/firepad', (req, res) => {
  res.sendFile(path.join(__dirname, 'firepad.html'))
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'landing.html'))
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(process.env.port, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:%s', process.env.port);
});
