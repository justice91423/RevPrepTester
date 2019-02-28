
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
var Page = require('../lib/admin_dashboard_new_lead_modal');
var Page = require('../lib/admin_dashboard_new_school_modal');
var Page = require('../lib/admin_dashboard_new_lead_source_modal');
var Page = require('../lib/admin_dashboard_CRM');
var Page = require('../lib/admin_dashboard_advisor_leads');
var Page = require('../lib/admin_dashboard_advisor_lead_sources');
var Page = require('../lib/student_home_page');
var Page = require('../lib/purchase');
// var chai = require('chai');
// var chaiAsPromised = require('chai-as-promised');
// var should = chai.should();
// var page;
// var sourceFile_credentials = require('../lib/credentials.js');
// var credentials = sourceFile_credentials.credentials_a;
var username = sourceFile_credentials.credentials_a['wonka_tester']['username']
var password = sourceFile_credentials.credentials_a['wonka_tester']['password']
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

var {transaction_reports_title_xpath} = require('../lib/admin_dashboard_transactions_reports_vars')



for (var i = Browserss.length - 1; i >= 0; i--) {
  tests(Browserss[i])
};


// function searchForLead(name){
//   return page.clickAdvisorOption("leads")
//   .then(() => page.clickShowAdvancedFiltersAdvisorLeads())
//   .then(() => page.enterFiltersAdvisorLeads(name))
//   .then(() => page.clickSearchButtonAdvisorLeads())
// }

// function searchForLeadSource(name){
//   return page.clickAdvisorOption("lead-sources")
//   .then(() => page.clickShowAdvancedFiltersAdvisorLeadSources())
//   .then(() => page.enterFiltersAdvisorLeadSources(name))
//   .then(() => page.clickSearchButtonAdvisorLeadSources())
// }

