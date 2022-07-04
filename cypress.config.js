const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("file:preprocessor", cucumber());
    },
    // specPattern: "cypress/integration/examples/BDD/*.feature",
    specPattern: "cypress/integration/examples/*.js",
    defaultCommandTimeout: 8000,
    env: {
      url: "https://rahulshettyacademy.com/",
    },
    projectId: "wdv3d8", //to run tests in cypress dashboard
    reporter: "mochawesome",
    retries: {
      //Configure retries for 'cypress run', Default is 0
      runMode: 1,
    },
  },
});
