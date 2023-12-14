
import criptoPricesPage from "../../pages/criptoPricesPage"
import {enValues} from "../../src/models"
import {StatusCodes} from "../../src/models"
import {RegExp} from "../../src/models"
import homePage from "../../pages/criptoPricesPage"
import rowPage from "../../pages/rowPage"
import {assertChainers} from "../../src/models"
import {fixtureFile} from "../../src/models"



describe('Cryptocurrency price table', () => {
  it('should verify that the crypto price table is visible', () => {


    cy.get(criptoPricesPage.cryptoTable).should(assertChainers.beVisible)

  })

  it("should verify the total number of rows", () =>{
    criptoPricesPage.findLengthofRows(enValues.originRowLen)
 
  })


  it("should verify the total number of columns",()=>{
       
     criptoPricesPage.findLengthofColumn(enValues.columnLen)
    
  })


  it("should test the search field to confirm result texts match the input",()=>{

     cy.get(criptoPricesPage.searchField).type(enValues.inputSearch).should(assertChainers.noValue, enValues.emptyString);
     criptoPricesPage.clearInputField()
     cy.get(criptoPricesPage.searchField).should(assertChainers.value, enValues.emptyString);
    
     criptoPricesPage.clickAndTypeSearch(enValues.textInput)
     criptoPricesPage.findTableandPagination()
     // try without wait
     cy.wait(1000)

     criptoPricesPage.checkResultsTextwithInputText(RegExp.regexpInputTxt,RegExp.regexpInputOpt)

  })


  it("should test table visibility after search", () =>{
    cy.intercept("GET", criptoPricesPage.searchURL).as("searchPage")
    criptoPricesPage.clickAndTypeSearch(enValues.inputSearch)
    cy.wait(1000)
      .wait("@searchPage").its("response") 
         .should(response => expect(response.statusCode).to.eq(StatusCodes.Success))
         .should(response => expect(response.body.total).to.eq(enValues.searchRowLen))

    criptoPricesPage.findLengthofRows(enValues.searchRowLen)
    criptoPricesPage.findTableandPagination()
    criptoPricesPage.findLengthofPages(enValues.pageNum,enValues.pageNum)

    })



  it("should modify responses with intercept and test specific elements.",()=>{
      cy.intercept({
        url: criptoPricesPage.interDataUrl,  
       },(req) => {
  
          req.reply((res) =>
          {
            res.send({ fixture: fixtureFile.changeNumdata });
          })
  
        }).as("data")
    
    cy.visit(homePage.pageUrl)
  
    cy.wait("@data").its('response')
    .should(response => expect(response.statusCode).to.eq(StatusCodes.Success))   
    .should(response => expect(response.body.assets.length).to.eq(enValues.assetLenghth))
    criptoPricesPage.findLengthofPages(enValues.pageNum,enValues.pageNum)
    
    cy.get(criptoPricesPage.pageNumRightarrow).should(assertChainers.beDesabled).and(assertChainers.beVisible)
    cy.get(criptoPricesPage.pageNumLefttarrow).should(assertChainers.beDesabled).and(assertChainers.beVisible)
    rowPage.colorText(rowPage.rowCellHour)
    rowPage.colorText(rowPage.dayField)
    rowPage.colorText(rowPage.sevenDayField)
    
  })


  it("should verify add to watch list button behavior", ()=>{

    criptoPricesPage.chechWatchListBtn()

  })



})


 


