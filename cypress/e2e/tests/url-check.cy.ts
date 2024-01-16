import cryptoPricesPage from "../../pages/cryptoPricesPage"
import {urlContain} from "../../src/models"
import {enValues} from "../../src/models"
import {assertChainers} from "../../src/models"


describe('Crypto prices page url links', () => {
  it('should ensure the url is correct.', () => {
    cy.url().should(assertChainers.containText, urlContain.criptoPricesPageUrl)

  })

  it("should ensure the url is correct after searching values", () =>{

    cryptoPricesPage.clickAndTypeSearch(enValues.inputSearch)
    cy.url().should(assertChainers.containText, urlContain.criptoPricesPageUrl)

  })
})
;