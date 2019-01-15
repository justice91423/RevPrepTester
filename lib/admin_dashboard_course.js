var Page = require('../lib/base_page');
var sleep = require('sleep-promise');



Page.prototype.clickAddSessionsButton = function(){
	return this.find("add_sessions",'id').click()
	// .then(() =>this.find("add_sessions",'id').click())
}
Page.prototype.clickPublishButton = function(option){
	return this.find("status-button",'id').click()
	// .then(() =>this.find("/html/body/ui-view/app/div/div/div/div/ui-view/ui-view/courses/div[1]/div/div/button["+option+"]",'xpath').click())
	.then(() => this.selectOption(option,"/html/body/ui-view/app/div/div/div/div/ui-view/ui-view/div[1]/div/div[1]/section/div[2]/div[1]/div[1]/div/div",'xpath',"a"))
}

module.exports = Page;

