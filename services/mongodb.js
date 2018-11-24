const mongoose = require('mongoose');

module.exports = () => {
  let uri = process.env.MONGODB_URI;
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true
  };
  mongoose.Promise = Promise;
  mongoose.connect(uri, options);

  const db = mongoose.connection;
  return new Promise((resolve, reject) => {
    db.once('connected', () => resolve(db));
    db.on('error', reject);
  });
};
