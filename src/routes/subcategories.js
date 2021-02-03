const express = require('express');
const router = express.Router();

const controller = require('../controllers/subcategories');

router.get('/', controller.get);
router.get('/:id', controller.getById);
router.post('/', controller.post);

module.exports = router;
