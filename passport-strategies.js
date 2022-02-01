const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const bcrypt = require('bcrypt');

const { db, jwtSecret } = require('./conf');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (formUsername, formPassword, done) => {
      try {
        const [sqlRes] = await db.query(
          `SELECT id, email, username, password FROM admin WHERE username=?`,
          [formUsername]
        );
        if (!sqlRes.length) return done(null, false);
        const { id, email, username, password } = sqlRes[0];
        const isPasswordOK = bcrypt.compareSync(formPassword, password);
        if (!isPasswordOK) return done(null, false, 'Wrong password!');

        const admin = { id, email, username };
        return done(null, admin);
      } catch (e) {
        console.log(e);
        return done(e);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    },
    (jwtPayload, done) => {
      const admin = jwtPayload;
      return done(null, admin);
    }
  )
);

passport.serializeUser(function (admin, done) {
  done(null, admin);
});

passport.deserializeUser(function (admin, done) {
  done(null, admin);
});
