const express = require('express');
const router = express.Router();

const controller = require('../controllers/tables');

router.get('/', controller.get);
router.get('/open', controller.getOpen);
router.get('/completed', controller.getCompleted);
router.get('/:id', controller.getById);
router.post('/', controller.post);
router.post('/:id/products', controller.postProducts);
router.delete('/:id', controller.remove);
router.put('/:id/complete', controller.complete);
router.delete('/:id/products/:productTableId', controller.removeProduct);

module.exports = router;