import criptoPricesPage from "../../pages/criptoPricesPage"
import {enValues} from "../../src/models"
import {StatusCodes} from "../../src/models"
import {urlContain} from "../../src/models"
import {assertChainers} from "../../src/models"

describe("Pagination", ()=>{

    it("should verify the visibility and count of pagination pages",()=>{

       criptoPricesPage.paginationVisibility()
       criptoPricesPage.findLengthofPages(enValues.mainPageNum,enValues.mainPageNum)
       cy.get(criptoPricesPage.pageNumRightarrow).should(assertChainers.beEnabled).and(assertChainers.beVisible)

    })
    

    it("should verify pagination works correctly.",()=>{
        
            cy.get(criptoPricesPage.pageNumRightarrow).click()
            cy.url().should(assertChainers.containText, urlContain.criptoPricesPageUrl)

            criptoPricesPage.findTableandPagination()
            cy.get(criptoPricesPage.rowNumb).first().should(assertChainers.haveText, enValues.originRowLen + 1)
            criptoPricesPage.findLengthofRows(enValues.originRowLen)
            criptoPricesPage.findLengthofColumn(enValues.columnLen)
            
            cy.get(criptoPricesPage.pageNumLefttarrow).should(assertChainers.beEnabled).and(assertChainers.beVisible).click()
            cy.get(criptoPricesPage.rowNumb).last().should(assertChainers.haveText, enValues.originRowLen)

    })


    it("should test pagination visibility and page count after search", () =>{
        cy.intercept("GET", criptoPricesPage.searchURL).as("searchPage")
        criptoPricesPage.clickAndTypeSearch(enValues.inputSearch)
        //try without wait
        cy.wait(1000)
          .wait("@searchPage").its("response") 
             
             .should(response => expect(response.statusCode).to.eq(StatusCodes.Success))
        criptoPricesPage.paginationVisibility()
        criptoPricesPage.findLengthofPages(enValues.pageNum,enValues.pageNum)
        cy.get(criptoPricesPage.pageNumRightarrow).should(assertChainers.beDesabled).and(assertChainers.beVisible)

    })


})