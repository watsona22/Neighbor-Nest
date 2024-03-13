const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Neighbor-Nest', {
    serverSelectionTimeoutMS: 5000, // Increase timeout to 5 seconds
});

module.exports = mongoose.connection;
