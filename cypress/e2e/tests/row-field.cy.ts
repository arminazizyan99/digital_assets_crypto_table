import rowPage from "../../pages/rowPage"
import {assertChainers} from "../../src/models"
import {attrCommand} from "../../src/models"
import {fixtureFile} from "../../src/models"


describe("Row fields",()=>{

    it("should test to make sure the first row titles are accurate",()=>{
      let i: number = 0
      cy.fixture(fixtureFile.rowField).then((rows) => {
         rows.rowField.forEach((fieldText:any) => {
                cy.get(rowPage.arrayofFields[i]).should(assertChainers.haveText, fieldText)
                i++
            })
      })
    })

    it("should check if the hover message displays correctly",()=>{
        let i: number = 2
        cy.fixture(fixtureFile.rowField).then((rows) => {
           rows.hoverField.forEach((fieldText:any) => {
                  cy.get(rowPage.arrayofFields[i]).find(rowPage.hoverElement).invoke(attrCommand.attrFunction,attrCommand.dataAttribute).should(assertChainers.equal, fieldText)
                  i++
              })
        })
      })


    it("should test elements text to match a regular expression",()=>{

      cy.fixture(fixtureFile.rowField).then((regexp)=> {

      for(let cell of rowPage.arrayofCellPercentage){
        rowPage.findRegexpPercent(cell, regexp.RegexpPercent)
    }
      for(let cell of rowPage.arrayofCellPrice){
        rowPage.findRegexpMarcet(cell, regexp.RegexpPrice)
      }

    rowPage.findRegexp(rowPage.rowCellPrice,regexp.RegexpPrice)

    })
    })


    it("should test text color of a specific field in a row",()=>{

      rowPage.colorText(rowPage.rowCellHour)
      rowPage.colorText(rowPage.dayField)
      rowPage.colorText(rowPage.sevenDayField)

    })

})