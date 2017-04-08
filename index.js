
const path = require('path');
const nodemailer = require('nodemailer');
const aws = require('aws-sdk');
const document = require('./service');

const sourceFile = path.join(__dirname, 'books.xml');

// configure AWS SDK
aws.config.loadFromPath('config.json');

// create Nodemailer SES transporter
const transporter = nodemailer.createTransport({
  SES: new aws.SES({
    apiVersion: '2010-12-01',
  }),
});

// send some mail
transporter.sendMail({
  from: 'kerevicius.ernestas@gmail.com',
  to: document(sourceFile, (data) => data),
  subject: 'Message',
  text: 'I hope this message gets sent!',
}, (err, info) => {
  if (err) {
    console.log('Klaida!');
    console.log(err.message);
  } else {
    console.log('Laiskas issiustas!');
    console.log(info.messageId);
    console.log(info.response);
  }
});
