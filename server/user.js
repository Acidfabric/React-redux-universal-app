import User from './models/user';
import { bcryptCompare } from './crypto';
import jwt from 'jsonwebtoken';

export const createUser = (email, hash, admin=false, callback) => {
  const newUser = new User(
    {
      email: email.toLowerCase(),
      password: hash,
      admin,
    }
  );

  newUser.save((err) => {
    if (err) {
      throw err;
    }

    callback();
  });
};

export const findUser = (callback) => {
  User.find({}, (err, users) => {
    callback(users);
  });
};

export const userAuthentication = (email, userPassword, jwtSecret, callback) => {
  User.findOne({ email }, (err, user) => {
    if (err) {
      throw err;
    }

    if (!user) {
      callback({ success: false, message: 'Authentication failed. Wrong name or password.' });
    } else if (user) {

      // (user entered password, hash from database, decryption)
      bcryptCompare(userPassword, user.password, decryptedPassword => {
        if (decryptedPassword != true) {
          callback({ success: false, message: 'Authentication failed. Wrong name or password.' });
        } else {
          const token = jwt.sign(user, jwtSecret, {
            expiresIn: 1440,
          });

          callback({
            success: true,
            message: 'Success!',
            token,
          });
        }
      });
    }
  });
};
