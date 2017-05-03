import jwt from 'jsonwebtoken';

// Local imports
import User from './models/user';
import { bcryptCompare } from './crypto';

export const createUser = (email, hash, admin = false, callback) => {
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
      callback({
        message: 'Authentication failed. Wrong name or password.',
        success: false,
      });
    } else if (user) {
      // (user entered password, hash from database, decryption)
      bcryptCompare(userPassword, user.password, (decryptedPassword) => {
        if (decryptedPassword !== true) {
          callback({
            message: 'Authentication failed. Wrong name or password.',
            success: false,
          });
        } else {
          const tokenPayload = {
            email: user.email,
            admin: user.admin,
            _id: user._id.toString(),
          };
          const token = jwt.sign(tokenPayload, jwtSecret, {
            expiresIn: 60 * 60 * 24,
          });
          callback({
            token,
            message: 'Success!',
            success: true,
          });
        }
      });
    }
  });
};
