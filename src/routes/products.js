const express = require('express');
const router = express.Router();

const controller = require('../controllers/products');

router.get('/', controller.get);
router.get('/list', controller.getList);
router.get('/:id', controller.getById);
router.post('/', controller.post);

module.exports = router;
