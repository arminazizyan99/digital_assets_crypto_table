import rowPage from "../../pages/rowPage"
import {StatusCodes} from "../../src/models"
import {sortTypes} from "../../src/models"
import {assertChainers} from "../../src/models"
import {enValues} from "../../src/models"

describe("Sorting columns",()=>{

   
    it("should verify accurate descending sorting of percentages in the 7D column", ()=>{

      cy.intercept(`${rowPage.baseUrlSort}${rowPage.urlSortParams.Desc7D}`).as("sortData")
      cy.get(rowPage.sevenDayField).click({ force: true })
      rowPage.sortWait()
      cy.get(rowPage.sevenDayField).find(rowPage.tableSortArrowDesc).should(assertChainers.beVisible)
     
      cy.wait("@sortData").then(({ response }) => {
        const { body, statusCode } = response;
      
        expect(statusCode).to.eq(StatusCodes.Success)
        expect(body.assets).to.have.length(enValues.originRowLen)
      })

        rowPage.sortColumnPercent(rowPage.rowCellWeek,sortTypes.sortOrdDesc)
     
    })

    it("should verify accurate ascending sorting of percentages in the 7D column", ()=>{

      cy.intercept(`${rowPage.baseUrlSort}${rowPage.urlSortParams.Asc7D}`).as("sortData")
      cy.get(rowPage.sevenDayField).click({ force: true }).click({ force: true })
      rowPage.sortWait()
      cy.get(rowPage.sevenDayField).find(rowPage.tableSortArrowAsc).should(assertChainers.beVisible)

      cy.wait("@sortData").then(({ response }) => {
        const { body, statusCode } = response;
      
        expect(statusCode).to.eq(StatusCodes.Success)
        expect(body.assets).to.have.length(enValues.originRowLen)
      })
        
        rowPage.sortColumnPercent(rowPage.rowCellWeek,sortTypes.sortOrdAsc)
    
    })

    it("should verify accurate descending sorting of price in the Price column", ()=>{

      cy.intercept(`${rowPage.baseUrlSort}${rowPage.urlSortParams.DescPrice}`).as("sortedData")
      cy.get(rowPage.priceField).click({ force: true })
      rowPage.sortWait()
      cy.get(rowPage.priceField).find(rowPage.tableSortArrowDesc).should(assertChainers.beVisible)

      cy.wait("@sortedData").then(({ response }) => {
        const { body, statusCode } = response;
      
        expect(statusCode).to.eq(StatusCodes.Success)
        expect(body.assets).to.have.length(enValues.originRowLen)
      })

      rowPage.sortColumnPrice(rowPage.rowCellPrice,sortTypes.sortOrdDesc)

    })


    it("should verify accurate ascending sorting of price in the Price column", ()=>{

      cy.intercept(`${rowPage.baseUrlSort}${rowPage.urlSortParams.AscPrice}`).as("sortedData")
      cy.get(rowPage.priceField).click({ force: true }).click({ force: true })
      rowPage.sortWait()
      cy.get(rowPage.priceField).find(rowPage.tableSortArrowAsc).should(assertChainers.beVisible)

      cy.wait("@sortedData").then(({ response }) => {
        const { body, statusCode } = response;
      
        expect(statusCode).to.eq(StatusCodes.Success)
        expect(body.assets).to.have.length(enValues.originRowLen)
      })

      rowPage.sortColumnPrice(rowPage.rowCellPrice,sortTypes.sortOrdAsc)
    
    })


    it("should verify accurate ascending sorting of price in the Market Cap column", ()=>{
     
      cy.intercept(`${rowPage.baseUrlSort}${rowPage.urlSortParams.AscMarketCap}`).as("sortedData")
      cy.get(rowPage.marketCapField).click({ force: true })
      rowPage.sortWait()
    
      cy.get(rowPage.marketCapField).find(rowPage.tableSortArrowAsc).should(assertChainers.beVisible)
      
      cy.wait("@sortedData").then(({ response }) => {
        const { body, statusCode } = response
      
        expect(statusCode).to.eq(StatusCodes.Success)
        expect(body.assets).to.have.length(enValues.originRowLen)
      })

        rowPage.sortColumnPrice(rowPage.rowCellMarket,sortTypes.sortOrdAsc)

    })


    it.only("should verify accurate descending sorting of price in the Market Cap column", ()=>{

      cy.intercept(`${rowPage.baseUrlSort}${rowPage.urlSortParams.DescMarketCap}`).as("sortedData")
      cy.get(rowPage.marketCapField).click({ force: true }).click({ force: true })
      rowPage.sortWait()

      cy.get(rowPage.marketCapField).find(rowPage.tableSortArrowDesc).should(assertChainers.beVisible)

      cy.wait("@sortedData").then(({ response }) => {
        const { body, statusCode } = response
      
        expect(statusCode).to.eq(StatusCodes.Success)
        expect(body.assets).to.have.length(enValues.originRowLen)
      })

        rowPage.sortColumnPrice(rowPage.rowCellMarket,sortTypes.sortOrdDesc)
    
    })


    it("should verify accurate descending sorting of price in the 24H Volume column", ()=>{

      cy.intercept(`${rowPage.baseUrlSort}${rowPage.urlSortParams.DescVolume}`).as("sortedData")
      cy.get(rowPage.volumeField).click({ force: true })
      rowPage.sortWait()
      cy.get(rowPage.volumeField).find(rowPage.tableSortArrowDesc).should(assertChainers.beVisible)

      cy.wait("@sortedData").then(({ response }) => {
        const { body, statusCode } = response
      
        expect(statusCode).to.eq(StatusCodes.Success);
        expect(body.assets).to.have.length(enValues.originRowLen)
      })

        rowPage.sortColumnPrice(rowPage.rowCellVolume,sortTypes.sortOrdDesc)


    })


    it("should verify accurate ascending sorting of price in the 24H Volume column", ()=>{
      
      cy.intercept(`${rowPage.baseUrlSort}${rowPage.urlSortParams.AscVolume}`).as("sortedData")
      cy.get(rowPage.volumeField).click({ force: true }).click({ force: true })
      rowPage.sortWait()
      cy.get(rowPage.volumeField).find(rowPage.tableSortArrowAsc).should(assertChainers.beVisible)

      cy.wait("@sortedData").then(({ response }) => {
        const { body, statusCode } = response;
      
        expect(statusCode).to.eq(StatusCodes.Success);
        expect(body.assets).to.have.length(enValues.originRowLen)
      })

        rowPage.sortColumnPrice(rowPage.rowCellVolume,sortTypes.sortOrdAsc)
    
    })

    
    })
