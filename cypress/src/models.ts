export enum StatusCodes {
    NotFound = 404,
    Success = 200,
    Accepted = 202,
    BadRequest = 400
  }

export enum urlContain {
  criptoPricesPageUrl = "/crypto-prices/?sh="

}

export enum sortTypes {
     sortOrdDesc = "desc",
     sortOrdAsc = "asc"

}

export enum enValues {

    inputSearch = "Happy",
    textInput = "internet",
    originRowLen = 100,
    searchRowLen = 4,
    columnLen = 9,
    activeStatus = "active",
    emptyString = '',
    pageNum = 1,
    mainPageNum = 5,
    assetLenghth = 2

}


export enum assertChainers{
   beVisible = "be.visible",
   noValue = "not.have.value",
   value = "have.value",
   beDesabled = "be.disabled",
   beEnabled = "be.enabled",
   containText = "contain",
   haveText = "have.text",
   equal = "be.equal"

}


export enum fixtureFile {
  rowField = "rowField.json",
  changeNumdata = 'changeData.json'

}


export enum  attrCommand {

   attrFunction = 'attr',
   dataAttribute = 'data'

   
}

export enum RegExp
{
   regexpInputTxt = '.*(in)+.*',
   regexpInputOpt = 'i'
}