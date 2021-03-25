const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: String,
    googleId: String,
    password: String,
    imageUrl: String,
  },
  {
    timestamps: true
  }
);

module.exports = model('User', userSchema);
