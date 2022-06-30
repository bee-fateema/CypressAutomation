const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/integration/examples/*.js",
    defaultCommandTimeout: 8000,
    env: {
      url: "https://rahulshettyacademy.com/",
    },
    projectId: "mr5mpu", //to run tests in cypress dashboard
    reporter: "mochawesome",
    retries: {
      //Configure retries for 'cypress run', Default is 0
      runMode: 1,
    },
  },
});
