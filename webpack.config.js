var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: __dirname, //path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: ["./src/js/client.js"],  
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      }
    // ,{
    //     test: /\.(jpe?g|png|gif|svg)$/i,
    //     loaders: [
    //       'file-loader?hash=sha512&digest=hex&name=[name].[ext]',
    //       'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
    //     ]
    //   }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: "client.min.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};