import rowPage from "../../pages/rowPage"
import {StatusCodes} from "../../src/models"

describe("Sorting column",()=>{

   
    it("should test sorting of percentage change in 7D column in descending order", ()=>{
      cy.intercept("GET", rowPage.urlSort7D).as("sortData")
      cy.get(rowPage.sevenDayField).click({ force: true })
      cy.wait(1000)
      rowPage.sortColumnPercent(rowPage.rowCellWeek,"desc")

      cy.wait("@sortData").its("response") 
      // @ts-ignore
     .should(response => expect(response.statusCode).to.eq(StatusCodes.Success))

    
    })

    it("should test sorting of percentage change in 7D column in ascending order", ()=>{
      cy.intercept("GET", rowPage.urlSort7D).as("sortData")
      cy.get(rowPage.sevenDayField).click({ force: true }).click({ force: true })
      cy.wait(1000)
      rowPage.sortColumnPercent(rowPage.rowCellWeek,"asc")

      cy.wait("@sortData").its("response") 
  
     .should(response => expect(response.statusCode).to.eq(StatusCodes.Success))

    
    })


})