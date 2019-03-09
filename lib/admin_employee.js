var Page = require('../lib/base_page');
var sleep = require('sleep-promise');

Page.prototype.findAndOpenEmployee  = function(username){
	var ret = this.visit('https://admin.rev-prep.com/users/employees')
	.then(() => sleep(200))
	.then(() => this.clickClearWrite(username,"basic_keyword_search",'name'))
	.then(() => sleep(200))
	.then(() => this.find("/html/body/ui-view/app/div/div/div/div/ui-view/users/div/div[2]/ui-view/employee-search/div[1]/div/form/div/div/button",'xpath').click())
	.then(() => sleep(1000))
	.then(() => this.find("/html/body/ui-view/app/div/div/div/div/ui-view/users/div/div[2]/ui-view/employee-search/div[3]/div[1]/table/tbody/tr/td[1]/a",'xpath').click())
	.then(() => sleep(1000))
	return ret
}

Page.prototype.clickEditedEmplyeeButton  = function(){
	return this.find("/html/body/ui-view/app/div/div/div/div/ui-view/employee-show/div[1]/button",'xpath').click()
		.then(() => sleep(500))
}

// Page.prototype.setTitleFromEditEmployeeModal = function(optionNumber){
// 	var ret = this.find("/html/body/div[1]/div/div/employee-modal/div[2]/form/div[4]/div[1]/role-manager/div/div/div/select",'xpath').click()
// 	.then(() => sleep(250))
// 	.then(() => this.find("/html/body/div[1]/div/div/employee-modal/div[2]/form/div[4]/div[1]/role-manager/div/div/div/select/option["+optionNumber+"]",'xpath').click())
// 	.then(() => this.find("/html/body/div[1]/div/div/employee-modal/div[2]/form/div[4]/div[1]/role-manager/div/div/div/select",'xpath').click())
// 	return ret
// }

Page.prototype.setTitleFromEditEmployeeModal = function(name){
	var ret = this.selectOption(name,"title",'name')
	.then(() => sleep(250))
	// .then(() => this.find("/html/body/div[1]/div/div/employee-modal/div[2]/form/div[4]/div[1]/role-manager/div/div/div/select/option["+optionNumber+"]",'xpath').click())
	// .then(() => this.find("/html/body/div[1]/div/div/employee-modal/div[2]/form/div[4]/div[1]/role-manager/div/div/div/select",'xpath').click())
	return ret
}

// Page.prototype.checkTitleFromEditEmployeeModal =  async function(optionNumber){
// 	return {
// 		sel:  await this.find("/html/body/div[1]/div/div/employee-modal/div[2]/form/div[4]/div[1]/role-manager/div/div/div/select/option["+optionNumber+"]",'xpath').getAttribute("selected")
// 	}
// }

Page.prototype.checkTitleFromEditEmployeeModal =  async function(name){
	return {
		sel:  await this.find('//*[@label="'+name+'"]','xpath').getAttribute("selected")
	}
}

Page.prototype.clickUpdateEditEmployeeModal  = function(){
	var ret = this.find("/html/body/div[1]/div/div/employee-modal/div[3]/button[2]/span",'xpath').click()
	.then(() => page.dismissToast())
	.then(() => sleep(500));
	return ret
}

Page.prototype.removeSpoofAdvisorFromWonkaEditEmployeeModal  = function(){
	return this.find("/html/body/div[1]/div/div/employee-modal/div[2]/form/div[4]/div[1]/role-manager/div/div/div/div[13]/span",'xpath').click()
		.then(() => sleep(500))
}

module.exports = Page;




