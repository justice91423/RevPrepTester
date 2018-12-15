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

Page.prototype.clickNewCouponButton = function(){
	//Click retail purchase
	var ret = this.find('body > ui-view > app > div > div > div > div > ui-view > coupons > div.my-4.d-flex.justify-content-between > button').click()
	return ret 
}

Page.prototype.clickEditCouponButton = function(){
	//Click retail purchase
	var ret = this.find('body > ui-view > app > div > div > div > div > ui-view > coupons > table > tbody > tr:nth-child(1) > td.text-right > button').click()
	return ret 
}

Page.prototype.searchCoupons = function(status=false,catigory=false,name=false,code=false){
	var statusSelector = '/html/body/ui-view/app/div/div/div/div/ui-view/coupons/div[2]/div[1]/div[1]/select'
	var catigorySelector = '/html/body/ui-view/app/div/div/div/div/ui-view/coupons/div[2]/div[1]/div[2]/select'
	var nameSelector = '/html/body/ui-view/app/div/div/div/div/ui-view/coupons/div[2]/div[1]/div[3]/input'
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

function checkAndClick(){

}

Page.prototype.createNewCoupon = function(name,date,department,catigory,description,discount,dollars,eachLineItem,minAmount,recurrence=0,redemptions=0,restrictedTo=2,code){
	console.log("restrictedTo "+restrictedTo)
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
	
	var restrictedToSelector = '/html/body/div[1]/div/div/coupon-modal/div[2]/form/div[3]/div/select';


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
	.then(() => {if(redemptions){
		this.find(redemptionsToggleSelector,'xpath').click()
		.then(() => this.write(redemptions,redemptionsSelector,'xpath'))
		}
	})
	// this.find(restrictedToSelector,'xpath').click()

	.then(() => this.selectOption(restrictedTo,restrictedToSelector,'xpath'))

	// .then(() => this.selectOption("Any",restrictedToSelector,'xpath'))



	// /html/body/div[1]/div/div/coupon-modal/div[2]/form/div[3]/div/select/option[2]
	// /html/body/div[1]/div/div/coupon-modal/div[2]/form/div[3]/div/select/option[3]

	// /html/body/div[1]/div/div/coupon-modal/div[2]/form/div[3]/div/select/option[25]


	.then(() => sleep(2000))
	// click the Create button
	.then(() => this.find('/html/body/div[1]/div/div/coupon-modal/div[3]/button', 'xpath').click())
	// .then(() => console.log("gunna sleep"))
	.then(() => sleep(1000))
	// .then(() => console.log("slept"))
	.then(() => this.write(code,codeSelector,'xpath'))
	 // click the Save Coupon Code button
	.then(() => this.find('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > manage-codes-modal > div.modal-footer > button.btn.btn-info > span').click())	 
} 


Page.prototype.closeCouponModal = function(){
	//Click retail purchase
	var ret = this.find('/html/body/div[1]/div/div/manage-codes-modal/div[1]/button/span','xpath').click()
	return ret 
}


// Page.prototype.readTotal = function(){
// 	this.find('/html/body/ui-view/ui-view/main/div[2]/div/div[1]/form/ui-view/div/div/div[3]/div/a',"xpath").click()
// }
Page.prototype.getAppliedCoupon = function(){
	return{
		txt: this.find('/html/body/ui-view/app/div/div/div/div/ui-view/student-show/enrollments-list/div/table/tbody/tr[1]/td[5]/div/small/span',"xpath").getAttribute("innerHTML")
	}
}

Page.prototype.readFirstCouponName = function(){
  verificationText = this.getInnerHTML('/html/body/ui-view/app/div/div/div/div/ui-view/coupons/table/tbody/tr[1]/td[1]','xpath');
  return verificationText
}

module.exports = Page;

