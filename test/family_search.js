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
var Page = require('../lib/purchase');

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

function tests(browser){
  describe('Admin Dashboard Family Search scenarios - '+browser, function(){
    // this.timeout(20000);
    if(browser=='internet explorer'){
      this.timeout(90000);
    }else{
      this.timeout(90000);
    }
    
    beforeEach(function(){
      page = new Page(browser);
      page.driver.manage().window().setPosition(0, 0);
      page.driver.manage().window().setSize(1600,1200);
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

    function buyAndComeBack(firstName,lastName,hoursPurchased){
      return page.visit('https://enroll.rev-prep.com/cart/tutor-packages')
        .then(() => sleep(2000))
        .then(() => page.addPtHoursToCart("PSAT", "Advanced", 3, hoursPurchased, 99, true, true))
        .then(() => page.completePurchaseFromCart(firstName,lastName))
        .then(() => page.visit('https://admin.rev-prep.com/dashboard'))
        .then(() => page.clickAdvisorOption("family-search"))
        .then(() => sleep(2000))
    }

    function testCriteria(criteriaName,findCriteria,noFindCriteria){
      it('Search for a lead/customer by '+criteriaName+'.', function(done){
        this.retries(trys)

        var firstName = page.randomString(10,"alpha");
        var lastName = page.randomString(10,"alpha");
        var hoursPurchased = Math.floor(Math.random() * 100) + 20
        var hoursPurchased = 20
        var findableCriterias = {"Search":(firstName+" "+lastName)}
        var notFindableCriterias = {"Search":(firstName+" "+lastName)}
        findableCriterias[criteriaName]=findCriteria
        notFindableCriterias[criteriaName]=noFindCriteria

        buyAndComeBack(firstName,lastName,hoursPurchased)
        .then(() => page.performSearchFamlies("THIS WAS WHERE THE NAME WAS",false,true,true,findableCriterias))
        // page.performSearchFamlies("THIS WAS WHERE THE NAME WAS",false,true,true,criterias)
        .then(() => sleep(2000))

        .then(() => page.getSearchResultsListings(firstName,lastName,"Parent"))
        .then((gotten) => assert.lengthOf(gotten, 1, "The customer ("+firstName+" "+lastName+") did NOT appear in the search results when the "+criteriaName+" criteria was set to ("+findCriteria+")"))

        .then(() => page.visit('https://admin.rev-prep.com/dashboard'))
        .then(() => page.clickAdvisorOption("family-search"))
        .then(() => sleep(2000))
        .then(() =>{ 
          // criterias[criteriaName]=noFindCriteria
          page.performSearchFamlies("THIS WAS WHERE THE NAME WAS",false,true,true,notFindableCriterias)
        })
        .then(() => sleep(2000))
        .then(() => page.getSearchResultsListings(firstName,lastName,"Parent"))
        .then((gotten) => assert.lengthOf(gotten, 0, "The customer ("+firstName+" "+lastName+") appeared in the search results when the "+criteriaName+" criteria was set to ("+noFindCriteria+")"))
        .then(() => done())
      });
    }

    var testableCriteria = [
      ["Advisor","All Revolution","Unassigned"],
      ["Age","<1",">1"],
      ["Contact Attempts","Less than 4","1"],
      
      ["Contact List Reason","Not on Contact List","On Contact List"],
      ["Course ID","15817","26047"],
      // Costomer
      ["Grade","3rd Grade","2nd Grade"],
      // ["Home Estimate","2080","2080"],
      ["Hours Left","<21",">21"],
      // ["Last NPS","XXX","XXX"],
      ["Last Touch",">2","<2"],
      // ["Lead Source","XXX","XXXX],
      // Leads
      // ["No Follow-up","<21",">21"],
      ["Order Source","Admin Dashboard","Subscription Renewal"],
      // ["Private Tutor(s)","XXX","XXX"],
      ["Products","Membership","Group Course"],
      // ["Referral Revenue","<100",">100"],
      ["Revenue","<2080",">2080"]
      // ["School Type","XXX","XXX"]
      // ["Search","This is some text","also text"]
      // ["Source","Campaign","School Direct Referral"],
      // ["VIP","No","Yes"],
      // ["Web Sale","<2080",">2080"]

    ]

    // var testableCriteria = [
    //   ["Leads","Not Ready","All"]
    // ]

    for (var i = testableCriteria.length - 1; i >= 0; i--) {
      testCriteria(testableCriteria[i][0],testableCriteria[i][1],testableCriteria[i][2])
    }
  })
}

