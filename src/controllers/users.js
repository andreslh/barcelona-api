const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');
const {
  addRefreshToken,
  removeRefreshToken,
  isRefreshTokenInvalid,
} = require('../auth/refreshTokens');

const { User } = require('../models');
const { ROLES, isNotAdmin } = require('../auth/roles');

const EXPIRATION_TIME = '20m';

const getAccessToken = (email, role) =>
  jwt.sign({ email, role }, config.accessTokenSecret, {
    expiresIn: EXPIRATION_TIME,
  });

const getRefreshToken = (email, role) =>
  jwt.sign({ email, role }, config.refreshTokenSecret);

const getHashedPassword = (password) => bcrypt.hashSync(password, 10);

const isPasswordCorrect = (password, comparePassword) =>
  bcrypt.compareSync(password, comparePassword);

const isEmailRepeated = async (email) =>
  (await User.findOne({ where: { email } })) ? true : false;

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user: loggedUser } = req;

    if (isNotAdmin(loggedUser)) {
      return res.sendStatus(403);
    }

    const isRepateted = await isEmailRepeated(email);
    if (isRepateted) {
      return res.status(400).json({ error: 'Email is already in use' });
    }

    console.log('aca');

    const user = await User.create({
      email,
      password: getHashedPassword(password),
      role: ROLES.manager,
    });
    return res.status(201).json({ user: { email: user.email } });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: { email },
  });

  if (user && isPasswordCorrect(password, user.password)) {
    const { email, role } = user;
    const accessToken = getAccessToken(email, role);
    const refreshToken = getRefreshToken(email, role);
    addRefreshToken(refreshToken);

    res.json({
      accessToken,
      refreshToken,
    });
  } else {
    res.send('Email or password incorrect');
  }
};

const token = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.sendStatus(401);
  }

  if (isRefreshTokenInvalid(token)) {
    return res.sendStatus(403);
  }

  jwt.verify(token, config.refreshTokenSecret, (err, { email, role }) => {
    if (err) {
      return res.sendStatus(403);
    }

    const accessToken = getAccessToken(email, role);

    res.json({
      accessToken,
    });
  });
};

const logout = async (req, res) => {
  const { token } = req.body;

  if (isRefreshTokenInvalid(token)) {
    return res.sendStatus(400);
  }

  removeRefreshToken(token);
  res.send('Logout successful');
};

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const {
    user: { email },
  } = req;

  const user = await User.findOne({
    where: { email },
  });

  if (isPasswordCorrect(currentPassword, user.password)) {
    const userUpdated = await User.update(
      { password: getHashedPassword(newPassword) },
      { where: { email } }
    );
    if (userUpdated) {
      return res.sendStatus(200);
    }
  }
};

module.exports = {
  signup,
  login,
  token,
  logout,
  changePassword,
};
