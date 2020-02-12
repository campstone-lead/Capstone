const passport = require('passport');
const router = require('express').Router();
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { User, Artist } = require('../db/models');
module.exports = router;
const cors = require('cors');

////////////////////////////
// const allowedOrigins = [
//   'capacitor://localhost',
//   'ionic://localhost',
//   'http://localhost',
//   'http://localhost:8080',
//   'http://localhost:8100',
// ];

// // Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (allowedOrigins.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Origin not allowed by CORS'));
//     }
//   },
// };

// // Enable preflight requests for all routes
// router.options('*', cors(corsOptions));
//////////////////////////////////////

/**
 * For OAuth keys and other secrets, your Node process will search
 * process.env to find environment variables. On your production server,
 * you will be able to set these environment variables with the appropriate
 * values. In development, a good practice is to keep a separate file with
 * these secrets that you only share with your team - it should NOT be tracked
 * by git! In this case, you may use a file called `secrets.js`, which will
 * set these environment variables like so:
 *
 * process.env.GOOGLE_CLIENT_ID = 'your google client id'
 * process.env.GOOGLE_CLIENT_SECRET = 'your google client secret'
 * process.env.GOOGLE_CALLBACK = '/your/google/callback'
 */

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.log('Google client ID / secret not found. Skipping Google OAuth.');
} else {
  const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
  };

  const strategy = new GoogleStrategy(
    googleConfig,
    (token, refreshToken, profile, done) => {
      const googleId = profile.id;
      // console.log(googleId)
      const email = profile.emails[0].value;
      const firstName = profile.name.givenName;
      const lastName = profile.name.familyName;

      User.findOrCreate({
        where: { googleId },
        defaults: { email, firstName, lastName },
      })
        .then(([user]) => done(null, user))
        .catch(done);
    }
  );

  passport.use(strategy);

  router.get(
    '/',
    passport.authenticate('google', { scope: ['email', 'profile'] })
  );

  router.get(
    '/callback',
    // cors(corsOptions),
    passport.authenticate('google', {
      // successRedirect: 'http://localhost:8100/profile',
      // failureRedirect: 'http://localhost:8100/login',
    })
  );
}
