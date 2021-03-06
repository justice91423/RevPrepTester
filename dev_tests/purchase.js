if(process.env.dev){
    // env dev=true mocha test/;
  Dev = process.env.dev;
   console.log("This test suite is running in Development Mode")
}else{
  var Dev = false;
}

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    assert =require('assert'),
    until = webdriver.until;
var sleep = require('sleep-promise');
var { describe, it , after, before} = require('selenium-webdriver/testing');
var Page = require('../lib/admin_dashboard');
var Page = require('../lib/admin_dashboard_new_lead_modal');
var Page = require('../lib/admin_dashboard_new_school_modal');
var Page = require('../lib/admin_dashboard_new_lead_source_modal');
var Page = require('../lib/admin_dashboard_CRM');
var Page = require('../lib/admin_dashboard_advisor_leads');
var Page = require('../lib/admin_dashboard_advisor_lead_sources');
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

var Browserss = [
  // 'internet explorer',
  // 'firefox',
  'chrome'
  ];

if(Dev){
  var Browserss = [
  'chrome'
  ];
}
var Build = ""
var BuildName = "(no build specified)"
if(process.env.build){
  DesiredBuild = process.env.build;
  BuildName = DesiredBuild;

  // env KEY=YOUR_KEY mocha test/;
  // https://stackoverflow.com/questions/16144455/mocha-tests-with-extra-options-or-parameters
}

for (var i = Browserss.length - 1; i >= 0; i--) {
  tests(Browserss[i])
};



function tests(browser){
  describe('Build', function(){
    // this.timeout(20000);
    if(browser=='internet explorer'){
      this.timeout(60000);
    }else{
      this.timeout(30000);
    }
    
    beforeEach(function(){
      page = new Page(browser);
      page.driver.manage().window().setPosition(0, 0);
      page.driver.manage().window().setSize(1600,1080);
      page.visit('https://admin.rev-prep.com/login');
      // page.loginAdmin('justice.sommer@revolutionprep.com','revprep123')
      .then(() => sleep(5000))
    });
    afterEach(function(){
      if(Dev){
        return
      }
      page.quit();
    });

    it('Current build is '+BuildName, function(done){
      this.retries(trys)
      var currentBuild = page.find('/html/body/ng-include/div','xpath').getText()

      

      // var verificationText = page.getInnerHTML('/html/body/div[1]/div/div/parent-crm-modal/div/div[1]/div/h4/span[1]','xpath');
      currentBuild.should.eventually.include(Build, "The current build is not "+BuildName).notify(done);
    });

    // it('Create a lead and search for it', function(done){
    //   this.retries(trys)
    //   var firstName = page.randomString(10,"alpha");
    //   var lastName = page.randomString(10,"alpha");

    //   page.clickCreateOption(1)
    //   .then(() => page.fillNewLead(firstName,lastName))
    //   .then(() => page.clickCreateButtonNewLeadModal())
    //   .then(() => sleep(500))
    //   .then(() => page.clickXtoCloseCRM())
    //   .then(() => sleep(500))
    //   .then(() => searchForLead(firstName+" "+lastName))
    //   .then(() => sleep(5000))
    //   .then(() => {
    //     var verificationText = page.getInnerHTML('/html/body/ui-view/app/div/div/div/div/ui-view/crm-leads/div/crm-leads-results/div/div/div/table/tbody/tr[1]/td[2]/a','xpath')
    //     verificationText.txt.should.eventually.include(firstName+" "+lastName, "The newly created Lead did not appear as the search result");
    //   })
    //   .then(() => {
    //     var verificationSourceText = page.getInnerHTML('/html/body/ui-view/app/div/div/div/div/ui-view/crm-leads/div/crm-leads-results/div/div/div/table/tbody/tr/td[8]','xpath')
    //     verificationSourceText.txt.should.eventually.equal("Employee Referral", "Lead had the wrong source").notify(done);
    //   });
    // });

    // it('Create a school and search for it', function(done){
    //   this.retries(trys)
    //   var name = page.randomString(10,"alpha");

    //   page.clickCreateOption(2)
    //   .then(() => page.fillNewSchool(name))
    //   .then(() => page.clickCreateButtonNewSchoolModal())
    //   .then(() => sleep(500))
    //   .then(() => searchForLeadSource(name))
    //   .then(() => sleep(5000))
    //   .then(() => {
    //     var verificationText = page.getInnerHTML('/html/body/ui-view/app/div/div/div/div/ui-view/crm-lead-sources/div/div[2]/crm-lead-sources-results/div/div/div/table/tbody/tr/td[2]/a','xpath')
    //     verificationText.txt.should.eventually.include(name, "The newly created school did not appear as the search result").notify(done);
    //   })
    // });

    // it('Create a lead source and search for it', function(done){
    //   this.retries(trys)
    //   var name = page.randomString(10,"alpha");

    //   page.clickCreateOption(3)
    //   .then(() => page.fillNewLeadSource(name))
    //   .then(() => page.clickCreateButtonNewLeadSourceModal())
    //   .then(() => sleep(500))
    //   .then(() => searchForLeadSource(name))
    //   .then(() => sleep(5000))
    //   .then(() => {
    //     var verificationText = page.getInnerHTML('/html/body/ui-view/app/div/div/div/div/ui-view/crm-lead-sources/div/div[2]/crm-lead-sources-results/div/div/div/table/tbody/tr/td[2]/a','xpath')
    //     verificationText.txt.should.eventually.include(name, "The newly created Lead source did not appear as the search result").notify(done);
    //   })
    // });
  })
}

