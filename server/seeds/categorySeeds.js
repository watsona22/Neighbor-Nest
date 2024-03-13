const db = require('../config/connection');
const {Category} = require('../models/index.js');
const cleanDB = require('./cleanDB');


const categoryData = [
    { name: "Car Parts and Accessories", link: "/car-parts", image: "" },
    { name: "Clothing and Accessories", link: "/clothing-and-accessories", image:"" },
    { name: "Sporting Goods", link: "/sporting-goods", image: "" },
    { name: "Electronics", link: "/electronics", image: ""},
    { name: "Business and Industrial", link: "/business-and-industrial", image: "" },
    { name: "Jewelry and Watches", link: "/jewelry-and-watches", image: ""},
    { name: "Collectibles and Art", link: "/collectibles-and-art", image:"" },
    { name: "Home and Garden", link: "/home-and-garden", image: ""},
    { name: "Pet Supplies", link: "/pet-supplies", image:"" },
    { name: "Other", link: "/other", image: "" },
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