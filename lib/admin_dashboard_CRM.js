var Page = require('../lib/base_page');
var sleep = require('sleep-promise');



Page.prototype.clickXtoCloseCRM = function(){
	return this.find("/html/body/div[1]/div/div/parent-crm-modal/div/div[1]/button",'xpath')
	.then(() => sleep(500))
	.then(() => this.find("/html/body/div[1]/div/div/parent-crm-modal/div/div[1]/button",'xpath').click())
}

module.exports = Page;