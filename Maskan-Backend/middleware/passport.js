import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { SECRET_JWT_CODE } from "../config/dbConfig";
import User from "../database/models/user";

export const Auth = passport.authenticate("jwt" ,{session:false})

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
  secretOrKey: SECRET_JWT_CODE,
};

passport.use(
  new Strategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findOne({_id: jwt_payload._id });
      return done(null, user);
    } catch (error) {
      return done(null, false);
      // or you could create a new account
    }
  })
);



