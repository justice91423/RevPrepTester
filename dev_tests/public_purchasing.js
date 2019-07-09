var {Dev,trys,adminBrowserss,Browserss,webdriver,sleep,describe,it,after,before,jquery,chai,chaiJquery,chaiAsPromised,should,sourceFile_credentials,addContext,testImageName} = require('../lib/top')

var Page = require('../lib/admin_dashboard');
var Page = require('../lib/admin_dashboard_new_lead_modal');
var Page = require('../lib/admin_dashboard_new_school_modal');
var Page = require('../lib/admin_dashboard_new_lead_source_modal');
var Page = require('../lib/admin_dashboard_CRM');
var Page = require('../lib/admin_dashboard_advisor_leads');
var Page = require('../lib/admin_dashboard_advisor_lead_sources');
var Page = require('../lib/student_home_page');
var Page = require('../lib/purchase');
// var Page = require('../lib/public_magic_link_email.');

var username = sourceFile_credentials.credentials_a['wonka_tester']['username']
var password = sourceFile_credentials.credentials_a['wonka_tester']['password']
chai.use(chaiAsPromised);

for (var i = adminBrowserss.length - 1; i >= 0; i--) {
  tests(adminBrowserss[i])
};

function tests(browser){
  describe('Public purchase scenarios - '+browser, function(){
    if(browser=='internet explorer'||browser=='firefox'){
      this.timeout(120000);
    }else{
      this.timeout(60000);
    }
    
    beforeEach(function(){
      page = new Page(browser);
      page.driver.manage().window().setPosition(0, 0);
      page.driver.manage().window().setSize(1600,1080)
      // page.visit('https://admin.rev-prep.com/login');
      // page.loginAdmin(username,password)
      // .then(() => sleep(5000))
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

    it('Membership can be purchased and is charged properly', function(done){
      // page.debug(page.Akbar());
      // page.debug("testImageName "+testImageName)
      this.retries(trys)
      page.visit('https://enroll.rev-prep.com/checkout/add/Course-273')
      .then(() => sleep(2000))
      .then(() => page.enterMagicLinkEmail(false))
      .then(() => page.clickContinueButtonMagicLinkEmail())


      .then(() => page.fillOutAccountInfo())


      .then(() => page.proceedToPaymentInfo())
      .then(() => page.filloutPaymentInfo())
      .then(() => page.proceedToConfirmation())
      .then(() => page.filloutConfirmation())
      .then(() => page.completePurchase())

      .then(() => sleep(20000))

      // .then((orderID) => page.visit('https://admin.rev-prep.com/orders/'+orderID))
      .then(() => page.getInnerHTML("/html/body/ui-view/app/ui-view/main/div[2]/div/div[2]/div/div[2]/div/cart-items/div/div[2]/div[3]/p/span[2]",'xpath'))
      .then((verificationText) => (verificationText.txt.should.eventually.include("$99", "The user was not charged $99").notify(done)))
    });

 //    it('A+ Habits can be purchased and is charged properly', function(done){
 //      this.retries(trys)
 //      // testImageName = this.test.title.replace(/ /g,"_")
 //      page.visit('https://enroll.rev-prep.com/cart/tutor-packages')
      

 //      .then((orderID) => page.visit('https://admin.rev-prep.com/orders/'+orderID))
 //      .then(() => page.getInnerHTML("//strong[preceding::strong[ contains(string(), 'Paid')]]",'xpath'))
 //      .then((verificationText) => (verificationText.txt.should.eventually.equal("-$99.00", "The user was not charged $99").notify(done)))
 //    });
   
 //  function testPackage(hours, membership, tier, custom){
 //    var preposition = "withOUT"
 //    var customInTitle = "Hour"
 //    if(membership){
 //      preposition = "WITH"
 //    }
 //    if(custom){
 //      customInTitle = "hour Custom"
 //    }

 //    var enrollmentFeeText = ""
 //    if(hours<12){
 //      enrollmentFeeText = ", includes Enrollment Fee,"
 //    }
 //    var testName = hours+' '+customInTitle+' '+tier+' Private Tutoring package can be purchased '+preposition+' Membership'+enrollmentFeeText+' and is charged properly'
 //    it(testName, function(done){
 //      addContext(this, "Perimeters for this test are hours "+hours+", membership "+membership+", tier "+tier+", custom "+custom);
 //      testImageName = this.test.title.replace(/ /g,"_")
 //      this.retries(trys)

 //      var prices = {
 //        "Advanced":129,
 //        "Distinguished":179,
 //        "Premium":229,
 //        "Global Elite":699
 //      }
 //      var price = prices[tier] - (30*membership)

 //      // switch (tier) {
 //      // case "Advanced":
 //      //   var price = 129 - (30*membership);
 //      //   break;
 //      // case "Distinguished":
 //      //   var price = 179 - (30*membership);
 //      //   break;
 //      // case "Premium":
 //      //   var price = 229 - (30*membership);
 //      //   break;
 //      // case "Global Elite":
 //      //     var price = 699 - (30*membership);
 //      // }

 //      if(custom){
 //        var packagePrice = hours*price
 //      }else{
 //        // var packagePrice = ((Math.ceil(hours*(price/100)))*100)-1
 //        if(membership){
 //          var packagePrice = packagePrices[tier]["membership"][hours]
 //        }else{
 //          var packagePrice = packagePrices[tier]["noMembership"][hours]
 //        }
 //      }
 //      if(hours<12){
 //        var enrollmentFee = 250
 //      }else{
 //        var enrollmentFee = 0
 //      }
      
 //      var finalCost = packagePrice+(membership*99)+enrollmentFee
 //      const formatter = new Intl.NumberFormat('en-US', {
 //        style: 'currency',
 //        currency: 'USD',
 //        minimumFractionDigits: 2
 //      })

 //      page.visit('https://enroll.rev-prep.com/cart/tutor-packages')
 //      .then(() => page.addPtHoursToCart("PSAT", tier, 3, hours, price, custom, membership))
 //      .then(() => page.completePurchaseFromCart())
 //      .then((orderID) => page.visit('https://admin.rev-prep.com/orders/'+orderID))
 //      .then(() => page.getInnerHTML("//strong[preceding::strong[ contains(string(), 'Paid')]]",'xpath'))
 //      .then((verificationText) => (verificationText.txt.should.eventually.equal("-"+formatter.format(finalCost), "The user was not charged $"+finalCost).notify(done)))
 //    });
 // }

 //  // var preDefinedPackageHours = [12]
 //  // var tiers = ["Advanced"]
 //  var preDefinedPackageHours = [12,24,36,48,60,80,100]
 //  var tiers = ["Advanced","Distinguished","Premium","Global Elite"]
 //  var packagePrices = {
 //    Advanced:{
 //      membership:{12:1199,24:2399,36:3599,48:4798,60:5998,80:7999,100:9999},
 //      noMembership:{12:1599,24:3099,36:4699,48:6298,60:7798,80:10399,100:12999}
 //    },
 //    Distinguished:{
 //      membership:{12:1799,24:3599,36:5399,48:7198,60:8998,80:11999,100:14999},
 //      noMembership:{12:2199,24:4299,36:6499,48:8698,60:10798,80:14339,100:17999}
 //    },
 //    Premium:{
 //      membership:{12:2399,24:4799,36:7199,48:9598,60:11998,80:15999,100:19999},
 //      noMembership:{12:2799,24:5499,36:8299,48:11098,60:13798,80:18399,100:22999}
 //    }
 //  }

 //  for (var x = tiers.length - 1; x >= 0; x--) {
 //    for (var i = preDefinedPackageHours.length - 1; i >= 0; i--) {
 //      if(tiers[x] == "Global Elite"){continue}
 //      testPackage(preDefinedPackageHours[i], true, tiers[x], false)
 //      testPackage(preDefinedPackageHours[i], false, tiers[x], false)
 //    }
 //    testPackage(Math.floor(Math.random() * 11) + 1, true, tiers[x], true)
 //    testPackage(Math.floor(Math.random() * 100) + 11, true, tiers[x], true)
 //    testPackage(Math.floor(Math.random() * 11) + 1, false, tiers[x], true)
 //    testPackage(Math.floor(Math.random() * 100) + 11, false, tiers[x], true)  
 //  }
  })
}

