import path from 'path';
import fs from 'fs';
import Express, { Router } from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import multer from 'multer';

import config from './config';
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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/upload', upload.single('uploader'), (req, res, next) => {
  if (req.file) {
    console.log(req.body);
    console.log(req.file);

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
