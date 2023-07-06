const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema(
  {
    data: [mongoose.Schema.Types.Mixed], 
  },
  { timestamps: true }
);

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
