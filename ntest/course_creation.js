var {Dev,trys,Browserss,webdriver,sleep,describe,it,after,before,chai,chaiAsPromised,should,sourceFile_credentials} = require('../lib/top')


// if(process.env.dev){
//     // env dev=true mocha test/;
//   Dev = process.env.dev;
//    console.log("This test suite is running in Development Mode")
// }else{
//   var Dev = false;
// }

// var webdriver = require('selenium-webdriver'),
//     By = webdriver.By,
//     assert =require('assert'),
//     until = webdriver.until;
// var sleep = require('sleep-promise');
// var { describe, it , after, before} = require('selenium-webdriver/testing');
var Page = require('../lib/admin_dashboard');
var Page = require('../lib/admin_session_editor_modal');
var Page = require('../lib/admin_dashboard_course');
var Page = require('../lib/admin_dashboard_new_lead_source_modal');
var Page = require('../lib/admin_dashboard_add_small_group_course_modal');
var Page = require('../lib/admin_dashboard_advisor_leads');
var Page = require('../lib/admin_dashboard_advisor_lead_sources');
var Page = require('../lib/admin_dashboard_course_search');
var Page = require('../lib/cart_SGC');
// var chai = require('chai');
// var chaiAsPromised = require('chai-as-promised');
// var should = chai.should();
// var sourceFile_credentials = require('../lib/credentials.js');
// var credentials = sourceFile_credentials.credentials_a;
var username = sourceFile_credentials.credentials_a['wonka_tester']['username']
var password = sourceFile_credentials.credentials_a['wonka_tester']['password']
// var page;
chai.use(chaiAsPromised);
// var trys = 2
// if(Dev){
//   var trys = 0
// }

// var Browserss = [
//   // 'internet explorer',
//   'firefox',
//   'chrome'
//   ];

// if(Dev){
//   var Browserss = [
//   'chrome'
//   ];
// }

// if(process.env.browser){
//   var Browserss = [
//     process.env.browser
//   ];
//   // env KEY=YOUR_KEY mocha test/;
//   // https://stackoverflow.com/questions/16144455/mocha-tests-with-extra-options-or-parameters
// }

for (var i = Browserss.length - 1; i >= 0; i--) {
  tests(Browserss[i])
};



