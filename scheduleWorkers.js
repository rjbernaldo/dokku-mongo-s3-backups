const schedule = require('node-schedule');

const backup = require('./workers/backup');

schedule.scheduleJob('0 0 1 * *', () => {
  console.log('Backing up db');
  backup();
});
