const express = require("express");
const router = express.Router();
const passport = require("passport");

// const logged = (req, res, next) => {
//   if (req.user) res.json({ auth: true, user: req.user });
//   else next();
// };

// router.get("/request", (req, res) => {
//   res.redirect("http://localhost:4000/auth/google");
// });

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.get(
  "/google/redirect",
  passport.authenticate("google", { failureRedirect: "/google" }),
  (req, res) => {
    res.redirect("http://localhost:3000");
  }
);

router.get("/logged/user", (req, res) => {
  if (req.user) res.json({ auth: true, user: req.user });
  else res.json({ auth: false, user: null });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.json({ auth: false, user: null });
});

module.exports = router;
