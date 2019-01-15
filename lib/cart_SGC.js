var Page = require('../lib/base_page');
var sleep = require('sleep-promise');



Page.prototype.clickAddSessionsButton = function(){
	return this.find("add_sessions",'id').click()
	// .then(() =>this.find("add_sessions",'id').click())
}
Page.prototype.setSubject = function(option){
	return this.find("subject",'name').click()
	// .then(() =>this.find("/html/body/ui-view/app/div/div/div/div/ui-view/ui-view/courses/div[1]/div/div/button["+option+"]",'xpath').click())
	.then(() => this.selectOption(option,"/html/body/ui-view/ui-view/main/div/div/div[1]/ui-view/cart-course-search/div/div[1]/div[1]/div[1]/div/select/optgroup",'xpath',"option"))
}

module.exports = Page;

