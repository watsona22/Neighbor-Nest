// const mongoose = require('mongoose');

 
//  const connect = async () => {
//    const db = await mongoose.connect("mongodb://localhost:27017/Neighbor-Nest", {
//         useNewUrlParser: true
//     })
//     return db.connection
// };

// module.exports = connect

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Neighbor-Nest') 

module.exports = mongoose.connection;


