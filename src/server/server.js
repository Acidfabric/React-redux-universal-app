/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: 0 */
/* eslint no-use-before-define: ["error", { "functions": false }] */

// import path from 'path';
// import fs from 'fs';
import Express from 'express';
import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
// import jwtExpress from 'express-jwt';

// webpack dependencies
import webpack from 'webpack';
import webpackConfig from '../../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// Server-side rendering dependencies
import React from 'react';
import { renderToString } from 'react-dom/server';
import configureStore from '../client/store/configureStore';
import { Provider } from 'react-redux';
import App from '../client/containers/App';

// Import required modules
import dummyData from './dummyData';
import router from './routes';
import config from './config';

// New express app
const app = new Express();

// Use this middleware to set up hot module reloading via webpack.
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler));
}


// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
mongoose.connect(config.mongoURL, (error) => {
  if (process.env.NODE_ENV === 'development') {
    dummyData();
  }
  if (error) {
    console.error('Please make sure Mongodb is installed and running!');
    throw error;
  }
});

// Express middleware
app.use(compression());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// app.use(jwtExpress({
//   secret: config.secret,
// })
//   .unless({ path: ['/', '/login', '/authenticate'] })
// );

// Serve static files
app.use('/static', Express.static('static'));
app.use('/api', router);

// This is fired every time the server side receives a request
app.use(handleRender);

function handleRender(req, res) {
  // Create a new Redux store instance
  const store = configureStore();

  // Render the component to a string
  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // Grab the initial state from our Redux store
  const finalState = store.getState();

  // Send the rendered page back to the client
  res.send(renderFullPage(html, finalState));
}

function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>BNBServices</title>

        <link rel="stylesheet"
          href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css">
      </head>
      <body>
        <div id="root">${process.env.NODE_ENV === 'production' ? html : `<div>${html}</div>`}</div>
        <script>
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
  `;
}

// Start server
app.listen(config.port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(
      `==> 🌎  Listening on port ${config.port}.
      Open up http://localhost:${config.port}/ in your browser.`
    );
  }
});
