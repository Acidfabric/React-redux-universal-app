import bcrypt from 'bcryptjs';
import { config } from './config';

const cryptoConfig = {
  saltRounds: 10,
  myPlaintextPassword: config.secret,
  someOtherPlaintextPassword: 'not_bacon',
};

export const bcryptHash = (password, callback) => {
  bcrypt.genSalt(cryptoConfig.saltRounds, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      callback(hash);
    });
  });
};

export const bcryptCompare = (password, hash, callback) => {
  bcrypt.compare(password, hash, (err, res) => {
    callback(res === true);
  });

  // bcrypt.compare('not_bacon', hash, (err, res) => {
  //   // res === false
  // });
};
