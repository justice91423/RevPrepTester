var Dev = 0
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    assert =require('assert'),
    until = webdriver.until;

var sleep = require('sleep-promise');

var { describe, it , after, before} = require('selenium-webdriver/testing');
// var Login = require('../lib/Login');
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
      page.visit('https://enroll.revolutionprep.com/login');
      page.loginAdmin('justicetestsommertest','revprep');
    });
    afterEach(function(){
      if(Dev){
        return
      }
      page.quit();
    });




    // it('The Welcome Modal appeared', function(){
    //   this.retries(trys)
    //   var welcomeText = page.getWelcomeModalText();
    //   welcomeText.txt.should.eventually.equal('Which classes are you currently taking in school?<br>This will help us customize your Revolution experience.');
    // })

    // it('The correct Math subjects appear on the Welcome Modal', function(){
    //   this.retries(trys)
    //   page.WelcomeModalIsComplete()
    //   .then(sleep(4000))
    //   .then(page.clickElement( "//*[contains(text(), 'Math')]", 'xpath'))

    //   var subjects = ['Algebra I', 'Middle School Math (6th & 7th Grade)', 'Pre-Algebra'];

    //   for (var i = 1; i < subjects.length + 1; i++) {
    //     checkSubject(subjects[(i-1)], i)
    //   }



    //   function checkSubject(name, place){
    //     var subjectText = page.getInnerHTML("//*[contains(text(), '"+name+"')]", 'xpath')

    //     if (name.includes('&')){
    //       name = name.replace("&", "&amp;");
    //     }
    //     subjectText.txt.should.eventually.equal(name);
    //   }
    // })


    // it('The Homework Help Modal appeared', function(){
    //   this.retries(trys)

    //   page.WelcomeModalIsComplete()
    //   .then(sleep(4000))
    //   .then(page.clickDoneWelcomeModal())

    //   var homeworkHelpModalText = page.getHomeworkHelpModalText();
    //   homeworkHelpModalText.txt.should.eventually.equal(" Now that you've selected your subjects, you'll see<br> live and upcoming Homework Help sessions on your dashboard:");
    // })

    // it('The Sign Up Now button works', function(){
    //   this.retries(trys)
    //   dismissModals()
    //   page.clickSignUpNowButton();
    //   var accountInfoText = page.getInnerHTML('body > ui-view > ui-view > main > div.block.block--gray.block--shadow > div > div > ul > li.ng-scope.completed.current.col-xs-4 > div > div.checkout-steps__label.ng-binding');
    //   accountInfoText.txt.should.eventually.equal('Account Info');
    // })







    it('The Homework Help tab is accesable', function(){
      this.retries(trys)
      // dismissModals()
      page.clickElement('#navbar > ul > li:nth-child(2) > a');
      var verificationText = page.getInnerHTML('body > ui-view > app > div.animated.fadeIn > div > div.view-container > div > ui-view > homework-help > div > div.col-md-7 > div.homework-help__header.m-t-md > h1');
      verificationText.txt.should.eventually.equal('\n            <strong>HOMEWORK</strong> HELP\n          ');
    })

    it('The Schedule tab is accesable', function(){
      this.retries(trys)
      // dismissModals()
      page.clickElement('#navbar > ul > li:nth-child(3) > a');
      var verificationText = page.getInnerHTML('#student-schedule > div > div.col-xs-5.col-sm-6 > h1');
      verificationText.txt.should.eventually.equal('Schedule');
    })

    it('The Home tab is accesable', function(){
      this.retries(trys)
      // dismissModals()
      page.clickElement('#navbar > ul > li:nth-child(2) > a')
      .then(page.clickElement('#navbar > ul > li:nth-child(1) > a'))
      var verificationText = page.getInnerHTML('body > ui-view > app > div > div > div.view-container > div > ui-view > home > div > div.row.home__header > div.col-xs-7.col-sm-8 > h1');
      verificationText.txt.should.eventually.equal('Hello Justicetest!');
    })

    it('The Exams tab is accesable', function(){
      this.retries(trys)
      // dismissModals()
      page.clickElement('#navbar > ul > li:nth-child(4) > a');
      var verificationText = page.getInnerHTML('body > ui-view > app > div > div > div.view-container > div > ui-view > div.row.ng-scope > div.col-sm-4 > h1');
      verificationText.txt.should.eventually.equal('Exams');
    })

     it('The Notification modal appeared', function(){
      this.retries(trys)
      // dismissModals()
      page.clickElement('#navbar > ul > li:nth-child(5) > a');
      var verificationText = page.getInnerHTML('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > div.modal-header.ng-scope > h2');
      verificationText.txt.should.eventually.contain('Notifications');
    })

    it('The Edit Profile modal is accessable', function(){
      this.retries(trys)
      // dismissModals()
      page.clickElement('#simple-dropdown')
      // .then(sleep(10000))
      .then(page.clickElement('#navbar > ul > li:nth-child(6) > div > ul > li:nth-child(1) > a'))
      var verificationText = page.getInnerHTML('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > edit-profile-modal > div.modal-body > form > div > div.col-sm-7 > div:nth-child(1) > label');
      verificationText.txt.should.eventually.equal('Name:');
    })

    it('The Add study area modal is accessable via the Schedule screen', function(){
      this.retries(trys)
      // dismissModals()
      page.clickElement('#navbar > ul > li:nth-child(3) > a')
      .then(page.clickElement('#student-schedule > student-schedule > div > div.col-sm-3.clearfix > study-areas > div > div:nth-child(3) > div.view-mode > a'))
      .then(page.clickElement('#student-schedule > student-schedule > div > div.col-sm-3.clearfix > study-areas > div > div:nth-child(3) > div.edit-mode > a.btn.btn-primary'))
      var verificationText = page.getInnerHTML('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > div:nth-child(3) > div.modal-body > form > div > div:nth-child(1) > label');
      verificationText.txt.should.eventually.equal('Subject:<span class="required"></span>');
    })

    it('The Subjects modal is accessable via the Homework Help screen', function(){
      this.retries(trys)
      // dismissModals()
      page.clickElement('#navbar > ul > li:nth-child(2) > a')
      .then(page.clickElement('body > ui-view > app > div > div > div.view-container > div > ui-view > homework-help > div > div.col-md-7 > div.homework-help__body > h2 > a > i'))
      var verificationText = page.getInnerHTML('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > study-area-edit-modal > div > div.study-area-edit-modal__header > p');
      verificationText.txt.should.eventually.equal('\n      Which classes are you currently taking in school?\n      This will help us customize your Revolution experience.\n    ');
    })

    it('The Homework Help info modal is accessable via the Homework Help screen', function(){
      this.retries(trys)
      // dismissModals()
      page.clickElement('#navbar > ul > li:nth-child(2) > a')
      .then(page.clickElement('body > ui-view > app > div.animated.fadeIn > div > div.view-container > div > ui-view > homework-help > div > div.col-md-4.col-md-offset-1 > homework-help-sidebar > div > div.card.homework-help-sidebar__limited.visible-md.visible-lg.ng-scope > a'))
      var verificationText = page.getInnerHTML('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > homework-help-info-modal > div > div.homework-help-info-modal__footer > p > strong');
      verificationText.txt.should.eventually.equal('(877) 836-1207');
    })


    it('Student can logout', function(){
      this.retries(trys)
      // dismissModals()
      page.clickElement('#simple-dropdown')
      .then(page.clickElement('#navbar > ul > li:nth-child(6) > div > ul > li:nth-child(2) > a'))
      var verificationText = page.getInnerHTML('body > ui-view > div > div:nth-child(1) > div:nth-child(2) > div > form > div:nth-child(1) > label');
      verificationText.txt.should.eventually.equal('Username');
    })


  });
}

function dismissModals(){
  
  page.WelcomeModalIsComplete()
  // .then(function() {console.log('part 1')})
  .then(sleep(5000))
  // .then(function() {console.log('part 2')})
  .then(page.clickDoneWelcomeModal())
  // .then(sleep(2000))
  .then(page.WhatisHomeworkHelpModalComplete())
  // .then(function() {console.log('part 3')})
  // .then(tryCSSText())
  .then(sleep(7000))
  // .then(function() {console.log('part 4')})
  .then(page.clickCloseWhatisHomeworkHelpModal())
  .then(sleep(9000))
  // .then(function() {console.log('part 5')});
};

function tryCSSText(){
  page.tryZWait('/html/body/div[2]')
// console.log("css " +css.txt)

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




// .then((stuff)=>clickSignUpNow())