var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
import favicon from 'serve-favicon'
import dotenv from 'dotenv'
dotenv.load()

var app = express();

if (process.env.NODE_ENV !== 'production') {
  var compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))
  app.use(require('webpack-hot-middleware')(compiler))
} else {
  app.use('/static', express.static(path.join(__dirname, 'public/static')))
}

app.use(favicon(path.join(__dirname, 'public/favicon.ico')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/app.html'))
})

app.listen(process.env.port, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening to port ${process.env.port}`)
});
