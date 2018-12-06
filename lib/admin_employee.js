var Page = require('../lib/base_page');
var sleep = require('sleep-promise');

Page.prototype.openEditEmployeeModal  = function(){
	var ret = this.visit('https://admin.rev-prep.com/employees/2327/contacts')
	.then(() => sleep(1000))
	.then(() => this.find("/html/body/ui-view/app/div/div/div/div/ui-view/employee-show/div[1]/button",'xpath').click())
	.then(() => sleep(1000));

	return ret
}

Page.prototype.setTitleFromEditEmployeeModal = function(optionNumber){
	var ret = this.find("/html/body/div[1]/div/div/employee-modal/div[2]/form/div[4]/div[1]/role-manager/div/div/div/select",'xpath').click()
	.then(() => sleep(250))
	.then(() => this.find("/html/body/div[1]/div/div/employee-modal/div[2]/form/div[4]/div[1]/role-manager/div/div/div/select/option["+optionNumber+"]",'xpath').click())
	.then(() => this.find("/html/body/div[1]/div/div/employee-modal/div[2]/form/div[4]/div[1]/role-manager/div/div/div/select",'xpath').click())
	return ret
}

Page.prototype.checkTitleFromEditEmployeeModal = function(optionNumber){
	return {
		sel: this.find("/html/body/div[1]/div/div/employee-modal/div[2]/form/div[4]/div[1]/role-manager/div/div/div/select/option["+optionNumber+"]",'xpath').getAttribute("selected")
	}
}

Page.prototype.clickUpdateEditEmployeeModal  = function(){
	var ret = this.find("/html/body/div[1]/div/div/employee-modal/div[3]/button[2]/span",'xpath').click()
	.then(() => sleep(500));
	return ret
}

module.exports = Page;
