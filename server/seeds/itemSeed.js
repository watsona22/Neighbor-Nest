const Item = require('../models/Item');
const User = require('../models/User')

const categoriesEnum = [
    "Car Parts and Accessories",
    "Clothing and Accessories",
    "Sporting Goods",
    "Electronics",
    "Business and Industrial",
    "Jewelry and Watches",
    "Collectibles and Art",
    "Home and Garden",
    "Pet Supplies",
    "Other",
];

const getRandomCategory = () => {
    return categoriesEnum[Math.floor(Math.random() * categoriesEnum.length)];
};

const itemsData = Array.from({ length: 50 }, (_, index) => ({
    name: `Item ${index + 1}`,
    price: parseFloat((Math.random() * 100).toFixed(2)),
    description: `Description for item ${index + 1}`,
    category: getRandomCategory(),
    user: null,
}));

async function seedItems() {
    try {
        const users = await User.find();
        for (let itemData of itemsData) {
            const randomUserId = users[Math.floor(Math.random() * users.length)]._id;
            itemData.user = randomUserId;
            await Item.create(itemData);
        }
        console.log('Items seeded successfully');
    } catch (err) {
        console.error('Error seeding items:', err);
    }
}


module.exports = seedItems;