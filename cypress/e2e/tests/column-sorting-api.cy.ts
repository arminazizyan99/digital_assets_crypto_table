import rowPage from "../../pages/rowPage"
import {StatusCodes} from "../../src/models"
import {funcArg} from "../../src/models"
import {assertChainers} from "../../src/models"
import {enValues} from "../../src/models"

describe("Sorting from api columns",()=>{

   
    it("should verify from the api response descending sorting of percentages in the 7D column", ()=>{
      cy.intercept("GET", rowPage.urlSortDesc7D).as("sortData");

      cy.get(rowPage.sevenDayField).click({ force: true });
      cy.get(rowPage.tableSortArrowDesc).should(assertChainers.beVisible)
      
      cy.wait("@sortData").then((intercept) => {

        expect(intercept.response.statusCode).to.eq(StatusCodes.Success)
        expect(intercept.response.body.assets).to.have.length(enValues.originRowLen)

        const sortedArrFromTable = intercept.response.body.assets.map((element) => element.percentage_7d);

        rowPage.sortColumn(sortedArrFromTable, funcArg.sortOrdDesc);
        })
     
    })


    it("should verify from the api response ascending sorting of price in the Price column", ()=>{

        cy.intercept("GET", rowPage.urlSortAscPrice).as("sortedData")
        cy.get(rowPage.priceField).click({ force: true }).click({ force: true })
  
        cy.get(rowPage.priceField).find(rowPage.tableSortArrowAsc).should(assertChainers.beVisible)
  
        cy.wait("@sortedData").then((intercept) => {
  
          expect(intercept.response.statusCode).to.eq(StatusCodes.Success)
          expect(intercept.response.body.assets).to.have.length(enValues.originRowLen)
  
          const sortedArrFromTable = intercept.response.body.assets.map((element) => element.price);
  
          rowPage.sortColumn(sortedArrFromTable, funcArg.sortOrdAsc);
  
        })
    })


    it("should verify from the api response descending sorting of price in the Market Cap column", ()=>{
        cy.intercept("GET", rowPage.urlSortAscMarketCap).as("sortedData")
        cy.get(rowPage.marketCapField).click({ force: true })
    
        cy.get(rowPage.tableSortArrowDesc).should(assertChainers.beVisible)
        
        cy.wait("@sortedData").then((intercept) => {
  
          expect(intercept.response.statusCode).to.eq(StatusCodes.Success)
          expect(intercept.response.body.assets).to.have.length(enValues.originRowLen)
  
          const sortedArrFromTable = intercept.response.body.assets.map((element) => element.marketCap);
  
          rowPage.sortColumn(sortedArrFromTable, funcArg.sortOrdDesc);
          })
      })

      it("should verify from the api response ascending sorting of price in the 24H Volume column", ()=>{
        cy.intercept("GET", rowPage.urlsSortAscVolume).as("sortedData")
        cy.get(rowPage.volumeField).click({ force: true }).click({ force: true })
  
        cy.wait("@sortedData").then((intercept) => {
  
          expect(intercept.response.statusCode).to.eq(StatusCodes.Success)
          expect(intercept.response.body.assets).to.have.length(enValues.originRowLen)
  
          const sortedArrFromTable = intercept.response.body.assets.map((element) => element.volume);
  
          rowPage.sortColumn(sortedArrFromTable, funcArg.sortOrdAsc);
  
          })
      
      })
  





})