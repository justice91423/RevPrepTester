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
// var Login = require('../lib/Login');
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
var Browserss = [
  // 'internet explorer',
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
  describe('Test Date scenarios - '+browser, function(){
    this.timeout(30000);
    beforeEach(function(){
      page = new Page(browser);
      page.driver.manage().window().setPosition(0, 0);
      page.visit('https://admin.rev-prep.com/login');
      page.loginAdmin('justice.sommer@revolutionprep.com','revprep123');
      // page.dismissRingCentralModal()
      // .then(() => sleep(500));
    });
    afterEach(function(){
      // if(Dev){
      //   return
      // }
      page.quit();
    });

    function gotoTestDatesScreen(){
      return page.clickElement('/html/body/ui-view/app/div/div/sidebar/nav/div/div[4]/a/span','xpath')
      .then(page.clickElement('/html/body/div[2]/div/a[4]','xpath'));

    }

    it('Test Dates screen is accessible', function(done){
      this.retries(trys)
      gotoTestDatesScreen();
      var verificationText = page.getInnerHTML('/html/body/ui-view/app/div/div/div/div/ui-view/test-dates/div/div[1]/h1','xpath');
      verificationText.txt.should.eventually.equal('Test Dates').notify(done);
    })

    it('Edit Test Date modal is accessible', function(done){
      this.retries(trys)
      gotoTestDatesScreen()
      .then(page.clickElement('/html/body/ui-view/app/div/div/div/div/ui-view/test-dates/div/div[2]/table/tbody/tr[1]/td[4]/button', 'xpath'));
      var verificationText = page.getInnerHTML('/html/body/div[1]/div/div/test-date-edit-modal/div[1]/h2', 'xpath');
      verificationText.txt.should.eventually.equal('\n    Edit\n    Test Date\n  ').notify(done);
    })

    it('Add Test Date modal is accessible', function(done){
      this.retries(trys)
      gotoTestDatesScreen()

      .then(page.clickElement('/html/body/ui-view/app/div/div/div/div/ui-view/test-dates/div/div[1]/button', 'xpath'));
      var verificationText = page.getInnerHTML('/html/body/div[1]/div/div/test-date-edit-modal/div[1]/h2', 'xpath');
      verificationText.txt.should.eventually.equal('\n    Add\n    Test Date\n  ').notify(done);
    })

    var testDate = {};

    it('New test date can be created', function(done){
      this.retries(trys)
      testDate = page.randomDate();
      gotoTestDatesScreen()
      .then(page.clickElement('/html/body/ui-view/app/div/div/div/div/ui-view/test-dates/div/div[1]/button', 'xpath')) 
      .then(page.enterDate(testDate["numerical"],'/html/body/div[1]/div/div/test-date-edit-modal/div[2]/form/div[1]/div/div/input', "xpath"))
      //this clicks the modal title to close the calendar selector 
      .then(page.clickElement('/html/body/div[1]/div/div/test-date-edit-modal/div[1]/h2','xpath'))
      .then(page.clickElement('/html/body/div[1]/div/div/test-date-edit-modal/div[2]/form/div[2]/div/select','xpath'))
      .then(page.clickElement('/html/body/div[1]/div/div/test-date-edit-modal/div[2]/form/div[2]/div/select/optgroup[1]/option[1]',"xpath"))
      .then(page.clickElement('/html/body/div[1]/div/div/test-date-edit-modal/div[3]/button','xpath'))
      var verificationText = page.getInnerHTML('#toast-container > div > div > div > div.toast-title');
      verificationText.txt.should.eventually.equal('Success').notify(done);
    })

    it('Test date can be edited', function(done){
      this.retries(trys)
      testDate = page.randomDate();
      gotoTestDatesScreen()
      .then(page.clickElement('/html/body/ui-view/app/div/div/div/div/ui-view/test-dates/div/div[2]/table/tbody/tr[1]/td[4]/button','xpath'))
      .then(page.enterDate(testDate["numerical"],'/html/body/div[1]/div/div/test-date-edit-modal/div[2]/form/div[1]/div/div/input', "xpath"))
       //this clicks the modal title to close the calendar selector 
      .then(page.clickElement('/html/body/div[1]/div/div/test-date-edit-modal/div[1]/h2','xpath'))
      .then(page.clickElement('/html/body/div[1]/div/div/test-date-edit-modal/div[2]/form/div[2]/div/select',"xpath"))
      .then(page.clickElement('/html/body/div[1]/div/div/test-date-edit-modal/div[2]/form/div[2]/div/select/optgroup[1]/option[2]',"xpath"))
      .then(page.clickElement('/html/body/div[1]/div/div/test-date-edit-modal/div[3]/button[2]','xpath'))
      var verificationText = page.getInnerHTML('#toast-container > div > div > div > div.toast-title');
      verificationText.txt.should.eventually.equal('Success').notify(done);
    })

    it('test date can be deleted', function(done){
      this.retries(trys)
      
      gotoTestDatesScreen()
      var verificationText = ''
      function getSecondLineDate(){
        verificationText = page.getInnerHTML('/html/body/ui-view/app/div/div/div/div/ui-view/test-dates/div/div[2]/table/tbody/tr[2]/td[1]/a','xpath');
        return verificationText;
      }
      page.clickElement('/html/body/ui-view/app/div/div/div/div/ui-view/test-dates/div/div[2]/table/tbody/tr[1]/td[4]/button','xpath')
      .then(page.clickElement('/html/body/div[1]/div/div/test-date-edit-modal/div[3]/button[1]', 'xpath'))
      .then(page.acceptAlert())

      var verificationText2 = page.getInnerHTML('#toast-container > div > div > div > div.toast-title');
      verificationText2.txt.should.eventually.equal('Success').notify(done);
    })
  });
}

