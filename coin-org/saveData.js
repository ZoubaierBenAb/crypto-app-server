const axios = require('axios');
const Data = require('../models/dataModel');

const saveData = async () => {
  try {
    const existingData = await Data.findOne();

    if (existingData) {
      throw new Error('Data already exists in the database');
    }

    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en');
    const dataToSave = response.data;

    const newData = new Data({ data: dataToSave });
    await newData.save();

    console.log('Data saved successfully');
  } catch (error) {
    console.error('Error occurred while fetching coins:', error);
  }
};

module.exports = saveData;
