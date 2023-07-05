const cron = require('node-cron');
const fetchAndSaveCoinCategories = require('./saveCoinCategories');

const runCoinCategoriesJob = async () => {
  try {

    await fetchAndSaveCoinCategories();

    
    cron.schedule('*/30 * * * *', fetchAndSaveCoinCategories);
    console.log('Save data cron job started');
  } catch (error) {
    console.error('Save data cron job encountered an error:', error);
  }
};

runCoinCategoriesJob();

module.exports = runCoinCategoriesJob;
