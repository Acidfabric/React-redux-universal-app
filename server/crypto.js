import bcrypt from 'bcrypt';
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

// bcrypt.hash(cryptoConfig.myPlaintextPassword, cryptoConfig.saltRounds).then(function (hash) {
//   console.log(hash);
// });

// export const bcryptCompare = bcrypt.compare(
//   cryptoConfig.myPlaintextPassword,
//   hash,
//   function (err, res) {
//     res == true;
//   }
// );
