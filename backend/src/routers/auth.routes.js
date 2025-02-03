const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../schemas/user.schema');

const Router = express.Router();

// REGISTER
Router.post('/register', async (req, res) => {
    try {
        const { email, name, password, profilePicture } = req.body;

        console.log(email, name, password, profilePicture);

        if (!email) {
            return res.status(400).json({ error: { register: 'Email not received' } });
        }

        if (!password) {
            return res.status(400).json({ error: { register: 'Password not received' } });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: { email: 'Email already registered' } });
        }

        const newUser = new User({ email, name, password, profilePicture });
        const createdUser = await newUser.save();
        console.log(newUser)

        return res.status(200).json({
            token: await createdUser.generateJWT(),
            user: {
                email: createdUser.email,
                name: createdUser.name,
                id: createdUser._id,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error creating new user' });
    }
});

// LOGIN
Router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: { login: 'Missing email or password' } });
        }

        const foundUser = await User.findOne({ email });

        if (!foundUser) {
            return res.status(400).json({ error: { email: 'User not found, please Register' } });
        }

        if (!foundUser.comparePassword(password)) {
            return res.status(400).json({ error: { password: 'Invalid Password' } });
        }

        return res.status(200).json({
            token: foundUser.generateJWT(),
            user: {
                email: foundUser.email,
                name: foundUser.name,
                id: foundUser._id,
                role: foundUser.role,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: { login: 'Error Logging in :(', error: error.message } });
    }
});

module.exports = Router;
