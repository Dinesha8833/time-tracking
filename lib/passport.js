import config from 'config';
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import { User, Token } from '../app/models';

const initPassport = () => {
  passport.use(new FacebookStrategy(config.fb, (accessToken, refreshToken, profile, cb) => {
    User
      .find({ where: { fb_id: profile.id } })
      .then(user => {
        if(!user)
          return User.create({ fb_id: profile.id })
        return user;
      })
      .then(user => {
        return Token.create({ userId: user.get('id'), role: user.get('role'), token: Math.random().toString(36).substring(2)})
      })
      .then(token => {
        cb(null, { access_token: token.get('token'), role: token.get('role') });
      })
      .catch(errorOnUserFind => {
        cb(errorOnUserFind);
      });
  }));

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use('accessToken', new BearerStrategy(
    (accessToken, done) => {
      Token.find({ where: { token: accessToken } }).then(token => {
        const info = { scope: '*', isUser: true };
        return done(null, token, info);
      }).catch(err => done(null, null, err.message));
    }
  ));
}

export default initPassport;
