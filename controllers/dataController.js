const asyncHandler = require('express-async-handler');
const Data = require('../models/dataModel');

const getData = asyncHandler(async (req, res) => {
  const data = await Data.find();

  if (data.length > 0) {
    return res.json(data);
  } else {
    return res.status(404).json({ error: 'Data not found' });
  }
});

module.exports = {getData};