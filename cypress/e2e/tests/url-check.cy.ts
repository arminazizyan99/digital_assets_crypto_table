// @ts-ignore
import criptoPricesPage from "../../pages/criptoPricesPage"
import {urlContain} from "../../src/models"
import {enValues} from "../../src/models"


describe('Crypto prices page url links', () => {
  it.skip('should check url', () => {
    cy.url().should("contain", urlContain.criptoPricesPageUrl)

  })

  it.skip("should check url after searching values", () =>{

    criptoPricesPage.clickAndTypeSearch(enValues.inputSearch)
    cy.url().should("contain", urlContain.criptoPricesPageUrl)

  })
})
;