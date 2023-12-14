import { defineConfig } from 'cypress'

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.forbes.com/digital-assets/crypto-prices/?sh=4591e34d2478",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      config.env = (() => {
      if (Cypress.env("userAgent") === 'desktop') {
        config.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.109 Safari/537.36'}      
      else if (Cypress.env("userAgent") === 'mobile') {
          config.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1'
        }
      return config
      })
    },

  env: {
    viewPort: "macbook-16",
    userAgent: "desktop"
  }

}
});