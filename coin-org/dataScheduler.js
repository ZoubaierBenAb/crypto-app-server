const cron = require('node-cron');
const saveData = require('./saveData');

const runSaveDataJob = async () => {
  try {
    await saveData();

    cron.schedule('*/1 * * * *', saveData);
    console.log('Save data cron job started');
  } catch (error) {
    console.error('Save data cron job encountered an error:', error);
  }
};

module.exports = runSaveDataJob;