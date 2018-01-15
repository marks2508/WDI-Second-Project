const mongoose = require('mongoose');

const giftSchema = new mongoose.Schema({
  name: {type: String},
  age: {type: Number},
  interests: {type: String},
  budget: {type: Number},
  ideas: {type: String}
});


const listSchema = new mongoose.Schema({
  name: {type: String},
  gifts: [giftSchema]
});


module.exports = mongoose.model('List', listSchema);
