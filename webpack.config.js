var path = require('path');
var webpack = require('webpack');

//postcss

var cssnext = require('postcss-cssnext');
var precss = require('precss');
var autoreset = require('postcss-autoreset');
var reporter = require('postcss-reporter');
var lost = require('lost');
var sugarss = require('sugarss');
var initial = require('postcss-initial');
var postcssImport = require('postcss-import');

// styling

var magician = require('postcss-font-magician');
var center = require('postcss-center');
var position = require('postcss-position');
var size = require('postcss-size');

var MODULE_DERICTORIES = ['node_modules', 'lib'];

module.exports = {
  devtool: '#inline-source-map',
  entry: {
    quiz: path.join(__dirname, 'src', 'quiz'),
    admin: [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      path.join(__dirname, 'src', 'admin')
    ],
    quiz: path.join(__dirname, 'src', 'quiz')
  },
  output: {
    path: path.join(__dirname, '.public'),
    filename: '[name].js',
    publicPath: '/public/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    modulesDirectories: MODULE_DERICTORIES,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    noParse: [/.elm$/],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components|src\/quiz)/,
        loaders: ['react-hot', 'babel']
      },
      {
        test: /\.elm$/,
        loaders: ['elm-webpack?pathToMake=node_modules/.bin/elm-make']
      },
      {
       test:   /\.sass$/,
       loaders: [
          "style-loader",
          "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]",
          "postcss-loader?parser=sugarss"
        ]
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
  postcss: function (webpack) {
    return [
      postcssImport({
        addDependencyTo: webpack,
        path: MODULE_DERICTORIES
      }),
      /*autoreset({ all: initial }), */
      lost,
      cssnext,
      precss,
      magician,
      center,
      position,
      size,
      reporter({ clearMessages: true })
    ];
  },
  debug: true
};
