
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
      this.timeout(90000);
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
        var criterias = {"Search":(firstName+" "+lastName)}
        // console.log('criteriaToTest[0] ',criteriaToTest[0])
        criterias[criteriaName]=findCriteria

        buyAndComeBack(firstName,lastName,hoursPurchased)
        .then(() => page.performSearchFamlies("THIS WAS WHERE THE NAME WAS",false,true,true,criterias))
        .then(() => sleep(2000))

        .then(() => page.getSearchResultsListings(firstName,lastName,"Parent"))
        .then((gotten) => assert.lengthOf(gotten, 1, "The customer ("+firstName+" "+lastName+") did NOT appear in the search results when the "+criteriaName+" criteria was set to include the number of hours the customer purchased ("+hoursPurchased+")"))

        .then(() => page.visit('https://admin.rev-prep.com/dashboard'))
        .then(() => page.clickAdvisorOption("family-search"))
        .then(() => sleep(2000))
        .then(() =>{ 
          criterias[criteriaName]=noFindCriteria
          page.performSearchFamlies("THIS WAS WHERE THE NAME WAS",false,true,true,criterias)
        })
        .then(() => sleep(2000))
        .then(() => page.getSearchResultsListings(firstName,lastName,"Parent"))
        .then((gotten) => assert.lengthOf(gotten, 0, "The customer ("+firstName+" "+lastName+") appeared in the search results when the "+criteriaName+" criteria was set to search for more hours than the customer purchased ("+hoursPurchased+")"))
        .then(() => done())
      });
    }

    // it('Search for a customer by hours left', function(done){
    //   this.retries(trys)

    //   var firstName = page.randomString(10,"alpha");
    //   var lastName = page.randomString(10,"alpha");
    //   var hoursPurchased = Math.floor(Math.random() * 100) + 20
      
    //   buyAndComeBack(firstName,lastName,hoursPurchased)
    //   .then(() => page.performSearchFamlies("THIS WAS WHERE THE NAME WAS",false,false,true,{"Search":(firstName+" "+lastName)}))
    //   .then(() => sleep(2000))

    //   .then(() => page.getSearchResultsListings(firstName,lastName,"Parent"))
    //   .then((gotten) => assert.lengthOf(gotten, 1, "The customer ("+firstName+" "+lastName+") did NOT appear in the search results when Customers criteria was checked"))

    //   .then(() => page.visit('https://admin.rev-prep.com/dashboard'))
    //   .then(() => page.clickAdvisorOption("family-search"))
    //   .then(() => sleep(2000))
    //   .then(() => page.performSearchFamlies("THIS WAS WHERE THE NAME WAS",false,true,false,{"Search":(firstName+" "+lastName)}))
    //   .then(() => page.getSearchResultsListings(firstName,lastName,"Parent"))
    //   .then((gotten) => assert.lengthOf(gotten, 0, "The customer ("+firstName+" "+lastName+") appeared in the search results when the Customer criteria was unchecked"))
    //   .then(() => done())
    // });


    var testableCriteria = [
      // "School Direct Referral",
      // "Non-School Referral",
      // "Parent Referral",
      // "Mock Exam",
      // "Internet Search",
      // "Initial School Contact",
      // "Parent Event",
      ["Revenue","<2080",">2080"],
      ["Age","<1",">1"],
      ["Hours Left","<21",">21"]
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

    for (var i = testableCriteria.length - 1; i >= 0; i--) {
      testCriteria(testableCriteria[i][0],testableCriteria[i][1],testableCriteria[i][2])
    }



  })
}

