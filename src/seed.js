'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/samba_service';

const seedUsers = [
    {
        email: process.env.SEED_ADMIN_EMAIL || 'admin@samba.com',
        password: process.env.SEED_ADMIN_PASSWORD,
        firstName: 'Admin',
        lastName: 'User',
        phone: '+1234567890',
        role: 'admin',
    },
    {
        email: process.env.SEED_USER1_EMAIL || 'alice@samba.com',
        password: process.env.SEED_USER1_PASSWORD,
        firstName: 'Alice',
        lastName: 'Smith',
        phone: '+1987654321',
        role: 'user',
    },
    {
        email: process.env.SEED_USER2_EMAIL || 'bob@samba.com',
        password: process.env.SEED_USER2_PASSWORD,
        firstName: 'Bob',
        lastName: 'Jones',
        phone: '+1122334455',
        role: 'user',
    },
];

const REQUIRED_ENV = ['SEED_ADMIN_PASSWORD', 'SEED_USER1_PASSWORD', 'SEED_USER2_PASSWORD'];
const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
if (missing.length > 0) {
    console.error(`Missing required environment variables: ${missing.join(', ')}`);
    console.error('Set them in your .env file before running the seed script.');
    process.exit(1);
}

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
