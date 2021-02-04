const express = require('express');
const router = express.Router();

const { productsValidations, validate } = require('../validators');
const controller = require('../controllers/products');

router.get('/', controller.get);
router.get('/list', controller.getList);
router.get('/:id', controller.getById);
router.post('/', productsValidations(), validate, controller.post);
router.put('/:id', productsValidations(), validate, controller.put);
router.delete('/:id', controller.remove);

module.exports = router;
