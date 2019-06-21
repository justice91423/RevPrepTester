var Page = require('../lib/base_page');
var sleep = require('sleep-promise');
var famliesPageSelector = require('../lib/admin_dashboard_xpaths.js').famliesPageXpaths;
var webdriver = require('selenium-webdriver'),
    By = webdriver.By


Page.prototype.addCriteriaButton = function(name){
	var onscreen = ["Age","Search","Advisor","Leads","Customers"]
	this.debug("addCriteriaButton "+name)
	if (!(onscreen.includes(name))){
		this.debug("This is not on the list "+name)
		return this.find(famliesPageSelector.addCriteriaButton,'xpath').click()
		.then(() => sleep(200))
		.then(() => this.selectOption(name,famliesPageSelector.addCriteriaMenu,'xpath',"button"))
	}else{return onscreen}

}

Page.prototype.fillTextCriteriaField = function(name,value){
	return this.clickClearWrite(value,famliesPageSelector.textCriteriaField(name),'xpath')	
}

Page.prototype.fillTextCompleteCriteriaField = function(name,value){
	return this.clickClearWrite(value,famliesPageSelector.textCriteriaField(name),'xpath')
	.then(() => sleep(1000))
	.then(() => this.write("RETURN",famliesPageSelector.textCriteriaField(name),'xpath'))
}

Page.prototype.fillmodifiableCriteriaField = function(name,value){
	this.debug("fillmodifiableCriteriaField "+name+" "+value)
	this.debug("famliesPageSelector.modifiableCriteriaField(name,true) "+famliesPageSelector.modifiableCriteriaField(name,true))
	return this.find(famliesPageSelector.modifiableCriteriaField(name,true),'xpath').getText()
	.then((text) => {
		this.debug("fillmodifiableCriteriaField text "+text)
		if(!value.includes(text.replace("$",""))){
			this.find(famliesPageSelector.modifiableCriteriaField(name,true),'xpath').click()
		}
	})
	.then(() => this.clickClearWrite(value.replace(/\D/g,''),famliesPageSelector.modifiableCriteriaField(name),'xpath'))
}

Page.prototype.fillSelectCriteriaField = function(name,value){
	return this.find(famliesPageSelector.selectCriteriaField(name),'xpath').click()
	.then(() => sleep(1000))
	.then(() => this.find(famliesPageSelector.selectCriteriaOption(value),'xpath').click())
	// this next click clicks the "Families" header text.  It's just to trigger the criteria menu to close
	.then(() => sleep(1000))
	.then(() => this.find("/html/body/ui-view/app/div/div/div/div/ui-view/family-search/div/h1",'xpath',true).click())

}


var modifiableCriteriaFields = ["Age","Revenue","Last Touch","Hours Left","Referral Revenue","Web Sale","No Follow-up"];
var textCriteriaFields = ["Search","Home Estimate"];
var selectCriteriaFields = ["Advisor","Leads","Products","Contact Attempts","Contact List Reason","Grade","Order Source","Source","Last NPS"];
var textCompleteCriteriaFields = ["Course ID","Lead Source","Private Tutor(s)"];

Page.prototype.performSearchFamlies = function(searchText="",advisor=false,leads=false,customers=false,criteria={}){
	// console.log("searchText "+searchText)
	return this.find(famliesPageSelector.clearButton,'xpath').click()
	.then(() =>{

		for (var index in criteria) {

			this.addCriteriaButton(index)
		}
	})
	.then(() =>{

		for (var index2 in criteria) {

			if (modifiableCriteriaFields.includes(index2)){
			  this.fillmodifiableCriteriaField(index2,criteria[index2])
			}
			if (textCriteriaFields.includes(index2)){
			  this.fillTextCriteriaField(index2,criteria[index2])
			}
			if (selectCriteriaFields.includes(index2)){
			  this.fillSelectCriteriaField(index2,criteria[index2])
			}
			if (textCompleteCriteriaFields.includes(index2)){
			  this.fillTextCompleteCriteriaField(index2,criteria[index2])
			}
		}	
	})
	.then(() =>{
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
	})
	// .then(() => this.find(famliesPageSelector.modifiableCriteriaField("Age",true),'xpath').click())
	.then(() => sleep(1000))
	.then(() => this.find(famliesPageSelector.searchButton,'xpath').click())
}

Page.prototype.clickClearButton = function(){
	return this.find(famliesPageSelector.clearButton,'xpath').click();
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

Page.prototype.getSearchResultsListings = async function(parentFirstName,parentLastName,columnName){
	this.debug("getSearchResults " + famliesPageSelector.Listing(parentFirstName,parentLastName))

	return page.driver.findElements(By.xpath(famliesPageSelector.Listing(parentFirstName,parentLastName,columnName)))
}

module.exports = Page;