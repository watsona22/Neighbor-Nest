const db = require('../config/connection');
const { Category, Item, User } = require('../models/index.js');
const cleanDB = require('./cleanDB');
const casual = require('casual');

const categoryData = [
    {
        name: 'Furniture',
    },
    {
        name: 'Electronics',
    },
    {
        name: 'Clothing',
    },
    {
        name: 'Books',
    },
    {
        name: 'Toys',
    },
    {
        name: 'Tools',
    },
    {
        name: 'Sporting Goods',
    },
    {
        name: 'Automotive',
    },
    {
        name: 'Jewelry',
    },
    {
        name: 'Appliances',
    },
];

const usersData = [
    {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
    },
    {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        password: 'password456',
    },
    {
        firstName: 'Alice',
        lastName: 'Jones',
        email: 'alice@example.com',
        password: 'password789',
    },
    {
        firstName: 'Bob',
        lastName: 'Brown',
        email: 'bob@example.com',
        password: 'password321',
    },
    {
        firstName: 'Emily',
        lastName: 'Davis',
        email: 'emily@example.com',
        password: 'password654',
    },
    {
        firstName: 'Michael',
        lastName: 'Wilson',
        email: 'michael@example.com',
        password: 'password987',
    },
    {
        firstName: 'Sarah',
        lastName: 'Taylor',
        email: 'sarah@example.com',
        password: 'password123',
    },
    {
        firstName: 'David',
        lastName: 'Anderson',
        email: 'david@example.com',
        password: 'password456',
    },
    {
        firstName: 'Laura',
        lastName: 'Martinez',
        email: 'laura@example.com',
        password: 'password789',
    },
    {
        firstName: 'Kevin',
        lastName: 'Garcia',
        email: 'kevin@example.com',
        password: 'password321',
    },
];

const itemsData = Array.from({ length: 50 }, (_, index) => ({
    name: `Item ${index + 1}`,
    price: parseFloat((Math.random() * 100).toFixed(2)),
    description: `Description for item ${index + 1}`,
    user: null,
    category: null,
}));

async function seedData() {
    try {
        // Seed categories if needed
        await cleanDB('Category', 'categories');
        await Category.insertMany(categoryData);

        // Seed existing users if needed
        await cleanDB('User', 'users');
        await User.insertMany(usersData);

        // Fetch existing users
        const existingUsers = await User.find();

        // Generate casual users if needed
        const generatedUsers = [];
        for (let i = 0; i < 20; i++) {
            const userData = {
                firstName: casual.first_name,
                lastName: casual.last_name,
                email: casual.email,
                password: casual.password,
            };

            while (userData.password.length < 8) {
                userData.password = casual.password;
            }

            const user = await User.create(userData);
            generatedUsers.push(user);
        }

        // Combine existing and generated users
        const users = [...existingUsers, ...generatedUsers, ...usersData];

        // Assign random users to items
        for (let itemData of itemsData) {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            itemData.user = randomUser._id;

            // Only assign a category if the item is associated with a user
            if (randomUser) {
                const categories = await Category.find();
                const randomCategory = categories[Math.floor(Math.random() * categories.length)];
                itemData.category = randomCategory._id;
            }

            await Item.create(itemData);
        }

        console.log('Data seeded successfully');
    } catch (err) {
        console.error('Error seeding data:', err);
    }
    process.exit(0);
}

seedData();


