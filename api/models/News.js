const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let News = new Schema({
  title: {
    type: String
  },
  textarea: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,required : true
  }
},{
  collection: 'news'
});

module.exports = mongoose.model('News', News);
