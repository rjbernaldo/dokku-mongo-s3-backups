const schedule = require('node-schedule');

const backup = require('./workers/backup');

// schedule.scheduleJob('0 0 * * *', () => {
//   backup();
// });
  backup();
