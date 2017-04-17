import fs from 'fs';

export const config = {
  port: process.env.PORT || 3000,
  secret: fs.readFileSync('/root/.ssh/id_rsa.pub'),
  database: 'mongo/bnb-network',
};

export const dummyData = {
  email: 'test@test.com',
  password: 'pass',
  admin: true,
};
