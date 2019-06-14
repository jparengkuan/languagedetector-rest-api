const express = require('express');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

// Import UserController
const EntrieController = require('../controllers/entrie')


router.get('/new', checkAuth, EntrieController.submit_new);


module.exports = router;
