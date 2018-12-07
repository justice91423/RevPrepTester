var Dev = false
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    assert =require('assert'),
    until = webdriver.until;

var { describe, it , after, before} = require('selenium-webdriver/testing');
var Page = require('../lib/login_enroll_page');
var Page = require('../lib/base_page');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var should = chai.should();
var page;
chai.use(chaiAsPromised);
var trys = 2
if(Dev){
  var trys = 0
}

function tests(browser){
  describe('revprep app scenarios - '+browser, function(){
    this.timeout(30000);
    beforeEach(function(){
      page = new Page(browser);
      page.driver.manage().window().setPosition(0, 0);
      page.visit('https://admin.rev-prep.com/login');
    });
    afterEach(function(){
      if(Dev){
        return
      }
      page.quit();
    });

    it('User can login with correct username and password', function(){
      this.retries(trys)
      var un = page.enterUsername('justice.sommer@revolutionprep.com');
      var pw = page.enterPassword('revprep123');
      page.clicklogin();
      un.val.should.eventually.equal('justice.sommer@revolutionprep.com', 'The username was never entered into the username field');
      var loggedIn = page.homeText()
      loggedIn.typ.should.eventually.equal('Home', 'The user was not loggged in');
    })

    it('User can NOT login with incorrect username and password', function(){
      this.retries(trys)
      var un = page.enterUsername('NOTjustice.sommer@revolutionprep.com');
      var pw = page.enterPassword('revprep123');
      page.clicklogin();
      var toastText = page.readToast();
      toastText.txt.should.eventually.equal('Invalid Login or password.', 'The propper error toast did not appear');
    })
    it('User can NOT login with blank username and password', function(){
      this.retries(trys)
      var un = page.enterUsername('NOTjustice.sommer@revolutionprep.com');
      var pw = page.enterPassword('revprep123');
      page.clicklogin();
      var toastText = page.readToast();
      toastText.txt.should.eventually.equal('Invalid Login or password.', 'The propper error toast did not appear');
    })
  });
}

var Browserss = [
  'internet explorer',
  'firefox',
  'chrome'
  ];

if(Dev){
  var Browserss = [
  'chrome'
  ];
}

for (var i = Browserss.length - 1; i >= 0; i--) {
  tests(Browserss[i])
};

