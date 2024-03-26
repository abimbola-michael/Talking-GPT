#!/usr/bin/node

import { Strategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import User from '../models/users';

const JwtStrategy = Strategy;

const JWTSecret = process.env.JWT_SECRET;

const jwtOptions = {
  secretOrKey: JWTSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findById(payload._id).exec();
    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
}));

export default passport.authenticate('jwt', { session: false });
