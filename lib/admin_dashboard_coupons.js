var Page = require('../lib/base_page');
var sleep = require('sleep-promise');


Page.prototype.makeCouponCode = function(){
	var digits = Math.floor(Math.random() * 100000) + 1;
	var couponCode = ("TESTCODE_" + digits);
	return couponCode;
} 

Page.prototype.makeCouponName = function(){
var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
} 

Page.prototype.searchCoupons = function(status=false,catigory=false,name=false,code=false){
	var statusSelector = '/html/body/ui-view/app/div/div/div/div/ui-view/coupons/div[2]/div[1]/div[1]/select'
	var catigorySelector = '/html/body/ui-view/app/div/div/div/div/ui-view/coupons/div[2]/div[1]/div[2]/select'
	var nameSelector = '/html/body/ui-view/app/div/div/div/div/ui-view/coupons/div[2]/div[1]/div[3]/input'


	// /html/body/ui-view/app/div/div/div/div/ui-view/coupons/div[2]/div[1]/div[3]/input
	var codeSelector = '/html/body/ui-view/app/div/div/div/div/ui-view/coupons/div[2]/div[1]/div[4]/input'

		if(status){
			this.find(statusSelector,'xpath').click()
		}
		if(catigory){
			this.find(catigorySelector,'xpath').click()
		}
		if(name){
			this.find(nameSelector,'xpath').click()
			.then(() => this.find(nameSelector,'xpath').clear())
			.then(() => this.write(name,nameSelector,'xpath'))
		}
		if(code){
			this.find(codeSelector,'xpath').click()
			.then(() => this.find(codeSelector,'xpath').clear())
			.then(() => this.write(code,codeSelector,'xpath'))
		}

	var ret = sleep(1000)
	.then(() => this.find('/html/body/ui-view/app/div/div/div/div/ui-view/coupons/div[2]/div[2]/button[2]','xpath').click())
	.then(() => sleep(2000))
	return ret
} 

