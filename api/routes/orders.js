const express = require('express');
const router = express.Router();

// '/' === '/orders/'

/*
|--------------------------------------------------------------------------
| List orders
|--------------------------------------------------------------------------
*/
router.get('/', (req, resp, next) => {
    resp.status(200).json({
        message: 'Listing all orders: GET request to /orders'
    });
});

/*
|--------------------------------------------------------------------------
| Create order
|--------------------------------------------------------------------------
*/
router.post('/', (req, resp, next) => {
    const order = {
        productId: req.body.productId, // req.body is available when we are using body-parser middleware
        quantity: req.body.quantity
    };
    resp.status(201).json({
        message: 'Creating order: POST request to /orders',
        order: order
    });
});

/*
|--------------------------------------------------------------------------
| Get single order
|--------------------------------------------------------------------------
*/
router.get('/:id', (req, resp, next) => {
    const id = req.params.id;
    resp.status(200).json({
        message: 'Geting single order info: GET request to /orders/'+id
    });
});

/*
|--------------------------------------------------------------------------
| Delete order
|--------------------------------------------------------------------------
*/
router.delete('/:id', (req, resp, next) => {
    const id = req.params.id;
    resp.status(200).json({
        message: 'Deleting single order: DELETE request to /orders/'+id
    });
});

module.exports = router;