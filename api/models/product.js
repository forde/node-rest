const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true }
});

const Product = mongoose.model('Product', productSchema);


/*
|--------------------------------------------------------------------------
| List all products
|--------------------------------------------------------------------------
*/
Product._list = (req, resp, next) => {
    Product.find()
        .exec() // exec() turns our request into a promise
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
| Create product
|--------------------------------------------------------------------------
*/
Product._create = (req, resp, next) => {
    // create new instance of Product model
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name, // req.body is available when we are using body-parser middleware
        price: req.body.price
    });
    // save the ne product to DB
    // NOTE: save() returns promise by default so we don't need exec() !!!
    product.save() 
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
| Get single product
|--------------------------------------------------------------------------
*/
Product._get = (req, resp, next) => {
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
}

/*
|--------------------------------------------------------------------------
| Update single product
|--------------------------------------------------------------------------
*/
Product._update = (req, resp, next) => {
    const values = {
        name: req.body.name,
        price: req.body.price
    };
    Product.update({ _id: req.params.id }, { $set: values })
        .exec()
        .then(result => {
            resp.status(200).json(result);
        })
        .catch(error => {
            console.log(error);
            resp.status(500).json({
                error: error
            });
        });
}

/*
|--------------------------------------------------------------------------
| Delete product
|--------------------------------------------------------------------------
*/
Product._delete = (req, resp, next) => {
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
}

module.exports = Product;