Page.prototype.createNewCoupon = function(name,date,department,catigory,description,discount,dollars,eachLineItem,minAmount,recurrence=0,redemptions=0,restrictedTo=2,code){
	var nameSelector = "body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > coupon-modal > div.modal-body > form > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div > input";
	var dateSelector = "body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > coupon-modal > div.modal-body > form > div:nth-child(1) > div:nth-child(2) > div > div > div > input";
	var departmentSelector = {Retail:'/html/body/div[1]/div/div/coupon-modal/div[2]/form/div[1]/div[1]/div[2]/div/select/option[2]',RevolutionLearning:'html/body/div[1]/div/div/coupon-modal/div[2]/form/div[1]/div[1]/div[2]/div/select/option[3]', K12:'/html/body/div[1]/div/div/coupon-modal/div[2]/form/div[1]/div[1]/div[2]/div/select/option[4]'}
	var catigorySelector = "/html/body/div[1]/div/div/coupon-modal/div[2]/form/div[1]/div[1]/div[3]/div/select/option[6]";
	var descriptionSelector = "body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > coupon-modal > div.modal-body > form > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div > textarea";
	var discountSelector = "/html/body/div[1]/div/div/coupon-modal/div[2]/form/div[2]/div[1]/div[1]/div[1]/input";
	// var restrictedToSelector = "/html/body/div[1]/div/div/coupon-modal/div[2]/form/div[3]/div/div/div/select/option[2]";
	var codeSelector = "/html/body/div[1]/div/div/manage-codes-modal/div[2]/form/div[2]/textarea";
	var dolPerSelector = '//*[@id="dollars"]';
	if(!dollars){
		// console.log("not dol " + dollars);
		dolPerSelector = '//*[@id="percentage"]';
	}
	var redemptionsToggleSelector = "/html/body/div[1]/div/div/coupon-modal/div[2]/form/div[2]/div[1]/div[3]/div/div/label[2]";
	var redemptionsSelector = "/html/body/div[1]/div/div/coupon-modal/div[2]/form/div[2]/div[1]/div[3]/div/div[2]/div/input";
	var eachLineItemSelector = "/html/body/div[1]/div/div/coupon-modal/div[2]/form/div[2]/div[2]/div[1]/div/div/label[2]";
	var RecurrenceToggleSelector = "/html/body/div[1]/div/div/coupon-modal/div[2]/form/div[2]/div[2]/div[2]/div/div/label[2]";
	var RecurrenceFieldSelector = "/html/body/div[1]/div/div/coupon-modal/div[2]/form/div[2]/div[2]/div[2]/div/div[2]/div/input";
	
	var restrictedToSelector = '/html/body/div[1]/div/div/coupon-modal/div[2]/form/div[3]/div/select/option[2]';


	// /html/body/div[1]/div/div/coupon-modal/div[2]/form/div[3]/div/div/div/select/option[2]

	// function ifeachLineItem(){
	// 	var ret = true
	// 	if(eachLineItem){
	// 		this.find(eachLineItemSelector).click()
	// 	}
	// 	return ret
	// }

	// function ifRecurrence(){
	// 	var ret = true
	// 	if(recurrence){
	// 		this.find(RecurrenceSelector).click()
	// 	}
	// 	return ret
	// }

	
	// console.log('before click')
	this.find('/html/body/ui-view/app/div/div/div/div/ui-view/coupons/div[1]/button','xpath').click()
	// .then(() => console.log('after click'))
	.then(() => this.find(nameSelector).click())
	.then(() => this.write(name,nameSelector))
	if(eachLineItem){
		this.find(eachLineItemSelector,'xpath').click()
	}
	if(recurrence){
		this.find(RecurrenceToggleSelector,'xpath').click()
		.then(() => this.write(recurrence,RecurrenceFieldSelector,'xpath'))
	}
	// .then(() => ifeachLineItem())
	// .then(() => ifeachLineItem())
	this.find(dateSelector).click()
	.then(() => this.find(dateSelector).clear())
	.then(() => this.write(date,dateSelector))
	// .then(() => sleep(10000))

	.then(() => this.find(departmentSelector[department],'xpath').click())
	.then(() => this.find(catigorySelector,'xpath').click())
	.then(() => this.find(descriptionSelector).click())
	.then(() => this.write(description,descriptionSelector))
	.then(() => this.find(discountSelector,'xpath').click())
	.then(() => this.write(discount,discountSelector,'xpath'))
	.then(() => this.find(dolPerSelector,'xpath').click())
	// .then(() => this.find(RestrictedToSelector,'xpath').click())
	if(redemptions){
		this.find(redemptionsToggleSelector,'xpath').click()
		.then(() => this.write(redemptions,redemptionsSelector,'xpath'))
	}
	this.find(restrictedToSelector,'xpath').click()
	// click the Create button
	.then(() => this.find('/html/body/div[1]/div/div/coupon-modal/div[3]/button', 'xpath').click())
	// .then(() => console.log("gunna sleep"))
	.then(() => sleep(1000))
	// .then(() => console.log("slept"))
	.then(() => this.write(code,codeSelector,'xpath'))
	 // click the Save Coupon Code button
	.then(() => this.find('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > manage-codes-modal > div.modal-footer > button.btn.btn-info > span').click())
	// .then(() => sleep(10000))
	// .then(() => this.find('/html/body/div[1]/div/div/manage-codes-modal/div[1]/button/span').click())
	// .then(() => console.log("gunna sleep2"))
    // .then(() => sleep(5000))
    // .then(() => console.log("slept2"))
	// .then(() => {this.find('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > manage-codes-modal > div.modal-footer > button.btn.btn-default').click()
	// 		// return code;
	// 	})
	 
} 

