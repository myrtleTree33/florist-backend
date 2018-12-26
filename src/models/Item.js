import mongoose from 'mongoose';

import autoIncrement from 'mongoose-auto-increment';

const mongooseHidden = require('mongoose-hidden')();

const { Schema } = mongoose;

const itemSchema = new Schema({
  _id: {
    type: Number,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  gist: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  landscapeImg: {
    type: String,
    required: true
  },
  imgSrc: {
    type: Array,
    required: true
  },
  numStock: {
    type: Number,
    required: true,
    select: false
  },
  isInfQty: {
    type: Boolean,
    default: true,
    required: true,
    select: false
  },
  category: {
    type: String
  },
  price: new Schema({
    _id: false,
    currency: {
      type: String,
      required: true
    },
    value: {
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

// auto increment ID
autoIncrement.initialize(mongoose.connection);
itemSchema.plugin(autoIncrement.plugin, 'Item');

export default mongoose.model('Item', itemSchema);
