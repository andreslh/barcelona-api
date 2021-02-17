const express = require('express');
const router = express.Router();

const { waitersValidations, validate } = require('../validators');
const controller = require('../controllers/waiters');

router.get('/', controller.get);
router.get('/:id', controller.getById);
router.post('/', waitersValidations(), validate, controller.post);
router.put('/:id', waitersValidations(), validate, controller.put);
router.delete('/:id', controller.remove);

module.exports = router;
