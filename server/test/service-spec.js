import path from 'path';
import chai, { expect, should } from 'chai';
import chaiHttp from 'chai-http';
import document from '../file-reader';

chai.use(chaiHttp);

const sourceFile = path.join(__dirname + '/books.xml');

describe('File reading', () => {

  it('it expect return an array', (done) => {
    document(sourceFile, (data) => {
      expect(data).to.be.a('array');
      done();
    });
  });

  it('it expect return an email adress', (done) => {
    document(sourceFile, (data) => {
      expect(data.toString()).to.equal('karolis.arbaciauskas@gmail.com');
      done();
    });
  });
});
