const mongoose = require('mongoose');

const giftSchema = new mongoose.Schema({
  name: {type: String},
  age: {type: Number},
  interests: {type: Array},
  budget: {type: String},
  ideas: {type: Array}
});

const commentSchema = new mongoose.Schema({
  content: {type: String},
  createdBy: {type: mongoose.Schema.ObjectId, ref: 'User', required: true}
});

commentSchema.methods.belongsTo = function commentBelongsTo(user) {
  return this.createdBy.id === user._id;
};

const listSchema = new mongoose.Schema({
  name: {type: String},
  gifts: [giftSchema],
  comments: [commentSchema],
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

listSchema.methods.belongsTo = function belongsTo(user) {
  return user._id.equals(this.createdBy.id);
};

module.exports = mongoose.model('List', listSchema);
