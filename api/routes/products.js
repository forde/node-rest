const express = require('express');
const router = express.Router();

const Product = require('./../models/product');

// Note: because we are importing product routes for paths staring with '/products' (in app.js)
// we don't ned to specify the '/products' path here (we are already in /products if this file is in use)
// '/' === '/products/'

/*
|--------------------------------------------------------------------------
| List all products
|--------------------------------------------------------------------------
*/
router.get('/', Product._list);

/*
|--------------------------------------------------------------------------
| Create product
|--------------------------------------------------------------------------
*/
router.post('/', Product._create);

/*
|--------------------------------------------------------------------------
| Get single product
|--------------------------------------------------------------------------
*/
router.get('/:id', Product._get);

/*
|--------------------------------------------------------------------------
| Update single product
|--------------------------------------------------------------------------
*/
router.patch('/:id', Product._update);

/*
|--------------------------------------------------------------------------
| Delete product
|--------------------------------------------------------------------------
*/
router.delete('/:id', Product._delete);


module.exports = router;