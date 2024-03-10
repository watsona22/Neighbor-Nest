const db = require('../config/connection');
const {Category} = require('../models/index.js');
const cleanDB = require('./cleanDB');


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
db.once('open', async () => {
    try {
        await cleanDB('Category', 'categories');
        await Category.insertMany(categoryData);
    } catch (err) {
        console.error('Error cleaning users collection:', err);
    }
    process.exit();
});