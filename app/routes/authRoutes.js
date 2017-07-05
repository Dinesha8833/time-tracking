import express from 'express';
import passport from 'passport';

const initAuthRoutes = () => {
  const authRoutes = express.Router();

  authRoutes.get(
    '/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/auth/failed' }),
    function(req, res) {
      res.redirect(`/auth/success?access_token=${req.user.access_token}&role=${req.user.role}`);
    }
  );

  return authRoutes;
};

export default initAuthRoutes;
