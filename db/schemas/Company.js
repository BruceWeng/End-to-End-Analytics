var mongoose = require('mongoose');

module.exports = new mongoose.schema({

  name: String,
  location: {
    city: String,
    country: String
  },
  sector: String,
  founded: Date

});