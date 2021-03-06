var Page = require('../lib/base_page');
var Page = require('../lib/tasks');
var sleep = require('sleep-promise');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By
var ordersPageSelector = require('../lib/admin_dashboard_xpaths.js').ordersPageXpaths;



Page.prototype.requestRefundOrdersPage = function(amount=99,catigory="Other",reason="Other",notes="Am I the problem?"){
	page.debug("requestRefundOrdersPage "+amount+" "+catigory+" "+reason+" "+notes)
	return this.find(ordersPageSelector.editButton,'xpath').click()
      .then(() => this.find(ordersPageSelector.requestRefundButton,'xpath').click())
      .then(() => this.clickClearWrite(amount, ordersPageSelector.requestRefundForm.refundAmountField,'xpath'))
      .then(() => this.selectOption(catigory,ordersPageSelector.requestRefundForm.refundCatigoryField,"xpath", "option"))
      .then(() => this.selectOption(reason,ordersPageSelector.requestRefundForm.refundReasonField,"xpath", "option"))
      .then(() => this.clickClearWrite(notes, ordersPageSelector.requestRefundForm.notesField,'xpath'))
      .then(() => this.find(ordersPageSelector.requestRefundForm.confirmButton,'xpath').click())
      .then(() => {
      	page.debug("Done with requestRefundOrdersPage")
      })
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