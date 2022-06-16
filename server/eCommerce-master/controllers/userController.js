import Users from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const olduser = await Users.findOne({ email });
    if (olduser)
      return res.status(400).json({ msg: 'This email already exist!' });
    if (password.length < 8)
      return res
        .status(400)
        .json({ msg: 'Password should be at least 8 characters!' });

    // Password encryption
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Users.create({
      name,
      email,
      password: hashedPassword,
    });

    // create access token
    const accessToken = createAccessToken({ id: user._id });
    res.cookie('jwt', accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 3,
    });
    res.status(201).json({ user: user._id });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

 
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'user does not exist' });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) return res.status(400).json({ msg: 'incorrect password' });

    // login succuss
    const accessToken = createAccessToken({ id: user._id });
    res.cookie('jwt', accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 3,
    });
    res.status(201).json({ user: user._id , name:user.name});
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie('jwt', {});
    return res.json({ msg: 'loged out' });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await Users.findById(req.user.id).select('-password');
    if (!user) return res.status(400).json({ msg: 'user is not found' });

    res.json(user);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

// create Token function
const createAccessToken = (id) => {
  return jwt.sign(id, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3d' });
};
