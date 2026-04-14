'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/samba_service';

const seedUsers = [
    {
        email: 'admin@samba.com',
        password: 'Admin@1234',
        firstName: 'Admin',
        lastName: 'User',
        phone: '+1234567890',
        role: 'admin',
    },
    {
        email: 'alice@samba.com',
        password: 'Alice@1234',
        firstName: 'Alice',
        lastName: 'Smith',
        phone: '+1987654321',
        role: 'user',
    },
    {
        email: 'bob@samba.com',
        password: 'Bob@1234',
        firstName: 'Bob',
        lastName: 'Jones',
        phone: '+1122334455',
        role: 'user',
    },
];

const seed = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB connected.');

        // Clear existing users
        await User.deleteMany({});
        console.log('Existing users removed.');

        // Hash passwords and insert users
        const usersToInsert = await Promise.all(
            seedUsers.map(async (u) => ({
                ...u,
                password: await bcrypt.hash(u.password, 10),
            }))
        );

        await User.insertMany(usersToInsert);
        console.log(`Seeded ${usersToInsert.length} users successfully.`);
    } catch (err) {
        console.error('Seeding failed:', err.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
        console.log('MongoDB disconnected.');
    }
};

seed();
