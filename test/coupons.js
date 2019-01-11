if(process.env.dev){
    // env dev=true mocha test/;
  Dev = process.env.dev;
   console.log("This test suite is running in Development Mode")
}else{
  var Dev = false;
}
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    assert =require('assert'),
    until = webdriver.until;
var sleep = require('sleep-promise');
var { describe, it , after, before} = require('selenium-webdriver/testing');
var Page = require('../lib/admin_dashboard');
var Page = require('../lib/admin_main_page');
var Page = require('../lib/admin_dashboard_coupons');
var Page = require('../lib/checkout_pages');
var Page = require('../lib/student_home_page');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var should = chai.should();
var sourceFile_credentials = require('../lib/credentials.js');
var credentials = sourceFile_credentials.credentials_a;
var username = credentials['wonka_tester']['username']
var password = credentials['wonka_tester']['password']
var page;
chai.use(chaiAsPromised);

var trys = 2
if(Dev){
  var trys = 0
}
var Browserss = [
  // 'internet explorer',
  'firefox',
  'chrome'
  ];

if(Dev){
  var Browserss = [
  'chrome'
  ];
}

if(process.env.browser){
  var Browserss = [
    process.env.browser
  ];
  // env browser=chrome mocha test/;
  // https://stackoverflow.com/questions/16144455/mocha-tests-with-extra-options-or-parameters
}
for (var i = Browserss.length - 1; i >= 0; i--) {
  tests(Browserss[i])
};

