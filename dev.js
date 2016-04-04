require('babel-register');

var app = require('./src/instance').default;
var config = require('./src/instance/config').default;

app.listen(config.port, function () {
  console.log('Listening...')
});
