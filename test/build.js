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
// var Page = require('../lib/admin_dashboard');
var Page = require('../lib/base_page');
// var Page = require('../lib/admin_dashboard_new_school_modal');
// var Page = require('../lib/admin_dashboard_new_lead_source_modal');
// var Page = require('../lib/admin_dashboard_CRM');
// var Page = require('../lib/admin_dashboard_advisor_leads');
// var Page = require('../lib/admin_dashboard_advisor_lead_sources');
// var Page = require('../lib/student_home_page');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var should = chai.should();
var page;
chai.use(chaiAsPromised);
var trys = 1
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
var DesiredBuild = ""
var BuildName = "(no build specified)"
if(process.env.build){
  DesiredBuild = process.env.build;
  BuildName = DesiredBuild;
  // env KEY=YOUR_KEY mocha test/;
  // https://stackoverflow.com/questions/16144455/mocha-tests-with-extra-options-or-parameters
// }

  for (var i = Browserss.length - 1; i >= 0; i--) {
    tests(Browserss[i])
  };

  function tests(browser){
    describe('Build', function(){
      // this.timeout(20000);
      if(browser=='internet explorer'){
        this.timeout(30000);
      }else{
        this.timeout(15000);
      }
      
      beforeEach(function(){
        page = new Page(browser);
        page.driver.manage().window().setPosition(0, 0);
        page.driver.manage().window().setSize(1600,1080);
        page.visit('https://admin.rev-prep.com/login')
      });
      afterEach(function(){
        if (this.currentTest.state == 'failed') {
        addContext(this, 'screenshots/'+testImageName+'.png');
        page.screenshot(testImageName)
      }
        if(Dev){
          return
        }
        page.quit();
      });

      it('The current build is '+BuildName, function(done){
        this.retries(trys)
        var currentBuild = page.find('/html/body/ng-include/div','xpath').getText();
        currentBuild.should.eventually.include(DesiredBuild, "The current build is not "+BuildName).notify(done);
      });
    })
  }
}
