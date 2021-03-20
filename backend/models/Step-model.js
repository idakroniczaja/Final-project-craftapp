const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const stepSchema = new Schema({
  title: String,
  description: String,
  craft: { type: Schema.Types.ObjectId, ref: 'Craft' }
});
 
const Step = mongoose.model('Step', stepSchema);
 
module.exports = Step;