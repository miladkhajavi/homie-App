const path = require("path");
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    app: ["regenerator-runtime/runtime","./index.js"]
  }, //location of your main js file
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: '/',
    filename: 'index.bundle.js', // where js files would be bundled to
  },
  //   devServer: {
  //     contentBase: "./dist",
  //   },
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder

  module: {
    rules: [{
      test: /\.js$/, // using regex to tell babel exactly what files to transCompile es6-8 to es5
      exclude: /node_modules/, // files to be ignored
      use: {
        loader: "babel-loader", //specify the loader

      },
    }, ],
  },
};