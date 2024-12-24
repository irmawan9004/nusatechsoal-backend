const passport = require('passport');

exports.googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.googleAuthCallback = passport.authenticate('google', {
  failureRedirect: '/login',
  session: false
});

exports.googleAuthSuccess = (req, res) => {
  const token = req.user.token;
  res.redirect(`/success?token=${token}`);
};