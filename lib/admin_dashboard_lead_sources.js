var Page = require('../lib/base_page');
var sleep = require('sleep-promise');



Page.prototype.clickFirstLeadSource = function(){
	return this.find("/html/body/ui-view/app/div/div/div/div/ui-view/crm-lead-sources/div/div[2]/crm-lead-sources-results/div/div/div/table/tbody/tr[1]/td[2]/a",'xpath').click()
	// .then(() =>this.find("add_sessions",'id').click())
}



module.exports = Page;

