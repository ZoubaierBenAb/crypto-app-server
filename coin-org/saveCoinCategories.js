const axios = require('axios');
const CoinCategory = require('../models/coinCategoryModel'); 

const fetchAndSaveCoinCategories = async () => {
  try {
    
    const existingCoinCategories = await CoinCategory.find({});
    if (existingCoinCategories.length > 0) {
      console.log('Coin categories already exist. Skipping fetching and saving.');
      return;
    }
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/categories');
    const coinCategories = response.data;

    coinCategories.forEach(async (coinCategoryData) => {
      const { id, content, market_cap } = coinCategoryData;

      const newCoinCategory = new CoinCategory({
        name : id,
        content,
        market_cap,
      });

   
      await newCoinCategory.save();
    });

    console.log('Coin categories saved successfully.');
  } catch (error) {
    console.error('Error fetching and saving coin categories:', error);
  }
};

module.exports = fetchAndSaveCoinCategories;
