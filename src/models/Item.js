import mongoose from 'mongoose';

let mongooseHidden = require('mongoose-hidden')();

const { Schema } = mongoose;

const itemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  numStock: {
    type: Number,
    required: true
  },
  isInfQty: {
    type: Boolean,
    default: true,
    required: true
  },
  category: {
    type: String
  },
  mainImg: {
    type: String,
    required: true
  },
  imgs: {
    type: Array,
    required: false
  },
  price: new Schema({
    _id: false,
    currency: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    }
  })
});

// This will add `id` in toJSON
itemSchema.set('toJSON', {
  virtuals: true
});

// This will remove `_id` and `__v`
itemSchema.plugin(mongooseHidden);

export default mongoose.model('Item', itemSchema);
