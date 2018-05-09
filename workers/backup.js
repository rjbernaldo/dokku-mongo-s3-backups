const backup = require('s3-mongo-backup');

require('dotenv').config();

// TODO: is this supported?
// --authenticationDatabase admin
// --ssl

// full command:
// mongodump -h ${host} --port=${port} -d ${database} -p ${password} -u ${username} --quiet --gzip --archive=${BACKUP_PATH(DB_BACKUP_NAME)}

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
  DB_PORT,
  DB_AUTH,
  S3_KEY,
  S3_SECRET,
  S3_REGION,
  S3_ACCESS_PERM,
  S3_BUCKET_NAME,
} = process.env;

const config = {
  mongodb: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    authenticationDatabase: DB_AUTH,
    ssl: true,
  },
  s3: {
    accessKey: S3_KEY,
    secretKey: S3_SECRET,
    region: S3_REGION,
    accessPerm: S3_ACCESS_PERM,
    bucketName: S3_BUCKET_NAME,
  },
}

module.exports = () => {
  const missingFields = checkConfig(config);

  if (missingFields.length > 0) return console.log(missingFields);

  backup(config)
    .then(
      onResolve => {
        console.log('onResolve', onResolve);
      },
      onReject => {
        console.log('onReject', onReject);
      }
    )
};

function checkConfig(config) {
  const {
    username,
    password,
    host,
    port,
    accessKey,
    secretKey,
    region,
    accessPerm,
    bucketName,
  } = config;

  return Object.keys(config).map((key) => {
    if (!config[key]) return new Error(`Missing field: ${key}`);

    return false;
  }).filter((key) => {
    return !!key;
  });
}
