//testcases 1 trigger sort functionality with asc desc on column, assert that table rows are rearraging correctly based on the sorting order // these needs dynamic function for other colmuns too
// testcase 2 test paginayion functionality, simulate pagination navigation by clicking on page number or arrow 
// testcase 3 intercept numbers with minus and plus sign to see if response is right
// testcase 4 check number color green and red


import criptoPricesPage from "../../pages/criptoPricesPage"
import {enValues} from "../../src/models"
import {StatusCodes} from "../../src/models"
import {RegExp} from "../../src/models"
import {urlContain} from "../../src/models"


describe("pagination", ()=>{

    it.skip("should test pagination visibility and count of pages",()=>{

       criptoPricesPage.paginationVisibility()
       criptoPricesPage.findLengthofPages(enValues.mainPageNum,enValues.mainPageNum)
       cy.get(criptoPricesPage.pageNumRightarrow).should("be.enabled").and("be.visible")

    })
    

    it("should test pagination functionality",()=>{
           //click on first page and check if page start with 101 number and has 100 elements check table visiblity
           //check column length
            cy.get(criptoPricesPage.pageNumRightarrow).click()
            cy.url().should("contain", urlContain.criptoPricesPageUrl)

            // testing visiblity row and columnn length, first row should be last row count plus one
            criptoPricesPage.findTableandPagination()
            cy.get(criptoPricesPage.rowNumb).first().should("have.text", enValues.originRowLen + 1)
            criptoPricesPage.findLengthofRows(enValues.originRowLen)
            criptoPricesPage.findLengthofColumn(enValues.columnLen)
            
            //testing left arrow to be enabled click and go back main page and test last rows number
            cy.get(criptoPricesPage.pageNumLefttarrow).should("be.enabled").and("be.visible").click()
            cy.get(criptoPricesPage.rowNumb).last().should("have.text", enValues.originRowLen)

    })


    it.skip("should test pagination visibility and page count after using search", () =>{
        cy.intercept("GET", criptoPricesPage.searchURL).as("searchPage")
        criptoPricesPage.clickAndTypeSearch(enValues.inputSearch)
        cy.wait(1000)
          .wait("@searchPage").its("response") 
             
             .should(response => expect(response.statusCode).to.eq(StatusCodes.Success))
        criptoPricesPage.paginationVisibility()
        criptoPricesPage.findLengthofPages(enValues.pageNum,enValues.pageNum)
        cy.get(criptoPricesPage.pageNumRightarrow).should("be.disabled").and("be.visible")

    })





})