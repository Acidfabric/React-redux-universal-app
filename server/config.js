export const config = {
  port: process.env.PORT || 3000,
  secret: '083996EF0742D3364B1589F206F8528AF108589A566F8C6FE5F64C3F58DBBFCD',
  database: 'localhost:27017/bnb-network',
};

export const dummyData = {
  email: 'Karolis',
  password: 'pass',
  admin: true,
};
