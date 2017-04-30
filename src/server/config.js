import fs from 'fs';

const config = {
  port: process.env.PORT || 3000,
  secret: fs.readFileSync('/root/.ssh/id_rsa.pub'),
  mongoURL: process.env.MONGO_URL || 'mongo/bnb-network',
};

export default config;
