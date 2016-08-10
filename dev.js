require('babel-register');

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var path = require('path');

var appPort = 1337;
var proxy = 'http://localhost:' + appPort;

var devServer = new WebpackDevServer(webpack(config), {
  contentBase: config.output.path,
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: 'errors-only',
  proxy: [
    {
      path: /^(?!\/public).*$/,
      secure: false,
      target: proxy
    }
  ]
});

var appConfig = require('./src/instance/config').default;
devServer.listen(appConfig.port, 'localhost', function () {
  console.log('Listening at http://%s:%s', 'localhost', appConfig.port);
});

var app = require('./src/instance/app').default;
app.listen(appPort);
