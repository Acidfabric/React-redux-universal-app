const path = require('path');
var assert = require('assert');
const expect = require('chai').expect;
const document = require('../service');

// Not set yet
const sourceFile = path.join(__dirname, '../books.xml');
describe('service', function () {
  it('should return an email', function () {
    expect(document(sourceFile, data => data)).to.equal('karolis.arbaciauskas@gmail.com');
  });
});
