var Dev = false
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    assert =require('assert'),
    until = webdriver.until;
var sleep = require('sleep-promise');
var { describe, it , after, before} = require('selenium-webdriver/testing');
// var Login = require('../lib/Login');
var Page = require('../lib/admin_dashboard');
var Page = require('../lib/admin_dashboard_coupons');
var Page = require('../lib/student_home_page');
// var cleanup = require('jsdom-global')();
// require('jsdom-global')();
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var should = chai.should();
var page;
chai.use(chaiAsPromised);
var trys = 2
if(Dev){
  var trys = 0
}

function tests(browser){
  describe('revprep app scenarios - '+browser, function(){
    this.timeout(120000);
    beforeEach(function(){
      page = new Page(browser);
      page.driver.manage().window().setPosition(0, 0);
      page.visit('https://admin.rev-prep.com/login');
      page.loginAdmin('justice.sommer@revolutionprep.com','revprep123');
    });
    afterEach(function(){
      if(Dev){
        return
      }
      page.quit();
    });

    function gotoCouponsScreen(){
      return page.clickElement('body > ui-view > app > div > div > div > left-nav > div > ul > li:nth-child(14) > a > span')

    }

    it('Coupons screen is accessable', function(){
      this.retries(trys)
      gotoCouponsScreen();
      var verificationText = page.getInnerHTML('body > ui-view > app > div > div > div > div > div > coupons > div.m-t-lg.m-b-lg > h1');
      verificationText.txt.should.eventually.equal('Coupons');
    })

    it('New Coupon modal is accessable', function(){
      this.retries(trys)
      gotoCouponsScreen()
      .then(page.clickElement('body > ui-view > app > div > div > div > div > div > coupons > div.m-t-lg.m-b-lg > button'));
      var verificationText = page.getInnerHTML('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > coupon-modal > div.modal-header > h2');
      verificationText.txt.should.eventually.equal('\n    <button type="button" class="close" ng-click="$ctrl.modalInstance.dismiss(\'cancel\')"><span aria-hidden="true">×</span></button>\n    New Coupon\n  ');
    })

    it('Edit Coupon modal is accessable', function(){
      this.retries(trys)
      gotoCouponsScreen()
      .then(page.clickElement('body > ui-view > app > div > div > div > div > div > coupons > div.m-b.m-t-md.ng-scope > table > tbody > tr:nth-child(1) > td:nth-child(9) > button'));
      var verificationText = page.getInnerHTML('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > coupon-modal > div.modal-header > h2');
      verificationText.txt.should.eventually.equal('\n    <button type="button" class="close" ng-click="$ctrl.modalInstance.dismiss(\'cancel\')"><span aria-hidden="true">×</span></button>\n    Edit Coupon\n  ');
    })

    var couponTestPerams = [
      {
          Name: 'Dollars off standard coupon can be created and used',
          Discount: 50,
          Dollars: true, 
          eachLineItem:false 
      }
      ,
      {
          Name: 'Percentage off standard coupon can be created and used',
          Discount: 50,
          Dollars: false, 
          eachLineItem:false
      }
      ,
      {
          Name: 'Apply to each Line Item coupon can be created and used',
          Discount: 50,
          Dollars: true, 
          eachLineItem:true
      }
    ]

    function startPurchaseApplyCoupon(couponCode){

      var ret = page.visit('https://enroll.rev-prep.com/cart/tutor-packages')

      .then(() => page.addMembershipToCart())
      .then(() => page.addAHabbitsToCart())
      .then(() => page.applyCouponToPurchase(couponCode))
      .then(() => sleep(500))
      return ret
    }

    function completePurchasefromCart(){
      var ret = page.proceedToAccountInfo()
      .then(() => page.fillOutAccountInfo())
      .then(() => page.proceedToPaymentInfo())
      .then(() => page.filloutPaymentInfo())
      .then(() => page.proceedToConfirmation())
      .then(() => page.filloutConfirmation())
      .then(() => page.completePurchase())
      .then(() => page.waitTillPurchaseComplete())
      return ret
    }

    function readError(){
      verificationText = page.getInnerHTML('body > ui-view > ui-view > main > div > div > div.col-md-4.side-panel > div > div:nth-child(2) > div > cart-items > div > div > div.m-t.ng-scope > div > span');
      return verificationText

    }
    function readTotal(){
      verificationText = page.getInnerHTML('body > ui-view > ui-view > main > div > div > div.col-md-4.side-panel > div > div:nth-child(2) > div > cart-items > div > div > div.cart__total.row > div > p > span.cart__total__amount.pull-right > strong');
      return verificationText
    }
     function readFirstCouponName(){
      verificationText = page.getInnerHTML('body > ui-view > app > div > div > div > div > div > coupons > div.m-b.m-t-md.ng-scope > table > tbody > tr:nth-child(1) > td:nth-child(1)');
      return verificationText
    }

    function useUpRedemptions(redemptions,couponCode,discountedPrice){
      for (var i = redemptions; i > 0; i--) {
        var ret = startPurchaseApplyCoupon(couponCode)
        .then(() => readTotal())
        .then((verificationText) => verificationText.txt.should.eventually.equal(discountedPrice))
        .then(() => completePurchasefromCart())
      }
      return ret
    }

    function getFinalPrice(eachLineItem,discount,dollars){
      var multiplyer = 1
      if(eachLineItem){
        multiplyer = 2
      }
      if(!dollars){
        var finalPrice = "$" + (198 - (multiplyer *(99 * (discount/100)))).toFixed(2)
      }else{
        var finalPrice = "$" + (198 - (multiplyer * discount))
      }
      console.log("finalPrice " +finalPrice) 
      return finalPrice
    }

    function couponTest (name,discount,dollars,redemptions=0,eachLineItem=false){
      it( name, function(){
        this.retries(trys)
        var experationDate = page.randomDate();
        var couponCode = page.makeCouponCode();
        var recurrence = 0;
        var finalPrice = getFinalPrice(eachLineItem,discount,dollars);
        gotoCouponsScreen()
        .then(() => page.createNewCoupon("Test",experationDate['numerical'],"Retail","catigory","description",discount,dollars,eachLineItem,"minAmount",recurrence,redemptions,"restrictedTo",couponCode))
        .then(() => sleep(500))
        .then(() => startPurchaseApplyCoupon(couponCode))
        .then(() => readTotal())
        .then((verificationText) => verificationText.txt.should.eventually.equal(finalPrice))

      })
    }

    for (var i = couponTestPerams.length - 1; i >= 0; i--) {
      couponTest (couponTestPerams[i]["Name"],couponTestPerams[i]["Discount"],couponTestPerams[i]["Dollars"],couponTestPerams[i]["redemptions"]);
    }

    it( "Coupons with limited redemptions works properly", function(){
        this.retries(trys)
        var discount = 40;
        var dollars  = true;
        var eachLineItem  = false;
        var recurrence = false;
        // var redemptions  = (Math.floor(Math.random() * 3) + 2)
        var redemptions  = 2;
        var experationDate = page.randomDate();
        var couponCode = page.makeCouponCode();
        var errorText = "\n          Coupon \'"+couponCode+"\' cannot be applied to this order\n        "
        // var finalPrice = "$99";
        // var discountedPrice = "$" + (99 - discount);
        // if(!dollars){
        //   finalPrice = "$" + ((198 * (discount/100)).toFixed(2));
        // }
        var finalPrice = getFinalPrice(eachLineItem,discount,dollars);

        gotoCouponsScreen()
        .then(() => page.createNewCoupon("Test",experationDate['numerical'],"Retail","catigory","description",discount,dollars,eachLineItem,"minAmount",recurrence,redemptions,"restrictedTo",couponCode))


        useUpRedemptions(redemptions,couponCode,finalPrice)
        .then(() => sleep(500))
        .then(() => startPurchaseApplyCoupon(couponCode))
        .then(() => readError())
        .then((verificationText) => verificationText.txt.should.eventually.equal(errorText))
        .then(() => readTotal())
        .then((verificationText) => verificationText.txt.should.eventually.equal("$198"))
      })

    it( "Coupon can be searched for by name", function(){
        this.retries(trys)
        var name  = "test " + page.makeCouponName()
        var recurrence = false;
        var discount = 40;
        var dollars  = true;
        var redemptions  = (Math.floor(Math.random() * 3) + 2)
        var experationDate = page.randomDate();
        var couponCode = page.makeCouponCode();
        var errorText = "\n          Coupon \'"+couponCode+"\' cannot be applied to this order\n        "
        var finalPrice = "$99";
        var discountedPrice = "$" + (99 - discount);
        if(!dollars){
          finalPrice = "$" + ((99 * (discount/100)).toFixed(2));
        }

        gotoCouponsScreen()
        .then(() => page.createNewCoupon(name,experationDate['numerical'],"Retail","catigory","description",discount,dollars,"eachLineItem","minAmount",recurrence,redemptions,"restrictedTo",couponCode))
        .then(() => page.visit('https://enroll.rev-prep.com/cart/tutor-packages'))
        .then(() => page.visit('https://admin.rev-prep.com/coupons'))
        .then(() => sleep(2500))
        .then(() => page.searchCoupons(false,false,name,false))
        .then(() => readFirstCouponName())
        .then((verificationText) => verificationText.txt.should.eventually.equal(name))
      })

    it( "Coupon can be searched for by couponCode", function(){
        this.retries(trys)
        var name  = "test " + page.makeCouponName()
        var discount = 40;
        var dollars  = true;
        var recurrence = false;
        var redemptions  = (Math.floor(Math.random() * 3) + 2)
        var experationDate = page.randomDate();
        var couponCode = page.makeCouponCode();
        var errorText = "\n          Coupon \'"+couponCode+"\' cannot be applied to this order\n        "
        var finalPrice = "$99";
        var discountedPrice = "$" + (99 - discount);
        if(!dollars){
          finalPrice = "$" + ((99 * (discount/100)).toFixed(2));
        }

        gotoCouponsScreen()
        .then(() => page.createNewCoupon(name,experationDate['numerical'],"Retail","catigory","description",discount,dollars,"eachLineItem","minAmount",recurrence,redemptions,"restrictedTo",couponCode))
        .then(() => page.visit('https://enroll.rev-prep.com/cart/tutor-packages'))
        .then(() => page.visit('https://admin.rev-prep.com/coupons'))
        .then(() => sleep(2500))
        .then(() => page.searchCoupons(false,false,false,couponCode))
        .then(() => readFirstCouponName())
        .then((verificationText) => verificationText.txt.should.eventually.equal(name))
      })

      it( "Coupons with Recurrence is applied to Membership", function(){
        this.retries(trys)
        var name  = "test " + page.makeCouponName()
        var discount = 40;
        var dollars  = true;
        var redemptions  = false;
        var recurrence  = 3;
        var experationDate = page.randomDate();
        var couponCode = page.makeCouponCode();
        var eachLineItem = false;
        var finalPrice = getFinalPrice(false,discount,dollars);
        var targetText = "Coupon: "+name+" ($"+discount+".00 off)\n          ";

        gotoCouponsScreen()
        .then(() => page.createNewCoupon(name,experationDate['numerical'],"Retail","catigory","description",discount,dollars,eachLineItem,"minAmount",recurrence,redemptions,"restrictedTo",couponCode))
        .then(() => sleep(500))
        .then(() => startPurchaseApplyCoupon(couponCode))
        .then(() => readTotal())
        .then((verificationText) => verificationText.txt.should.eventually.equal(finalPrice))
        .then(() => completePurchasefromCart())
        .then(() => page.getAppliedCoupon())
        .then((verificationText) => verificationText.txt.should.eventually.equal(targetText))
      })

  });
}

var Browserss = [
  'internet explorer',
  'firefox',
  'chrome'
  
  ];

if(Dev){
  var Browserss = [
  'chrome'
  ];
}

for (var i = Browserss.length - 1; i >= 0; i--) {
  tests(Browserss[i])
};