import path from 'path';
import Express, { Router } from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import multer from 'multer';

import nodemailer from 'nodemailer';
import aws from 'aws-sdk';
import document from './file-reader';

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname + '/uploads'));
  },

  fileFilter: (req, file, callback) => {
    if (file.mimetype !== 'text/xml') {
      return callback(null, false);
    }

    callback(null, true);
  },

  filename: (req, file, callback) => {
    callback(null, file.originalname + '-' + Date.now());
  },
});
const upload = multer({ storage: storage });

import mailerAPI from './mailerAPI';
import config from './config';

const app = new Express();

app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

// configure AWS SDK
aws.config.loadFromPath('./config.json');

// create Nodemailer SES transporter
const transporter = nodemailer.createTransport({
  SES: new aws.SES({
    apiVersion: '2010-12-01',
  }),
});

// create Nodemailer SES transporter
app.post('/upload', upload.single('uploader'), function (req, res, next) {
  if (req.file) {
    console.log(req.body);
    console.log(req.file);
    const sourceFile = path.join(__dirname + '/uploads/' + req.file.filename);

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

  // res.end('Missing file');
  res.status(204).end();
});

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
