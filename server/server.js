import path from 'path';
import fs from 'fs';
import Express, { Router } from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import multer from 'multer';
import jwt from 'express-jwt';

import { config, dummyData } from './config';
import { bcryptHash } from './crypto';
import { createUser, userAuthentication, findUser } from './user';
import document from './file-reader';
import mailerAPI from './mailer';

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
app.set('superSecret', config.secret);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));

// Routes
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

if (process.env.NODE_ENV === 'dev' || 'development') {
  app.get('/setup', (req, res) => {
    bcryptHash(dummyData.password, (encrypt) => {
      createUser(dummyData.email, encrypt, true, (err, callback) => {
        if (err) {
          throw err;
        }

        res.end('Dummy user was created!');
      });
    });
  });
}

const routes = Express.Router();

routes.post('/authenticate', (req, res) => {
  const superSecret = app.get('superSecret');
  userAuthentication(req.body.email, req.body.password, superSecret, (callback) => {
    res.json(callback);
  });
});

routes.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API V1!' });
});

routes.get('/users', (req, res) => {
  findUser((callback) => {
    res.json(callback);
  });
});

// apply the routes to our application with the prefix /api
app.use('/api', routes);

app.post('/upload', upload.single('uploader'), (req, res, next) => {
  if (req.file) {
    const sourceFile = uploadFolder + '/' + req.file.filename;
    document(sourceFile, data => mailerAPI(data));
    return res.end('Thank you for the file');
  }

  res.status(204).end();
});

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
