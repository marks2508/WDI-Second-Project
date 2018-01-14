const mongoose = require('mongoose');
const listSchema = new mongoose.Schema({
  country: {type: String, required: true},
  image: {type: String},
  adopted: {type: Number, required: true},
  flagNote: {type: String},
  countryNote: {type: String}
});

module.exports = mongoose.model('List', listSchema);
