const express = require('express');
const router = express.Router();

// Note: because we are importing product routes for paths staring with '/products' (in app.js)
// we don't ned to specify the '/products' path here (we are already in /products if this file is in use)
// '/' === '/products/'

// product model
const mongoose = require('mongoose');
const Product = require('./../models/product');

/*
|--------------------------------------------------------------------------
| Get all products
|--------------------------------------------------------------------------
*/
router.get('/', (req, resp, next) => {
    Product.find()
        .exec()
        .then(result => {
            resp.status(200).json(result);
        })
        .catch(error => {
            resp.status(500).json({
                error: error
            });
        });
});

/*
|--------------------------------------------------------------------------
| Create product
|--------------------------------------------------------------------------
*/
router.post('/', (req, resp, next) => {
    // create new instance of Product model
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name, // req.body is available when we are using body-parser middleware
        price: req.body.price
    });
    // save the ne product to DB
    product.save()
        .then(result => {
            resp.status(200).json(result);
        })
        .catch(error => {
            resp.status(500).json({
                error: error
            });
        });
});

/*
|--------------------------------------------------------------------------
| Get single product
|--------------------------------------------------------------------------
*/
router.get('/:id', (req, resp, next) => {
    const id = req.params.id;
    Product.findById(id)
        .exec()
        .then(result => {
            if(result) {
                resp.status(200).json(result);
            } else {
                resp.status(404).json({
                    error: 'No valid entry found for provided ID'
                });
            }
        })
        .catch(error => {
            resp.status(500).json({
                error: error
            });
        });
});

/*
|--------------------------------------------------------------------------
| Update single product
|--------------------------------------------------------------------------
*/
router.patch('/:id', (req, resp, next) => {
    const values = {
        name: req.body.name,
        price: req.body.price
    };
    Product.update({ _id: req.params.id }, { $set: values })
        .exec()
        .then(response => {
            resp.status(200).json(result);
        })
        .catch(error => {
            resp.status(500).json({
                error: error
            });
        });
});

/*
|--------------------------------------------------------------------------
| Delete product
|--------------------------------------------------------------------------
*/
router.delete('/:id', (req, resp, next) => {
    Product.remove({ _id: req.params.id })
        .exec()
        .then(result => {
            resp.status(200).json(result);
        })
        .catch(error => {
            resp.status(500).json({
                error: error
            });
        });
});

module.exports = router;