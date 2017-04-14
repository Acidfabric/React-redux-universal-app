import Promise from 'bluebird';
import path from 'path';
import fs from 'fs';
import { parseString } from 'xml2js';

Promise.promisifyAll(fs);

// const willParseDocument = new Promise(
//     (resolve, reject) => {
//         if (document) {
//             const email = {
//                 brand: 'iPhone 7',
//                 color: 'jet black'
//             };
//             resolve(phone);
//         } else {
//             const reason = new Error('mom is not happy');
//             reject(reason);
//         }
//     }
// );

const document = (sourceFile, callback) => {
  fs.readFileAsync(sourceFile, { encoding: 'utf-8' })
  .then((data) => {
    // if (err) {
    //   return err;
    // }

    parseString(data, (err, result) => {
        result.catalog.book.forEach(users => {
          callback(users);
        });
      });
  })
  .catch((error) => {
    console.log(error.message);
  });
};

document();

export default document;
