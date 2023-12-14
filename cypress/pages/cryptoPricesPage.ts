class cryptoPricesPage {

    pageUrl = "/"
    searchURL = "https://fda.forbes.com/v2/tradedAssets?limit=100&pageNum=1&sortBy=marketCap&direction=desc&query=Happy&category=ft&categoryId="
    tradedAssetsUrl = "https://fda.forbes.com/v2/tradedAssets?limit=100&pageNum=1&sortBy=marketCap&direction=desc&query=&category=ft&categoryId="
    searchField = 'input[placeholder*="Search by Name or Symbol"]'
    searchbBtn = 'button[title="Search by Name or Symbol Button"]'
    cryptoTable = '.Table_tableContainer__Dm0uG'
    pageNumbsection = ".Table_paginationContainer__hYwTu"
    pageNum = '[data-testid="pagination-tile"]'
    pageNumLefttarrow = '[aria-label="Previous"]'
    pageNumRightarrow = '[aria-label="Next"]'
    rowNumb = '[data-test="row-cell-#"]'
    rowGroup = '[role="rowgroup"]'
    column = '[role="row"]'
    columnHeader = '[role="columnheader"]'
    nameCells = '.Table_tableCellName__hYTfr'
    openedForm = "#zephr-registration-form-M-0r0DzQ"
    watchBtn = ".WatchlistBtn_addIcon__RrDIh"
    formCloseBtn = '[aria-label="Close"]'
    


    clickAndTypeSearch(param: string){
        cy.get(this.searchField).should('have.value', '');
        cy.get(this.searchField).click().type(param).should("have.value",param)   
        cy.get(this.searchbBtn).should("be.visible").click({force : true})
    }

    
    findTableandPagination(){

       cy.get(this.cryptoTable).should("be.visible")
       cy.get(this.pageNumbsection).should("be.visible")

    }

    findLengthofPages(param1: number){

        cy.get(this.pageNum).should("have.length",param1)
    }


    paginationVisibility(){

        cy.get(this.cryptoTable).should("be.visible")
        cy.get(this.pageNumLefttarrow).should("be.disabled").and("be.visible")
    }


    findLengthofRows(param: number){

        cy.get(this.rowNumb).then(($el) =>{
           expect($el).to.have.length(param)
        })
    }

    findLengthofColumn(param: number){

        cy.get(this.column).find(this.columnHeader).should('have.length', param)
    }


    clearInputField(){


        cy.get(this.searchField).clear()
    }

    chechWatchListBtn(){

        cy.get(this.watchBtn).first().each(($el)=>{
        cy.wrap($el).click();
        cy.get(this.openedForm).should("be.visible")
        cy.get(this.formCloseBtn).click({ force: true })
        cy.get(this.cryptoTable).should("be.visible")

        })
    }

/**
 * Checks if the text content of each element in a crypto table matches a regular expression pattern.
 *
 * @param {string} regexpTxt - The regular expression pattern to match against the text content.
 * @param {string} option - Options for the regular expression (e.g., 'i' for case-insensitive).
 *
 */
    checkResultsTextwithInputText(regexpTxt: string,option: string){

        cy.get(this.cryptoTable).find('tr').find(this.nameCells).each(($el) => {
           cy.wrap($el).invoke('text').then((text)=>{

            expect(text).to.match(new RegExp(regexpTxt,option))
           })

        })
    }
  
} 

module.exports = new cryptoPricesPage();