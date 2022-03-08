const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./www/src/index.tsx",
  output: {
    path: path.resolve(__dirname, '../www/build'),
    filename: "bundle.js",
    clean: false
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(tsx?)$/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ],
        exclude: /node_modules/,
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: "react"
    }),
    new HtmlWebpackPlugin({
        template: "./www/public/index.html",
        filename: "./index.html"
    })
  ]
};