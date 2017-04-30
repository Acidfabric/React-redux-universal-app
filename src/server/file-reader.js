/* eslint import/no-extraneous-dependencies: 0 */
/* eslint no-console: 0 */

import Promise from 'bluebird';
import fs from 'fs';
import { parseString } from 'xml2js';

Promise.promisifyAll(fs);

function convertXML(file) {
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
}

const fileReader = (sourceFile) => {
  fs.readFileAsync(sourceFile, { encoding: 'utf-8' })
  .then(convertXML)
  .catch((error) => {
    console.log(error.message);
  });
};

export default fileReader;