Page.prototype.startPurchase = function(){
	//Click retail purchase
	var ret = this.find('#new-purchase-btn').click()
	.then(() => this.find('#navbar > ul > li:nth-child(2) > span > div > ul > li:nth-child(2) > a').click())
	return ret 
}
Page.prototype.closeCouponModal = function(){
	//Click retail purchase
	var ret = this.find('/html/body/div[1]/div/div/manage-codes-modal/div[1]/button/span','xpath').click()
	return ret 
}
Page.prototype.addMembershipToCart= function(){
	//Click Membership
	this.find('body > ui-view > ui-view > main > div > div > div.col-md-8.col-lg-8 > ul > li:nth-child(4) > a').click()
	//Click Add to cart
	.then(() => this.find('body > ui-view > ui-view > main > div > div > div.col-md-8.col-lg-8 > ui-view > add-membership > div > div > div > div > button').click())
	.then(() => sleep(250))
}
Page.prototype.addAHabbitsToCart = function(){
	//Click A+ Habbits
	this.find('body > ui-view > ui-view > main > div > div > div.col-md-8.col-lg-8 > ul > li:nth-child(5) > a').click()
	//Click Add
	.then(() => this.find('body > ui-view > ui-view > main > div > div > div.col-md-8.col-lg-8 > ui-view > cart-course-search > div > div.ng-scope > div:nth-child(2) > table > tbody > tr:nth-child(1) > td.text-right > div > button').click())
	.then(() => this.find('/html/body/ui-view/ui-view/main/div/div/div[1]/ui-view/cart-course-search/div/div[2]/div[2]/table/tbody/tr[1]/td[5]/div/ul/li[2]/a','xpath').click())
	.then(() => sleep(10000))
}

Page.prototype.applyCouponToPurchase = function(couponCode){
	var couponCodeFieldSelector = "body > ui-view > ui-view > main > div > div > div.col-md-4.side-panel > div > div:nth-child(2) > div > cart-items > div > div > div.m-t.ng-scope > div > div > input";

	this.find('body > ui-view > ui-view > main > div > div > div.col-md-4.side-panel > div > div:nth-child(2) > div > cart-items > div > div > div.m-t.ng-scope > a:nth-child(2)').click()
	.then(() => this.find(couponCodeFieldSelector).click())
	.then(() => this.write(couponCode,couponCodeFieldSelector))
	//Click Apply button
	.then(() => this.find('body > ui-view > ui-view > main > div > div > div.col-md-4.side-panel > div > div:nth-child(2) > div > cart-items > div > div > div.m-t.ng-scope > div > div > span > button').click());
} 

Page.prototype.addPrivateTutoringToCart = function(subject,tier,hourPerWeek,package,hours){
	//Click Private Tutoring
	this.find('body > ui-view > ui-view > main > div > div > div.col-md-8.col-lg-8 > ul > li.ng-scope.active > a').click()
	//Set Subject
	.then(() => this.find('body > ui-view > ui-view > main > div > div > div.col-md-8.col-lg-8 > ui-view > tutor-package-builder > form > div > div:nth-child(1) > div:nth-child(1) > div > select > optgroup:nth-child(1) > option:nth-child(1)').click())
	//Set Tier
	.then(() => this.find('body > ui-view > ui-view > main > div > div > div.col-md-8.col-lg-8 > ui-view > tutor-package-builder > form > div > div:nth-child(2) > div:nth-child(1) > div > select > option:nth-child(1)').click())
	//Set Hours Per Week
	.then(() => this.find("body > ui-view > ui-view > main > div > div > div.col-md-8.col-lg-8 > ui-view > tutor-package-builder > form > div > div:nth-child(2) > div:nth-child(2) > div > div > input").click())
	.then(() => this.write(hourPerWeek,"body > ui-view > ui-view > main > div > div > div.col-md-8.col-lg-8 > ui-view > tutor-package-builder > form > div > div:nth-child(2) > div:nth-child(2) > div > div > input"))


	// HERE will be code to deal with different amounts of hours and INCLUDE MEMEBERSHIP



	//Click Staff Later
	.then(() => this.find('body > ui-view > ui-view > main > div > div > div.col-md-8.col-lg-8 > ui-view > tutor-package-builder > form > div > tutor-select > div > div.row.ng-scope > div > div > button.btn.btn-default').click());
}

Page.prototype.proceedToAccountInfo = function(){
	var ret = this.find('body > ui-view > ui-view > main > div > div > div.col-md-4.side-panel > div > div:nth-child(2) > a').click()
	.then(() => sleep(2000));

	return ret
}

