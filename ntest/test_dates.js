var Dev = false
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

function tests(browser){
  describe('revprep app scenarios - '+browser, function(){
    this.timeout(30000);
    beforeEach(function(){
      page = new Page(browser);
      page.driver.manage().window().setPosition(0, 0);
      page.visit('https://admin.rev-prep.com/login');
      page.loginAdmin('justice.sommer@revolutionprep.com','revprep123');
    });
    afterEach(function(){
      if(Dev){
        return
      }
      page.quit();
    });

    function gotoTestDatesScreen(){
      return page.clickElement('body > ui-view > app > div > div > div > left-nav > div > ul > li:nth-child(7) > a > span')
      .then(page.clickElement('body > ui-view > app > div > div > div > left-nav > div > ul > li:nth-child(7) > ul > li:nth-child(4) > a'));

    }

    it('Test Dates screen is accessable', function(){
      this.retries(trys)
      gotoTestDatesScreen();
      var verificationText = page.getInnerHTML('body > ui-view > app > div > div > div > div > div > test-dates > div > div.m-t-lg.m-b-lg > h1');
      verificationText.txt.should.eventually.equal('Test Dates');
    })

    it('Edit Test Date modal is accessable', function(){
      this.retries(trys)
      gotoTestDatesScreen()
      .then(page.clickElement('body > ui-view > app > div > div > div > div > div > test-dates > div > div.ng-scope > table > tbody > tr:nth-child(1) > td.text-right > button'));
      var verificationText = page.getInnerHTML('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > test-date-edit-modal > div.modal-header > h2 > span:nth-child(3)');
      verificationText.txt.should.eventually.equal('Edit');
    })

    it('Add Test Date modal is accessable', function(){
      this.retries(trys)
      gotoTestDatesScreen()

      .then(page.clickElement('body > ui-view > app > div > div > div > div > div > test-dates > div > div.m-t-lg.m-b-lg > button'));
      var verificationText = page.getInnerHTML('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > test-date-edit-modal > div.modal-header > h2 > span:nth-child(2)');
      verificationText.txt.should.eventually.equal('Add');
    })

    var testDate = {};

    it('New test date can be created', function(){
      this.retries(trys)
      testDate = page.randomDate();
      gotoTestDatesScreen()
      .then(page.clickElement('body > ui-view > app > div > div > div > div > div > test-dates > div > div.m-t-lg.m-b-lg > button')) 
      .then(page.enterDate(testDate["numerical"],'/html/body/div[1]/div/div/test-date-edit-modal/div[2]/form/div/div[1]/div/div/input', "xpath"))
      .then(page.clickElement('/html/body/div[1]/div/div/test-date-edit-modal/div[1]/h2/span[1]',"xpath"))
      .then(page.clickElement('/html/body/div[1]/div/div/test-date-edit-modal/div[2]/form/div/div[2]/div/select/optgroup[1]/option[4]',"xpath"))
      .then(page.clickElement('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > test-date-edit-modal > div.modal-footer > button.btn.btn-primary > span'))
      var verificationText = page.getInnerHTML('#toast-container > div > div > div > div.toast-title');
      verificationText.txt.should.eventually.equal('Success');
    })

    it('Test date can be edited', function(){
      this.retries(trys)
      testDate = page.randomDate();
      gotoTestDatesScreen()
      .then(page.clickElement('body > ui-view > app > div > div > div > div > div > test-dates > div > div.ng-scope > table > tbody > tr:nth-child(1) > td.text-right > button'))
      .then(page.enterDate(testDate["numerical"],'/html/body/div[1]/div/div/test-date-edit-modal/div[2]/form/div/div[1]/div/div/input', "xpath"))
      .then(page.clickElement('/html/body/div[1]/div/div/test-date-edit-modal/div[1]/h2/span[2]',"xpath"))
      .then(page.clickElement('/html/body/div[1]/div/div/test-date-edit-modal/div[2]/form/div/div[2]/div/select/optgroup[1]/option[4]',"xpath"))
      .then(page.clickElement('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > test-date-edit-modal > div.modal-footer > button.btn.btn-primary > span'))
      var verificationText = page.getInnerHTML('#toast-container > div > div > div > div.toast-title');
      verificationText.txt.should.eventually.equal('Success');
    })

    it('test date can be deleted', function(){
      this.retries(trys)
      
      gotoTestDatesScreen()
      var verificationText = ''
      function getSecondLineDate(){
        verificationText = page.getInnerHTML('body > ui-view > app > div > div > div > div > div > test-dates > div > div.ng-scope > table > tbody > tr:nth-child(2) > td:nth-child(1) > a');
        return verificationText;
      }
      page.clickElement('body > ui-view > app > div > div > div > div > div > test-dates > div > div.ng-scope > table > tbody > tr:nth-child(1) > td.text-right > button')
      .then(page.clickElement('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > test-date-edit-modal > div.modal-footer > button.btn.btn-danger.pull-left.ng-scope'))
      .then(page.acceptAlert())

      var verificationText2 = page.getInnerHTML('#toast-container > div > div > div > div.toast-title');
      verificationText2.txt.should.eventually.equal('Success');
    })
  });
}

var Browserss = [
  'chrome',
  'firefox',
  'internet explorer'
  ];

if(Dev){
  var Browserss = [
  'chrome'
  ];
}

for (var i = Browserss.length - 1; i >= 0; i--) {
  tests(Browserss[i])
};