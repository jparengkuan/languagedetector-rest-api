const express = require('express');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

// Import UserController
const EntrieController = require('../controllers/entrie')


router.post('/new', checkAuth, EntrieController.entrie_new);
router.get('/user', checkAuth, EntrieController.entrie_user);
router.get('/latest', EntrieController.entrie_latest);


module.exports = router;
