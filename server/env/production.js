/*
    These environment variables are not hardcoded so as not to put
    production information in a repo. They should be set in your
    heroku (or whatever VPS used) configuration to be set in the
    applications environment, along with NODE_ENV=production
 */

module.exports = {
  DATABASE_URI: process.env.DATABASE_URL,
  GMAIL_PASS: process.env.GMAIL_PASS,
  APENCHEV_PASS: process.env.APENCHEV_PASS,
  AKARAPEEV_PASS: process.env.AKARAPEEV_PASS
};
