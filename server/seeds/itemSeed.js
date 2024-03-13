const Item = require('../models/Item');
const User = require('../models/User')


// const getRandomCategory = () => {
//     return categoriesEnum[Math.floor(Math.random() * categoriesEnum.length)];
// };

const itemsData = Array.from({ length: 50 }, (_, index) => ({
    name: `Item ${index + 1}`,
    price: parseFloat((Math.random() * 100).toFixed(2)),
    description: `Description for item ${index + 1}`,
    // category: categories[index % categories.length],
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
