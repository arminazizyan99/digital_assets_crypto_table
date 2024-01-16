
import cryptoPricesPage from "../../pages/cryptoPricesPage"
import {enValues} from "../../src/models"
import {StatusCodes} from "../../src/models"
import {RegExp} from "../../src/models"
import homePage from "../../pages/cryptoPricesPage"
import rowPage from "../../pages/rowPage"
import {assertChainers} from "../../src/models"
import {fixtureFile} from "../../src/models"



describe('Cryptocurrency price table', () => {
  it('should verify that the crypto price table is visible', () => {


    cy.get(cryptoPricesPage.cryptoTable).should(assertChainers.beVisible)

  })

  it("should verify the total number of rows", () =>{
    cryptoPricesPage.findLengthofRows(enValues.originRowLen)
 
  })


  it("should verify the total number of columns",()=>{
       
     cryptoPricesPage.findLengthofColumn(enValues.columnLen)
    
  })


  it("should test the search field to confirm result texts match the input",()=>{

     cy.get(cryptoPricesPage.searchField).type(enValues.inputSearch).should(assertChainers.noValue, enValues.emptyString);
     cryptoPricesPage.clearInputField()
     cy.get(cryptoPricesPage.searchField).should(assertChainers.value, enValues.emptyString);
    
     cryptoPricesPage.clickAndTypeSearch(enValues.textInput)
     cryptoPricesPage.findTableandPagination()
     cy.wait(1000)

     cryptoPricesPage.checkResultsTextwithInputText(RegExp.regexpInputTxt, RegExp.regexpInputOpt)

  })


  it("should test table visibility after search", () =>{
    cy.intercept(cryptoPricesPage.searchURL).as("searchPage")
    cryptoPricesPage.clickAndTypeSearch(enValues.inputSearch)

    cy.wait(1000)
      .wait("@searchPage").its("response") 
         .should(response => expect(response.statusCode).to.eq(StatusCodes.Success))
         .should(response => expect(response.body.total).to.eq(enValues.searchRowLen))

    cryptoPricesPage.findLengthofRows(enValues.searchRowLen)
    cryptoPricesPage.findTableandPagination()
    cryptoPricesPage.findLengthofPages(enValues.pageNum,enValues.pageNum)

    })



  it("should test on text elements by simulating API responses through mocking",()=>{
      cy.intercept({
        url: cryptoPricesPage.tradedAssetsUrl,  
       },(req) => {
  
          req.reply((res) =>
          {
            res.send({ fixture: fixtureFile.changeNumdata });
          })
  
        }).as("simulateddData")
    
    cy.visit(homePage.pageUrl)
  
    cy.wait("@simulateddData").its('response')
    .should(response => expect(response.statusCode).to.eq(StatusCodes.Success))   
    .should(response => expect(response.body.assets.length).to.eq(enValues.assetLenghth))

    cryptoPricesPage.findLengthofPages(enValues.pageNum,enValues.pageNum)
    cy.get(cryptoPricesPage.pageNumRightarrow).should(assertChainers.beDesabled).and(assertChainers.beVisible)
    cy.get(cryptoPricesPage.pageNumLefttarrow).should(assertChainers.beDesabled).and(assertChainers.beVisible)
    rowPage.colorText(rowPage.rowCellHour)
    rowPage.colorText(rowPage.dayField)
    rowPage.colorText(rowPage.sevenDayField)
    
  })


  it("should verify add to watch list button behavior", ()=>{

    cryptoPricesPage.chechWatchListBtn()

  })



})


 


