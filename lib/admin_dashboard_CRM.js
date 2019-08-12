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

Page.prototype.clickProfileAndBillingTab = function(){
	return this.find('//a[contains(., "Profile & Billing")]','xpath').click()
}

Page.prototype.clickEditButtonOnProfileAndBillingTab = function(){
	return this.find('//button[contains(., "Edit")]','xpath').click()
}

Page.prototype.getHandofftoggles = async function(){
	this.debug("getHandofftoggles")
	return page.driver.findElements(By.xpath('//*[@id="handoff"]'))
}

Page.prototype.clickEnterPaymentMethodButtonOnProfileAndBillingTab = function(){
	return this.find('//button[contains(., "Enter")]','xpath').click()
}

Page.prototype.clickEditPaymentMethodButtonOnProfileAndBillingTab = function(){
	return this.find('/html/body/div[1]/div/div/parent-crm-modal/div/div[2]/div[3]/div/div[5]/div/parent-edit/div/div[1]/div[2]/authorize-net-profile/div/div/button','xpath').click()
}

Page.prototype.fillOutPaymentMethod = function(){
	//enter CC number
	var ret = this.clickClearWrite("4111 1111 1111 1111", '//*[@name="CardNumber"]','xpath')
	//enter Exp date
	.then(() => this.clickClearWrite("022020", '//*[@name="CardExpiry"]','xpath'))
	//enter CVC
	.then(() => this.clickClearWrite("222", '//*[@name="CardCvc"]','xpath'))
	return ret
}
Page.prototype.clickSavePaymentMethodButtonOnProfileAndBillingTab = function(){
	return this.find('//button[contains(., "Save")]','xpath').click()
}

Page.prototype.getTrashButtons = async function(){
	this.debug("getTrashButtons")
	return page.driver.findElements(By.xpath('//i[@class="fa fa-trash"]'))
}

module.exports = Page;