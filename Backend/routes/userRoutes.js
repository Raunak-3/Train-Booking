const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const { verifyToken } = require('../middlewares/authMiddleware');
// const generateToken=require('../Utils/generateToken')

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/verify', verifyToken, userController.verify);

module.exports = router;
