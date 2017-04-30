const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const webpackConfig = {
  devtool: 'inline-source-map',
  entry: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      './src/client/index.js',
    ],

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
      },

      // {
      //   test: /\.css$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: [
      //       // 'style-loader',
      //       {
      //         loader: 'css-loader',
      //         options: {
      //           modules: true,
      //           localIdentName: '[path][name]__[local]--[hash:base64:5]',
      //         },
      //       },
      //       // 'sass-loader',
      //     ],
      //   }),
      // },
       {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
            // 'sass-loader',
        ],
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin("[name].[contenthash].css"),
    new webpack.DefinePlugin({
      'process.env': {
        CLIENT: JSON.stringify(true),
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
};

module.exports = webpackConfig;