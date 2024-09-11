const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureCypress(on, {
        resultsDir: "./allure-results"
      });
    },
    watchForFileChanges: false,
    defaultCommandTimeout: 15000,
    baseUrl: "https://unsplash.com",
  },
});
