var Dev = true
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    assert =require('assert'),
    until = webdriver.until;
var sleep = require('sleep-promise');
var { describe, it , after, before} = require('selenium-webdriver/testing');
var Page = require('../lib/admin_dashboard');
var Page = require('../lib/student_home_page');
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
    // this.timeout(20000);
    this.timeout(30000);
    beforeEach(function(){
      page = new Page(browser);
      page.driver.manage().window().setPosition(0, 0);
      page.driver.manage().window().setSize(1600,1080);
      page.visit('https://admin.rev-prep.com/login');
      page.loginAdmin('justice.sommer@revolutionprep.com','revprep123');
    });
    afterEach(function(){
      if(Dev){
        return
      }
      page.quit();
    });



    it('Create a lead', function(){
      this.retries(trys)
      page.clickCreate("Lead");

    });
  })
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