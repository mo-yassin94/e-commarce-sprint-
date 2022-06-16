import express from 'express';
import {
  register,
  login,
  logout,
  getUser,
} from '../controllers/userController.js';
import auth from '../middleware/authMiddleware.js';
const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/logout', logout);
userRouter.get('/userinfo', auth, getUser);

export default userRouter;
