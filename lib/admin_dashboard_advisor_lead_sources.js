var Page = require('../lib/base_page');
var sleep = require('sleep-promise');


Page.prototype.clickShowAdvancedFiltersAdvisorLeadSources = function(){
	return this.find("/html/body/ui-view/app/div/div/div/div/ui-view/crm-lead-sources/div/div[2]/crm-lead-sources-filters/div/a",'xpath').click();
}

Page.prototype.enterFiltersAdvisorLeadSources = function(name){
	var nameSelector = '//*[@id="lead-source-search_value"]'
	var nameSelector = '#lead-source-search_value'

	
	//enter lead first name
	this.find(nameSelector).click()
	.then(() => sleep(100))
	.then(() => this.write(name,nameSelector))
	.then(() => sleep(3000))
	.then(() => this.write("DOWN",nameSelector))
	.then(() => sleep(100))
	.then(() => this.write("RETURN",nameSelector))
	.then(() => sleep(100))
	// Set Advisor to All Revolution
	.then(() => this.find('body > ui-view > app > div > div > div > div > ui-view > crm-lead-sources > div > div.m-b-lg > crm-lead-sources-filters > div > div:nth-child(1) > div:nth-child(2) > select').click())
	.then(() => this.find('/html/body/ui-view/app/div/div/div/div/ui-view/crm-lead-sources/div/div[2]/crm-lead-sources-filters/div/div[1]/div[2]/select/option[1]','xpath').click())
}

Page.prototype.clickSearchButtonAdvisorLeadSources = function(){
	return this.find("/html/body/ui-view/app/div/div/div/div/ui-view/crm-lead-sources/div/div[2]/crm-lead-sources-filters/div/div[3]/button[2]",'xpath').click();
}


Page.prototype.purchase = function(department){

	this.find("/html/body/ui-view/app/div/div/div/div/ui-view/crm-lead-sources/div/div[2]/crm-lead-sources-filters/div/div[1]/div[2]/select",'xpath').click()
	.then(() => this.write("UP","/html/body/ui-view/app/div/div/div/div/ui-view/crm-lead-sources/div/div[2]/crm-lead-sources-filters/div/div[1]/div[2]/select"))
	.then(() => this.write("RETURN","/html/body/ui-view/app/div/div/div/div/ui-view/crm-lead-sources/div/div[2]/crm-lead-sources-filters/div/div[1]/div[2]/select"))
} 

module.exports = Page;