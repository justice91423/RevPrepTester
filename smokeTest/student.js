var Dev = 1
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    assert =require('assert'),
    until = webdriver.until;

var sleep = require('sleep-promise');

var { describe, it , after, before} = require('selenium-webdriver/testing');
// var Login = require('../lib/Login');
var Page = require('../lib/student_home_page');
var sleep = require('sleep-promise');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var should = chai.should();
var page;
chai.use(chaiAsPromised);
var trys = 2
if(Dev){
  var trys = 2
}

function tests(browser){
  describe('revprep app scenarios - '+browser, function(){
    this.timeout(30000);
    beforeEach(function(){
      page = new Page(browser);
      page.driver.manage().window().setPosition(0, 0);
      page.driver.manage().window().setSize(1600,1080);
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
      page.clickElement('body > ui-view > app > div > navigation > nav > div > ul > li:nth-child(2) > a > span.ng-scope.ng-binding');
      var verificationText = page.getInnerHTML('body > ui-view > app > div > div > div.view-frame.animate-view > ui-view > homework-help > div > div.col-lg-7 > div.homework-help__header > h2 > span');
      verificationText.txt.should.eventually.equal('HELP');
    })

    it('The Schedule tab is accesable', function(){
      this.retries(trys)
      // dismissModals()
      page.clickElement('body > ui-view > app > div > navigation > nav > div > ul > li:nth-child(4) > a > span');
      var verificationText = page.getInnerHTML('#student-schedule > div > h1');
      verificationText.txt.should.eventually.equal('Schedule');
    })

    it('The Home tab is accesable', function(){
      this.retries(trys)
      function getHelloText(){
        var verificationText = page.getInnerHTML('body > ui-view > app > div > div > div.view-frame.animate-view > ui-view > home > div > div.d-flex.home__header.pb-4.mb-4 > h1 > span');
        verificationText.txt.should.eventually.equal('Hello');
      }
      function getScheduleText(){
          var ScheduleText = page.getInnerHTML('body > ui-view > app > div > div > div.view-frame.animate-view > ui-view > homework-help > div > div.col-lg-7 > div.homework-help__header > h2 > span');
          ScheduleText.txt.should.eventually.equal('HELP');
      }
      page.clickElement('body > ui-view > app > div > navigation > nav > div > ul > li:nth-child(2) > a > span')
      .then(() => getScheduleText())
      .then(() => sleep(2000))
      .then(() => page.clickElement('body > ui-view > app > div > navigation > nav > div > ul > li:nth-child(1) > a > span'))
      .then(() => getHelloText())
    })

    it('The Exams tab is accesable', function(){
      this.retries(trys)
      page.clickElement('body > ui-view > app > div > navigation > nav > div > ul > li:nth-child(5) > a > span');
      var verificationText = page.getInnerHTML('body > ui-view > app > div > div > div.view-frame.animate-view > ui-view > div.row.ng-scope > div.col-4 > h1');
      verificationText.txt.should.eventually.equal('Exams');
    })

     it('The Notification modal appeared', function(){
      this.retries(trys)
      // dismissModals()
      page.clickElement('body > ui-view > app > div > navigation > nav > div > ul > li:nth-child(6) > a > span');
      var verificationText = page.getInnerHTML('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > div > div.notifications-modal__header > h2');
      verificationText.txt.should.eventually.contain('Notifications');
    })

    it('The Edit Profile modal is accessable', function(){
      this.retries(trys)
      // dismissModals()
      page.clickElement('body > ui-view > app > div > navigation > nav > div > ul > li.my-sm-2.my-md-0.dropdown > a')
      // .then(sleep(10000))
      .then(page.clickElement('body > ui-view > app > div > navigation > nav > div > ul > li.my-sm-2.my-md-0.dropdown.open > div > a:nth-child(1)'))
      var verificationText = page.getInnerHTML('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > edit-profile-modal > div > form > div.col-7 > div:nth-child(1) > label');
      verificationText.txt.should.eventually.equal('Name:');
    })

    it('The Add study area modal is accessable via the Schedule screen', function(){
      this.retries(trys)
      // dismissModals()
      page.clickElement('body > ui-view > app > div > navigation > nav > div > ul > li:nth-child(4) > a > span')
      .then(page.clickElement('#student-schedule > student-schedule > div > div.col-sm-3.clearfix > study-areas > div > div > div.view-mode > button'))
      .then(() => sleep(500))
      .then(page.clickElement('#student-schedule > student-schedule > div > div.col-sm-3.clearfix > study-areas > div > div > div.edit-mode > button.btn.btn-primary.ng-scope.ng-binding'))
      var verificationText = page.getInnerHTML('/html/body/div[1]/div/div/study-areas-modal/div/div[1]/h1','xpath');
      verificationText.txt.should.eventually.equal('\n      Add\n      study area\n    ');
    })

    it('The Subjects modal is accessable via the Homework Help screen', function(){
      this.retries(trys)
      // dismissModals()
      page.clickElement('body > ui-view > app > div > navigation > nav > div > ul > li:nth-child(2) > a > span')
      .then(page.clickElement('body > ui-view > app > div > div > div.view-frame.animate-view > ui-view > homework-help > div > div.col-lg-7 > div.homework-help__body > button'))
      var verificationText = page.getInnerHTML('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > study-area-edit-modal > div > div.study-area-edit-modal__header.d-flex.flex-column > p');
      verificationText.txt.should.eventually.equal('\n      Which classes are you currently taking in school?\n      This will help us customize your Revolution experience.\n    ');
    })

    it('The Homework Help info modal is accessable via the Homework Help screen', function(){
      this.retries(trys)
      // dismissModals()
      page.clickElement('body > ui-view > app > div > navigation > nav > div > ul > li:nth-child(2) > a > span')
      .then(page.clickElement('body > ui-view > app > div > div > div.view-frame.animate-view > ui-view > homework-help > div > div.col-lg-4.offset-lg-1 > homework-help-sidebar > div > div.card.card-body.shadow.rounded.mb-4.homework-help-sidebar__limited.d-none.d-sm-none.d-md-none.d-lg-block.ng-scope > button'))
      var verificationText = page.getInnerHTML('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > homework-help-info-modal > div > div.homework-help-info-modal__footer > p > strong');
      verificationText.txt.should.eventually.equal('(877) 836-1207');
    })


    it('Student can logout', function(){
      this.retries(trys)
      // dismissModals()
      page.clickElement('body > ui-view > app > div > navigation > nav > div > ul > li.my-sm-2.my-md-0.dropdown > a')
      .then(page.clickElement('body > ui-view > app > div > navigation > nav > div > ul > li.my-sm-2.my-md-0.dropdown.open > div > a.dropdown-item.ng-scope.ng-binding'))
      var verificationText = page.getInnerHTML('body > ui-view > div.loginColumns.animated.fadeInDown.ng-scope > div > div:nth-child(2) > div > form > div.form-group.has-error > label');
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