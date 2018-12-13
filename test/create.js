var Dev = true
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


function searchForLead(name){
  return page.clickAdvisorOption(1)
  .then(() => page.clickShowAdvancedFiltersAdvisorLeads())
  .then(() => page.enterFiltersAdvisorLeads(name))
  .then(() => page.clickSearchButtonAdvisorLeads())
}

function searchForLeadSource(name){
  return page.clickAdvisorOption(3)
  .then(() => page.clickShowAdvancedFiltersAdvisorLeadSources())
  .then(() => page.enterFiltersAdvisorLeadSources(name))
  .then(() => page.clickSearchButtonAdvisorLeadSources())
}

function tests(browser){
  describe('revprep app scenarios - '+browser, function(){
    // this.timeout(20000);
    if(browser=='internet explorer'){
      this.timeout(90000);
    }else{
      this.timeout(45000);
    }
    
    beforeEach(function(){
      page = new Page(browser);
      page.driver.manage().window().setPosition(0, 0);
      page.driver.manage().window().setSize(1600,1080);
      page.visit('https://admin.rev-prep.com/login');
      page.loginAdmin('justice.sommer@revolutionprep.com','revprep123')
      .then(() => sleep(5000))
    });
    afterEach(function(){
      if(Dev){
        return
      }
      page.quit();
    });

    it('Create a lead', function(){
      this.retries(trys)
      var firstName = page.randomString(10,"alpha");
      var lastName = page.randomString(10,"alpha");

      page.clickCreateOption(1)
      .then(() => page.fillNewLead(firstName,lastName))
      .then(() => page.clickCreateButtonNewLeadModal())
      .then(() => sleep(500))

      var verificationText = page.getInnerHTML('/html/body/div[1]/div/div/parent-crm-modal/div/div[1]/div/h4/span[1]','xpath');
      verificationText.txt.should.eventually.equal(firstName+" "+lastName, "The Lead was not created properly");
    });

    it('Create a lead and search for it', function(){
      this.retries(trys)
      var firstName = page.randomString(10,"alpha");
      var lastName = page.randomString(10,"alpha");

      page.clickCreateOption(1)
      .then(() => page.fillNewLead(firstName,lastName))
      .then(() => page.clickCreateButtonNewLeadModal())
      .then(() => sleep(500))
      .then(() => page.clickXtoCloseCRM())
      .then(() => sleep(500))
      .then(() => searchForLead(firstName+" "+lastName))
      .then(() => sleep(5000))
      .then(() => {
        var verificationText = page.getInnerHTML('/html/body/ui-view/app/div/div/div/div/ui-view/crm-leads/div/crm-leads-results/div/div/div/table/tbody/tr[1]/td[2]/a','xpath')
        verificationText.txt.should.eventually.include(firstName+" "+lastName, "The newly created Lead did not appear as the search result");
      })
      .then(() => {
        var verificationSourceText = page.getInnerHTML('/html/body/ui-view/app/div/div/div/div/ui-view/crm-leads/div/crm-leads-results/div/div/div/table/tbody/tr/td[8]','xpath')
        verificationSourceText.txt.should.eventually.equal("Employee Referral", "Lead had the wrong source");
      });
    });

    it('Create a school and search for it', function(){
      this.retries(trys)
      var name = page.randomString(10,"alpha");

      page.clickCreateOption(2)
      .then(() => page.fillNewSchool(name))
      .then(() => page.clickCreateButtonNewSchoolModal())
      .then(() => sleep(500))
      .then(() => searchForLeadSource(name))
      .then(() => sleep(5000))
      .then(() => {
        var verificationText = page.getInnerHTML('/html/body/ui-view/app/div/div/div/div/ui-view/crm-lead-sources/div/div[2]/crm-lead-sources-results/div/div/div/table/tbody/tr/td[2]/a','xpath')
        verificationText.txt.should.eventually.include(name, "The newly created school did not appear as the search result");
      })
    });

    it('Create a lead source and search for it', function(){
      this.retries(trys)
      var name = page.randomString(10,"alpha");

      page.clickCreateOption(3)
      .then(() => page.fillNewLeadSource(name))
      .then(() => page.clickCreateButtonNewLeadSourceModal())
      .then(() => sleep(500))
      .then(() => searchForLeadSource(name))
      .then(() => sleep(5000))
      .then(() => {
        var verificationText = page.getInnerHTML('/html/body/ui-view/app/div/div/div/div/ui-view/crm-lead-sources/div/div[2]/crm-lead-sources-results/div/div/div/table/tbody/tr/td[2]/a','xpath')
        verificationText.txt.should.eventually.include(name, "The newly created Lead source did not appear as the search result");
      })
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
  'internet explorer'
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