let refreshTokens = [];

const isRefreshTokenInvalid = (token) => {
  return refreshTokens.includes(token);
};

const addRefreshToken = (token) => {
  refreshTokens.push(token);
};

const removeRefreshToken = (token) => {
  refreshTokens = refreshTokens.filter((t) => t !== token);
};

module.exports = {
  isRefreshTokenInvalid,
  addRefreshToken,
  removeRefreshToken,
};