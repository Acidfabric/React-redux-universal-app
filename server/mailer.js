import nodemailer from 'nodemailer';
import aws from 'aws-sdk';

// configure AWS SDK
aws.config.loadFromPath('./config.json');

// create Nodemailer SES transporter
const transporter = nodemailer.createTransport({
  SES: new aws.SES({
    apiVersion: '2010-12-01',
  }),
});

const mailerAPI = (data) => {
  transporter.sendMail({
    from: {
      name: 'Karolis Arbačiauskas',
      address: 'info@whypeopledance.com',
    },
    to: data.email,
    subject: 'Message',
    html: `You own ${data.price}.  <br />
    Description: <br />
    ${data.description}
    `,
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
};

export default mailerAPI;
