const mongoose = require('mongoose');

const Product = require('./../models/product'); 

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'}, // create relation
    quantity: { type: Number, default: 1 },
});

const Order = mongoose.model('Order', orderSchema);


/*
|--------------------------------------------------------------------------
| List all orders
|--------------------------------------------------------------------------
*/
Order._list = (req, resp, next) => {
    Order.find()
        .populate('product', 'name _id, price') // include product information to order response
        .exec()
        .then(result => {
            resp.status(200).json(result);
        })
        .catch(error => {
            resp.status(500).json({
                error: error
            });
        });
}

/*
|--------------------------------------------------------------------------
| Create order
|--------------------------------------------------------------------------
*/
Order._create = (req, resp, next) => {
    // check if product exists before saving the order
    Product.findById(req.body.product)
        .then(product => {
            // return with an error if product does not exist
            if(!product) {
                return resp.status(500).json({
                    error: 'Product does not exist'
                });
            }
            const order = new Order({
                _id: new mongoose.Types.ObjectId(),
                product: req.body.product,
                quantity: req.body.quantity
            });
            return order.save(); // return a promise so we can keep chaining (add another then())
        })
        .then(result => {
            resp.status(200).json(result);
        })
        .catch(error => {
            resp.status(500).json({
                error: error
            });
        });
}

/*
|--------------------------------------------------------------------------
| Get single order
|--------------------------------------------------------------------------
*/
Order._get = (req, resp, next) => {
    const id = req.params.id;
    Order.findById(id)
        .populate('product')
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
}


/*
|--------------------------------------------------------------------------
| Delete order
|--------------------------------------------------------------------------
*/
Order._delete = (req, resp, next) => {
    Order.remove({ _id: req.params.id })
        .exec()
        .then(result => {
            resp.status(200).json(result);
        })
        .catch(error => {
            resp.status(500).json({
                error: error
            });
        });
}

module.exports = Order;