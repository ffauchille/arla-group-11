var fetch = require("node-fetch");

const oAuthUrl = "https://arlaide-group-11.eu.auth0.com/oauth/token";
const authSecret = process.env.AUTH_API_SECRET;
const options = {
  method: "POST",
  headers: { "content-type": "application/json" },
  body:
  `{"client_id":"yjVisiTdSoHGyBYLIVmbEXYbNcI7HALP","client_secret": "${authSecret}","audience":"https://api.groupe11.arla-sigl.fr","grant_type":"client_credentials"}`,
};

const getAccessToken = async () => {
  const response = await fetch(oAuthUrl, options);
  const access = await response.json();
  return access.access_token;
};

module.exports = { getAccessToken };