function tests(browser){
  describe('Coupon scenarios - '+browser, function(){
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
      if(Dev){
        return
      }
      page.quit();
    });

    function startPurchaseApplyCoupon(couponCode){
      var ret = page.visit('https://enroll.rev-prep.com/cart/tutor-packages')
      // .then(() => page.find('//*[@id="hs-eu-confirmation-button"]').click)
      .then(() => sleep(500))
      .then(() => page.addMembershipToCart())
      .then(() => page.addAHabbitsToCart())
      .then(() => page.applyCouponToPurchase(couponCode))
      .then(() => sleep(500))
      return ret
    }

    function startPurchaseMembershipOnlyApplyCoupon(couponCode){
      var ret = page.visit('https://enroll.rev-prep.com/cart/tutor-packages')
      .then(() => page.addMembershipToCart())
      .then(() => page.applyCouponToPurchase(couponCode))
      .then(() => sleep(500))
      return ret
    }

    function startMembershipPurchaseApplyCoupon(couponCode){
      var ret = page.visit('https://enroll.rev-prep.com/cart/tutor-packages')
      .then(() => page.addMembershipToCart())
      .then(() => page.applyCouponToPurchase(couponCode))
      .then(() => sleep(500))
      return ret
    }

    function completePurchasefromCart(){
      page.debug("completePurchasefromCart")
      // .then(() => {var ret = page.proceedToAccountInfo()})
      var ret = page.proceedToAccountInfo()
      .then(() => page.fillOutAccountInfo())
      .then(() => sleep(200))
      .then(() => page.proceedToPaymentInfo())
      .then(() => page.filloutPaymentInfo())
      .then(() => page.proceedToConfirmation())
      .then(() => page.filloutConfirmation())
      .then(() => page.completePurchase())
      .then(() => page.waitTillPurchaseComplete())
      return ret
    }

    function useUpRedemptions(redemptions,couponCode,discountedPrice){
      page.debug("useUpRedemptions(redemptions "+redemptions+' , couponCode '+couponCode+' , discountedPrice '+discountedPrice)
      for (var i = redemptions; i > 0; i--) {
        var ret = startPurchaseApplyCoupon(couponCode)
        .then(() => page.readTotal())
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
      return finalPrice
    }

    function getFinalPriceMembershipOnly(eachLineItem,discount,dollars){
      var multiplyer = 1
      if(eachLineItem){
        multiplyer = 1
      }
      if(!dollars){
        var finalPrice = "$" + (99 - (multiplyer *(99 * (discount/100)))).toFixed(2)
      }else{
        var finalPrice = "$" + (99 - (multiplyer * discount))
      }
      return finalPrice
    }

    function couponTest (name,discount,dollars,redemptions=0,eachLineItem=false){
      it( name, function(done){
        this.retries(trys)
        var experationDate = page.randomDate();
        var couponCode = page.makeCouponCode();
        var recurrence = 0;
        var finalPrice = getFinalPrice(eachLineItem,discount,dollars);
        page.gotoCouponsScreen()
        // .then(() => sleep(1000))
        .then(() => page.createNewCoupon("Test",experationDate['numerical'],"Retail","catigory","description",discount,dollars,eachLineItem,"minAmount",recurrence,redemptions,"Any",couponCode))
        .then(() => sleep(500))
        .then(() => {
          // console.log('couponCode ',couponCode)
          startPurchaseApplyCoupon(couponCode)

        })
        .then(() => sleep(200))
        .then(() => page.readTotal())
        .then(function(verificationText) { 
          // var promise1 = Promise.resolve(verificationText.txt);
          // promise1.then(function(promise1,) {
            // verificationText.txt.should.eventually.equal(finalPrice, "The total equaled "+promise1+" instead of "+finalPrice)
            verificationText.txt.should.eventually.equal(finalPrice, "The total did not equal "+finalPrice+" using coupon code "+couponCode).notify(done)
          // })
        })
      })
    }

    function makeRandomString(Length,alphanumeric=false){
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      if(alphanumeric=="alpha"){
        possible = "abcdefghijklmnopqrstuvwxyz";
      };
      if(alphanumeric=="numeric"){
        possible = "0123456789";
      }

      for (var i = 0; i < Length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    }

    // it('Coupons screen is accessible', function(done){
    //   this.retries(trys)
    //   page.gotoCouponsScreen()
    //     var verificationText = page.getInnerHTML('body > ui-view > app > div > div > div > div > ui-view > coupons > div.my-4.d-flex.justify-content-between > h1');
    //     verificationText.txt.should.eventually.equal('Coupons').notify(done);    
    // })

    // it('New Coupon modal is accessible', function(done){
    //   this.retries(trys)
    //   page.gotoCouponsScreen()
    //   .then(() => page.clickNewCouponButton())
    //   var verificationText = page.getInnerHTML('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > coupon-modal > div.modal-header > h2');
    //   verificationText.txt.should.eventually.equal('\n    New Coupon\n  ').notify(done);
    // })

    // it('Edit Coupon modal is accessible', function(done){
    //   this.retries(trys)
    //   page.gotoCouponsScreen()
    //   .then(() => page.clickEditCouponButton())
    //   var verificationText = page.getInnerHTML('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > coupon-modal > div.modal-header > h2');
    //   verificationText.txt.should.eventually.equal('\n    Edit Coupon\n  ').notify(done);
    // })

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

    for (var i = couponTestPerams.length - 1; i >= 0; i--) {
      couponTest (couponTestPerams[i]["Name"],couponTestPerams[i]["Discount"],couponTestPerams[i]["Dollars"],couponTestPerams[i]["redemptions"],couponTestPerams[i]["eachLineItem"]);
    }
    this.timeout(120000);
    it( "Coupons with limited redemptions works properly", function(done){
        this.retries(trys)
        var discount = 40;
        var dollars  = true;
        var eachLineItem  = false;
        var recurrence = false;
        var redemptions  = 2;
        var experationDate = page.randomDate();
        var couponCode = page.makeCouponCode();
        var errorText = "\n          Coupon \'"+couponCode+"\' cannot be applied to this order\n        "
        var finalPrice = getFinalPrice(eachLineItem,discount,dollars);
        page.gotoCouponsScreen()
        .then(() => page.createNewCoupon("Test",experationDate['numerical'],"Retail","catigory","description",discount,dollars,eachLineItem,"minAmount",recurrence,redemptions,"Any",couponCode))
        .then(() => useUpRedemptions(redemptions,couponCode,finalPrice))
        .then(() => sleep(500))
        .then(() => startPurchaseApplyCoupon(couponCode))
        .then(() => sleep(2000))
        .then(() => page.readError())
        .then((verificationText) => verificationText.txt.should.eventually.equal(errorText))
        .then(() => page.readTotal())
        .then((verificationText) => verificationText.txt.should.eventually.equal("$198").notify(done))
      })
    this.timeout(30000);
    // it( "Coupon can be searched for by name", function(done){
    //     this.retries(trys)
    //     var name  = "test " + page.makeCouponName()
    //     var recurrence = false;
    //     var discount = 40;
    //     var dollars  = true;
    //     var redemptions  = (Math.floor(Math.random() * 3) + 2)
    //     var experationDate = page.randomDate();
    //     var couponCode = page.makeCouponCode();
    //     var errorText = "\n          Coupon \'"+couponCode+"\' cannot be applied to this order\n        "
    //     var finalPrice = "$99";
    //     var discountedPrice = "$" + (99 - discount);
    //     if(!dollars){
    //       finalPrice = "$" + ((99 * (discount/100)).toFixed(2));
    //     }
    //     page.gotoCouponsScreen()
    //     .then(() => page.createNewCoupon(name,experationDate['numerical'],"Retail","catigory","description",discount,dollars,"eachLineItem","minAmount",recurrence,redemptions,"Any",couponCode))
    //     .then(() => page.visit('https://admin.rev-prep.com/coupons'))
    //     .then(() => page.dismissRingCentralModal())
    //     .then(() => sleep(2500))
    //     .then(() => page.searchCoupons(false,false,name,false))
    //     .then(() => page.readFirstCouponName())
    //     .then((verificationText) => verificationText.txt.should.eventually.equal(name).notify(done))
    //   })

    // it( "Coupon can be searched for by couponCode", function(done){
    //     this.retries(trys)
    //     var name  = "test " + page.makeCouponName()
    //     var discount = 40;
    //     var dollars  = true;
    //     var recurrence = false;
    //     var redemptions  = (Math.floor(Math.random() * 3) + 2)
    //     var experationDate = page.randomDate();
    //     var couponCode = page.makeCouponCode();
    //     var errorText = "\n          Coupon \'"+couponCode+"\' cannot be applied to this order\n        "
    //     var finalPrice = "$99";
    //     var discountedPrice = "$" + (99 - discount);
    //     if(!dollars){
    //       finalPrice = "$" + ((99 * (discount/100)).toFixed(2));
    //     }
    //     page.gotoCouponsScreen()
    //     .then(() => page.createNewCoupon(name,experationDate['numerical'],"Retail","catigory","description",discount,dollars,"eachLineItem","minAmount",recurrence,redemptions,"Any",couponCode))
    //     .then(() => page.visit('https://admin.rev-prep.com/coupons'))
    //     .then(() => page.dismissRingCentralModal())
    //     .then(() => sleep(2500))
    //     .then(() => page.searchCoupons(false,false,false,couponCode))
    //     .then(() => page.readFirstCouponName())
    //     .then((verificationText) => verificationText.txt.should.eventually.equal(name).notify(done))
    //   })
    //   this.timeout(120000);
    //   it( "Coupons with Recurrence is applied to Membership", function(done){
    //     this.retries(trys)
    //     var name  = "test " + page.makeCouponName()
    //     var discount = 40;
    //     var dollars  = true;
    //     var redemptions  = false;
    //     var recurrence  = 3;
    //     var experationDate = page.randomDate();
    //     var couponCode = page.makeCouponCode();
    //     var eachLineItem = false;
    //     var finalPrice = getFinalPriceMembershipOnly(false,discount,dollars);
    //     var targetText = "Coupon: "+name+" ($"+discount+".00 off)\n            ";

    //     page.gotoCouponsScreen()
    //     .then(() => page.createNewCoupon(name,experationDate['numerical'],"Retail","catigory","description",discount,dollars,eachLineItem,"minAmount",recurrence,redemptions,"Any",couponCode))
    //     .then(() => sleep(500))
    //     .then(() => startPurchaseMembershipOnlyApplyCoupon(couponCode))
    //     .then(() => page.readTotal())
    //     .then((verificationText) => verificationText.txt.should.eventually.equal(finalPrice))
    //     .then(() => completePurchasefromCart())
    //     .then(() => page.dismissRingCentralModal())
    //     .then(() => sleep(500))
    //     .then(() => page.getAppliedCoupon())
    //     .then((verificationText) => verificationText.txt.should.eventually.equal(targetText).notify(done))
    //   })

    //   // function testRestrictedTo (name,restrictedTo,apply,price, couponName, discount, eachLineItem, recurrence, experationDate, couponCode, finalPrice){
    //   function testRestrictedTo (name,restrictedTo,applying,price, i){
    //     it( name, function(done){
    //       this.retries(trys)
    //       page.gotoCouponsScreen()
    //       .then(() => {
    //         couponName[i] = 'test_'+( makeRandomString(10,"alpha"));
    //         discount[i] = 40;
    //         dollars[i]  = true;
    //         eachLineItem[i]  = false;
    //         recurrence[i] = false;
    //         redemptions[i]  = 2;
    //         experationDate[i] = page.randomDate();
    //         couponCode[i] = page.makeCouponCode();
    //         finalPrice[i] = getFinalPrice(eachLineItem,discount,dollars); 
    //         errorText[i] = "\n          Coupon \'"+couponCode[i]+"\' cannot be applied to this order\n        ";
    //       })
    //       .then(() => page.createNewCoupon(couponName[i],experationDate[i]["numerical"],"Retail","catigory","description",discount[i],dollars[i],eachLineItem[i],"minAmount",recurrence[i],redemptions[i],restrictedTo,couponCode[i]))
    //       .then(() => {
    //         startMembershipPurchaseApplyCoupon(couponCode[i])
    //       })
    //       .then(() => sleep(500))
    //       .then(() => {
    //         if(!applying){
    //           sleep(100)
    //           .then(() => {
    //             readErrorVerificationText[i] = page.readError()
    //             readErrorVerificationText[i].txt.should.eventually.equal(errorText[i]).notify(done); 
    //           })
    //         }else{
    //           sleep(1000)
    //           .then(() => {
    //             readTotalVerificationText[i] = page.readTotal()
    //             readTotalVerificationText[i].txt.should.eventually.equal("$"+(price-discount[i]), "the total was not "+(price-discount[i]) ).notify(done);
    //           })
    //         }
    //       })
    //     });
    //   }

    // var restrictedToOptions = ["Any","Material","Shipping","Tutor Package" ,"Private Tutoring" ,"Semi-Private Tutoring" ,"Special Event" ,"Membership" ,"Group Course" ,"Small Group Course" ,"Value Group Course" ,"Collegewise" ,"Test Prep 101" ,"Independent College Counseling","Executive Functioning" ,"Homework Help" ,"Boot Camp" ,"GMAT" ,"Group Meetings" ,"1-on-1 Meetings" ,"Fee" ,"Workshop" ,"A+ Habits"]
    // // var restrictedToOptions = ["Boot Camp",  "Shipping","Membership","Any"]
    // // var restrictedToOptions = ["Membership","Any"]

    // var couponName = {}
    // var discount = {}
    // var dollars  = {}
    // var eachLineItem  = {}
    // var recurrence = {}
    // var redemptions  = {}
    // var experationDate = {}
    // var couponCode = {}
    // var finalPrice = {}
    // var errorText = {};
    // var readErrorVerificationText = {};
    // var readTotalVerificationText = {};

    // function testMembershipWithRestrictedToOptions(){
    //   for (var w = restrictedToOptions.length - 1; w >= 0; w--) {
    //     if(restrictedToOptions[w] == "Any" || restrictedToOptions[w] == "Membership"){
    //       var name = 'Coupon IS applied to Membership purchase when restricted to ' + restrictedToOptions[w];
    //       var apply = true
    //       // testRestrictedTo('Coupon IS applied to Membership purchase when restricted to ' + restrictedToOptions[i], restrictedToOptions[i], false, 99);
    //     }else{
    //       var name = 'Coupon is NOT applied to Membership purchase when restricted to ' + restrictedToOptions[w]
    //       var apply = false
    //       // testRestrictedTo('Coupon is NOT applied to Membership purchase when restricted to ' + restrictedToOptions[i], restrictedToOptions[i], true, 99);
    //     }
    //     // testRestrictedTo(name, restrictedToOptions[i], apply, 99, couponName, discount, eachLineItem, recurrence, experationDate, couponCode, finalPrice);
    //     testRestrictedTo(name, restrictedToOptions[w], apply, 99, w);
    //   }
    // }
    // this.timeout(30000);
    // testMembershipWithRestrictedToOptions();
  });
}

