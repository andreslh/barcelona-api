const express = require('express');
const tablesRouter = require('./tables');
const categoriesRouter = require('./categories');
const subcategoriesRouter = require('./subcategories');
const productsRouter = require('./products');
const usersRouter = require('./users');
const waitersRouter = require('./waiters');
const { authenticateJWT } = require('../validators/authentication');

const apiRouter = express.Router();

apiRouter.use('/tables', authenticateJWT, tablesRouter);
apiRouter.use('/categories', authenticateJWT, categoriesRouter);
apiRouter.use('/subcategories', authenticateJWT, subcategoriesRouter);
apiRouter.use('/products', authenticateJWT, productsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/waiters', authenticateJWT, waitersRouter);

module.exports = apiRouter;
