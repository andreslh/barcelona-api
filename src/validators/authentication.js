const jwt = require('jsonwebtoken');
const { isNotAdmin } = require('../auth/roles');
const config = require('../config');

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, config.accessTokenSecret, (error, user) => {
      if (error) {
        return res.status(401).json({ message: error.name });
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

const isAdmin = (req, res, next) => {
  const user = req.user;

  if (isNotAdmin(user)) {
    res.sendStatus(401);
  }
  next();
};

module.exports = {
  authenticateJWT,
  isAdmin,
};
