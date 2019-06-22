const mongoose = require('mongoose')
const chatSchema = new mongoose.Schema({
  description: {
    type: String
  }
});
const chatModel = mongoose.model('chat',chatSchema);
module.exports = chatModel;
