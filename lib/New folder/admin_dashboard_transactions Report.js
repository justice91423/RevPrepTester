var Page = require('../lib/base_page');


Page.prototype.clickAnOrder = function(number){
	return this.find('/html/body/ui-view/app/div/div/div/div/ui-view/ui-view/transactions-report/div[2]/div/table/tbody/tr['+number+']/td[7]/a','xpath').click();
}


module.exports = Page;
