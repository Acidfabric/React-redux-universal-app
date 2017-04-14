import bcrypt from 'bcryptjs';

export const bcryptHash = (password, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      callback(hash);
    });
  });
};

export const bcryptCompare = (password, hash, callback) => {
  bcrypt.compare(password, hash, (err, res) => {
    callback(res);
  });
};
