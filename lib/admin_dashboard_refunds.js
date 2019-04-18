var Page = require('../lib/base_page');
var Page = require('../lib/tasks');
var sleep = require('sleep-promise');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By
var refundsSelector = require('../lib/admin_dashboard_xpaths.js').refundsPageXpaths;
var refundProcessingModalSelector = require('../lib/admin_dashboard_xpaths.js').refundProcessingModalXpaths;

Page.prototype.enterFiltersRefunds = function(departments=false,parent=false,advisor=false,status=false,category=false,reason=false){
	
	this.debug("enterFiltersRefunds "+departments+" "+parent+" "+advisor+" "+status+" "+category+" "+reason)
	return this.find(refundsSelector.clearButton,'xpath').click()
	.then(() => sleep(3000))
	.then(() => {
		if(departments){
			for (var i = departments.length - 1; i >= 0; i--) {
				this.find(refundsSelector.departmentCheckbox(departments[i]),'xpath').click()
			}
		}
		sleep(100)
	})
	.then(() => {
		if(parent){
			this.clickClearWrite(parent, refundsSelector.parentField,'xpath')
			.then(() => sleep(2000))
			.then(() => this.write("DOWN",refundsSelector.parentField,'xpath'))
			.then(() => this.write("RETURN",refundsSelector.parentField,'xpath'))
		}
		sleep(100)
	})
	.then(() => {
		if(advisor){
			this.clickClearWrite(advisor, refundsSelector.advisorField,'xpath')
			.then(() => sleep(2000))
			.then(() => this.write("DOWN",refundsSelector.advisorField,'xpath'))
			.then(() => this.write("RETURN",refundsSelector.advisorField,'xpath'))
		}
		sleep(100)
	})
	.then(() => {
		if(status){
			this.selectOption(status,refundsSelector.statusField,'xpath')
		}
		sleep(100)
	})
	.then(() => {
		if(category){
			this.selectOption(category,refundsSelector.refundCategoryField,'xpath')
		}
		sleep(100)
	})
	.then(() => {
		if(reason){
			this.selectOption(reason,refundsSelector.refundReasonField,'xpath')
		}
		sleep(100)
	})
}

Page.prototype.clickSearchButtonRefund = function(){
	return this.find(refundsSelector.searchButton,'xpath').click()
      .then(() => sleep(1000))
}

Page.prototype.clickRequestedSorterRefund = function(){
	return this.find(refundsSelector.requestedOrderBy,'xpath').click()
      .then(() => sleep(1000))
}

Page.prototype.openRefundModalRefund = function(parentFirstName,parentLastName,){
	return this.find(refundsSelector.Listing(parentFirstName,parentLastName,"viewButton"),'xpath').click()
      .then(() => sleep(1000))
}

Page.prototype.processOrDeleteRefund = function(process=true){
	this.debug("processOrDeleteRefun ")
	if(process){
	return this.find(refundProcessingModalSelector.processRequestButton,'xpath').click()
      // .then(() => this.alertResponce())
      .then(() => this.debug("processOrDeleteRefun processed"))
    }else{
    	return this.find(refundProcessingModalSelector.deleteRefundRequestButton,'xpath').click()
      	// .then(() => this.alertResponce())
      	.then(() => this.debug("processOrDeleteRefun deleted"))
    }
}

// Page.prototype.findAnyListingRefund = async function(el){
// 	this.debug("findAnyListingRefund")

// 	return await page.driver.findElements(By.xpath(el))
// }

module.exports = Page;