
var {Dev,trys,adminBrowserss,Browserss,webdriver,sleep,describe,it,after,before,chai,chaiAsPromised,should,sourceFile_credentials,addContext} = require('../lib/top')

var Page = require('../lib/admin_dashboard');
var Page = require('../lib/admin_dashboard_new_lead_modal');
var Page = require('../lib/admin_dashboard_new_school_modal');
var Page = require('../lib/admin_dashboard_new_lead_source_modal');
var Page = require('../lib/admin_dashboard_CRM');
var Page = require('../lib/admin_dashboard_advisor_leads');
var Page = require('../lib/admin_dashboard_advisor_lead_sources');
var Page = require('../lib/admin_dashboard_advisor_family_search');
var Page = require('../lib/student_home_page');
var Page = require('../lib/tasks');

var username = sourceFile_credentials.credentials_a['wonka_tester']['username']
var password = sourceFile_credentials.credentials_a['wonka_tester']['password']
chai.use(chaiAsPromised);
var assert = chai.assert;

var famliesPageSelector = require('../lib/admin_dashboard_xpaths.js').famliesPageXpaths;

for (var i = adminBrowserss.length - 1; i >= 0; i--) {
  tests(adminBrowserss[i])
};

function searchForLead(name,status){
  return page.clickAdvisorOption("family-search")
  .then(() => page.clickShowAdvancedFiltersAdvisorLeads())
  .then(() => page.dismissToast())
  .then(() => sleep(5000))
  .then(() => page.enterFiltersAdvisorLeads(name,[status]))
  .then(() => page.clickSearchButtonAdvisorLeads())
}

function searchForLeadSource(name){
  return page.clickAdvisorOption("lead-sources")
  .then(() => page.clickShowAdvancedFiltersAdvisorLeadSources())
  .then(() => page.enterFiltersAdvisorLeadSources(name))
  .then(() => page.clickSearchButtonAdvisorLeadSources())
}

