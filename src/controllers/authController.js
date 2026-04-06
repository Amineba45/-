const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = []; // This should ideally be a database

// Register function
const register = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.status(201).send('User registered');
};

// Login function
const login = (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user) return res.status(400).send('User not found');

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid password');

    const token = jwt.sign({ username: user.username }, 'your_jwt_secret'); // Use a strong secret in production
    res.json({ token });
};

// Logout function
const logout = (req, res) => {
    // Logic for logout (e.g. invalidate JWT on client side)
    res.send('User logged out');
};

module.exports = { register, login, logout };