Page.prototype.fillOutAccountInfo = function(){
	var ranEmail = "test" + (Math.floor(Math.random() * 1000000) + 1) + "@gmail.com";
	var ranphone = (Math.floor(Math.random() * 1000000000000) + 1);

	//enter parent first name
	this.find("/html/body/ui-view/ui-view/main/div[2]/div/div[1]/form/ui-view/fieldset[1]/div[1]/div[1]/input",'xpath').click()
	.then(() => this.write("testparentfirstname","/html/body/ui-view/ui-view/main/div[2]/div/div[1]/form/ui-view/fieldset[1]/div[1]/div[1]/input",'xpath'))
	//enter parent last name
	.then(() => this.find("body > ui-view > ui-view > main > div.container > div > div.col-md-8.col-lg-7 > form > ui-view > fieldset:nth-child(3) > div:nth-child(2) > div:nth-child(2) > input").click())
	.then(() => this.write("testparentlastname","body > ui-view > ui-view > main > div.container > div > div.col-md-8.col-lg-7 > form > ui-view > fieldset:nth-child(3) > div:nth-child(2) > div:nth-child(2) > input"))
	//enter parent email
	.then(() => this.find("/html/body/ui-view/ui-view/main/div[2]/div/div[1]/form/ui-view/fieldset[1]/div[2]/div[1]/div[1]/input",'xpath').click())
	.then(() => this.write(ranEmail,"/html/body/ui-view/ui-view/main/div[2]/div/div[1]/form/ui-view/fieldset[1]/div[2]/div[1]/div[1]/input",'xpath'))
	//enter parent phone
	.then(() => this.find("body > ui-view > ui-view > main > div.container > div > div.col-md-8.col-lg-7 > form > ui-view > fieldset:nth-child(3) > div:nth-child(3) > div:nth-child(2) > international-phone > div > div.input-group > input").click())
	.then(() => this.write(ranphone,"body > ui-view > ui-view > main > div.container > div > div.col-md-8.col-lg-7 > form > ui-view > fieldset:nth-child(3) > div:nth-child(3) > div:nth-child(2) > international-phone > div > div.input-group > input"))
	//address... FUCK!!!!!!!!!!!!!!!!!!!!!!!!
	.then(() => this.find("#google_place").click())
	.then(() => this.write(457,"#google_place"))
	.then(() => sleep(2000))
	.then(() => this.write("DOWN","#google_place"))
	.then(() => this.write("RETURN","#google_place"))
	//enter student first name
	.then(() => this.find("/html/body/ui-view/ui-view/main/div[2]/div/div[1]/form/ui-view/fieldset[3]/div[1]/div[1]/input",'xpath').click())
	.then(() => this.write("teststudentfirstname","/html/body/ui-view/ui-view/main/div[2]/div/div[1]/form/ui-view/fieldset[3]/div[1]/div[1]/input",'xpath'))
	//enter student last name
	.then(() => this.find("/html/body/ui-view/ui-view/main/div[2]/div/div[1]/form/ui-view/fieldset[3]/div[1]/div[2]/input","xpath").click())
	.then(() => this.write("teststudentlastname","/html/body/ui-view/ui-view/main/div[2]/div/div[1]/form/ui-view/fieldset[3]/div[1]/div[2]/input","xpath"))
	//enter student grade
	// .then(() => this.find('#grade').click())
	.then(() => sleep(200))
	// .then(() => console.log("Browsersssadasdsd"))
	// .then(() => console.log("browser "+Browserss))
	.then(() => {
		// if(browser=='chrome'){
			this.find('//*[@id="grade"]',"xpath").click()
			.then(() => this.write("DOWN","#grade"))
			.then(() => this.write("DOWN","#grade"))
			.then(() => this.write("DOWN","#grade"))
			.then(() => this.write("DOWN","#grade"))
			.then(() => this.write("DOWN","#grade"))
			.then(() => this.write("DOWN","#grade"))
			.then(() => this.write("DOWN","#grade"))
			.then(() => this.write("DOWN","#grade"))
			.then(() => this.write("DOWN","#grade"))
			.then(() => this.write("DOWN","#grade"))
			.then(() => this.write("DOWN","#grade"))
			.then(() => this.write("DOWN","#grade"))
			.then(() => this.write("RETURN","#grade"));
		// }else{
		// 	this.find('//*[@id="grade"]',"xpath").click()
		// 	.then(() => this.find('//*[@id="grade"]/option[15]',"xpath").click())
		// 	.then(() => this.write("RETURN","#grade"));
		// }
	})
}

