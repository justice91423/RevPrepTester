var Page = require('../lib/base_page');
var sleep = require('sleep-promise');
var famliesPageSelector = require('../lib/admin_dashboard_xpaths.js').famliesPageXpaths;



Page.prototype.performSearchFamlies = function(searchText="",advisor=false,leads=false,customers=false){
	console.log("searchText "+searchText)
	return this.find(famliesPageSelector.clearButton,'xpath').click()
	.then(() =>{
		this.clickClearWrite(searchText,famliesPageSelector.searchField,'xpath')
		if(leads){
			this.find(famliesPageSelector.leadsCheckBox,'xpath').click()
		}
		if(customers){
			this.find(famliesPageSelector.customerCheckBox,'xpath').click()
		}
		if(advisor){

			// this wont work
			// this.selectOption(advisor,FamliesPageSelector.advisorField,'xpath')
		}

		// if(customerCheckBox){
		// 	this.find(FamliesPageSelector.leadsCheckBox,'xpath').click()
		// }
	})
	.then(() => sleep(1000))
	.then(() => this.find(famliesPageSelector.searchButton,'xpath').click())
}

Page.prototype.clickClearButton = function(){
	return this.find(FamliesPageSelector.clearButton,'xpath').click();
}

Page.prototype.clickShowAdvancedFiltersAdvisorLeads = function(){
	return this.find("/html/body/ui-view/app/div/div/div/div/ui-view/crm-leads/div/crm-leads-filters/div/div[1]/p/a",'xpath').click();
}

Page.prototype.enterFiltersAdvisorLeads = function(name,statuses=["Pre-Conversation","In Conversation"]){

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