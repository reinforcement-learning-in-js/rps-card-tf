const path = require('path');

module.exports = {
  mode: "development",
  target: "node",
  devtool: false,
  entry: {
    main: "./src/index.ts",
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "index.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      { 
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  }
};
