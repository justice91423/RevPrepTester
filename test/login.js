if(process.env.dev=="true"){
    // env dev=true mocha test/;
  Dev = true;
   console.log("This test suite is running in Development Mode")
}else{
  var Dev = false;
}
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
var sourceFile_credentials = require('../lib/credentials.js');
var credentials = sourceFile_credentials.credentials_a;
var username = credentials['wonka_tester']['username']
var password = credentials['wonka_tester']['password']
var page;
chai.use(chaiAsPromised);
var trys = 2
if(Dev){
  var trys = 0
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

if(process.env.browser){
  var Browserss = [
    process.env.browser
  ];
  // env browser=chrome mocha test/;
  // https://stackoverflow.com/questions/16144455/mocha-tests-with-extra-options-or-parameters
}
for (var i = Browserss.length - 1; i >= 0; i--) {
  tests(Browserss[i])
};

function tests(browser){
  describe('Login scenarios - '+browser, function(){
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

    it('User can login with correct username and password', function(done){
      this.retries(trys)
      var un = page.enterUsername(username);
      var pw = page.enterPassword(password);
      page.clicklogin();
      un.val.should.eventually.equal(username, 'The username was never entered into the Username field');
      var loggedIn = page.homeText()
      loggedIn.typ.should.eventually.equal('Home', 'The user was not logged in').notify(done);
    })

    it('User can NOT login with incorrect username', function(done){
      this.retries(trys)
      var un = page.enterUsername('NOT' + username);
      var pw = page.enterPassword(password);
      page.clicklogin();
      var toastText = page.readToast();
      toastText.txt.should.eventually.equal('Invalid Login or password.', 'The proper error toast did not appear').notify(done);
    })
    it('User can NOT login with blank username and password', function(done){
      this.retries(trys)
      // var un = page.enterUsername('NOTjustice.sommer@revolutionprep.com');
      // var pw = page.enterPassword('revprep123');
      sleep(2000)
      .then(() => page.clicklogin())
      var toastText = page.readToast();
      toastText.txt.should.eventually.equal('Invalid Login or password.', 'The proper error toast did not appear').notify(done);
    })
    it('User can NOT login with incorrect password', function(done){
      this.retries(trys)
      var un = page.enterUsername(username);
      var pw = page.enterPassword("incorrect password*&##");
      page.clicklogin();
      var toastText = page.readToast();
      toastText.txt.should.eventually.equal('Invalid Login or password.', 'The proper error toast did not appear').notify(done);
    })
   
  });
}


