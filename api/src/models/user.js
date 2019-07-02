const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    requi: true,
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;