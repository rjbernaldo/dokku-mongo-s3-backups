const schedule = require('node-schedule');

const backup = require('./workers/backup');

backup();
schedule.scheduleJob('0 0 1 * *', () => {
  backup();
});