Page.prototype.proceedToPaymentInfo = function(){
	// console.log("proceedToPaymentInfo")
	 // this.scroll('/html/body/ui-view/ui-view/main/div[2]/div/div[1]/form/ui-view/div/div/button');
	this.find('/html/body/ui-view/ui-view/main/div[2]/div/div[1]/form/ui-view/div/div/button','xpath').click()
	.then(() => sleep(2000))
}

Page.prototype.filloutPaymentInfo = function(){
	//CC number
	this.find('//*[@id="card_number"]','xpath').click()
	.then(() => this.write("4111111111111111",'//*[@id="card_number"]','xpath'))
	//CC name
	.then(() => this.find('/html/body/ui-view/ui-view/main/div[2]/div/div[1]/form/ui-view/div/fieldset/div[1]/div/div[2]/div[2]/div/input','xpath').click())
	.then(() => this.write("Testing Name",'/html/body/ui-view/ui-view/main/div[2]/div/div[1]/form/ui-view/div/fieldset/div[1]/div/div[2]/div[2]/div/input','xpath'))
	//CC exp
	.then(() => this.find('/html/body/ui-view/ui-view/main/div[2]/div/div[1]/form/ui-view/div/fieldset/div[1]/div/div[2]/div[3]/div[1]/input','xpath').click())
	.then(() => this.write("022020",'/html/body/ui-view/ui-view/main/div[2]/div/div[1]/form/ui-view/div/fieldset/div[1]/div/div[2]/div[3]/div[1]/input','xpath'))
	//CC CVC
	.then(() => this.find('/html/body/ui-view/ui-view/main/div[2]/div/div[1]/form/ui-view/div/fieldset/div[1]/div/div[2]/div[3]/div[2]/input','xpath').click())
	.then(() => this.write("222",'/html/body/ui-view/ui-view/main/div[2]/div/div[1]/form/ui-view/div/fieldset/div[1]/div/div[2]/div[3]/div[2]/input','xpath'))
}

Page.prototype.proceedToConfirmation = function(){
	this.find('/html/body/ui-view/ui-view/main/div[2]/div/div[1]/form/ui-view/div/fieldset/div[2]/div/button','xpath').click()
	.then(() => sleep(2000))
}

Page.prototype.filloutConfirmation = function(){
	this.find('/html/body/ui-view/ui-view/main/div[2]/div/div[1]/form/ui-view/div[2]/div/label/span[2]/a',"xpath")
	.then((foundElement) => this.clickOffset(foundElement,-175,0))

}

Page.prototype.completePurchase = function(){
	this.find('/html/body/ui-view/ui-view/main/div[2]/div/div[1]/form/ui-view/div[3]/div/input',"xpath").click()	
}

Page.prototype.waitTillPurchaseComplete = function(){
	this.find('/html/body/ui-view/ui-view/main/div[2]/div/div[1]/form/ui-view/div/div/div[3]/div/a',"xpath").click()
}

Page.prototype.readTotal = function(){
	this.find('/html/body/ui-view/ui-view/main/div[2]/div/div[1]/form/ui-view/div/div/div[3]/div/a',"xpath").click()
}
Page.prototype.getAppliedCoupon = function(){
	return{
		txt: this.find('/html/body/ui-view/app/div/div/div/div/ui-view/student-show/enrollments-list/div/table/tbody/tr[1]/td[5]/div/small/span',"xpath").getAttribute("innerHTML")
	}
}


module.exports = Page;

