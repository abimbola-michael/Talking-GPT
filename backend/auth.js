const passport = require('passport');
const keys = require('./keys');
const GoogleStrategy = require('passport-google-oauth2').Strategy

passport.use(new GoogleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: "/auth/google/redirect",
    passReqToCallback: true,
  },
  function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }));
  
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });