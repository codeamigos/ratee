export default {
  port: process.env.PORT || 3000,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost/ratee',
  tokenSecret: 'whatdoesthefoxsay?',
};
