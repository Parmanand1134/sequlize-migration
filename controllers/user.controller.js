const { User, Profile } = require('../models');

// Get all users with profile
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({ include: 'profile' });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const { name, email, bio } = req.body;
        const user = await User.create({ name, email });
        const profile = await Profile.create({ bio, userId: user.id });
        res.status(201).json({ user, profile });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
};

// Get user by ID with profile
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, { include: 'profile' });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};
