
const casual = require ('./casual');
const deleteCasualData = require('./deleteCasualData');
const mongoose = require('mongoose');
const User = require('../models/User');
const Item = require('../models/Item');

mongoose.connect('mongodb://localhost:27017/NeighborNest', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function seedData() {
  try {
    await deleteCasualData();

    const users = [];
    const items = [];

    for (let i = 0; i < 100; i++) {
      const user = casual.generateUser();
      user.casual = true;
      users.push(user);

      const userItems = [];
      const numberOfItems = casual.generateItem().price;
      for (let j = 0; j < numberOfItems; j++) {
        const item = casual.generateItem();
        item.casual = true;
        userItems.push(item);
        items.push(item);
      }

      user.items = userItems;
    }

    console.log(users);
    console.log(items);
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

seedData();