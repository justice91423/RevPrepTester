var Page = require('../lib/login_enroll_page');
// var foo = require('../lib/login_enroll_page');

Login = module.exports;
var page = new Page('chrome');

Login.loginAdmin = function(){

	var un = page.enterUsername('justice.sommer@revolutionprep.com');
	var pw = page.enterPassword('revprep123');
	page.clicklogin();
	un.val.should.eventually.equal('justice.sommer@revolutionprep.com', 'The username was not entered properly');
	var loggedIn = page.isLoggedIn()
	loggedIn.typ.should.eventually.equal('button', 'The user was not loggged in');
}




module.exports = Login;
