import { Router } from 'express';
import path from 'path';
import jwtExpress from 'express-jwt';

import { userAuthentication, findUser } from './user';
import { uploadFolder, upload } from './utils';
import fileReader from './file-reader';
import config from './config';

const router = Router();

router.use(jwtExpress({
  secret: config.secret,
}).unless({ path: ['/api/authenticate'] }));

// Routes
router.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/index.html`));
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(`${__dirname}/login.html`));
});

// Upload file
router.post('/upload', upload.single('uploader'), (req, res) => {
  if (req.file) {
    // TODO: need a callback for return
    const sourceFile = `${uploadFolder}/${req.file.filename}`;
    fileReader(sourceFile);
    return res.json('Thank you for the file');
  }
  res.status(204).json('There was an error uploading this file to server');
});

// Authenticate user
router.post('/authenticate', (req, res) => {
  userAuthentication(req.body.email, req.body.password, config.secret, (callback) => {
    if (callback.success === false) {
      res.status(401).json(callback);
    } else {
      res.json(callback);
    }
  });
});

router.get('/users', (req, res) => {
  findUser((callback) => {
    res.json(callback);
  });
});

export default router;
