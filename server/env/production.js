/*
    These environment variables are not hardcoded so as not to put
    production information in a repo. They should be set in your
    heroku (or whatever VPS used) configuration to be set in the
    applications environment, along with NODE_ENV=production
 */

module.exports = {
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  GMAIL_PASS: process.env.GMAIL_PASS,
  APENCHEV_PASS: process.env.APENCHEV_PASS,
  AKARAPEEV_PASS: process.env.AKARAPEEV_PASS,
  NODE_ENV: process.env.NODE_ENV,
  CERT_KEY: process.env.CERT_KEY,
  CERT_CERT: process.env.CERT_CERT,
  CERT_CA: process.env.CERT_CA
};
