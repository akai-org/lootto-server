const achievements = require('../resources/achievements.json');
const connect = require('../services/mongodb');
const Achievement = require('../models/achievement');

connect()
  .then(db => {
    console.log('connected to mongodb');
    achievements.forEach(achievement => {
      Achievement.create({
        name: achievement.name,
        description: achievement.description,
        imageUrl: achievement.imageUrl,
        reward: achievement.reward
      });
    });
  })
  .catch(err => {
    console.error('mongodb connection failed', err);
  });
