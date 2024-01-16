class rowPage {
  numHead = '[data-test="slug"]';
  nameField = '[data-test="Name"]';
  priceField = '[data-test="price"]';
  hourField = '[data-test="percentage_1h"]';
  dayField = '[data-test="percentage"]';
  sevenDayField = '[data-test="percentage_7d"]';
  marketCapField = '[data-test="Market Cap"]';
  volumeField = '[data-test="24H Volume"]';
  chartField = '[data-test="7 Day Chart"]';
  arrayofFields = [
    this.numHead,
    this.nameField,
    this.priceField,
    this.hourField,
    this.dayField,
    this.sevenDayField,
    this.marketCapField,
    this.volumeField,
    this.chartField,
  ];
  rowCellName = '[data-test="row-cell-Name"]';
  rowCellPrice = '[data-test="row-cell-Price"]';
  rowCellHour = '[data-test="row-cell-1H"]';
  rowCellDay = '[data-test="row-cell-24H"]';
  rowCellWeek = '[data-test="row-cell-7D"]';
  rowCellMarket = '[data-test="row-cell-Market Cap"]';
  rowCellVolume = '[data-test="row-cell-24H Volume"]';
  rowCellChart = '[data-test="row-cell-7 Day Chart"]';
  arrayofCellPercentage = [this.rowCellHour, this.rowCellDay, this.rowCellWeek];
  arrayofCellPrice = [this.rowCellMarket, this.rowCellVolume];
  hoverElement = ".Table_centerToolTips__jVFh8";
  tableSortArrowDesc = ".Table_tableSortArrow__5lyaU";
  tableSortArrowAsc = ".Table_tableSortArrowAsc__dybKH";
  tableSortArrow = ".Table_tableSortArrow__5lyaU";

  baseUrlSort = "https://fda.forbes.com/v2/tradedAssets";
  urlSortParams = {
    Desc7D:
      "?limit=100&pageNum=1&sortBy=percentage_7d&direction=desc&query=&category=ft&categoryId=",
    Asc7D:
      "?limit=100&pageNum=1&sortBy=percentage_7d&direction=asc&query=&category=ft&categoryId=",
    DescPrice:
      "?limit=100&pageNum=1&sortBy=price&direction=desc&query=&category=ft&categoryId=",
    AscPrice:
      "?limit=100&pageNum=1&sortBy=price&direction=asc&query=&category=ft&categoryId=",
    DescMarketCap:
      "?limit=100&pageNum=1&sortBy=marketCap&direction=desc&query=&category=ft&categoryId=",
    AscMarketCap:
      "?limit=100&pageNum=1&sortBy=marketCap&direction=asc&query=&category=ft&categoryId=",
    DescVolume:
      "?limit=100&pageNum=1&sortBy=volume&direction=desc&query=&category=ft&categoryId=",
    AscVolume:
      "?limit=100&pageNum=1&sortBy=volume&direction=asc&query=&category=ft&categoryId=",
  };

  
  RowFirstValue(selector) {
    return cy
      .get(selector)
      .first()
      .invoke("text")
      .then((text) => text.trim());
  }

  findRegexpPercent(selector: string, regexpTxt: string) {
    cy.get(selector)
      .find("span")
      .each(($text) => {
        expect($text.text()).to.match(new RegExp(regexpTxt));
      });
  }

  findRegexpMarcet(selector: string, regexpTxt: string) {
    cy.get(selector).each(($text) => {
      expect($text.text()).to.match(new RegExp(regexpTxt));
    });
  }

  findRegexp(selector: string, regexpTxt: string) {
    cy.get(selector)
      .find("div")
      .each(($text) => {
        expect($text.text()).to.match(new RegExp(regexpTxt));
      });
  }

  clickOnColumnTitle() {
    cy.get(this.sevenDayField).click({ force: true });
    cy.get(this.tableSortArrowDesc).should("be.visible");
  }

  sortWait() {
    cy.wait(1000);
  }

  /**
   * Sorts and verifies the accuracy of a column containing prices.
   * It takes the prices text without percentage sign and maps them into an array
   *
   * @param {string} selector - CSS selector of the column elements containing prices.
   * @param {string} sortOrd - Sorting order, either 'asc' for ascending or 'desc' for descending.
   *
   */
  sortColumnPercent(selector: string, sortOrd: string) {
    cy.get(selector).then(($price) => {
      const innerText = (el) => el.innerText;
      const justDigits = (str) => str.replace(/[^-|+0-9.]/g, "");
      let prices = Cypress._.map($price, (el) =>
        parseFloat(justDigits(innerText(el)))
      );

      let originlist = prices.map((x) => x);

      if (sortOrd === "desc") {
        prices.sort((a, b) => {
          return b - a; // dsc
        });
      } else if (sortOrd === "asc") {
        prices.sort((a, b) => {
          return a - b; // asc
        });
      }

      let sorted = prices.map((x) => x);
      expect(originlist).to.deep.equal(sorted);
    });
  }

  /**
   * Retrieves an array of percentage_7d values from the intercepted response body
   * and sorts a column based on the values.
   * @param {object[]} sortedList - An array of objects representing assets with percentage_7d property.
   * @param {string} sortOrd - The sorting order ('asc' for ascending, 'desc' for descending).
   *
   */
  sortColumn(sortedList: [], sortOrd: string) {
    let copyList = sortedList.map((x) => x);
    let originlist = sortedList.map((x) => x);

    if (sortOrd === "desc") {
      copyList.sort((a, b) => {
        return b - a; // dsc
      });
    } else if (sortOrd === "asc") {
      copyList.sort((a, b) => {
        return a - b; // asc
      });
    }

    let sorted = copyList.map((x) => x);
    expect(originlist).to.deep.equal(sorted);
  }

  /**
   * Sorts and verifies the accuracy of a column containing prices.
   * If price text includes one of chars T,B,M.K it is multiplied to those values accordingly
   *
   * @param {string} selector - CSS selector of the column elements containing prices.
   * @param {string} sortOrd - Sorting order, either 'asc' for ascending or 'desc' for descending.
   *
   */

  sortColumnPrice(selector: string, sortOrd: string) {
    cy.get(selector).then(($price) => {
      let innerText = (el) => el.innerText;
      let justDigits = (str) => str.replace(/[^-?0-9.]/g, "");
      let multTrillion = (el) => el * 1e12;
      let multBillion = (el) => el * 1e9;
      let multMillion = (el) => el * 1e6;
      let multThousand = (el) => el * 1e3;

      let prices = Cypress._.map($price, ($el) => {
        let price = parseFloat(justDigits(innerText($el)));

        if (innerText($el).includes("T")) {
          return multTrillion(price);
        } else if (innerText($el).includes("B")) {
          return multBillion(price);
        } else if (innerText($el).includes("M")) {
          return multMillion(price);
        } else if (innerText($el).includes("K")) {
          return multThousand(price);
        } else {
          return price;
        }
      });

      let originlist = prices.map((x) => x);

      if (sortOrd === "desc") {
        prices.sort((a, b) => {
          return b - a; // dsc
        });
      } else if (sortOrd === "asc") {
        prices.sort((a, b) => {
          return a - b; // asc
        });
      }

      let sorted = prices.map((x) => x);
      expect(originlist).to.deep.equal(sorted);
    });
  }

  /**
   * Finds colors of text within a specified selector and checks them against expected values.
   * If first char is plus sign it must be green, if it's minus must be red
   * @param {string} selector - CSS selector of the container element containing text elements.
   *
   */
  colorText(selector: string) {
    let plus = new RegExp("^\\+.*");
    let minus = new RegExp("^\\-.*");
    cy.get(selector)
      .find("span")
      .each(($text) => {
        let color = $text.css("color");

        if (plus.test($text.text())) {
          expect(color).to.be.equal("rgb(0, 153, 51)");
        } else if (minus.test($text.text())) {
          expect(color).to.be.equal("rgb(220, 0, 0)");
        }
      });
  }
}

module.exports = new rowPage();
