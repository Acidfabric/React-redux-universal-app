import bcrypt from 'bcryptjs';

export const bcryptHash = (password, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (error, hash) => {
      callback(hash);
    });
  });
};

export const bcryptCompare = (password, hash, callback) => {
  bcrypt.compare(password, hash).then((res) => {
    callback(res);
  });
};
