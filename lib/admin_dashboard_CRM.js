var Page = require('../lib/base_page');
var sleep = require('sleep-promise');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By



Page.prototype.clickXtoCloseCRM = function(){
	return this.find("/html/body/div[1]/div/div/parent-crm-modal/div/div[1]/button",'xpath')
	.then(() => sleep(500))
	.then(() => this.find("/html/body/div[1]/div/div/parent-crm-modal/div/div[1]/button",'xpath').click())
}

Page.prototype.getDiamonds = async function(){
	this.debug("getDiamonds")

	return page.driver.findElements(By.xpath('/html/body/div[1]/div/div/parent-crm-modal/div/div[1]/div/h4/div/i'))
}

Page.prototype.mouseOverAdvisorCRM = function(){
	this.debug("mouseOverAdvisorCRM")
	return this.find("/html/body/div[1]/div/div/parent-crm-modal/div/div[2]/div[1]/div[2]/div[2]/div/div",'xpath',true)
}

Page.prototype.getToggleEditAdvisorButtons = async function(){
	this.debug("getToggleEditAdvisorButtons")

	return page.driver.findElements(By.xpath('//*[@id="toggleEditAdvisor"]'))
}

module.exports = Page;