
import criptoPricesPage from "../../pages/criptoPricesPage"
import {enValues} from "../../src/models"
import {StatusCodes} from "../../src/models"
import {RegExp} from "../../src/models"


describe('Crypto price table', () => {
  it.skip('should test crypto price table visibility', () => {


    cy.get(criptoPricesPage.cryptoTable).should("be.visible")

  })

  it.skip("should check row count", () =>{
    criptoPricesPage.findLengthofRows(enValues.originRowLen)
 
  })


  it.skip("should check columns count",()=>{
       
     criptoPricesPage.findLengthofColumn(enValues.columnLen)
    
  })


   it.skip("should test search field functionality,result texts should match with input",()=>{


     //check if field is empty then type and check if text is typed
     cy.get(criptoPricesPage.searchField).type(enValues.inputSearch).should('not.have.value', enValues.emptyString);
     criptoPricesPage.clearInputField()
     //check if field is empty
     cy.get(criptoPricesPage.searchField).should('have.value', enValues.emptyString);
     //type and check table and pagination are visible
     criptoPricesPage.clickAndTypeSearch(enValues.textInput)
     criptoPricesPage.findTableandPagination()
     cy.wait(1000)

     //check if result texts are matching input text
     criptoPricesPage.checkResultsTextwithInputText(RegExp.regexpInputTxt,RegExp.regexpInputOpt)

  })


  it.skip("should test table visibility after using search", () =>{
    cy.intercept("GET", criptoPricesPage.searchURL).as("searchPage")
    criptoPricesPage.clickAndTypeSearch(enValues.inputSearch)
    cy.wait(1000)
      .wait("@searchPage").its("response") 
          // @ts-ignore
         .should(response => expect(response.statusCode).to.eq(StatusCodes.Success))
         // @ts-ignore
         .should(response => expect(response.body.total).to.eq(enValues.searchRowLen))

    criptoPricesPage.findLengthofRows(enValues.searchRowLen)
    criptoPricesPage.findTableandPagination()
    criptoPricesPage.findLengthofPages(enValues.pageNum,enValues.pageNum)

    })



})


 


