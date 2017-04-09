import path from 'path';
import fs from 'fs';
import { parseString } from 'xml2js';

const document = (sourceFile, callback) => {
  fs.readFile(sourceFile, { encoding: 'utf-8' }, (err, data) => {
    if (err) {
      return err;
    }

    parseString(data, (err, result) => {
      result.catalog.book.forEach(users => {
        callback(users.email);
      });
    });
  });
};

export default document;
