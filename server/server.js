import path from 'path';
import fs from 'fs';
import Express, { Router } from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import jwtExpress from 'express-jwt';

import { config, dummyData } from './config';
import { bcryptHash } from './crypto';
import { createUser, userAuthentication, findUser } from './user';
import document from './file-reader';

// Check if '/uploads' folder exists. If not, creates new one.
const uploadFolder = path.join(__dirname + '/uploads');
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

// Multer storage
const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, uploadFolder);
  },

  filename(req, file, callback) {
    callback(null, file.originalname + '-' + Date.now());
  },
});
const upload = multer({
  storage,
  fileFilter(req, file, callback) {
    if (file.mimetype !== 'text/xml') {
      callback(new Error('Only xml are allowed'));
    }

    callback(null, true);
  },
});

// New express app
const app = new Express();

// Express middleware
app.use(compression());
mongoose.connect(config.database);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(Express.static('server/css'));

app.use(jwtExpress({ secret: config.secret })
  .unless({ path: ['/', '/login', '/authenticate', '/setup'] })
);

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname + '/login.html'));
});

if (process.env.NODE_ENV === 'dev' || 'development') {
  app.get('/setup', (req, res) => {
    bcryptHash(dummyData.password, hash => {
      createUser(dummyData.email, hash, true, (err, callback) => {
        if (err) {
          throw err;
        }

        res.end('Dummy user was created!');
      });
    });
  });
}

app.post('/upload', upload.single('uploader'), (req, res, next) => {
  if (req.file) {
    const sourceFile = uploadFolder + '/' + req.file.filename;
    document(sourceFile);

    return res.json('Thank you for the file');
  }

  res.status(204).json('There was an error uploading this file to server');
});

app.post('/authenticate', (req, res) => {
  userAuthentication(req.body.email, req.body.password, config.secret, callback => {
    res.status(200).json({ token: callback.token });
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
