const { body } = require('express-validator');

const validations = () => {
  return [body('name').isLength({ min: 1 })];
};

module.exports = validations;
