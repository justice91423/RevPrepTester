var Page = require('../lib/base_page');
var sleep = require('sleep-promise');
var newCouponModalSelector = require('../lib/admin_dashboard_xpaths.js').newCouponModalXpaths;
var couponsPageSelector = require('../lib/admin_dashboard_xpaths.js').couponsPageXpaths;


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

Page.prototype.searchCoupons = function(status=false,category=false,name=false,code=false){
	this.debug("searchCoupons")
	var statusSelector = couponsPageSelector.statusField
	var categorySelector = couponsPageSelector.categoryField
	var nameSelector = couponsPageSelector.nameField
	var codeSelector = couponsPageSelector.codeField
	var searchButtonSelector = couponsPageSelector.searchButton
	var ret = sleep(100)
	.then(() => {
		if(status){
			this.find(statusSelector,'xpath').click()
		}
		if(category){
			this.find(categorySelector,'xpath').click()
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
	})
	.then(() => sleep(1000))
	.then(() => this.find(searchButtonSelector,'xpath').click())
	.then(() => sleep(2000))
	return ret
} 

Page.prototype.createNewCoupon = function(name,date,department,category="Gift Card",description,discount,dollars,eachLineItem,lineItemMin=false,recurrence=0,redemptions=0,restrictedTo="Any",code,){

	var nameSelector = newCouponModalSelector.nameField;
	var dateSelector = newCouponModalSelector.expirationDateField;
	var departmentSelector = newCouponModalSelector.departmentField;
	var categorySelector = newCouponModalSelector.categoryField;
	var descriptionSelector = newCouponModalSelector.descriptionField;
	var discountSelector = newCouponModalSelector.discountAmountField;
	var dolPerSelector = newCouponModalSelector.dollarsRadio;
	if(!dollars){
		dolPerSelector = newCouponModalSelector.percentageRadio;
	}
	var redemptionsToggleSelector = newCouponModalSelector.limitRedemptionsToggle;
	var redemptionsSelector = newCouponModalSelector.redemptionsLimitField;
	var eachLineItemSelector = newCouponModalSelector.applyToEachLineItemToggle;
	var RecurrenceToggleSelector = newCouponModalSelector.customRecurrenceToggle;
	var RecurrenceFieldSelector = newCouponModalSelector.customRecurrenceField;
	var lineItemMinAmountFieldSelector = newCouponModalSelector.lineItemMinAmountField;
	var restrictedToSelector = newCouponModalSelector.restrictedToField;
	var createButtonSelector = newCouponModalSelector.createButton;
	var codeSelector = newCouponModalSelector.couponCodeField;
	var saveCouponCodesButtonSelector = newCouponModalSelector.saveCouponCodesButton;
	
	return this.find(couponsPageSelector.newCouponButton,'xpath').click()
	.then(() => this.find(nameSelector,'xpath').click())
	.then(() => this.write(name,nameSelector,'xpath'))
	.then(() => {
		if(eachLineItem){
		this.find(eachLineItemSelector,'xpath').click()
		}
		if(recurrence){
			this.find(RecurrenceToggleSelector,'xpath').click()
			.then(() => this.write(recurrence,RecurrenceFieldSelector,'xpath'))
		}
		sleep(100)
	})
	.then(() => this.find(dateSelector,'xpath').click())
	.then(() => this.find(dateSelector,'xpath').clear())
	.then(() => this.write(date,dateSelector,'xpath'))
	.then(() => sleep(500))
	.then(() => this.selectOption(department,departmentSelector,'xpath'))
	.then(() => this.selectOption(category,categorySelector,'xpath'))
	.then(() => this.find(descriptionSelector,'xpath').click())
	.then(() => this.write(description,descriptionSelector,'xpath'))
	.then(() => this.find(discountSelector,'xpath').click())
	.then(() => this.write(discount,discountSelector,'xpath'))
	.then(() => this.find(dolPerSelector,'xpath').click())
	.then(() => {if(redemptions){
		this.find(redemptionsToggleSelector,'xpath').click()
		.then(() => this.write(redemptions,redemptionsSelector,'xpath'))
		}
		sleep(100)
	})
	.then(() => {if(lineItemMin){
		this.clickClearWrite(lineItemMin, lineItemMinAmountFieldSelector,'xpath')
		}
		sleep(100)
	})
	.then(() => this.selectOption(restrictedTo,restrictedToSelector,'xpath'))
	.then(() => sleep(2000))
	.then(() => this.find(createButtonSelector, 'xpath').click())
	.then(() => sleep(1000))
	.then(() => this.write(code,codeSelector,'xpath'))
	.then(() => sleep(500))
	.then(() => this.find(saveCouponCodesButtonSelector,'xpath').click())	
	.then(() => sleep(1000)) 
} 

Page.prototype.getAppliedCoupon = function(){
	// This is actually on the student page but it's here for now
	return{
		txt: this.find('/html/body/ui-view/app/div/div/div/div/ui-view/student-show/enrollments-list/div/table/tbody/tr[1]/td[5]/div/small/span',"xpath").getAttribute("innerHTML")
	}
}

Page.prototype.readFirstCouponName = function(){
	this.debug("readFirstCouponName")
  verificationText = this.getInnerHTML(couponsPageSelector.firstSearchResultName,'xpath');
  return verificationText
}

module.exports = Page;