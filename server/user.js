import User from './models/user';

export const createUser = (email, password, admin=false, callback) => {
  const newUser = new User(
    {
      email,
      password,
      admin,
    }
  );

  newUser.save((err) => {
    if (err) {
      throw err;
    }

    console.log('User saved successfully');
    callback();
  });
};
