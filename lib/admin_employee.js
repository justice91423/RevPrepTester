var Page = require('../lib/base_page');
var sleep = require('sleep-promise');

var usersPageSelector = require('../lib/admin_dashboard_xpaths.js').usersPageXpaths;
var employeePageSelector = require('../lib/admin_dashboard_xpaths.js').employeePageXpaths;
var editEmployeeModalSelector = require('../lib/admin_dashboard_xpaths.js').editEmployeeModalXpaths;

Page.prototype.findAndOpenEmployee  = function(username){
	var ret = this.visit('https://admin.rev-prep.com/users/employees')
	.then(() => sleep(200))
	.then(() => this.clickClearWrite(username,usersPageSelector.searchField,'xpath'))
	.then(() => sleep(200))
	.then(() => this.find(usersPageSelector.searchButton,'xpath').click())
	.then(() => sleep(1000))
	.then(() => this.find('//a[contains(., "permissions_tester rainforest")]','xpath').click())
	.then(() => sleep(1000))
	return ret
}

Page.prototype.clickEditedEmplyeeButton  = function(){
	return this.find(employeePageSelector.editEmployeeButton,'xpath').click()
		.then(() => sleep(500))
}

Page.prototype.setTitleFromEditEmployeeModal = function(name){
	var ret = this.selectOption(name,editEmployeeModalSelector.titleField,'xpath')
	.then(() => sleep(250))
	return ret
}

Page.prototype.checkTitleFromEditEmployeeModal =  async function(name){
	return {
		sel:  await this.find('//*[@label="'+name+'"]','xpath').getAttribute("selected")
	}
}

Page.prototype.clickUpdateEditEmployeeModal  = function(){
	this.debug("clickUpdateEditEmployeeModal")
	var ret = this.find(editEmployeeModalSelector.updateButton,'xpath').click()
	.then(() => page.dismissToast())
	.then(() => sleep(500))
	.then(() => this.debug("clickUpdateEditEmployeeModal end"));
	return ret
}

Page.prototype.removeSpoofAdvisorFromWonkaEditEmployeeModal  = function(){
	return this.find('//input[@value="Spoof Advisor"]/preceding-sibling::span','xpath').click()
		.then(() => sleep(500))
}

module.exports = Page;