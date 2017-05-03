import path from 'path';
import fs from 'fs';
import multer from 'multer';
import jwt from 'jsonwebtoken';

import config from './config';

// Check if '/uploads' folder exists. If not, creates new one.
export const uploadFolder = path.join(`${__dirname}/uploads`);
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

// Multer storage settings
const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, uploadFolder);
  },

  filename(req, file, callback) {
    callback(null, `${file.originalname}-${Date.now()}`);
  },
});
export const upload = multer({
  storage,
  fileFilter(req, file, callback) {
    if (file.mimetype !== 'text/xml') {
      callback(new Error('Only xml are allowed'));
    }

    callback(null, true);
  },
});

export const generateToken = (user) => {
  const tokenPayload = {
    email: user.email,
    admin: user.admin,
    _id: user._id.toString(),
  };

  return jwt.sign(tokenPayload, config.secret, {
    expiresIn: 60 * 60 * 24,
  });
};
