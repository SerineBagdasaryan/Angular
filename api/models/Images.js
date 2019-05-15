const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Images = new Schema({
  image: {
    type: String
  },
    userId: {
      type: mongoose.Schema.Types.ObjectId,required : true
    }

  },
{
  collection: 'images'
});

module.exports = mongoose.model('Images', Images);
