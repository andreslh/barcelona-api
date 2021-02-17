const { validationResult } = require('express-validator');

const categoriesValidations = require('./categories');
const subcategoriesValidations = require('./subcategories');
const productsValidations = require('./products');
const tablesValidations = require('./tables');
const waitersValidations = require('./waiters');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  categoriesValidations,
  subcategoriesValidations,
  productsValidations,
  tablesValidations,
  waitersValidations,
  validate,
};
