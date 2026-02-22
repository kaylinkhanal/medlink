const express = require('express');
const { signup, login, getUserProfile, getUsers } = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

// Protected routes
router.get('/user', auth, getUserProfile);
router.get('/users', auth, getUsers);

module.exports = router;
