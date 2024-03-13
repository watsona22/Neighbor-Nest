const db = require('../config/connection');
const {User, Item} = require('../models/index.js');
const cleanDB = require('./cleanDB');
const casual = require('casual');
const bcrypt = require('bcrypt');

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

const generateCasualUserData = () => {
    return {
        firstName: casual.first_name,
        lastName: casual.last_name,
        email: casual.email,
        password: casual.password,
    };
};

const seedUsers = async () => {
    try {
        await cleanDB('User', 'users');

        
        const saltRounds = 10;
        const hashedUsersData = await Promise.all(usersData.map(async userData => {
            const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
            return { ...userData, password: hashedPassword };
        }));

       
        const casualUsersData = Array.from({ length: 20 }, generateCasualUserData);
        const hashedCasualUsersData = await Promise.all(casualUsersData.map(async userData => {
            const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
            return { ...userData, password: hashedPassword };
        }));

        const combinedUsersData = [...hashedUsersData, ...hashedCasualUsersData];

        await User.insertMany(combinedUsersData);
        console.log('Users seeded successfully');
    } catch (err) {
        console.error('Error seeding users:', err);
    }
};

db.once('open', async () => {
    try {
        await seedUsers();
    } catch (err) {
        console.error('Error cleaning users collection:', err);
    }
    process.exit()
});
// async function seedUsers() {
//     try {
//         await db.User.deleteMany({})
        
//     }
//     catch (err) {
//         console.error('Error seeding users:', err);
//     }
    // try {
    //     for (let userData of usersData) {
    //         const saltRounds = 10;
    //         const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    //         userData.password = hashedPassword;
    //         await User.create(userData);
    //     }
    //     console.log('Users seeded successfully');
    // } catch (err) {
    //     console.error('Error seeding users:', err);
    // }


// seedUsers();

// module.exports = seedUsers;