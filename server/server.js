import path from 'path';
import fs from 'fs';
import Express, { Router } from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import multer from 'multer';

import nodemailer from 'nodemailer';
import aws from 'aws-sdk';
import document from './file-reader';

import config from './config';

// Check if '/uploads' folder exists. If not, creates new one.
const uploadFolder = path.join(__dirname + '/uploads');
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadFolder);
  },

  filename: (req, file, callback) => {
    callback(null, file.originalname + '-' + Date.now());
  },
});
const upload = multer({ storage: storage });

// configure AWS SDK
aws.config.loadFromPath('./config.json');

// create Nodemailer SES transporter
const transporter = nodemailer.createTransport({
  SES: new aws.SES({
    apiVersion: '2010-12-01',
  }),
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

app.post('/upload', upload.single('uploader'), function (req, res, next) {
  if (req.file) {
    console.log(req.body);
    console.log(req.file);
    const sourceFile = path.join(uploadFolder + '/' + req.file.filename);

    document(sourceFile, data => {
      transporter.sendMail({
        from: 'info@whypeopledance.com',
        to: data,
        subject: 'Message',
        text: 'I hope this message gets sent!',
      }, (err, info) => {
        if (err) {
          console.log('Message not sent.');
          console.log(err.message);
        } else {
          console.log('Message sent.');
          console.log(info.messageId);
          console.log(info.response);
        }
      });
    });
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
