var Page = require('../lib/base_page');
var sleep = require('sleep-promise');



Page.prototype.clickFirstResult = function(){
	return this.find("/html/body/ui-view/app/div/div/div/div/ui-view/users/div/div[2]/ui-view/employee-search/div[3]/div[1]/table/tbody/tr/td[1]/a",'xpath').click()

}


module.exports = Page;

