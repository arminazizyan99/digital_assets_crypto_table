class rowPage{

    urlSort7D = "https://fda.forbes.com/v2/tradedAssets?limit=100&pageNum=1&sortBy=percentage_7d&direction=desc&query=&category=ft&categoryId="
    numHead = '[data-test="slug"]'
    nameField = '[data-test="Name"]'
    priceField = '[data-test="price"]'
    hourField = '[data-test="percentage_1h"]'
    dayField = '[data-test="percentage"]'
    sevenDayField = '[data-test="percentage_7d"]'
    marketCapField = '[data-test="Market Cap"]'
    volumeField = '[data-test="24H Volume"]'
    chartField = '[data-test="7 Day Chart"]'
    arrayofFields = [this.numHead,this.nameField,this.priceField,this.hourField,this.dayField,this.sevenDayField,this.marketCapField,this.volumeField,this.chartField]
    rowCellName = '[data-test="row-cell-Name"]'
    rowCellPrice = '[data-test="row-cell-Price"]'
    rowCellHour = '[data-test="row-cell-1H"]'
    rowCellDay = '[data-test="row-cell-24H"]'
    rowCellWeek = '[data-test="row-cell-7D"]'
    rowCellMarket = '[data-test="row-cell-Market Cap"]'
    rowCellVolume= '[data-test="row-cell-24H Volume"]'
    rowCellChart = '[data-test="row-cell-7 Day Chart"]' 
    arrayofCellPercentage = [this.rowCellHour,this.rowCellDay,this.rowCellWeek]
    arrayofCellPrice = [this.rowCellMarket, this.rowCellVolume]
    hoverElement = ".Table_centerToolTips__jVFh8"




findRegexpPercent(selector: string,regexpTxt: string){
       
    cy.get(selector).find('span').each(($text)=>{
        expect($text.text()).to.match(new RegExp(regexpTxt))
    })
}
findRegexpMarcet(selector: string,regexpTxt: string){
       
    cy.get(selector).each(($text)=>{
        expect($text.text()).to.match(new RegExp(regexpTxt))
    })
}
findRegexp(selector: string,regexpTxt: string){
       
    cy.get(selector).find("div").each(($text)=>{
        expect($text.text()).to.match(new RegExp(regexpTxt))
    })
}


sortColumnPercent(selector: string,SortOrd: string){
 
    cy.get(selector).then(($price) => { 
       const innerText = (el) => el.innerText
       const justDigits = (str) => str.replace(/[^-|+0-9.]/g, '')
       let prices = Cypress._.map($price, (el) =>
       parseFloat(justDigits(innerText(el))))
    
    let originlist = prices.map((x) => x)

    if(SortOrd === "desc"){
        prices.sort((a,b) =>{
            return b - a // dsc
        })
    }
    else if(SortOrd === "asc"){
        prices.sort((a,b) =>{
             return a - b // asc 
          })
    }
    
    let sorted = prices.map((x) => x)
    expect(originlist).to.deep.equal(sorted)

    })
}

colorText(selector: string){
    let plus = new RegExp("^\\+.*")
    let minus = new RegExp("^\\-.*")
    cy.get(selector).find('span').each(($text)=>{
        let color = $text.css("color")

        if(plus.test($text.text())){
            expect(color).to.be.equal("rgb(0, 153, 51)")
        }
        else if(minus.test($text.text())){
            expect(color).to.be.equal("rgb(220, 0, 0)")
        }
    })

}
}

module.exports =new rowPage()