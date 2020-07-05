const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  title: String,
  body: String
});

module.exports = Page = mongoose.model('Page', pageSchema);
