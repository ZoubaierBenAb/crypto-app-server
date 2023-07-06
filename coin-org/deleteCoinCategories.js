const CoinCategory = require('../models/coinCategoryModel');

async function deleteAllCoinCategories() {
  try {
    await CoinCategory.deleteMany({});
    console.log('All coin categories deleted successfully.');
  } catch (error) {
    console.error('Error deleting coin categories:', error);
  }
}

module.exports = deleteAllCoinCategories;
