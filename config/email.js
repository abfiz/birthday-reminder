require('dotenv').config();

const emailConfig = {
  token: process.env.MAILTRAP_TOKEN
};

module.exports = emailConfig;