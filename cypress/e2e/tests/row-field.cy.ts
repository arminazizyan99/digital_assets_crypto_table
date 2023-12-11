import rowPage from "../../pages/rowPage"
import {StatusCodes} from "../../src/models"

describe("Row fields",()=>{

    it.skip("should test first row titles",()=>{
      let i: number = 0
      cy.fixture("rowField.json").then((rows) => {
         rows.rowField.forEach((fieldText:any) => {
                cy.get(rowPage.arrayofFields[i]).should("have.text", fieldText)
                i++
            })
      })
    })

    it.skip("should test hovering message",()=>{
        let i: number = 2
        cy.fixture("rowField.json").then((rows) => {
           rows.hoverField.forEach((fieldText:any) => {
                  cy.get(rowPage.arrayofFields[i]).find(rowPage.hoverElement).invoke("attr","data").should("be.equal", fieldText)
                  i++
              })
        })
      })


    it.skip("should test row fields texts with regexp",()=>{

      cy.fixture("rowField.json").then((regexp)=> {

      for(let cell of rowPage.arrayofCellPercentage){
        rowPage.findRegexpPercent(cell, regexp.RegexpPercent)
    }
      for(let cell of rowPage.arrayofCellPrice){
        rowPage.findRegexpMarcet(cell, regexp.RegexpPrice)
      }

    rowPage.findRegexp(rowPage.rowCellPrice,regexp.RegexpPrice)

    })
    })


    it.skip("should test sorting of percentage change in 7D column in descending order", ()=>{
      cy.intercept("GET", rowPage.urlSort7D).as("sortData")
      cy.get(rowPage.sevenDayField).click({ force: true })
      cy.wait(1000)
      rowPage.sortColumnPercent(rowPage.rowCellWeek,"desc")

      cy.wait("@sortData").its("response") 
      // @ts-ignore
     .should(response => expect(response.statusCode).to.eq(StatusCodes.Success))

    
    })

    it.skip("should test sorting of percentage change in 7D column in ascending order", ()=>{
      cy.intercept("GET", rowPage.urlSort7D).as("sortData")
      cy.get(rowPage.sevenDayField).click({ force: true }).click({ force: true })
      cy.wait(1000)
      rowPage.sortColumnPercent(rowPage.rowCellWeek,"asc")

      cy.wait("@sortData").its("response") 
  
     .should(response => expect(response.statusCode).to.eq(StatusCodes.Success))

    
    })


    it("should test row fileds numbers colors minus is red plus is green",()=>{

      rowPage.colorText(rowPage.rowCellHour)
      rowPage.colorText(rowPage.dayField)
      rowPage.colorText(rowPage.sevenDayField)

    })

})