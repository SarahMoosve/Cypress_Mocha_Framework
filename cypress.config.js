   const cypress = require("cypress");
const { defineConfig } = require("cypress");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");


async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on("file:preprocessor", browserify.default(config));

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

module.exports = defineConfig({
  projectId: "xjao74",
  defaultCommandTimeout: 20000,

  env: {
    url: "https://rahulshettyacademy.com",
   // userId: "sarah",
   // password: "123456"
  },
  retries: {
    runMode: 1,
  },

  e2e: {
    setupNodeEvents,
    specPattern: 'cypress/integration/UI/**/*.js'
  },

  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports/mochawesome",
    overwrite: false,
    html: false,
    json: true,
    reportFilename: "mochawesome-report-[hash]"
  }

  
  
  
});
