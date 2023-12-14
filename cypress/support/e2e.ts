// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import homePage from "../pages/criptoPricesPage"

// Alternatively you can use CommonJS syntax:
// require('./commands')

beforeEach(()=>{
     const viewValue = Cypress.env("viewPort")
     cy.viewport(viewValue)

    cy.intercept(homePage.pageUrl).as('pageload')
    const app = window.top;
    if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
        const style = app.document.createElement('style');
        style.innerHTML =
          '.command-name-request, .command-name-xhr { display: none }';
        style.setAttribute('data-hide-command-log-request', '');
      
        app.document.head.appendChild(style);
      }
    cy.visit(homePage.pageUrl)
    cy.wait('@pageload')
})