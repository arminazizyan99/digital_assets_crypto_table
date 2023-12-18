import cryptoPricesPage from "../../pages/cryptoPricesPage"
import {enValues} from "../../src/models"
import {StatusCodes} from "../../src/models"
import {urlContain} from "../../src/models"
import {assertChainers} from "../../src/models"

describe("Pagination", ()=>{

    it("should verify the visibility and count of pagination pages",()=>{

       cryptoPricesPage.paginationVisibility()
       cryptoPricesPage.findLengthofPages(enValues.mainPageNum,enValues.mainPageNum)
       cy.get(cryptoPricesPage.pageNumRightarrow).should(assertChainers.beEnabled).and(assertChainers.beVisible)

    })
    

    it("should verify pagination works correctly.",()=>{
        
            cy.get(cryptoPricesPage.pageNumRightarrow).click()
            cy.url().should(assertChainers.containText, urlContain.criptoPricesPageUrl)

            cryptoPricesPage.findTableandPagination()
            cy.get(cryptoPricesPage.rowNumb).first().should(assertChainers.haveText, enValues.originRowLen + 1)
            cryptoPricesPage.findLengthofRows(enValues.originRowLen)
            cryptoPricesPage.findLengthofColumn(enValues.columnLen)
            
            cy.get(cryptoPricesPage.pageNumLefttarrow).should(assertChainers.beEnabled).and(assertChainers.beVisible).click()
            cy.get(cryptoPricesPage.rowNumb).last().should(assertChainers.haveText, enValues.originRowLen)

    })


    it("should test pagination visibility and page count after search", () =>{
        cy.intercept(cryptoPricesPage.searchURL).as("searchPage")
        cryptoPricesPage.clickAndTypeSearch(enValues.inputSearch)
        cy.wait(1000)
          .wait("@searchPage").its("response") 
             
             .should(response => expect(response.statusCode).to.eq(StatusCodes.Success))
        cryptoPricesPage.paginationVisibility()
        cryptoPricesPage.findLengthofPages(enValues.pageNum,enValues.pageNum)
        cy.get(cryptoPricesPage.pageNumRightarrow).should(assertChainers.beDesabled).and(assertChainers.beVisible)

    })


})
