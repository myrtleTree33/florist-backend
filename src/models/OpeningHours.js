import mongoose, { MongooseDocument } from 'mongoose';

import autoIncrement from 'mongoose-auto-increment';

const mongooseHidden = require('mongoose-hidden')();

const { Schema } = mongoose;

const openingHoursSchema = new Schema({
  storeId: {
    type: String,
    required: true
  },
  day: {
    type: Number,
    min: 0,
    max: 6,
    required: true
  },
  timeOpen: {
    type: String,
    required: true
  },
  timeClosed: {
    type: String,
    required: true
  }
});

function _constructDate(openingDate, hh, mm) {
  const opening = moment(openingDate);
  opening.seconds(0);
  opening.minutes(mm);
  opening.hours(hh);
  return opening;
}

openingHoursSchema.statics.getIsStoreOpen = async function(storeId, timeQuery) {
  const day = timeQuery.day();
  const openingsForDay = await this.findOne({ storeId, day });
  if (!openingsForDay || openingsForDay.length === 0) {
    return Promise.resolve(false); // closed
  }

  for (let i = 0; i < openingsForDay.length; i++) {
    // TODO if between interval, allow.  Else disallow.
    const curr = openingsForDay[i];
    if (curr !== timeQuery.day()) {
      continue;
    }
    const startTime = _constructDate(
      timeQuery.getDate(),
      curr.timeOpen.substring(0, 2),
      curr.timeOpen.substring(1)
    );
    const endTime = _constructDate(
      timeQuery.getDate(),
      curr.timeClosed.substring(0, 2),
      curr.timeClosed.substring(1)
    );
    if (timeQuery.isBetween(startTime, endTime)) {
      return Promise.resolve(true);
    }
  }
  return Promise.resolve(false);
};

// This will add `id` in toJSON
openingHoursSchema.set('toJSON', {
  virtuals: true
});

// This will remove `_id` and `__v`
openingHoursSchema.plugin(mongooseHidden);

// auto increment ID
autoIncrement.initialize(mongoose.connection);
openingHoursSchema.plugin(autoIncrement.plugin, 'Item');

export default mongoose.model('Item', openingHoursSchema);
