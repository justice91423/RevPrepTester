var Page = require('../lib/base_page');
var sleep = require('sleep-promise');


Page.prototype.clickShowAdvancedFiltersAdvisorLeads = function(){
	return this.find("/html/body/ui-view/app/div/div/div/div/ui-view/crm-leads/div/crm-leads-filters/div/div[1]/p/a",'xpath').click();
}

// Page.prototype.enterFiltersAdvisorLeads = function(name){
// 	//enter lead first name
// 	this.find("/html/body/ui-view/app/div/div/div/div/ui-view/crm-leads/div/crm-leads-filters/div/div[2]/div[1]/div[1]/div[1]/input",'xpath').click()
// 	.then(() => this.write(name,"/html/body/ui-view/app/div/div/div/div/ui-view/crm-leads/div/crm-leads-filters/div/div[2]/div[1]/div[1]/div[1]/input",'xpath'))
// }

Page.prototype.enterFiltersAdvisorLeads = function(name,statuses=["Pre-Conversation","In Conversation"]){
	//enter lead first name
	this.find('//*[@name="clear_search"]','xpath').click()
	.then(() => this.write(name,'//*[@name="name"]','xpath'))
	.then(() => {
		for (var i = statuses.length - 1; i >= 0; i--) {
			this.find('//input[@name="statuses[]" and @value="'+statuses[i]+'"]/following-sibling::span','xpath').click()
		}
	})
	.then(() => sleep(200))
}

Page.prototype.clickSearchButtonAdvisorLeads = function(){
	return this.find("/html/body/ui-view/app/div/div/div/div/ui-view/crm-leads/div/crm-leads-filters/div/div[2]/div[2]/button[2]",'xpath').click();
}

module.exports = Page;