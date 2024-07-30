const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if email already exists
        const emailExist = await User.findOne({ email });
        if (emailExist) return res.status(400).json({ message: 'Email already exists' });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Determine if the user is an admin
        const isAdmin = email === 'raunak@gmail.com' && password === 'raunak';

        // Create new user
        const user = new User({
            username,
            email,
            password: hashedPassword,
            isAdmin
        });

        // Save user to database
        const savedUser = await user.save();
        res.status(201).json({ user: savedUser._id, message: 'User created successfully' });
    } catch (err) {
        console.error('Error during signup:', err); // Improved error logging
        res.status(400).json({ message: err.message });
    }
};


exports.login = async (req, res) => {
    try {
        console.log('Login request received:', req.body); // Log the request body

        // Check if the email exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            console.log('Email not found');
            return res.status(400).json({ message: 'Email is not found' });
        }

        // Check if the password is correct
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) {
            console.log('Invalid password');
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Check if the user is the special admin user
        const isAdmin = req.body.email === 'raunak@gmail.com' && req.body.password === 'raunak';
        
        // Generate JWT token
        const token = jwt.sign({ _id: user._id, isAdmin: isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Respond with token and admin status
        res.header('auth-token', token).json({ token, isAdmin });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.verify = async (req, res) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verified._id);
        res.json({ isAdmin: user.isAdmin });
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};
