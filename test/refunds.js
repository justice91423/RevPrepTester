var {Dev,trys,adminBrowserss,Browserss,webdriver,sleep,describe,it,after,before,jquery,chai,chaiJquery,chaiAsPromised,should,sourceFile_credentials,addContext,testImageName} = require('../lib/top')

var By = webdriver.By
var assert = chai.assert

var Page = require('../lib/admin_dashboard');
var Page = require('../lib/admin_dashboard_new_lead_modal');
var Page = require('../lib/admin_dashboard_new_school_modal');
var Page = require('../lib/admin_dashboard_new_lead_source_modal');
var Page = require('../lib/admin_dashboard_CRM');
var Page = require('../lib/admin_dashboard_advisor_leads');
var Page = require('../lib/admin_dashboard_advisor_lead_sources');
var Page = require('../lib/student_home_page');
var Page = require('../lib/purchase');
var Page = require('../lib/admin_dashboard_orders');
var Page = require('../lib/admin_dashboard_refunds');

var username = sourceFile_credentials.credentials_a['wonka_tester']['username']
var password = sourceFile_credentials.credentials_a['wonka_tester']['password']
// var userFirstLastName = sourceFile_credentials.credentials_a['wonka_tester']['firstName']+" "+sourceFile_credentials.credentials_a['wonka_tester']['lastName']
chai.use(chaiAsPromised);

for (var i = adminBrowserss.length - 1; i >= 0; i--) {
  tests(adminBrowserss[i])
};

function tests(browser){
  describe('Admin Retail purchase scenarios - '+browser, function(){
    if(browser=='internet explorer'||browser=='firefox'){
      this.timeout(120000);
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

    it('Refund Request is submitted', function(done){
      this.retries(trys)
      page.visit('https://enroll.rev-prep.com/cart/tutor-packages')
      .then(() => page.addMembershipToCart())
      .then(() => page.completePurchaseFromCart())
      .then((orderID) => page.visit('https://admin.rev-prep.com/orders/'+orderID))
      .then(() => sleep(3000))
      .then(() => page.requestRefundOrdersPage())
      .then(() => sleep(1000))
      .then(() => page.getInnerHTML('//span[contains(., "RefundRequest") and contains(., "Pending")]','xpath'))
      .then((verificationText) => {
        console.log("im here")
        verificationText.txt.should.eventually.contain("RefundRequest", 'The "Pending RefundRequest" text did not appear').notify(done)}
        )
    });

    it('Refund Request is submitted and processed', function(done){

      this.retries(trys)
      var parentFirstName = page.randomString(10,"alpha");
      var parentLastName = page.randomString(10,"alpha");
      var studentFirstName = page.randomString(10,"alpha");
      var studentLastName = page.randomString(10,"alpha");
      var orderNumber =""
      page.purchaseMembership(parentFirstName,parentLastName,studentFirstName,studentLastName)
      .then((orderID) => {
        orderNumber = orderID
        page.visit('https://admin.rev-prep.com/orders/'+orderID)
      })
      .then(() => sleep(3000))
      .then(() => page.requestRefundOrdersPage())
      .then(() => page.visit('https://admin.rev-prep.com/refund-requests'))
      .then(() => sleep(1000))
      .then(() => page.enterFiltersRefunds(["Retail"],parentFirstName+" "+parentLastName, ))
      .then(() => page.clickSearchButtonRefund())
      .then(() => page.clickRequestedSorterRefund())
      .then(() => page.openRefundModalRefund(parentFirstName, parentLastName))
      .then(() => page.processOrDeleteRefund(true))
      .then(() => sleep(2000))
      .then((orderID) => page.visit('https://admin.rev-prep.com/orders/'+orderNumber))
      .then(() => page.getInnerHTML('/html/body/ui-view/app/div/div/div/div/ui-view/order-show/div/div[2]/div[1]/div[1]/div[3]/div[1]/span/span','xpath'))
      .then((verificationText) => (verificationText.txt.should.eventually.contain("Processed", 'The "Pending RefundRequest" text did not appear').notify(done)))
    });

    it('Refund Request is submitted and declined', function(done){

      this.retries(trys)
      var parentFirstName = page.randomString(10,"alpha");
      var parentLastName = page.randomString(10,"alpha");
      var studentFirstName = page.randomString(10,"alpha");
      var studentLastName = page.randomString(10,"alpha");
      var orderNumber =""
      page.purchaseMembership(parentFirstName,parentLastName,studentFirstName,studentLastName)
      .then((orderID) => {
        orderNumber = orderID
        page.visit('https://admin.rev-prep.com/orders/'+orderID)
      })
      .then(() => sleep(3000))
      .then(() => page.requestRefundOrdersPage())
      .then(() => page.visit('https://admin.rev-prep.com/refund-requests'))
      .then(() => sleep(1000))
      .then(() => page.enterFiltersRefunds(["Retail"],parentFirstName+" "+parentLastName, ))
      .then(() => page.clickSearchButtonRefund())
      .then(() => page.clickRequestedSorterRefund())
      .then(() => page.openRefundModalRefund(parentFirstName, parentLastName))
      .then(() => page.processOrDeleteRefund(false))
      .then(() => page.alertResponce())
      .then(() => sleep(2000))

      .then(() => page.driver.findElements(By.xpath('//a[contains(text(), "'+parentFirstName+' '+parentLastName+'")]')))
      .then((gotten) => assert.lengthOf(gotten, 0, "The refund was not deleted"))
      .then(done, done)
    });
  })
}