function tests(browser){
  describe('Admin Dashboard Create Button scenarios - '+browser, function(){
    // this.timeout(20000);
    if(browser=='internet explorer'){
      this.timeout(90000);
    }else{
      this.timeout(45000);
    }
    
    beforeEach(function(){
      page = new Page(browser);
      page.setWindowSizePosition();
      // page.driver.manage().window().setPosition(0, 0);
      // page.driver.manage().window().setSize(1600,1200);
      page.visit('https://admin.rev-prep.com/login');
      page.loginAdmin(username,password)
      .then(() => sleep(5000))
    });
    afterEach(function(){

      addContext(this, 'screenshots/'+this.currentTest.title.replace(/ /g,"_")+'.png');
      page.screenshot(this.currentTest.title.replace(/ /g,"_"))
      trys = page.adjustTrys(this.currentTest.state,trys)
      if(Dev){
        return
      }
      page.quit();
    });

    function createLeadTest(leadSourceType="Gift Card",status="Pre-Conversation"){
      it('Create a lead with Lead Source set to '+leadSourceType+' and status set to '+status+', and search for it', function(done){
        this.retries(trys)
        if(leadSourceType == "Seminar/Workshop" ){
          var courseID = page.getACourseID('Seminar')
        }else if (leadSourceType == "Parent Event"){
         var courseID = page.getACourseID('Parent Event')
        }else if (leadSourceType == "Mock Exam"){
         var courseID = page.getACourseID('Mock Exam')
        }else{
          var courseID = "nothing"
        }
        var firstName = page.randomString(10,"alpha");
        var lastName = page.randomString(10,"alpha");

        page.clickCreateOption(1)
        .then(() => page.fillNewLead(firstName,lastName,false,leadSourceType,courseID,status))
        .then(() => sleep(500))
        .then(() => page.clickCreateButtonNewLeadModal())
        .then(() => sleep(2000))
        .then(() => page.clickXtoCloseCRM())
        .then(() => sleep(500))
        .then(() => page.clickAdvisorOption("family-search"))
        .then(() => page.performSearchFamlies("THIS WAS WHERE THE NAME WAS",false,true,true,{"Search":(firstName+" "+lastName)}))
        .then(() => sleep(5000))
        .then(() => {
          var verificationText = page.getInnerHTML(famliesPageSelector.Listing(firstName,lastName,"Parent"),'xpath')
          verificationText.txt.should.eventually.include(firstName+" "+lastName, "The newly created Lead did not appear as the search result");
        })
        .then(() => {
          var verificationSourceText = page.getInnerHTML(famliesPageSelector.Listing(firstName,lastName,"Source"),'xpath')
          verificationSourceText.txt.should.eventually.equal(leadSourceType, "Lead had the wrong source").notify(done);
        });
      });
    };

    var leadSourceTypes = [
      "School Direct Referral",
      "Non-School Referral",
      "Parent Referral",
      "Mock Exam",
      "Internet Search",
      "School Contact",
      "Parent Event",
      "Seminar/Workshop",
      "Gift Card",
      "Non-Gift Card Offer"
    ]

    var leadSourceStatuses = [
      "Pre-Conversation",
      "In Conversation",
      "Not Ready",
      "Not Interested",
      "Could Not Reach",
      "Do Not Contact",
      "No Sales/Partner Contact"
    ]

    for (var i = leadSourceTypes.length - 1; i >= 0; i--) {
      createLeadTest(leadSourceTypes[i], "Pre-Conversation")
    }

    // for (var n = leadSourceStatuses.length - 1; n >= 0; n--) {
    //   createLeadTest("Gift Card", leadSourceStatuses[n])
    // }

    it('Create a lead with VIP', function(done){
      this.retries(trys)
      page.clickCreateOption(1)
      .then(() => page.fillNewLead())
      .then(() => page.toggleVIPNewLeadModal())
      .then(() => page.clickCreateButtonNewLeadModal())
      .then(() => sleep(5000))
      .then(() => page.getDiamonds())
      .then((diamonds) => assert.lengthOf(diamonds, 1, "The diamond did not appear properly"))
      .then(() => done())
    });

    it('Create a lead with a taken email', function(done){
      this.retries(trys)
      page.clickCreateOption(1)
      .then(() => page.fillNewLead( false, false,username, "", ""))
      .then(() => {
        var verificationText = page.getErrorTextNewLeadModal()
        verificationText.txt.should.eventually.include("This email is already taken!", "The error for using a taken email did not appear properly").notify(done);
      })
    });

    it('Create a lead with a student', function(done){
      this.retries(trys)
      var firstName = page.randomString(10,"alpha");
      var lastName = page.randomString(10,"alpha");
      var studentFirstName = page.randomString(10,"alpha");
      var studentLastName = page.randomString(10,"alpha");
      page.clickCreateOption(1)
      .then(() => page.fillNewLead(firstName,lastName))
      .then(() => page.clickAddStudentNewLeadModal())
      .then(() => page.fillStudentNewLeadModal(1,studentFirstName,studentLastName))
      .then(() => page.clickCreateButtonNewLeadModal())
      .then(() => sleep(5000))
      .then(() => page.getDiamonds())
      .then(() => {
        var studentVerificationText = page.getInnerHTML('/html/body/div[1]/div/div/parent-crm-modal/div/div[2]/div[1]/div[1]/div[1]/div/div/a','xpath')

        studentVerificationText.txt.should.eventually.include(studentFirstName+" "+studentLastName, "The students name ("+studentFirstName+" "+studentLastName+") did not appear properly")
      })
      .then(() => {
        var verificationText = page.getInnerHTML('/html/body/div[1]/div/div/parent-crm-modal/div/div[1]/div/h4/div/span[1]','xpath')
        verificationText.txt.should.eventually.include(firstName+" "+lastName, "The parents name ("+firstName+" "+lastName+") did not appear properly").notify(done);
      })
    });

    it('Create a lead with two students', function(done){
      this.retries(trys)
      var firstName = page.randomString(10,"alpha");
      var lastName = page.randomString(10,"alpha");
      var studentFirstName = page.randomString(10,"alpha");
      var studentLastName = page.randomString(10,"alpha");
      var student2FirstName = page.randomString(10,"alpha");
      var student2LastName = page.randomString(10,"alpha");
      page.clickCreateOption(1)
      .then(() => page.fillNewLead(firstName,lastName))
      .then(() => page.clickAddStudentNewLeadModal())
      .then(() => page.fillStudentNewLeadModal(1,studentFirstName,studentLastName))
      .then(() => page.clickAddStudentNewLeadModal())
      .then(() => page.fillStudentNewLeadModal(2,student2FirstName,student2LastName))
      .then(() => page.clickCreateButtonNewLeadModal())
      .then(() => sleep(5000))
      .then(() => page.getDiamonds())
      .then(() => {
        var studentVerificationText = page.getInnerHTML('/html/body/div[1]/div/div/parent-crm-modal/div/div[2]/div[1]/div[1]/div[1]/div/div/a','xpath')

        studentVerificationText.txt.should.eventually.include(studentFirstName+" "+studentLastName, "The students name ("+studentFirstName+" "+studentLastName+") did not appear properly")
      })
      .then(() => {
        var studentVerificationText = page.getInnerHTML('/html/body/div[1]/div/div/parent-crm-modal/div/div[2]/div[1]/div[1]/div[1]/div/div[2]/a','xpath')

        studentVerificationText.txt.should.eventually.include(student2FirstName+" "+student2LastName, "The students name ("+student2FirstName+" "+student2LastName+") did not appear properly")
      })
      .then(() => {
        var verificationText = page.getInnerHTML('/html/body/div[1]/div/div/parent-crm-modal/div/div[1]/div/h4/div/span[1]','xpath')
        verificationText.txt.should.eventually.include(firstName+" "+lastName, "The parents name ("+firstName+" "+lastName+") did not appear properly").notify(done);
      })
    });

    function createSchoolTest(category,type){
      it('Create a '+type+' '+category+' and search for it', function(done){
        this.retries(trys)
        var name = page.randomString(10,"alpha");

        page.clickCreateOption(2)
        .then(() => page.fillNewSchool(name,type,category))
        .then(() => page.clickCreateButtonNewSchoolModal())
        // this was set to 5000 from 500
        .then(() => sleep(500))
        .then(() => page.networkWait(1500))
        .then(() => searchForLeadSource(name))
        .then(() => sleep(3000))
        .then(() => {
          var verificationText = page.getInnerHTML('/html/body/ui-view/app/div/div/div/div/ui-view/crm-lead-sources/div/div[2]/crm-lead-sources-results/div/div/div/table/tbody/tr/td[2]/a','xpath')
          verificationText.txt.should.eventually.include(name, "The newly created school did not appear as the search result").notify(done);
        })
      });
    }

    var schoolCategories = ["Elementary School", "Middle School", "High School", "University", "Adult School"]
    var schoolTypes = ["Public", "Private", "Catholic", "Charter", "Boarding", "Lutheran", "Christian", "Home"]

    // var schoolCategories = ["Elementary School"]
    // var schoolTypes = ["Public"]

    for (var i = schoolCategories.length - 1; i >= 0; i--) {
      for (var x = schoolTypes.length - 1; x >= 0; x--) {
        createSchoolTest(schoolCategories[i],schoolTypes[x])
      }
    }
    function createLeadSourceTest(category){
      it('Create a lead source with category set to '+category+' and search for it', function(done){
        this.retries(trys)
        var name = page.randomString(10,"alpha");

        page.clickCreateOption(3)
        .then(() => page.fillNewLeadSource(name,category))
        .then(() => page.clickCreateButtonNewLeadSourceModal())
        .then(() => sleep(500))
        .then(() => searchForLeadSource(name))
        .then(() => sleep(5000))
        .then(() => {
          var verificationText = page.getInnerHTML('/html/body/ui-view/app/div/div/div/div/ui-view/crm-lead-sources/div/div[2]/crm-lead-sources-results/div/div/div/table/tbody/tr/td[2]/a','xpath')
          verificationText.txt.should.eventually.include(name, "The newly created Lead source did not appear as the search result");
        })
        .then(() => {
          var verificationCategoryText = page.getInnerHTML('/html/body/ui-view/app/div/div/div/div/ui-view/crm-lead-sources/div/div[2]/crm-lead-sources-results/div/div/div/table/tbody/tr/td[5]','xpath')
          verificationCategoryText.txt.should.eventually.equal(category, "Lead Source had the wrong category").notify(done);
        });
      });
    }

    var leadSourceCategories = ["Business", "Club/Organization","Revolution Affiliate", "Independent Counselor", "Library"]

    for (var y = leadSourceCategories.length - 1; y >= 0; y--) {
      createLeadSourceTest(leadSourceCategories[y])
    }

  })
}

