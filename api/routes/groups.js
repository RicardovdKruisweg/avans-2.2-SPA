const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId

// Model
const Group = require('../../models/Group');

// Helper(s)
const userHelper = require('../helpers/userHelper');

//@route    /api/groups/
//@desc     returns a list with all groups
//@acces    private
router.get('/', (req, res) => {
    Group.find().then( groups => res.json(groups) )
});


// @route   /api/groups
// @desc    Create a new group
// @acces   private
router.post('/', async (req, res) => {
    try{
        // Define variables
        const members = req.body.members;
        const name = req.body.name;
        const membersArray = await userHelper.getUsersByList(members);
        const owner = await userHelper.getUserById(req.body.owner);
        // Create New Group
        const newGroup = new Group({
            name: name,
            owner: owner,
            members: membersArray
        });
        // Save New Group in Mongo
        const group = await newGroup.save();
        // Return Group In Json
        res.json(group);
    }
    catch(ex){
        console.error(ex);
    }
});

router.get('/user/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const groups = await Group.find({ $or: [{ 'members' : new ObjectId(id) },{ 'owner' : new ObjectId(id) }] });
        res.json(groups);
    }
    catch(ex){
        console.error(ex);
    }
});

module.exports = router;