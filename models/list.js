const mongoose = require('mongoose');

const giftSchema = new mongoose.Schema({
  name: {type: String},
  age: {type: Number},
  interests: {type: String},
  budget: {type: Number},
  ideas: {type: String}
});

const commentSchema = new mongoose.Schema({
  content: {type: String},
  createdBy: {type: mongoose.Schema.ObjectId, ref: 'User', required: true}
});

commentSchema.methods.belongsTo = function commentBelongsTo(user) {
  return this.createdBy.id === user.ud;
};

const listSchema = new mongoose.Schema({
  name: {type: String},
  gifts: [giftSchema],
  comments: [commentSchema],
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

listSchema.methods.belongsTo = function belongsTo(user) {
  return this.createdBy.id === user.id;
};

module.exports = mongoose.model('List', listSchema);
