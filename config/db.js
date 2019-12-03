const mongoose = require('mongoose');
const config = require('config');
 mongoURI = config.get('mongoURI');
mongoURI = "mongodb://admin:admin@localhost:27017/temp"
console.log(mongoURI);
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('mongodb connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
