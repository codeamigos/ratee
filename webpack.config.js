var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: '#inline-source-map',
  entry: {
    bundle: [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      path.join(__dirname, 'src', 'admin')
    ]
  },
  output: {
    path: path.join(__dirname, '.public'),
    filename: '[name].js',
    publicPath: '/public/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    modulesDirectories: ['node_modules']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['react-hot', 'babel']
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(jpe?g|png|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: 'url?limit=8192'
      }
    ]
  },
  debug: true
};
