const User = require('../../models/User');

async function getUserById(id) {
    try{
        let user = null;
        user = await User.findById(id);
        return user;
    }
    catch(ex){
        console.error(ex)
    }
}

async function getUsersByList(array) {
    try{
        let membersArray = [];
        array.forEach( async id => {
            const user = await getUserById(id);
            membersArray.push(user);
        });
        return membersArray
    }
    catch(ex){
        console.error(ex);
    }
}

module.exports = {
    getUserById: getUserById,
    getUsersByList: getUsersByList
}