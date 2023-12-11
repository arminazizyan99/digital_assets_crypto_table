import { defineConfig } from 'cypress'

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.forbes.com/digital-assets/crypto-prices/?sh=4591e34d2478",
    setupNodeEvents(on, config) {
      // implement node event listeners here

  },

}
});