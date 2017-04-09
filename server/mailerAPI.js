
import path from 'path';
import nodemailer from 'nodemailer';
import aws from 'aws-sdk';
import document from './file-reader';

// configure AWS SDK
aws.config.loadFromPath('./config.json');

// create Nodemailer SES transporter
const transporter = nodemailer.createTransport({
  SES: new aws.SES({
    apiVersion: '2010-12-01',
  }),
});

const mailerAPI = (sourceFile) => {
  // const sourceFile = path.join(__dirname, 'books.xml');

  // send some mail
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
};

export default mailerAPI;
