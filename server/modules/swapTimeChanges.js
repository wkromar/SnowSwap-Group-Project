const cron = require('node-cron');

cron.schedule('3 0 0 * * *', () => {
    console.log('it works');
});

module.exports = cron;