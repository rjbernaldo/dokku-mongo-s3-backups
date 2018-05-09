const schedule = require('node-schedule');

const backup = require('./workers/backup');

schedule.scheduleJob('0 0 1 * *', () => {
  console.log('Scheduled job to run every 1st of the month');
  backup();
});
