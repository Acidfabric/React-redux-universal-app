var assert = require('assert');
const expect = require('chai').expect;
const document = require('../service');

describe('service', function () {
  it('should return an email', function () {
    expect(document).to.equal('karolis.arbaciauskas@gmail.com');
  });
});
