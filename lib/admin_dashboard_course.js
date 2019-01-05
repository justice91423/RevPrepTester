var Page = require('../lib/base_page');
var sleep = require('sleep-promise');



Page.prototype.clickAddSessionsButton = function(){
	return this.find("add_sessions",'id').click()
	// .then(() =>this.find("add_sessions",'id').click())
}

module.exports = Page;

