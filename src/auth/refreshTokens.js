const { Token } = require('../models');

const isRefreshTokenInvalid = async (token) => {
  const exists = await Token.findOne({ where: { token } });
  return !exists;
};

const addRefreshToken = async (token) => {
  await Token.create({ token });
};

const removeRefreshToken = async (token) => {
  await Token.destroy({ where: { token } });
};

module.exports = {
  isRefreshTokenInvalid,
  addRefreshToken,
  removeRefreshToken,
};
