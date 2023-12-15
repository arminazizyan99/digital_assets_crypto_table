import rowPage from "../../pages/rowPage"
import {StatusCodes} from "../../src/models"
import {sortTypes} from "../../src/models"
import {assertChainers} from "../../src/models"
import {enValues} from "../../src/models"

describe("Sorting from api columns",()=>{

   
    it("should verify from the api response descending sorting of percentages in the 7D column", ()=>{
      cy.intercept(rowPage.urlSort.Desc7D).as("sortData");

      cy.get(rowPage.sevenDayField).click({ force: true });
      cy.get(rowPage.tableSortArrowDesc).should(assertChainers.beVisible)
      
      cy.wait("@sortData").then(({ response }) => {
        const { body, statusCode } = response;
      
        expect(statusCode).to.eq(StatusCodes.Success);
        expect(body.assets).to.have.length(enValues.originRowLen)

        const sortedArrFromTable = body.assets.map((element) => element.percentage_7d);

        rowPage.sortColumn(sortedArrFromTable, sortTypes.sortOrdDesc);
        })
     
    })


    it("should verify from the api response ascending sorting of price in the Price column", ()=>{

        cy.intercept(rowPage.urlSort.AscPrice).as("sortedData")
        cy.get(rowPage.priceField).click({ force: true }).click({ force: true })
  
        cy.get(rowPage.priceField).find(rowPage.tableSortArrowAsc).should(assertChainers.beVisible)
  
        cy.wait("@sortedData").then(({ response }) => {
          const { body, statusCode } = response;
        
          expect(statusCode).to.eq(StatusCodes.Success);
          expect(body.assets).to.have.length(enValues.originRowLen)
  
          const sortedArrFromTable = body.assets.map((element) => element.price);
  
          rowPage.sortColumn(sortedArrFromTable, sortTypes.sortOrdAsc);
  
        })
    })


    it("should verify from the api response descending sorting of price in the Market Cap column", ()=>{
        cy.intercept(rowPage.urlSort.DescMarketCap).as("sortedData")
        cy.get(rowPage.marketCapField).click({ force: true }).click({ force: true })
    
        cy.get(rowPage.tableSortArrowDesc).should(assertChainers.beVisible)
        
        cy.wait("@sortedData").then(({ response }) => {
          const { body, statusCode } = response;
        
          expect(statusCode).to.eq(StatusCodes.Success);
          expect(body.assets).to.have.length(enValues.originRowLen)
  
          const sortedArrFromTable = body.assets.map((element) => element.marketCap);
  
          rowPage.sortColumn(sortedArrFromTable, sortTypes.sortOrdDesc);
          })
      })

      it("should verify from the api response ascending sorting of price in the 24H Volume column", ()=>{
        cy.intercept(rowPage.urlSort.AscVolume).as("sortedData")
        cy.get(rowPage.volumeField).click({ force: true }).click({ force: true })
  
        cy.wait("@sortedData").then(({ response }) => {
          const { body, statusCode } = response;
        
          expect(statusCode).to.eq(StatusCodes.Success);
          expect(body.assets).to.have.length(enValues.originRowLen)
  
          const sortedArrFromTable = body.assets.map((element) => element.volume);
  
          rowPage.sortColumn(sortedArrFromTable, sortTypes.sortOrdAsc);
  
          })
      
      })
  
})