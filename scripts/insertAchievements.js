const products = require('../resources/achievements.json');
const Database = require('../services/mongodb');
const connect = require('mongoose');

const db = new Database();

connect()
  .then(db => {
    console.log('connected to mongodb');
    achievements.forEach(achievement => {
      db.addProduct(product);
    });
  })
  .catch(err => {
    console.error('mongodb connection failed', err);
  });
