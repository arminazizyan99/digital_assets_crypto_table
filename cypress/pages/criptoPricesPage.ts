class criptoPricesPage {

    pageUrl = "/"
    searchURL = "https://fda.forbes.com/v2/tradedAssets?limit=100&pageNum=1&sortBy=marketCap&direction=desc&query=Happy&category=ft&categoryId="
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
    

    
    clickAndTypeSearch(param: string){
        cy.get(this.searchField).should('have.value', '');
        cy.get(this.searchField).click().type(param).should("have.value",param)   
        cy.get(this.searchbBtn).should("be.visible").click()
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


    checkResultsTextwithInputText(regexpTxt: string,option: string){

        cy.get(this.cryptoTable).find('tr').find(this.nameCells).each(($el) => {
           cy.wrap($el).invoke('text').then((text)=>{

            expect(text).to.match(new RegExp(regexpTxt,option))
           })

        })
    }
  
} 

module.exports = new criptoPricesPage();