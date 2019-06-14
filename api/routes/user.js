const express = require('express');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

// Import UserController
const UserController = require('../controllers/user')


router.post('/register', UserController.user_register);
router.post('/login', UserController.user_login);
router.get('/details', checkAuth, UserController.user_details);
router.put('/update', checkAuth, UserController.user_update);


module.exports = router;
