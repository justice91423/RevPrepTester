
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    assert =require('assert'),
    until = webdriver.until;

var { describe, it , after, before} = require('selenium-webdriver/testing');
// var Login = require('../lib/Login');
var Page = require('../lib/admin_main_page');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var should = chai.should();
var page;
chai.use(chaiAsPromised);

function tests(browser){
  describe('revprep app scenarios - '+browser, function(){
    this.timeout(50000);
    beforeEach(function(){
      page = new Page(browser);
      page.driver.manage().window().setPosition(0, 0);
      page.visit('https://enroll.rev-prep.com/login');
      page.loginAdmin();
    });
    afterEach(function(){
      // page.quit();
    });

    // it('Purchase button leads to purchase page', function(){
    //   page.dismissRingCentralModal().then((done)=>page.purchase('retail'));
    //   var cart = page.isCart()
    //   cart.txt.should.eventually.equal('Cart', 'This did not end on the Cart page');
    // })

    it('All the Admin sections', function(){
      page.dismissRingCentralModal();
      page.findEverything();


    })

    // it('User can NOT login with incorrect username and password', function(){
    //   var un = page.enterUsername('NOTjustice.sommer@revolutionprep.com');
    //   var pw = page.enterPassword('revprep123');
    //   page.clicklogin();
    //   var toastText = page.readToast();
    //   toastText.txt.should.eventually.equal('Invalid Login or password.', 'The propper error toast did not appear');
    //   // var loggedIn = page.isLoggedIn()
    // })
    // it('User can NOT login with blank username and password', function(){
    //   // var un = page.enterUsername('NOTjustice.sommer@revolutionprep.com');
    //   // var pw = page.enterPassword('revprep123');
    //   page.clicklogin();
    //   var toastText = page.readToast();
    //   toastText.txt.should.eventually.equal('Please fix the errors on the form.', 'The propper error toast did not appear');
    //   // var loggedIn = page.isLoggedIn()
    // })
  });
}

// var Browserss = ['chrome','firefox','internet explorer'];
  var Browserss = ['chrome'];
for (var i = Browserss.length - 1; i >= 0; i--) {
  tests(Browserss[i])
};

