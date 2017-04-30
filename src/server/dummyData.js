import User from './models/user';
import { bcryptHash } from './crypto';
import { createUser } from './user';

const dummyData = {
  email: 'test@test.com',
  password: '123',
  admin: true,
};

export default function () {
  User.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    bcryptHash(dummyData.password, (hash) => {
      createUser(dummyData.email, hash, true, (error, callback) => {
        if (error) {
          throw error;
        }

        console.log('Success! Dummy user created.');
      });
    });
  });
}
