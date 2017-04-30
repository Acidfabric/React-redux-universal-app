

import path from 'path';
import fs from 'fs';
import multer from 'multer';

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
