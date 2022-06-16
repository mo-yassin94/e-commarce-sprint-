import jwt from 'jsonwebtoken';

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  // res.json(token);
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        console.log(err.message);
        // res.redirect('/login');
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.json({ msg: 'no token' });
    // res.redirect('/login');
  }
};
export default requireAuth;
