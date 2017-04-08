const path = require('path');
const fs = require('fs');
const parser = require('xml2json');
const parseString = require('xml2js').parseString;

const sourceFile = path.join(__dirname, 'books.xml');

const document = (sourceFile, callback) => {
  fs.readFile(sourceFile, { encoding: 'utf-8' }, function (err, data) {
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

console.log(document(sourceFile, function (data) {
  return data;
}));

module.exports = document;
