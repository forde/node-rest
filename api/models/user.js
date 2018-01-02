const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/*
|--------------------------------------------------------------------------
| User schema
|--------------------------------------------------------------------------
*/
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const User = mongoose.model('User', userSchema);

/*
|--------------------------------------------------------------------------
| User sign up
|--------------------------------------------------------------------------
*/
User._signup = (req, resp, next) => {
    User.findOne({ email: req.body.email })
        .exec()
        .then(user => {
            if(user) {
                resp.status(409).json({ 
                    message: 'Email already in use' 
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err) {
                        return resp.status(500).json({ error: err });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                        });
                        user.save()
                            .then(result => {
                                resp.status(201).json(result);
                            })
                            .catch(error => {
                                resp.status(500).json({
                                    error: error
                                });
                            });
                    }
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
| User sign in
|--------------------------------------------------------------------------
*/
User._signin = (req, resp, next) => {
    
}

/*
|--------------------------------------------------------------------------
| Delete user
|--------------------------------------------------------------------------
*/
User._delete = (req, resp, next) => {
    User.remove({ _id: req.params.id }).exec()
        .catch(response => {
            resp.status(200).json({
                message: 'User deleted'
            });
        })
        .catch(error => {
            resp.status(500).json({
                error: error
            });
        });
}

module.exports = User;