import mongoose from 'mongoose';

let mongooseHidden = require('mongoose-hidden')();

const { Schema } = mongoose;

// see https://stackoverflow.com/questions/32566097/mongoose-fetch-documents-from-another-collection-which-has-current-collections

const cartItemSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  item: {
    type: Schema.Types.ObjectId,
    ref: 'Item'
  }
});

// This will add `id` in toJSON
cartItemSchema.set('toJSON', {
  virtuals: true
});

// This will remove `_id` and `__v`
cartItemSchema.plugin(mongooseHidden);

export default mongoose.model('CartItem', cartItemSchema);
