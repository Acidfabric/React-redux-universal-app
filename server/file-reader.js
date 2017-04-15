import Promise from 'bluebird';
import path from 'path';
import fs from 'fs';
import { parseString } from 'xml2js';
import sendMail from './mailer';

Promise.promisifyAll(fs);

const convertXML = function (file) {
  return new Promise((resolve, reject) => {
    if (file !== 'undefined') {
      parseString(file, (err, users) => {
        users.catalog.book.forEach(user => resolve(user));
      });
    } else {
      const reason = new Error('Error occurred while uploading xml file');
      reject(reason);
    }
  });
};

const document = (sourceFile) => {
  fs.readFileAsync(sourceFile, { encoding: 'utf-8' })
  .then(convertXML)
  .then(sendMail)
  .catch((error) => {
    console.log(error.message);
  });
};

export default document;
