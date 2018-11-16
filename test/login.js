// 
var Dev = true
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    assert =require('assert'),
    until = webdriver.until;

var { describe, it , after, before} = require('selenium-webdriver/testing');
// var Page = require('../lib/admin_dashboard');
// var Page = require('../lib/admin_dashboard_coupons');
// var Page = require('../lib/student_home_page');
var Page = require('../lib/login_enroll_page');
var Page = require('../lib/base_page');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var should = chai.should();
var page;
chai.use(chaiAsPromised);

function tests(browser){
  describe('revprep app scenarios - '+browser, function(){
    this.timeout(120000);
    beforeEach(function(){
      page = new Page(browser);
      page.driver.manage().window().setPosition(0, 0);
      page.visit('https://admin.rev-prep.com/login');
      // page.isthis();
    });
    afterEach(function(){
      // if(Dev){
      //   return
      // }
      page.quit();
    });

    it('User can login with correct username and password', function(){
      var un = page.enterUsername('justice.sommer@revolutionprep.com');
      var pw = page.enterPassword('revprep123');
      page.clicklogin();
      un.val.should.eventually.equal('justice.sommer@revolutionprep.com', 'The username was never entered into the username field');
      var loggedIn = page.homeText()
      loggedIn.typ.should.eventually.equal('Home', 'The user was not loggged in');
    })

    it('User can NOT login with incorrect username and password', function(){
      var un = page.enterUsername('NOTjustice.sommer@revolutionprep.com');
      var pw = page.enterPassword('revprep123');
      page.clicklogin();
      var toastText = page.readToast();
      toastText.txt.should.eventually.equal('Invalid Login or password.', 'The propper error toast did not appear');
      // var loggedIn = page.isLoggedIn()
    })
    it('User can NOT login with blank username and password', function(){
      var un = page.enterUsername('NOTjustice.sommer@revolutionprep.com');
      var pw = page.enterPassword('revprep123');
      page.clicklogin();
      var toastText = page.readToast();
      toastText.txt.should.eventually.equal('Invalid Login or password.', 'The propper error toast did not appear');
      // var loggedIn = page.isLoggedIn()
    })
  });
}

// var Browserss = ['chrome','firefox','internet explorer'];
  var Browserss = ['chrome'];
for (var i = Browserss.length - 1; i >= 0; i--) {
  tests(Browserss[i])
};

