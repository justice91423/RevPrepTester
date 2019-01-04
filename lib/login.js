var Page = require('../lib/login_enroll_page');
// var foo = require('../lib/login_enroll_page');

Login = module.exports;
var page = new Page('chrome');
var buildName;

Login.loginAdmin = function(){

	this.find('/html/body/ng-include/div','xpath').getText()
	.then((build) => {
		buildName = build;
		console.log('buildName ',buildName);

		var un = page.enterUsername('justice.sommer@revolutionprep.com');
		var pw = page.enterPassword('revprep123');
		page.clicklogin();
		un.val.should.eventually.equal('justice.sommer@revolutionprep.com', 'The username was not entered properly');
		var loggedIn = page.isLoggedIn()
		loggedIn.typ.should.eventually.equal('button', 'The user was not loggged in');
	})
}




module.exports = Login;
