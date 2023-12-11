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


    it("should test row fileds text colors",()=>{

      rowPage.colorText(rowPage.rowCellHour)
      rowPage.colorText(rowPage.dayField)
      rowPage.colorText(rowPage.sevenDayField)

    })

})