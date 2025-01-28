const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const initDb = async (callback) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Database connected');
    callback(null);
  } catch (error) {
    callback(error);
  }
};

const getDb = () => {
  if (!mongoose.connection.readyState) {
    throw new Error('Database is not connected');
  }
  return mongoose.connection;
};

module.exports = {
  initDb,
  getDb,
};