function tests(browser){
  describe('Admin Dashboard Create Button scenarios - '+browser, function(){
    // this.timeout(20000);
    if(browser=='internet explorer'){
      this.timeout(90000);
    }else{
      this.timeout(60000);
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


    it('Membership can be purchased and is charged properly', function(done){
      this.retries(trys)
      page.visit('https://enroll.rev-prep.com/cart/tutor-packages')
      .then(() => page.addMembershipToCart())
      .then(() => page.completePurchaseFromCart())
      .then((orderID) => page.visit('https://admin.rev-prep.com/orders/'+orderID))
      .then(() => page.getInnerHTML("//strong[preceding::strong[ contains(string(), 'Paid')]]",'xpath'))
      .then((verificationText) => (verificationText.txt.should.eventually.equal("-$99.00", "The user paid the wrong amount").notify(done)))
    });

    it('A+ Habits can be purchased and is charged properly', function(done){
      this.retries(trys)
      page.visit('https://enroll.rev-prep.com/cart/tutor-packages')
      .then(() => page.addAHabbitsToCart())
      .then(() => page.completePurchaseFromCart())
      .then((orderID) => page.visit('https://admin.rev-prep.com/orders/'+orderID))
      .then(() => page.getInnerHTML("//strong[preceding::strong[ contains(string(), 'Paid')]]",'xpath'))
      .then((verificationText) => (verificationText.txt.should.eventually.equal("-$99.00", "The user paid the wrong amount").notify(done)))
    });
   

  function testPackage(hours, membership, tier, custom){
    var preposition = "withOUT"
    var customInTitle = "Hour"
    if(membership){
      preposition = "WITH"
    }
    if(custom){
      customInTitle = "hour Custom"
    }

    it(hours+' '+customInTitle+' '+tier+' Private Tutoring package can be purchased '+preposition+' Membership and is charged properly', function(done){
      this.retries(trys)
      // var hours = 12
      // var membership = true
      // var tier = "Distinguished"
      // var custom = true

      switch (tier) {
      case "Advanced":
        var price = 129 - (30*membership);
        break;
      case "Distinguished":
        var price = 179 - (30*membership);
        break;
      case "Premium":
        var price = 229 - (30*membership);
        break;
      case "Global Elite":
          var price = 699 - (30*membership);
      }
      if(custom){
        var packagePrice = hours*price
      }else{
        var packagePrice = ((Math.ceil(hours*(price/100)))*100)-1
      }
      if(hours<12){
        var enrollmentFee = 250
      }else{
        var enrollmentFee = 0
      }
      
       
      var finalCost = packagePrice+(membership*99)+enrollmentFee

      // console.log("finalCost ",finalCost)

      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      })


      page.visit('https://enroll.rev-prep.com/cart/tutor-packages')
      .then(() => page.addPtHoursToCart("PSAT", tier, 3, hours, price, custom, membership))
      .then(() => page.completePurchaseFromCart())
      .then((orderID) => page.visit('https://admin.rev-prep.com/orders/'+orderID))
      .then(() => page.getInnerHTML("//strong[preceding::strong[ contains(string(), 'Paid')]]",'xpath'))
      .then((verificationText) => (verificationText.txt.should.eventually.equal("-"+formatter.format(finalCost), "The user was charged the wrong amount").notify(done)))
    });
 }



  var preDefinedPackageHours = [12,24,36,48,60,80,100]
  var tiers = ["Advanced","Distinguished","Premium","Global Elite"]

  
  for (var x = tiers.length - 1; x >= 0; x--) {
    for (var i = preDefinedPackageHours.length - 1; i >= 0; i--) {
      if(tiers[x] == "Global Elite"){continue}
      testPackage(preDefinedPackageHours[i], true, tiers[x], false)
      testPackage(preDefinedPackageHours[i], false, tiers[x], false)
    }
    testPackage(Math.floor(Math.random() * 11) + 1, true, tiers[x], true)
    testPackage(Math.floor(Math.random() * 100) + 11, true, tiers[x], true)
    testPackage(Math.floor(Math.random() * 11) + 1, false, tiers[x], true)
    testPackage(Math.floor(Math.random() * 100) + 11, false, tiers[x], true)  
  }

    // it('Private Tutoring can be purchased and is charged properly', function(done){
    //   this.retries(trys)
    //   var hours = 12
    //   var membership = true
    //   var tier = "Distinguished"
    //   var custom = true

    //   switch (tier) {
    //   case "Advanced":
    //     var price = 129 - (30*membership);
    //     break;
    //   case "Distinguished":
    //     var price = 179 - (30*membership);
    //     break;
    //   case "Premium":
    //     var price = 229 - (30*membership);
    //     break;
    //   case "Global Elite":
    //       var price = 699 - (30*membership);
    //   }
    //   if(custom){
    //     var packagePrice = hours*price
    //   }else{
    //     var packagePrice = ((Math.ceil(hours*(price/100)))*100)-1
    //   }
       
    //   var finalCost = packagePrice+(membership*99)

    //   console.log("finalCost ",finalCost)

    //   const formatter = new Intl.NumberFormat('en-US', {
    //     style: 'currency',
    //     currency: 'USD',
    //     minimumFractionDigits: 2
    //   })


    //   page.visit('https://enroll.rev-prep.com/cart/tutor-packages')
    //   .then(() => page.addPtHoursToCart("PSAT", "Distinguished", 3, hours, price, custom, membership))
    //   .then(() => page.completePurchaseFromCart())
    //   .then((orderID) => page.visit('https://admin.rev-prep.com/orders/'+orderID))
    //   .then(() => page.getInnerHTML("//strong[preceding::strong[ contains(string(), 'Paid')]]",'xpath'))
    //   .then((verificationText) => (verificationText.txt.should.eventually.equal("-"+formatter.format(finalCost), "The user paid the wrong amount").notify(done)))
      
    // });

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
    //     var verificationText = page.getInnerHTML('/html/body/ui-view/app/div/div/div/div/ui-view/crm-leads/div/crm-leads-results/div/div/div/table/tbody/tr/td[2]/a','xpath')
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

