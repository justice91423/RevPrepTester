var Dev = true
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    assert =require('assert'),
    until = webdriver.until;
var sleep = require('sleep-promise');
var { describe, it , after, before} = require('selenium-webdriver/testing');
var Page = require('../lib/admin_dashboard');
var Page = require('../lib/admin_dashboard_new_lead_modal');
var Page = require('../lib/admin_dashboard_CRM');
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


// var cLine = process.env.KEY;

function tests(browser){
  describe('revprep app scenarios - '+browser, function(){
    // this.timeout(20000);
    this.timeout(120000);
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

    // it('Create a lead', function(){
    //   this.retries(trys)
    //   var firstName = page.randomString(10,"alpha");
    //   var lastName = page.randomString(10,"alpha");

    //   page.clickCreateOption(1)
    //   .then(() => page.fillNewLead(firstName,lastName))
    //   .then(() => page.clickCreateButtonNewLeadModal())
    //   .then(() => sleep(500))

    //   var verificationText = page.getInnerHTML('/html/body/div[1]/div/div/parent-crm-modal/div/div[1]/div/h4/span[1]','xpath');
    //   verificationText.txt.should.eventually.equal(firstName+" "+lastName, "Lead was not created properly");


    // });

    it('Create a lead and search for it', function(){
      this.retries(trys)

      var firstName = page.randomString(10,"alpha");
      var lastName = page.randomString(10,"alpha");

      // page.clickCreateOption(1)
      // .then(() => page.fillNewLead(firstName,lastName))
      // .then(() => page.clickCreateButtonNewLeadModal())
      // .then(() => sleep(5000))
      // .then(() => page.clickXtoCloseCRM())
      // .then(() => sleep(500))
      // .then(() => page.clickSearch())
      // .then(() => sleep(500))
      // .then(() => page.enterSearchText(firstName+" "+lastName))

      page.clickSearch()
      .then(() => sleep(2000).sendKeys("hey"))
      .then(() => page.enterSearchText(firstName+" "+lastName))

      // var verificationText = page.getInnerHTML('/html/body/div[1]/div/div/parent-crm-modal/div/div[1]/div/h4/span[1]','xpath');
      // verificationText.txt.should.eventually.equal(firstName+" "+lastName, "Lead was not created properly");


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

if(process.env.browser){
  var Browserss = [
    process.env.browser
  ];
  // env KEY=YOUR_KEY mocha test/;
  // https://stackoverflow.com/questions/16144455/mocha-tests-with-extra-options-or-parameters
}

for (var i = Browserss.length - 1; i >= 0; i--) {
  tests(Browserss[i])
};