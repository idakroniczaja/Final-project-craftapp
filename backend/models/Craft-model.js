const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const craftSchema = new Schema({
  title: {type: String, required: true},
  imageUrl:{ type: String, required: true },
  description: {type: String, required: true},
  steps: [{ type: Schema.Types.ObjectId, ref: 'Step' }]
  // owner will be added later on
});
 
const Craft = mongoose.model('Craft', craftSchema);
 
module.exports = Craft;
