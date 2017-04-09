const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/user',
  port: process.env.PORT || 3000,
};

export default config;