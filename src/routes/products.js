const express = require('express');
const router = express.Router();

const { productsValidations, validate } = require('../validators');
const controller = require('../controllers/products');
const { isAdmin } = require('../validators/authentication');

router.get('/', controller.get);
router.get('/list', controller.getList);
router.get('/:id', controller.getById);
router.post('/', isAdmin, productsValidations(), validate, controller.post);
router.put('/list', isAdmin, controller.putList);
router.put('/:id', isAdmin, productsValidations(), validate, controller.put);
router.delete('/:id', isAdmin, controller.remove);

module.exports = router;
