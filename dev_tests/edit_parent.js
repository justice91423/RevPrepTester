
var {Dev,trys,adminBrowserss,Browserss,webdriver,sleep,describe,it,after,before,jquery,chai,chaiJquery,chaiAsPromised,should,sourceFile_credentials,addContext,testImageName} = require('../lib/top')

var Page = require('../lib/admin_dashboard');
var Page = require('../lib/admin_main_page');
var Page = require('../lib/admin_dashboard_coupons');
var Page = require('../lib/checkout_pages');
var Page = require('../lib/student_home_page');

var startingTrys = trys

var username = sourceFile_credentials.credentials_a['wonka_tester']['username']
var password = sourceFile_credentials.credentials_a['wonka_tester']['password']
chai.use(chaiAsPromised);

for (var i = adminBrowserss.length - 1; i >= 0; i--) {
  tests(adminBrowserss[i])
};

function tests(browser){
  describe('Edit parent scenarios - '+browser, function(){
    this.timeout(45000);
    // this.timeout(120000);
    beforeEach(function(){
      page = new Page(browser);
      page.driver.manage().window().setPosition(0, 0);
      page.driver.manage().window().setSize(1600,1080);
      page.visit('https://admin.rev-prep.com/login');
      page.loginAdmin(username,password)
      // page.dismissRingCentralModal()
      .then(() => sleep(1000));
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

   



    it('Create a lead', function(done){
      this.retries(trys)
      var firstName = page.randomString(10,"alpha");
      var lastName = page.randomString(10,"alpha");
      // var build = page.getBuild()

      page.clickCreateOption(1)
      .then(() => page.fillNewLead(firstName,lastName))
      .then(() => page.clickCreateButtonNewLeadModal())
      .then(() => sleep(500))

      var verificationText = page.getInnerHTML('/html/body/div[1]/div/div/parent-crm-modal/div/div[1]/div/h4/div/span[1]','xpath');

      verificationText.txt.should.eventually.equal(firstName+" "+lastName, "The Lead was not created properly").notify(done);
    });

  });
}

