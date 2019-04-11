var Page = require('../lib/base_page');
var sleep = require('sleep-promise');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By

// Page.prototype.enterMagicLinkEmail = function(email=false){
// 	if(!email){
// 		email = "test" + (Math.floor(Math.random() * 1000000) + 1) + "@gmail.com";
// 	}
// 	return this.clickClearWrite(email, '/html/body/ui-view/app/ui-view/email-confirmation/div/div/div/div/div/form/input','xpath')
// 	.then(() => sleep(500))
// }

// Page.prototype.clickContinueButtonMagicLinkEmail = function(){
// 	this.debug("clickContinueButtonMagicLinkEmail")
// 	return this.find('/html/body/ui-view/app/ui-view/email-confirmation/div/div/div/div/div/form/div/button','xpath').click()
// }

module.exports = Page;