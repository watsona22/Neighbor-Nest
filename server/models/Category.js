const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  link: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    default: "shopping-bag.png"
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Item'
    }
  ]
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;