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

// bcryptCompare = (password, callback) => {
//   bcrypt.compare(password, hash, (err, res) => {
//     callback(res === true);
//   });
// };

export const userAuthentication = (email, secret, superSecret, callback) => {
  User.findOne({ email }, (err, user) => {
    if (err) {
      throw err;
    }

    if (!user) {
      callback({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      bcryptCompare(secret, user.password, (passAuth) => {
        if (passAuth != true) {
          callback({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {
          // if user is found and password is right
          // create a token
          const token = jwt.sign(user, superSecret, {
            expiresIn: 1440, // expires in 24 hours
          });

          // return the information including token as JSON
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
