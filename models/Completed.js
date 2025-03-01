const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompletedSchema = new Schema({
  challengerName: { type: String, required: true },
  personName: { type: String, required: true },
  position: { type: String, required: true },
  linkedinProfile: { type: String, required: true },
  description: { type: String, required: true },
  fundingAmount: { type: Number, required: true },
  image: { type: String } // URL or path to the image for the completed challenge
}, { timestamps: true });

module.exports = mongoose.model('Completed', CompletedSchema);
