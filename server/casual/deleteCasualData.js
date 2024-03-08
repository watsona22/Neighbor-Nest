const User = require('../models/User');
const Item = require('../models/Item');

async function deleteCasualData() {
  try {
    await User.deleteMany({ casual: true });
    await Item.deleteMany({ casual: true });

    console.log('Casual data deleted successfully');
  } catch (error) {
    console.error('Error deleting casual data:', error);
  }
}

module.exports = deleteCasualData;