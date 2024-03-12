const models = require('../models');
const db = require('../config/connection');
const mongoose = require('mongoose');

module.exports = async (modelName, collectionName) => {
  try {
    const model = mongoose.model(modelName);
    if (!model) {
      throw new Error(`Model ${modelName} not found.`);
    }

    await model.deleteMany();
    console.log(`Collection ${collectionName} cleaned successfully.`);
  } catch (err) {
    console.error('Error cleaning collection:', err);
    throw err;
  }
}