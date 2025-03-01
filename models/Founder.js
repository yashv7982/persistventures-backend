const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FounderSchema = new Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  description: { type: String, required: true },
  linkedinProfile: { type: String, required: true },
  image: { type: String } // URL or path to the founder's image
}, { timestamps: true });

module.exports = mongoose.model('Founder', FounderSchema);
