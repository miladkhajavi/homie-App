import {
  CONFIG
} from '../config/userConfig'
import passport from 'passport'
import {
  OAuth2Strategy as GoogleStrategy
} from 'passport-google-oauth'
import User from '../database/models/user'



passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});


passport.use(new GoogleStrategy({
    clientID: CONFIG.CLIENT_ID,
    clientSecret: CONFIG.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/user/google/callback"
  },

  function (accessToken, refreshToken, profile, done) {
    const Email = profile.emails[0].value
    let username = Email.substring(0, Email.lastIndexOf("@"));
    User.findOne({
      email: profile.emails[0].value
    }, function (err, user) {
      if (err) return done(err);
      if (user) {
        return done(null, {
          user,
          token: accessToken
        });
      }
      const addUser = new User({
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        userName: username,
        email: profile.emails[0].value,
        password: username
      })

      addUser.save(err => {
        if (err) console.log(err);
        done(null, addUser)
      })
    });
  }

));

export const Google = passport.authenticate('google', {
  scope: ['profile', 'email']
})