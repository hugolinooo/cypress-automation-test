const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    "baseUrl": "https://serverest.dev",  // URL da API
  "fixturesFolder": "cypress/fixtures"
  },
})