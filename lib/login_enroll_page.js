var Page = require('../lib/base_page');
var foo = function(){
	console.log('bar');
};

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
module.exports = Page;