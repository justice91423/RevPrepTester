
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
      addContext(this, 'screenshots/'+this.currentTest.title.replace(/ /g,"_")+'.png');
      page.screenshot(this.currentTest.title.replace(/ /g,"_"))
      trys = page.adjustTrys(this.currentTest.state,trys)
      if(Dev){
        return
      }
      page.quit();
    });

    function startPurchaseApplyCoupon(couponCode){
      var ret = page.visit('https://enroll.rev-prep.com/cart/tutor-packages')
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
          startPurchaseApplyCoupon(couponCode)
          .then(() => page.readTotal())
          .then((verificationText) => verificationText.txt.should.eventually.include(discountedPrice))
          .then(() => completePurchasefromCart())
        }
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

    function couponTest (name,discount,dollars,redemptions=0,eachLineItem=false,lineItemMin=false,finalPrice=false){
      it( name, function(done){
        this.retries(trys)
        var experationDate = page.randomDate();
        var couponCode = page.makeCouponCode();
        var recurrence = 0;
        if(finalPrice == false){
          finalPrice = getFinalPrice(eachLineItem,discount,dollars);
        }
        page.gotoCouponsScreen()
        .then(() => page.createNewCoupon("Test",experationDate['numerical'],"Retail","Gift Card","description",discount,dollars,eachLineItem,lineItemMin,recurrence,redemptions,"Any",couponCode))
        .then(() => sleep(500))
        .then(() => {
          startPurchaseApplyCoupon(couponCode)

        })
        .then(() => sleep(200))
        .then(() => page.readTotal())
        .then(function(verificationText) { 
            verificationText.txt.should.eventually.include(finalPrice, "The total did not equal "+finalPrice+" using coupon code "+couponCode).notify(done)
        })
      })
    }

    // couponTest('Coupon can NOT be applied if no items meet the "Line Item Min. Amount".',50,true,0,false,100,198);

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

    it('Coupons screen is accessible', function(done){
      this.retries(trys)
      page.gotoCouponsScreen()
        var verificationText = page.getInnerHTML('body > ui-view > app > div > div > div > div > ui-view > coupons > div.my-4.d-flex.justify-content-between > h1');
        verificationText.txt.should.eventually.equal('Coupons').notify(done);    
    })

    it('New Coupon modal is accessible', function(done){
      this.retries(trys)
      page.gotoCouponsScreen()
      .then(() => page.clickNewCouponButton())
      var verificationText = page.getInnerHTML('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > coupon-modal > div.modal-header > h2');
      verificationText.txt.should.eventually.equal('\n    New Coupon\n  ').notify(done);
    })

    it('Edit Coupon modal is accessible', function(done){
      this.retries(trys)
      page.gotoCouponsScreen()
      .then(() => page.clickEditCouponButton())
      var verificationText = page.getInnerHTML('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > coupon-modal > div.modal-header > h2');
      verificationText.txt.should.eventually.equal('\n    Edit Coupon\n  ').notify(done);
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
      var errorText = "Coupon \'"+couponCode+"\' cannot be applied to this order"
      var finalPrice = getFinalPrice(eachLineItem,discount,dollars);
      page.gotoCouponsScreen()
      .then(() => page.createNewCoupon("Test",experationDate['numerical'],"Retail","Gift Card","description",discount,dollars,eachLineItem,false,recurrence,redemptions,"Any",couponCode))
      .then(() => useUpRedemptions(redemptions,couponCode,finalPrice))
      .then(() => sleep(500))
      .then(() => startPurchaseApplyCoupon(couponCode))
      .then(() => sleep(2000))
      .then(() => page.readError())
      .then((verificationText) => verificationText.txt.should.eventually.include(errorText))
      .then(() => page.readTotal())
      .then((verificationText) => verificationText.txt.should.eventually.include("$198").notify(done))
    })
    
    this.timeout(45000);
    it( "Coupon can be searched for by name", function(done){
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
      page.gotoCouponsScreen()
      .then(() => page.createNewCoupon(name,experationDate['numerical'],"Retail","Gift Card","description",discount,dollars,"eachLineItem",false,recurrence,redemptions,"Any",couponCode))
      .then(() => page.visit('https://admin.rev-prep.com/coupons'))
      .then(() => page.dismissRingCentralModal())
      .then(() => sleep(2500))
      .then(() => page.searchCoupons(false,false,name,false))
      .then(() => sleep(1000))
      .then(() => page.readFirstCouponName())
      .then((verificationText) => verificationText.txt.should.eventually.equal(name).notify(done))
    })

    it( "Coupon can be searched for by couponCode", function(done){
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
      page.gotoCouponsScreen()
      .then(() => page.createNewCoupon(name,experationDate['numerical'],"Retail","Gift Card","description",discount,dollars,"eachLineItem",false,recurrence,redemptions,"Any",couponCode))
      .then(() => page.visit('https://admin.rev-prep.com/coupons'))
      .then(() => page.dismissRingCentralModal())
      .then(() => sleep(2500))
      .then(() => page.searchCoupons(false,false,false,couponCode))
      .then(() => page.readFirstCouponName())
      .then((verificationText) => verificationText.txt.should.eventually.equal(name).notify(done))
    })

    this.timeout(120000);
    it( "Coupons with Recurrence is applied to Membership", function(done){
      this.retries(trys)
      var name  = "test " + page.makeCouponName()
      var discount = 40;
      var dollars  = true;
      var redemptions  = false;
      var recurrence  = 3;
      var experationDate = page.randomDate();
      var couponCode = page.makeCouponCode();
      var eachLineItem = false;
      var finalPrice = getFinalPriceMembershipOnly(false,discount,dollars);
      var targetText = "Coupon: "+name+" ($"+discount+".00 off)\n            ";

      page.gotoCouponsScreen()
      .then(() => page.createNewCoupon(name,experationDate['numerical'],"Retail","Gift Card","description",discount,dollars,eachLineItem,false,recurrence,redemptions,"Any",couponCode))
      .then(() => sleep(500))
      .then(() => startPurchaseMembershipOnlyApplyCoupon(couponCode))
      .then(() => page.readTotal())
      .then((verificationText) => verificationText.txt.should.eventually.include(finalPrice))
      .then(() => completePurchasefromCart())
      .then(() => page.dismissRingCentralModal())
      .then(() => sleep(500))
      .then(() => page.getAppliedCoupon())
      .then((verificationText) => verificationText.txt.should.eventually.include(targetText).notify(done))
    })

    function testRestrictedTo (name,restrictedTo,applying,price, i){
      it( name, function(done){
        this.retries(trys)
        page.gotoCouponsScreen()
        .then(() => {
          couponName[i] = 'test_'+( makeRandomString(10,"alpha"));
          discount[i] = 40;
          dollars[i]  = true;
          eachLineItem[i]  = false;
          recurrence[i] = false;
          redemptions[i]  = 2;
          experationDate[i] = page.randomDate();
          couponCode[i] = page.makeCouponCode();
          finalPrice[i] = getFinalPrice(eachLineItem,discount,dollars); 
          errorText[i] = "Coupon \'"+couponCode[i]+"\' cannot be applied to this order";
        })
        .then(() => page.createNewCoupon(couponName[i],experationDate[i]["numerical"],"Retail","Gift Card","description",discount[i],dollars[i],eachLineItem[i],false,recurrence[i],redemptions[i],restrictedTo,couponCode[i]))
        .then(() => {
          startMembershipPurchaseApplyCoupon(couponCode[i])
        })
        .then(() => sleep(500))
        .then(() => {
          if(!applying){
            sleep(1000)
            .then(() => {
              readErrorVerificationText[i] = page.readError()
              readErrorVerificationText[i].txt.should.eventually.include(errorText[i]).notify(done); 
            })
          }else{
            sleep(1000)
            .then(() => {
              readTotalVerificationText[i] = page.readTotal()
              readTotalVerificationText[i].txt.should.eventually.include("$"+(price-discount[i]), "the total was not "+(price-discount[i]) ).notify(done);
            })
          }
        })
      });
    }

    var restrictedToOptions = ["Any","Material","Shipping","Tutor Package" ,"Private Tutoring" ,"Semi-Private Tutoring" ,"Special Event" ,"Membership" ,"Group Course" ,"Small Group Course" ,"Value Group Course" ,"Collegewise" ,"Test Prep 101" ,"Independent College Counseling","Executive Functioning" ,"Homework Help" ,"Boot Camp" ,"GMAT" ,"Group Meetings" ,"1-on-1 Meetings" ,"Fee" ,"Workshop" ,"A+ Habits"]
    // var restrictedToOptions = ["Boot Camp",  "Shipping","Membership","Any"]
    // var restrictedToOptions = ["Membership","Any"]

    var couponName = {}
    var discount = {}
    var dollars  = {}
    var eachLineItem  = {}
    var recurrence = {}
    var redemptions  = {}
    var experationDate = {}
    var couponCode = {}
    var finalPrice = {}
    var errorText = {};
    var readErrorVerificationText = {};
    var readTotalVerificationText = {};

    function testMembershipWithRestrictedToOptions(){
      for (var w = restrictedToOptions.length - 1; w >= 0; w--) {
        if(restrictedToOptions[w] == "Any" || restrictedToOptions[w] == "Membership"){
          var name = 'Coupon IS applied to Membership purchase when restricted to ' + restrictedToOptions[w];
          var apply = true
        }else{
          var name = 'Coupon is NOT applied to Membership purchase when restricted to ' + restrictedToOptions[w]
          var apply = false
        }
        testRestrictedTo(name, restrictedToOptions[w], apply, 99, w);
      }
    }
    this.timeout(45000);
    testMembershipWithRestrictedToOptions();
  });
}