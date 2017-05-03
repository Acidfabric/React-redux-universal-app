const path = require('path');
const webpack = require('webpack');

module.exports = [{
  name: 'client',

  entry: './src/client/index.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/static/',
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.js?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'es2015', 'stage-0', 'react'],
            compact: true,
          },
        }
      },

      {
        test: /\.(png|gif|jpg|svg)$/,
        use: { loader: 'file-loader', options: { name: '[hash]-[name].[ext]' } },
      },

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
},

{
  name: 'client-App for server-side rendering',
  entry: [
    // './src/client/components/App.js',
    './src/server/server.js',
  ],
  output: {
    filename: 'App.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/static/',
    libraryTarget: 'commonjs2',
  },
  target: 'node',
  externals: /^[a-z\-0-9]+$/,
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  module: {
    rules: {
      test: /\.js?$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env', 'es2015', 'stage-0', 'react'],
          compact: true,
        },
      },
    },
  },
},

{
  name: 'client-reducer for server-side rendering',
  entry: [
    './src/client/reducers/rootReducer.js',
  ],
  output: {
    filename: 'reducer.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/static/',
    libraryTarget: 'commonjs2',
  },
  externals: /^[a-z\-0-9]+$/,
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  module: {
    rules: {
      test: /\.js?$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env', 'es2015', 'stage-0', 'react'],
          compact: true,
        },
      },
    },
  },
}];
