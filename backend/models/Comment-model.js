const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const commentSchema = new Schema({
  description: String,
  craft: { type: Schema.Types.ObjectId, ref: 'Craft' },
  userId: {type: Schema.Types.ObjectId, ref: 'User'}
});
 
const Comment = mongoose.model('Comment', commentSchema);
 
module.exports = Comment;

