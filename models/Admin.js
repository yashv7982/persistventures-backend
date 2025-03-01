// models/Admin.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true } // store hashed passwords
}, { timestamps: true });

module.exports = mongoose.model('Admin', AdminSchema);
