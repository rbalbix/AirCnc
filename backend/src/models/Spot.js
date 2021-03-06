const mongoose = require('mongoose');

const SpotSchema = mongoose.Schema(
  {
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

SpotSchema.virtual('thumbnail_url').get(function () {
  // return `http://192.168.1.109:3333/files/${this.thumbnail}`;
  return `https://rb-aircnc.herokuapp.com/files/${this.thumbnail}`;
});

module.exports = mongoose.model('Spot', SpotSchema);
