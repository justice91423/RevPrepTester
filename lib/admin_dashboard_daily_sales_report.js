var Page = require('../lib/base_page');
var Page = require('../lib/tasks');
var sleep = require('sleep-promise');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By
var dailySalesReportSelector = require('../lib/admin_dashboard_xpaths.js').dailySalesReportXpaths;

Page.prototype.enterFiltersDailySalesReport = function(date=false,advisor=false,department=false){

	return sleep(100)
	.then(() => {
		if(date){
			this.debug("enterFiltersDailySalesReport has a date of "+date)
			this.clickClearWrite(date, dailySalesReportSelector.dateField,'xpath')
		}
		sleep(100)
	})
	.then(() => {
		if(advisor){
			this.find(dailySalesReportSelector.advisorField,'xpath').click()
			.then(() => sleep(500))
			.then(() => this.selectOption(advisor,dailySalesReportSelector.advisorField,'xpath'))
		}
		sleep(100)
	})
	.then(() => {
		if(department){
			this.selectOption(department,dailySalesReportSelector.departmentField,'xpath')
		}
		sleep(100)
	})
}

Page.prototype.clickSearchButtonDailySalesReport = function(){
	return this.find(dailySalesReportSelector.searchButton,'xpath').click()
      .then(() => sleep(500))
}

Page.prototype.findAnyListingDailySalesReport = async function(el){
	this.debug("findAnyListingDailySalesReport")

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