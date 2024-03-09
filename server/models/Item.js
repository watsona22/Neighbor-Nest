const { Schema, model } = require('mongoose');

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


const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: categoriesEnum,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Item = model('Item', itemSchema);

module.exports = Item