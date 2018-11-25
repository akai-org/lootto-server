const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');

const User = require('../models/user');

passport.use(new FacebookTokenStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET
  }, (accessToken, refreshToken, profile, done) => {
    const fbid = { facebookId: profile.id };
    User.findOne(fbid)
    .then(async (user) => {
      if (!user) {
        user = new User(fbid);
        user.name = profile.displayName;
        user.email = profile.emails[0].value;
        await user.save();
      }
      done(null, user);
    }).catch((err) => done(err, null));
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
