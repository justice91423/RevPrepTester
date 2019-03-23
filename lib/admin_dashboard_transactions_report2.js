var Page = require('../lib/base_page');
var Page = require('../lib/tasks');
var sleep = require('sleep-promise');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By
var transactionReportSelector = require('../lib/admin_dashboard_xpaths.js').transactionReportXpaths;

Page.prototype.enterFiltersTransactionReport = function(departments=["Retail"],brands=[],segments=[],startingDate=false,endingDate=false,school=false,sourceType=false,orderType=false,thirdPartyOnly=false){

	return this.find(transactionReportSelector.resetButton,'xpath').click()
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
	this.debug("getToggleEditButtons")

	return page.driver.findElements(By.xpath(el))
}

// Page.prototype.toggleVIPNewLeadModal = function(){
// 	return this.find(newLeadModalSelector.vipToggle,'xpath').click()
//       .then(() => sleep(500))
// }

// Page.prototype.clickAddStudentNewLeadModal = function(){
// 	return this.find(newLeadModalSelector.addStudentButton,'xpath').click()
//       .then(() => sleep(500))
// }

// Page.prototype.fillStudentNewLeadModal = function(studentCount=1, firstName=false,lastName=false,studentGrade="3rd Grade"){
// 	if(!firstName){
// 		 firstName = this.randomString(10,"alpha");
// 	}
// 	if(!lastName){
// 		 lastName = this.randomString(10,"alpha");
// 	}
// 	//enter lead first name
// 	return this.clickClearWrite(firstName, newLeadModalSelector.studentFirstNameField.replace("[studentCount]",studentCount-1),'xpath')
// 	//enter lead last name
// 	.then(() => this.clickClearWrite(lastName, newLeadModalSelector.studentLastNameField.replace("[studentCount]",studentCount-1),'xpath'))
// 	//enter grade
// 	.then(() => this.selectOption(studentGrade, newLeadModalSelector.studentGradeField.replace("[studentCount]",studentCount-1),"xpath", "option"))
// 	.then(() => this.selectOption("Pacific Time (US & Canada) (GMT-08:00)",newLeadModalSelector.timeZoneField + '['+(studentCount+1)+']','xpath', "option"))
// }

// Page.prototype.getErrorTextNewLeadModal = function(){
// 	return this.getInnerHTML(newLeadModalSelector.emailError,'xpath')
//       // .then(() => sleep(500))
// }

module.exports = Page;