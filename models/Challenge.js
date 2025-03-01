// models/Challenge.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChallengeSchema = new Schema({
  logo: { type: String, required: true },          // URL or path to the challenge logo
  title: { type: String, required: true },
  fundingAmount: { type: Number, required: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  visible: { type: Boolean, default: true }         // Determines if the challenge is visible to users
}, { timestamps: true });

module.exports = mongoose.model('Challenge', ChallengeSchema);
