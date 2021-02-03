const express = require('express');
const tablesRouter = require('./tables');
const categoriesRouter = require('./categories');
const subcategoriesRouter = require('./subcategories');
const productsRouter = require('./products');

const apiRouter = express.Router();

apiRouter.use('/tables', tablesRouter);
apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/subcategories', subcategoriesRouter);
apiRouter.use('/products', productsRouter);

module.exports = apiRouter;
