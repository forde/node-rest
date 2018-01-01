const express = require('express');
const router = express.Router();

// Note: because we are importing product routes for paths staring with '/products' (in app.js)
// we don't ned to specify the '/products' path here (we are already in /products if this file is in use)
// '/' === '/products/'

/*
|--------------------------------------------------------------------------
| Get all products
|--------------------------------------------------------------------------
*/
router.get('/', (req, resp, next) => {
    resp.status(200).json({
        message: 'Listing all products: GET request to /products'
    });
});

/*
|--------------------------------------------------------------------------
| Create product
|--------------------------------------------------------------------------
*/
router.post('/', (req, resp, next) => {
    const product = {
        name: req.body.name, // req.body is available when we are using body-parser middleware
        price: req.body.price
    };
    resp.status(200).json({
        message: 'Creating new product: POST request to /products',
        product: product
    });
});

/*
|--------------------------------------------------------------------------
| Get single product
|--------------------------------------------------------------------------
*/
router.get('/:id', (req, resp, next) => {
    const id = req.params.id;
    resp.status(200).json({
        message: 'Geting single product info: GET request to /products/'+id
    });
});

/*
|--------------------------------------------------------------------------
| Update single product
|--------------------------------------------------------------------------
*/
router.patch('/:id', (req, resp, next) => {
    const id = req.params.id;
    resp.status(200).json({
        message: 'Updating product information: PATCH request to /products/'+id
    });
});

/*
|--------------------------------------------------------------------------
| Delete product
|--------------------------------------------------------------------------
*/
router.delete('/:id', (req, resp, next) => {
    const id = req.params.id;
    resp.status(200).json({
        message: 'Deleting product: DELETE request to /products/'+id
    });
});

module.exports = router;