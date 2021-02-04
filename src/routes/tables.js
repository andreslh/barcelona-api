const express = require('express');
const router = express.Router();

const { tablesValidations, validate } = require('../validators');
const controller = require('../controllers/tables');

router.get('/', controller.get);
router.get('/open', controller.getOpen);
router.get('/completed', controller.getCompleted);
router.get('/:id', controller.getById);
router.post('/', tablesValidations(), validate, controller.post);
router.put('/:id', tablesValidations(), validate, controller.put);
router.delete('/:id', controller.remove);
router.put('/:id/complete', controller.complete);
router.post('/:id/products', controller.addProducts);
router.delete('/:id/products/:productTableId', controller.removeProduct);

module.exports = router;
