const GoogleStrategy = require('passport-google-oauth20').Strategy;
const AdminUser = require('../models/AdminUser');

module.exports = function(passport) {
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await AdminUser.findOne({ googleId: profile.id });
        if (!user) {
          // If no user exists, create one using the Google profile email as username.
          user = await AdminUser.create({
            username: profile.emails[0].value,
            password: 'oauth', // Password not used for OAuth accounts.
            googleId: profile.id
          });
        }
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await AdminUser.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};
