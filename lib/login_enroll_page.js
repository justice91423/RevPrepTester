var Page = require('../lib/base_page');
var foo = function(){
	console.log('bar');
};

// Page.prototype.requestBtn = function(){
// 	this.write('input', 'user@fakemail.com');
// 	return{
// 		opacity: this.find('.btn-lg').getCssValue('opacity'),
// 		state: this.find('btn-lg').isEnabled()
// 	}
// }

// Page.prototype.clickSubmit = function(){
// 	return this.find('body > ui-view > div > div:nth-child(1) > div:nth-child(2) > div > form > button').click();
// }

// Page.prototype.alertSucess = function(){
// 	this.requestBtn();
// 	this.clickSubmit();
// 	return this.find('.alert-success').getText();
// }

// Page.prototype.clicklogin = function(){
// 	return this.find('body > ui-view > div > div:nth-child(1) > div:nth-child(2) > div > form > button').click();
// }

// Page.prototype.enterUsername = function(username){
// 	this.write('body > ui-view > div > div:nth-child(1) > div:nth-child(2) > div > form > div:nth-child(1) > input',username);
// 	return{
// 		val: this.find('body > ui-view > div > div:nth-child(1) > div:nth-child(2) > div > form > div:nth-child(1) > input').getAttribute("value")
// 	}
// }

// Page.prototype.enterPassword = function(password){
// 	this.write('body > ui-view > div > div:nth-child(1) > div:nth-child(2) > div > form > div:nth-child(2) > input',password);
// 	return{
// 		val: this.find('body > ui-view > div > div:nth-child(1) > div:nth-child(2) > div > form > div:nth-child(2) > input').getAttribute("value")
// 	}
// }

Page.prototype.isLoggedIn = function(password){
	
	return{ typ: this.find('/html/body/ui-view/app/div/div/sidebar/nav/div/div[7]/a/span','xpath').getAttribute('type')}
}
Page.prototype.homeText = function(password){
	
	return{ typ: this.find('/html/body/ui-view/app/div/div/sidebar/nav/div/a[3]/span','xpath').getAttribute('innerHTML')}
}

Page.prototype.readToast = function(){
	return{
		txt: this.find('div > div > div > div.toast-message').getAttribute('innerHTML')
	}
} 

// Page.prototype.loginAdmin = function(){
// 	var un = page.enterUsername('justice.sommer@revolutionprep.com');
// 	var pw = page.enterPassword('revprep123');
// 	page.clicklogin();
// 	un.val.should.eventually.equal('justice.sommer@revolutionprep.com', 'The username was not entered properly');
// 	var loggedIn = page.isLoggedIn()
// 	loggedIn.typ.should.eventually.equal('button', 'The user was not loggged in');
// }

module.exports = Page;
// module.exports = foo;
