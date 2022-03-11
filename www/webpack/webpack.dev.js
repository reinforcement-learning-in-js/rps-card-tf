const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./www/src/index.tsx",
  devServer: {
    port: 3000
  },
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
          {
            loader: 'babel-loader',
            options: {
              presets: [
                "@babel/preset-react",
                "@babel/preset-env",
                "@babel/preset-typescript"
              ]
            }
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
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