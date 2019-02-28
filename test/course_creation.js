var {Dev,trys,Browserss,webdriver,sleep,describe,it,after,before,chai,chaiAsPromised,should,sourceFile_credentials} = require('../lib/top')

var Page = require('../lib/admin_dashboard');
var Page = require('../lib/admin_session_editor_modal');
var Page = require('../lib/admin_dashboard_course');
var Page = require('../lib/admin_dashboard_new_lead_source_modal');
var Page = require('../lib/admin_dashboard_add_small_group_course_modal');
var Page = require('../lib/admin_dashboard_advisor_leads');
var Page = require('../lib/admin_dashboard_advisor_lead_sources');
var Page = require('../lib/admin_dashboard_course_search');
var Page = require('../lib/cart_SGC');

var username = sourceFile_credentials.credentials_a['wonka_tester']['username']
var password = sourceFile_credentials.credentials_a['wonka_tester']['password']

chai.use(chaiAsPromised);

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

    it('Course Search screen is accessible', function(done){
      this.retries(trys)
      page.clickNavBarItem( false,4,1)

      var verificationText = page.getInnerHTML('/html/body/ui-view/app/div/div/div/div/ui-view/ui-view/courses/div[1]/h1','xpath');
      verificationText.txt.should.eventually.equal('Course Search', "Could not reach Course Search screen").notify(done);
    });

    it('Add Small Group Course modal is accessible', function(done){
      this.retries(trys)
      page.clickNavBarItem( false,4,1)
      .then(() => sleep(2000))
      .then(() => page.clickNewCourseButton("Small Group Course"))
      .then(() => sleep(1000))
      .then(() => {
        var verificationText = page.getInnerHTML('/html/body/div[1]/div/div/courses-edit-modal/div[1]/h2','xpath');
        verificationText.txt.should.eventually.include('Small Group Course', "Could not reach Small Group Course Modal").notify(done);
      })
    });

    it('Create a Small Group Course', function(done){
      this.retries(trys)
      var coursePerams = {
        price:45,
        enrollmentCap:3,
        discountPrice:89,
        note:"these are some notes",
        leadSource:"Wilkins",
        dynamicSubject:false,
        subject:"GMAT",
        material:"Test Purchase Material",
        testDate:"2019 - Apr 13 ACT",
        segment:"Blue",
        grantManualAttendance:false,
        thirdParty:false
      }
      page.clickNavBarItem( false,4,1)
      .then(() => sleep(2000))
      .then(() => page.clickNewCourseButton("Small Group Course"))
      .then(() => sleep(1000))
      .then(() => page.fillAddSmallGroupCourseModal(coursePerams))
      .then(() => page.clickCreateButtonAddSmallGroupCourseModal())
        var verificationText = page.getInnerHTML('/html/body/ui-view/app/div/div/div/div/ui-view/ui-view/div[1]/div/div[1]/section/div[1]/h2/span','xpath');
        verificationText.txt.should.eventually.equal(coursePerams["subject"]+" "+coursePerams["segment"]+" "+"Small Group Course", "Could not create Small Group Course").notify(done); 
    });

    it('Add a session', function(done){
      this.retries(trys)
      var coursePerams = {
        price:45,
        enrollmentCap:3,
        discountPrice:89,
        note:"these are some notes",
        leadSource:"Wilkins",
        dynamicSubject:false,
        subject:"GMAT",
        material:"Test Purchase Material",
        testDate:"2019 - Apr 13 ACT",
        segment:"Blue",
        grantManualAttendance:false,
        thirdParty:false
      }

      var sessionsPerams = {
        type:"Online Exam",
        date: (page.randomDate())["numerical"],
        time:"7:45pm",
        duration:90,
        tutorsRequired:1,
        repeat:1
      }
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

        var verificationText = page.getInnerHTML('//*[@id="sessions_list"]/tbody/tr/td[2]/div','xpath');
        verificationText.txt.should.eventually.include(coursePerams["subject"]+" "+sessionsPerams["type"].split(" ")[sessionsPerams["type"].split(" ").length-1], "Could not add session").notify(done); 
    });

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
        date: (page.randomDate())['numerical'],
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

      var foundCourseID = null
      page.visit('https://enroll.rev-prep.com/cart/small-group-courses')
      .then(() => sleep(2000))
      .then(() => page.setSubject_CartSGC(coursePerams["subject"]))
      .then(() => page.clickSearchButton_CartSGC())
      .then(() => sleep(3000))
      .then(() => {
        console.log("courseID "+courseID)
        var verificationText = page.newGetHref('//a[@href="https://admin.rev-prep.com/courses/'+courseID+'"]','xpath')
        
        verificationText.should.eventually.equal('https://admin.rev-prep.com/courses/'+courseID, "SGC was not added to cart page").notify(done)
      })
    });

  })
}

