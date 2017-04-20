import path from 'path';
import fs from 'fs';
import Express, { Router } from 'express';
import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';

// import multer from 'multer';
import jwtExpress from 'express-jwt';

// webpack dependencies
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev';

// New express app
const app = new Express();

// Use this middleware to set up hot module reloading via webpack.
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
}));
app.use(webpackHotMiddleware(compiler));

// Server-side rendering dependencies
import React from 'react';
import configureStore from '../client/configureStore';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import bnbApp from '../client/reducers';
import App from '../client/App';

import { renderToString } from 'react-dom/server';

// Import required modules
import { userAuthentication, findUser } from './user';
import { uploadFolder, upload } from './utils';
import document from './file-reader';
import dummyData from './dummyData';
import { config } from './config';

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
mongoose.connect(config.mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!');
    throw error;
  }

  if (process.env.NODE_ENV === 'development') {
    dummyData();
  }
});

// Express middleware
app.use(compression());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

//Serve static files
// app.use(Express.static('server/css'));
// app.use('/static', Express.static('static'));
app.use(Express.static(path.resolve(__dirname, '../dist')));

// This is fired every time the server side receives a request
app.use(handleRender);

// We are going to fill these out in the sections to follow
function handleRender(req, res) {
  // Compile an initial state
  const preloadedState = 0;

  // Create a new Redux store instance
  const store = configureStore(preloadedState);

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

  // Import Manifests
  const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
  const chunkManifest = process.env.webpackChunkAssets
                        && JSON.parse(process.env.webpackChunkAssets);

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

    <style>
      body {
        padding-top: 50px;
      }
      .submit {
        margin-top: 10px;
      }
    </style>
  </head>
  <body>
    <div id="root">${html}</div>
    <script>
      // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
    </script>
    <script src="/static/bundle.js"></script>
  </body>
</html>
  `;
}

app.use(jwtExpress({
  secret: config.secret,
})
  .unless({ path: ['/', '/login', '/authenticate', '/setup'] })
);

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname + '/login.html'));
});

// Upload file
app.post('/upload', upload.single('uploader'), (req, res, next) => {
  if (req.file) {
    const sourceFile = uploadFolder + '/' + req.file.filename;
    document(sourceFile);

    return res.json('Thank you for the file');
  }

  res.status(204).json('There was an error uploading this file to server');
});

// Authenticate user
app.post('/authenticate', (req, res) => {
  userAuthentication(req.body.email.toLowerCase(), req.body.password, config.secret, callback => {
    if (callback.success === false) {
      res.status(401).json(callback);
    } else {

      res
        .status(200)

        // .cookie('token', callback.token, { maxAge: 1440, httpOnly: false })
        .set({
          'Content-Type': 'text/html',
          Authorization: 'Bearer ' + callback.token,
        })
        .json(callback);
    }
  });
});

app.get('/users', (req, res) => {
  findUser(callback => {
    res.json(callback);
  });
});

// Start server
app.listen(config.port, error => {
  if (error) {
    console.error(error);
  } else {
    console.info(
      `==> 🌎  Listening on port ${config.port}.
      Open up http://localhost:${config.port}/ in your browser.`
    );
  }
});
