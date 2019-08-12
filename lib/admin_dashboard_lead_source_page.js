var Page = require('../lib/base_page');
var sleep = require('sleep-promise');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By

Page.prototype.mouseOverAdvisor = function(){
	this.debug("mouseOverAdvisor")
	return this.find("/html/body/ui-view/app/div/div/div/div/ui-view/lead-source-dashboard/div/div[2]/editable-field[1]/div/div[1]/div/span",'xpath',true)
}
Page.prototype.mouseOverCloser = function(){
	this.debug("mouseOverCloser")
	return this.find("/html/body/ui-view/app/div/div/div/div/ui-view/lead-source-dashboard/div/div[2]/editable-field[2]/div/div[1]/div/span",'xpath',true)
}
Page.prototype.mouseOverStatus = function(){
	this.debug("mouseOverStatus")
	return this.find("/html/body/ui-view/app/div/div/div/div/ui-view/lead-source-dashboard/div/div[2]/lead-source-status/div/div/div/span",'xpath',true)
}
Page.prototype.clickToggleEditButton = function(){
	this.debug("clickToggleEditButton")
	return this.find('//*[@id="toggleEdit"]','xpath').click()
}

Page.prototype.getToggleEditButtons = async function(){
	this.debug("getToggleEditButtons")

	return page.driver.findElements(By.xpath('//*[@id="toggleEdit"]'))
}

Page.prototype.toggleOpenLeadSourceInfo = async function(){
	this.debug("toggleOpenLeadSourceInfo")
	return this.find('//button[contains(., "Lead Source Info")]','xpath').click()
}

Page.prototype.mouseOverRevenueShare = function(){
	this.debug("mouseOverRevenueShare")
	return this.find('//label[contains(., "Revenue Share")]','xpath',true)
}

module.exports = Page;