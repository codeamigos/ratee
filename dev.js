require('babel-register');

var app = require('./src/instance').default;

app.listen(process.env.PORT, function () {
  console.log('Listening...')
});
