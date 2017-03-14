
let nodemailer = require('nodemailer');
let aws = require('aws-sdk');

// configure AWS SDK
aws.config.loadFromPath('config.json');

// create Nodemailer SES transporter
let transporter = nodemailer.createTransport({
    SES: new aws.SES({
        apiVersion: '2010-12-01'
    })
});

// send some mail
transporter.sendMail({
    from: 'kerevicius.ernestas@gmail.com',
    to: 'savintoo@hotmail.com',
    subject: 'Message',
    text: 'I hope this message gets sent!',

}, (err, info) => {
    if(err){
	console.log('Klaida!')
	console.log(err.message)
    } else {
	console.log('Laiskas issiustas!')
	console.log(info.messageId)
	console.log(info.response)
    }

});
