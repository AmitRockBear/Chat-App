const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { getUserById, createUser } = require("../models/User");

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    getUserById(id).then((user) => {
      done(null, user);
    });
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/redirect",
      },
      function (accessToken, refreshToken, profile, done) {
        getUserById(profile.id)
          .then(async (user) => {
            if (!user) {
              user = await createUser(profile);
              console.log("user created: " + user);
            } else console.log("User was not created: " + user);
            done(null, user);
          })
          .catch((err) => {
            throw err;
          });
      }
    )
  );
};
