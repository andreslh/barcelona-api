const { Router } = require('express');
const controllers = require('../controllers');
const router = Router();
router.get('/', (req, res) => res.send('This is root!'));
router.post('/categories', controllers.createCategory);
module.exports = router;
