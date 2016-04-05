require('babel-register');

var app = require('./src/instance/app').default;
var config = require('./src/instance/config').default;

app.listen(config.port);
