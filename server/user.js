import User from './models/user';
import { bcryptCompare } from './crypto';
import jwt from 'jsonwebtoken';

export const createUser = (email, password, admin=false, callback) => {
  const newUser = new User(
    {
      email: email.toLowerCase(),
      password,
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

export const userAuthentication = (email, secret, superSecret, callback) => {
  User.findOne({ email }, (err, user) => {
    if (err) {
      throw err;
    }

    if (!user) {
      callback({ success: false, message: 'Authentication failed. Wrong name or password.' });
    } else if (user) {
      bcryptCompare(secret, user.password, (passAuth) => {
        if (passAuth != true) {
          callback({ success: false, message: 'Authentication failed. Wrong name or password.' });
        } else {
          const token = jwt.sign(user, superSecret, {
            expiresIn: 1440,
          });

          callback({
            success: true,
            message: 'Enjoy your token!',
            token,
          });
        }
      });
    }
  });
};