function tests(browser){
  describe('Course creation', function(){
    // this.timeout(20000);
    if(browser=='internet explorer'){
      this.timeout(90000);
    }else{
      this.timeout(55000);
    }
    
    beforeEach(function(){
      page = new Page(browser);
      page.driver.manage().window().setPosition(0, 0);
      page.driver.manage().window().setSize(1600,1080);
      page.visit('https://admin.rev-prep.com/login');
      page.loginAdmin(username,password)
      .then(() => sleep(5000))
    });
    afterEach(function(){
      if(Dev){
        return
      }
      page.quit();
    });

    // it('Course Search screen is accessible', function(done){
    //   this.retries(trys)
    //   page.clickNavBarItem( false,4,1)

    //   var verificationText = page.getInnerHTML('/html/body/ui-view/app/div/div/div/div/ui-view/ui-view/courses/div[1]/h1','xpath');
    //   verificationText.txt.should.eventually.equal('Course Searchh', "Could not reach Course Search screen").notify(done);
    // });

    // it('Add Small Group Course modal is accessible', function(done){
    //   this.retries(trys)
    //   page.clickNavBarItem( false,4,1)
    //   .then(() => sleep(2000))
    //   .then(() => page.clickNewCourseButton(13))
    //   .then(() => sleep(1000))
    //   .then(() => {
    //     var verificationText = page.getInnerHTML('/html/body/div[1]/div/div/courses-edit-modal/div[1]/h2','xpath');
    //     verificationText.txt.should.eventually.include('Small Group Course', "Could not reach Small Group Course Modal").notify(done);
    //   })
    // });

    // it('Create a Small Group Course', function(done){
    //   this.retries(trys)
    //   var coursePerams = {
    //     price:45,
    //     enrollmentCap:3,
    //     discountPrice:89,
    //     note:"these are some notes",
    //     leadSource:"Wilkins",
    //     dynamicSubject:false,
    //     subject:"GMAT",
    //     material:"Test Purchase Material",
    //     testDate:"2019 - Apr 13 ACT",
    //     segment:"Blue",
    //     grantManualAttendance:false,
    //     thirdParty:false
    //   }
    //   page.clickNavBarItem( false,4,1)
    //   .then(() => sleep(2000))
    //   .then(() => page.clickNewCourseButton(13))
    //   .then(() => sleep(1000))
    //   .then(() => page.fillAddSmallGroupCourseModal(coursePerams))
    //   .then(() => page.clickCreateButtonAddSmallGroupCourseModal())
    //     var verificationText = page.getInnerHTML('/html/body/ui-view/app/div/div/div/div/ui-view/ui-view/div[1]/div/div[1]/section/div[1]/h2/span','xpath');
    //     verificationText.txt.should.eventually.equal(coursePerams["subject"]+" "+coursePerams["segment"]+" "+"Small Group Course", "Could not create Small Group Course").notify(done); 
    // });

    // it('Add a session', function(done){
    //   this.retries(trys)
    //   var coursePerams = {
    //     price:45,
    //     enrollmentCap:3,
    //     discountPrice:89,
    //     note:"these are some notes",
    //     leadSource:"Wilkins",
    //     dynamicSubject:false,
    //     subject:"GMAT",
    //     material:"Test Purchase Material",
    //     testDate:"2019 - Apr 13 ACT",
    //     segment:"Blue",
    //     grantManualAttendance:false,
    //     thirdParty:false
    //   }
    //   var sessionsPerams = {
    //     type:"Online Exam",
    //     date:"01/25/2019",
    //     time:"7:45pm",
    //     duration:90,
    //     tutorsRequired:1,
    //     repeat:1
    //   }
    //   page.clickNavBarItem( false,4,1)
    //   .then(() => sleep(2000))
    //   // .then(() => page.clickNewCourseButton(13))
    //   .then(() => page.clickNewCourseButton("Small Group Course"))
    //   .then(() => sleep(1000))
    //   .then(() => page.fillAddSmallGroupCourseModal(coursePerams))
    //   .then(() => page.clickCreateButtonAddSmallGroupCourseModal())
    //   .then(() => page.clickAddSessionsButton())
    //   .then(() => page.fillSessionEditorModal(sessionsPerams))
    //   .then(() => page.clickAddSessionsButtonSessionEditorModal())
    //   .then(() => page.clickSaveButtonSessionEditorModal())

    //     var verificationText = page.getInnerHTML('//*[@id="sessions_list"]/tbody/tr/td[2]/div','xpath');
    //     verificationText.txt.should.eventually.include(coursePerams["subject"]+" "+sessionsPerams["type"].split(" ")[sessionsPerams["type"].split(" ").length-1], "Could not add session").notify(done); 
    // });

    it('Session appears on SGC Cart screen', function(done){
      this.retries(trys)
      var ranDate = page.randomDate()
      var coursePerams = {
        price:45,
        enrollmentCap:3,
        discountPrice:89,
        note:"these are some notes",
        leadSource:"Wilkins",
        dynamicSubject:false,
        subject:"Japanese with Listening (SAT Subject Test)",
        material:"Test Purchase Material",
        testDate:"2019 - Apr 13 ACT",
        segment:"Blue",
        grantManualAttendance:false,
        thirdParty:false
      }
      var sessionsPerams = {
        type:"Online Exam",
        date: ranDate['numerical'],
        // date:"01/25/2019",
        time:"7:45pm",
        duration:90,
        tutorsRequired:1,
        repeat:1
      }
      var courseID = ""
      page.clickNavBarItem( false,4,1)
      .then(() => sleep(2000))
      // .then(() => page.clickNewCourseButton(13))
      .then(() => page.clickNewCourseButton("Small Group Course"))
      .then(() => sleep(1000))
      .then(() => page.fillAddSmallGroupCourseModal(coursePerams))
      .then(() => page.clickCreateButtonAddSmallGroupCourseModal())
      .then(() => page.clickAddSessionsButton())
      .then(() => page.fillSessionEditorModal(sessionsPerams))
      .then(() => page.clickAddSessionsButtonSessionEditorModal())
      .then(() => page.clickSaveButtonSessionEditorModal())
      .then(() => sleep(2000))
      .then(() => page.clickPublishButton("Publish"))
      .then(() => sleep(500))
      .then(() => page.driver.getCurrentUrl())
      .then((url) => url.split("/")[4])
      .then((splitURL) => {
        courseID = splitURL
        // courseID = 6666
        return page.visit('https://enroll.rev-prep.com/cart/small-group-courses')
      })


      // var courseID = "23945"
      var foundCourseID = null
      page.visit('https://enroll.rev-prep.com/cart/small-group-courses')
      .then(() => sleep(2000))
      .then(() => page.setSubject_CartSGC(coursePerams["subject"]))
      .then(() => page.clickSearchButton_CartSGC())
      .then(() => sleep(3000))
      .then(() => {
        var verificationText = page.newGetHref('//a[@href="https://admin.rev-prep.com/courses/'+courseID+'"]','xpath')
        console.log("courseID "+courseID)

        verificationText.should.eventually.equal('https://admin.rev-prXep.com/courses/'+courseID, "SGC was not added to cart page").notify(done)
      })

      // .then(() => page.testThis())
      // .then((foundLink) => console.log("foundLink ",foundLink) 
      // .then((aTags) => {
      //   for (var i = aTags.length - 1; i >= 0; i--) {
      //     if(this.newGetHrefOfElement(aTags[i].split("https://admin.rev-prep.com/courses/")[1]) && this.newGetHrefOfElement(aTags[i].split("https://admin.rev-prep.com/courses/")[1]) == courseID){
      //       foundCourseID = true
      //       console.log("linkText ",linkText)
      //     }
      //   }
      // })

    
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

