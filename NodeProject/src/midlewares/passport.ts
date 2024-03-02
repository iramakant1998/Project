import { Strategy, StrategyOptions, ExtractJwt } from "passport-jwt";
import config from "../config/config";
import User from "../models/User";

/**
 * StrategyOptions interface
 * Using passport-jwt
 */
const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secretKey,
};

/**
 * Instance Strategy Class
 */
export default new Strategy(opts, async (payload, done) => {
  try {
    // Find user by ID in the database
    const user = await User.findById(payload.id);
    
    if (user) {
      console.log(user.id)
      // Pass user object and userId to done callback
      return done(null, user, user.id );
    }
    return done(null, false , user);
  } catch (error) {
    console.log(error);
    return done(error, false);
  }
});
