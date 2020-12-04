const assert = require("assert");
const fetch = require("node-fetch");
const common = require("../common.js");
const { Given, When, Then } = require("@cucumber/cucumber");

const API_DOMAIN = process.env["API_DOMAIN"] || "http://localhost:3000"

const authorizedFetch = async (url) => {
  const accessToken = await common.getAccessToken();
  const response = await fetch(
    url,
    { headers: {'Authorization': `Bearer ${accessToken}`}}
  );
  return await response.json()
}

Given("{int} and {int}", (page, limit) => {
  this.page = page;
  this.limit = limit;
});

When("a User calls help request API", async () => {
  const json = await authorizedFetch(`${API_DOMAIN}/v1/help-request?page=${this.page}&limit=${this.limit}`)
  this.apiResponse = json;
});

Then("the User should recieve {int}", (expectedNumberOfHelpRequests) => {
  if (this.apiResponse) {
    assert.strictEqual(this.apiResponse.length, expectedNumberOfHelpRequests);
  } else {
    assert.fail("no API response!");
  }
});
