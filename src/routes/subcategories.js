const express = require('express');
const router = express.Router();

const { subcategoriesValidations, validate } = require('../validators');
const controller = require('../controllers/subcategories');

router.get('/', controller.get);
router.get('/:id', controller.getById);
router.post('/', subcategoriesValidations(), validate, controller.post);
router.put('/:id', subcategoriesValidations(), validate, controller.put);
router.delete('/:id', controller.remove);

module.exports = router;
