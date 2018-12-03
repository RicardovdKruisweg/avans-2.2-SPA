const express = require('express');
const router = express.Router();

// User Model
const User = require('../../models/User');

// @route   GET api/users
// @desc    GET All Users
// @acces   Public
router.get('/', (req, res) => {
    User.find()
        .sort({ username: 1})
        .then(users => res.json(users))
});

// @route   POST api/users
// @desc    Create A New User
// @acces   Private
router.post('/', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    });

    newUser
        .save()
        .then(user => res.json(user));
});

// @route   DELETE api/users/:id
// @desc    Deleta A User
// @acces   Private
router.delete('/:id', (req, res) => {
    User
        .findById(req.params.id)
        .then(user => {
            if(user.password === req.body.password){
                user.remove().then(() => res.json({ success: true}));
            }
            else{
                res.json({ succes: false, error: "Password did not match"});
            }
        })
        .catch( err => res.status(500).json({ success : false }))
});
// TODO: Catch errors 
module.exports = router;