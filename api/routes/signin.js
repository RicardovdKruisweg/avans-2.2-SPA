const Uer = require('../../models/User');
const router = express.Router();

// @Route /api/signin/signup
// @desc Create a new user account
router.post('/signup', (req, res) => {
    const username = req.body.username
    
});