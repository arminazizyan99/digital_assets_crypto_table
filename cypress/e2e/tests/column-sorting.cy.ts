import rowPage from "../../pages/rowPage"
import {StatusCodes} from "../../src/models"
import {funcArg} from "../../src/models"
import {assertChainers} from "../../src/models"
import {enValues} from "../../src/models"

describe("Sorting columns",()=>{

   
    it("should verify accurate descending sorting of percentages in the 7D column", ()=>{
      cy.intercept("GET", rowPage.urlSortDesc7D).as("sortData");

      cy.get(rowPage.sevenDayField).click({ force: true });
      cy.wait(1000)
      cy.get(rowPage.sevenDayField).find(rowPage.tableSortArrowDesc).should(assertChainers.beVisible)
     
      cy.wait("@sortData").then((intercept) => {

        expect(intercept.response.statusCode).to.eq(StatusCodes.Success)
        expect(intercept.response.body.assets).to.have.length(enValues.originRowLen)

        })

        rowPage.sortColumnPercent(rowPage.rowCellWeek,funcArg.sortOrdDesc)
     
    })

    it("should verify accurate ascending sorting of percentages in the 7D column", ()=>{
      cy.intercept("GET", rowPage.urlSortAsc7D).as("sortData")
      cy.get(rowPage.sevenDayField).click({ force: true }).click({ force: true })
      cy.wait(1000)
      cy.get(rowPage.sevenDayField).find(rowPage.tableSortArrowAsc).should(assertChainers.beVisible)

      cy.wait("@sortData").then((intercept) => {

        expect(intercept.response.statusCode).to.eq(StatusCodes.Success)
        expect(intercept.response.body.assets).to.have.length(enValues.originRowLen)

        })
        
        rowPage.sortColumnPercent(rowPage.rowCellWeek,funcArg.sortOrdAsc)
    
    })

    it("should verify accurate descending sorting of price in the Price column", ()=>{
      cy.intercept("GET", rowPage.urlSortDescPrice).as("sortedData")
      cy.get(rowPage.priceField).click({ force: true })
      cy.wait(1000)
      cy.get(rowPage.priceField).find(rowPage.tableSortArrowDesc).should(assertChainers.beVisible)

      cy.wait("@sortedData").then((intercept) => {

        expect(intercept.response.statusCode).to.eq(StatusCodes.Success)
        expect(intercept.response.body.assets).to.have.length(enValues.originRowLen)
      })

      rowPage.sortColumnPrice(rowPage.rowCellPrice,funcArg.sortOrdDesc)

    })


    it("should verify accurate ascending sorting of price in the Price column", ()=>{

      cy.intercept("GET", rowPage.urlSortAscPrice).as("sortedData")
      cy.get(rowPage.priceField).click({ force: true }).click({ force: true })
      cy.wait(1000)
      cy.get(rowPage.priceField).find(rowPage.tableSortArrowAsc).should(assertChainers.beVisible)

      cy.wait("@sortedData").then((intercept) => {

        expect(intercept.response.statusCode).to.eq(StatusCodes.Success)
        expect(intercept.response.body.assets).to.have.length(enValues.originRowLen)
        })

      rowPage.sortColumnPrice(rowPage.rowCellPrice,funcArg.sortOrdAsc)

    
    })


    it("should verify accurate descending sorting of price in the Market Cap column", ()=>{
      cy.intercept("GET", rowPage.urlSortAscMarketCap).as("sortedData")
      cy.get(rowPage.marketCapField).click({ force: true })
      cy.wait(1000)

      cy.get(rowPage.marketCapField).find(rowPage.tableSortArrowDesc).should(assertChainers.beVisible)
      
      cy.wait("@sortedData").then((intercept) => {

        expect(intercept.response.statusCode).to.eq(StatusCodes.Success)
        expect(intercept.response.body.assets).to.have.length(enValues.originRowLen)

        })
        rowPage.sortColumnPrice(rowPage.rowCellMarket,funcArg.sortOrdDesc)


    })


    it("should verify accurate ascending sorting of price in the Market Cap column", ()=>{
      cy.intercept("GET", rowPage.urlSortAscMarketCap).as("sortedData")
      cy.get(rowPage.marketCapField).click({ force: true })
      cy.wait(1000)
      cy.get(rowPage.marketCapField).find(rowPage.tableSortArrowAsc).should(assertChainers.beVisible)

      cy.wait("@sortedData").then((intercept) => {

        expect(intercept.response.statusCode).to.eq(StatusCodes.Success)
        expect(intercept.response.body.assets).to.have.length(enValues.originRowLen)

        })

        rowPage.sortColumnPrice(rowPage.rowCellMarket,funcArg.sortOrdAsc)
    
    })


    it("should verify accurate descending sorting of price in the 24H Volume column", ()=>{
      cy.intercept("GET", rowPage.urlSortDescVolume).as("sortedData")
      cy.get(rowPage.volumeField).click({ force: true })
      cy.wait(1000)
      cy.get(rowPage.volumeField).find(rowPage.tableSortArrowDesc).should(assertChainers.beVisible)

      cy.wait("@sortedData").then((intercept) => {

        expect(intercept.response.statusCode).to.eq(StatusCodes.Success)
        expect(intercept.response.body.assets).to.have.length(enValues.originRowLen)

        })
        rowPage.sortColumnPrice(rowPage.rowCellVolume,funcArg.sortOrdDesc)


    })


    it("should verify accurate ascending sorting of price in the 24H Volume column", ()=>{
      cy.intercept("GET", rowPage.urlsSortAscVolume).as("sortedData")
      cy.get(rowPage.volumeField).click({ force: true }).click({ force: true })
      cy.wait(1000)
      cy.get(rowPage.volumeField).find(rowPage.tableSortArrowAsc).should(assertChainers.beVisible)

      cy.wait("@sortedData").then((intercept) => {

        expect(intercept.response.statusCode).to.eq(StatusCodes.Success)
        expect(intercept.response.body.assets).to.have.length(enValues.originRowLen)

        })

        rowPage.sortColumnPrice(rowPage.rowCellVolume,funcArg.sortOrdAsc)
    
    })

    
    })
