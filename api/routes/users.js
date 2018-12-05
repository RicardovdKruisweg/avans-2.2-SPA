const express = require('express');
const router = express.Router();

// User Model
const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

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
    const newUser = new User();
    const { username, password, displayname } = req.body;
    newUser.username = username.toLowerCase();
    newUser.password = newUser.generateHash(password);
    newUser.displayname = displayname;

    newUser
        .save()
        .then(user => res.json(user));
});


router.post('/signin', async (req, res) => { 
    try{
        const password = req.body.password;
        const username = req.body.username.toLowerCase();
        // Search user 
        const users = await User.find({ "username" : username });

        const user = users[0];
        console.log(user);
        // User doesn't exist
        if(!user) return res.status(404).send({ success : false, message: "User not found"});
        // False password
        console.log("wer here?");
        if(!user.validPassword(password)) return res.status(401).send({ success: false, message: "Invalid password" });
        // Otherwise correct password
        
        newUserSession = new UserSession({
            userId: user._id
        });
        // Create new user session
        const result = await newUserSession.save();
        // Return token
        return res.status(200).send({
            success: true,
            message: "Succesfull sign in",
            token: result._id
        });
    } 
    catch(ex){
        return res.status(500).send({ success: false, message: `${ex}`})
    }
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
                console.log('invalid pass')
                res.json({ succes: false, error: "Password did not match"});
            }
        })
        .catch( err => res.status(500).json({ success : false }))
});
// TODO: Catch errors 

module.exports = router;