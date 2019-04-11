var Page = require('../lib/base_page');
var Page = require('../lib/tasks');
var sleep = require('sleep-promise');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By
var transactionReportSelector = require('../lib/admin_dashboard_xpaths.js').transactionReportXpaths;

Page.prototype.enterFiltersTransactionReport = function(departments=["Retail"],brands=[],segments=[],startingDate=false,endingDate=false,school=false,sourceType=false,orderType=false,thirdPartyOnly=false){


	this.debug("enterFiltersTransactionReport "+departments+brands+segments+startingDate+endingDate+school+sourceType+orderType+thirdPartyOnly)

	return this.find(transactionReportSelector.resetButton,'xpath').click()
	.then(() => sleep(3000))
	.then(() => this.find(transactionReportSelector.departmentCheckbox("Retail"),'xpath').click())
	.then(() => {
		for (var i = departments.length - 1; i >= 0; i--) {
			this.find(transactionReportSelector.departmentCheckbox(departments[i]),'xpath').click()
		}
		sleep(100)
	})
	.then(() => {
		if(startingDate){
			this.debug("enterFiltersTransactionReport has a starting date of "+startingDate)
			this.clickClearWrite(startingDate, transactionReportSelector.startingDateRangeField,'xpath')
		}
		if(endingDate){
			this.debug("enterFiltersTransactionReport has an endingDate date of "+endingDate)
			this.clickClearWrite(endingDate, transactionReportSelector.endingDateRangeField,'xpath')
		}
		sleep(100)
	})
	.then(() => {
		if(school){
			this.clickClearWrite(school, transactionReportSelector.schoolField,'xpath')
			.then(() => sleep(2000))
			.then(() => this.write("DOWN",transactionReportSelector.schoolField,'xpath'))
			.then(() => this.write("RETURN",transactionReportSelector.schoolField,'xpath'))
		}
		sleep(100)
	})
	.then(() => {
		if(sourceType){
			this.selectOption(sourceType,transactionReportSelector.sourceTypeField,'xpath')
		}
		sleep(100)
	})
	.then(() => {
		if(orderType){
			this.selectOption(orderType,transactionReportSelector.orderTypeField,'xpath')
		}
		sleep(100)
	})
	.then(() => {
		if(thirdPartyOnly){
			this.find(transactionReportSelector.thirdPartyOnlyToggle,'xpath').click()
		}
		sleep(100)
	})
	.then(() => {
		for (var i = brands.length - 1; i >= 0; i--) {
			this.find(transactionReportSelector.brandCheckbox(brands[i]),'xpath').click()
		}
		sleep(100)
	})
	.then(() => {
		for (var i = segments.length - 1; i >= 0; i--) {
			this.find(transactionReportSelector.segmentCheckbox(segments[i]),'xpath').click()
		}
		sleep(100)
	})
}

Page.prototype.clickSearchButtonTransactionReport = function(){
	return this.find(transactionReportSelector.searchButton,'xpath').click()
      .then(() => sleep(500))
}

Page.prototype.clickDateTimeSorterTransactionReport = function(){
	return this.find(transactionReportSelector.dateTimeSorter,'xpath').click()
      .then(() => sleep(500))
}

Page.prototype.findAnyListing = async function(el){
	this.debug("findAnyListing")

	return await page.driver.findElements(By.xpath(el))
}

module.exports = Page;