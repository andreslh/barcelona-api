const express = require('express');
const router = express.Router();

const { categoriesValidations, validate } = require('../validators');
const controller = require('../controllers/categories');

router.get('/', controller.get);
router.get('/:id', controller.getById);
router.post('/', categoriesValidations(), validate, controller.post);
router.put('/:id', categoriesValidations(), validate, controller.put);
router.delete('/:id', controller.remove);

module.exports = router;
