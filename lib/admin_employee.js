var Page = require('../lib/base_page');
var sleep = require('sleep-promise');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By

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

Page.prototype.removeARoleEditEmployeeModal  = function(role){
	this.debug("clickUpdateremoveARoleEditEmployeeModalEditEmployeeModal " + role)
	return this.find('//input[@value="'+role+'"]/preceding-sibling::span','xpath').click()
		.then(() => sleep(500))
}

Page.prototype.addARoleEditEmployeeModal = function(role){
	this.debug("clickUpdateEditEmployeeModal " + role)

	return this.find('//button[contains(., "Add a role")]','xpath').click()
	.then(() =>  this.selectOption(role,'//div[@class="dropdown-menu"]','xpath',"button"))
	.then(() => sleep(250))
}

Page.prototype.getRoleCards= async function(role){
	this.debug("getRoleCards role "+role)
	return page.driver.findElements(By.xpath(editEmployeeModalSelector.roleCard(role)))
}

Page.prototype.countRoleCards= async function(){
	this.debug("countRoleCards ")
	return page.driver.findElements(By.xpath('//div[@class="mt-2 input-group ng-scope"]'))
}

Page.prototype.getRoleCardValue=  function(number){

	console.log('//div[@class="mt-2 input-group ng-scope"]['+number+']//input')

	// return	 this.find('//div[@class="mt-2 input-group ng-scope"]['+number+']//input', "xpath").getAttribute("value")

	return	 this.find('//div[@class="mt-2 input-group ng-scope"]['+number+']//input', "xpath").getText()
}

module.exports = Page;