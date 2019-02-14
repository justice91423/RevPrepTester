var Page = require('../lib/base_page');
var sleep = require('sleep-promise');
var ProceedToCheckoutButtonXpath = "/html/body/ui-view/app/ui-view/cart/main/div/div/div[2]/div/div[2]/button";

// Page.prototype.addMembershipToCart= function(){
// 	//Click Membership
// 	this.find('body > ui-view > ui-view > main > div > div > div.col-md-8.col-lg-8 > ul > li:nth-child(4) > a').click()
// 	//Click Add to cart
// 	.then(() => this.find('body > ui-view > ui-view > main > div > div > div.col-md-8.col-lg-8 > ui-view > add-membership > div > div > div > div > button').click())
// 	.then(() => sleep(250))
// }

Page.prototype.addMembershipToCart= function(){
	//Click Membership
	this.find('/html/body/ui-view/app/ui-view/cart/main/div/div/div[1]/ul/li[4]/a',"xpath").click()
	//Click Add to cart
	.then(() => this.find('/html/body/ui-view/app/ui-view/cart/main/div/div/div[1]/ui-view/add-membership/div/div/div/div/button','xpath').click())
	.then(() => sleep(250))
}

// Page.prototype.addAHabbitsToCart = function(){
// 	//Click A+ Habbits
// 	this.find('body > ui-view > ui-view > main > div > div > div.col-md-8.col-lg-8 > ul > li:nth-child(5) > a').click()
// 	//Click Add
// 	.then(() => this.find('body > ui-view > ui-view > main > div > div > div.col-md-8.col-lg-8 > ui-view > cart-course-search > div > div.ng-scope > div:nth-child(2) > table > tbody > tr:nth-child(1) > td.text-right > div > button').click())
// 	.then(() => this.find('/html/body/ui-view/ui-view/main/div/div/div[1]/ui-view/cart-course-search/div/div[2]/div[2]/table/tbody/tr[1]/td[5]/div/ul/li[2]/a','xpath').click())
// 	.then(() => sleep(1000))
// }

Page.prototype.addAHabbitsToCart = function(){
	//Click A+ Habbits
	this.find('/html/body/ui-view/app/ui-view/cart/main/div/div/div[1]/ul/li[5]/a','xpath').click()
	//Click Add
	.then(() => this.find('/html/body/ui-view/app/ui-view/cart/main/div/div/div[1]/ui-view/course-search/div/div[2]/div[1]/table/tbody/tr[1]/td[5]/div/button','xpath').click())
	.then(() => this.find('/html/body/ui-view/app/ui-view/cart/main/div/div/div[1]/ui-view/course-search/div/div[2]/div[1]/table/tbody/tr[1]/td[5]/div/div/button[1]','xpath').click())
	.then(() => sleep(1000))
}

// Page.prototype.applyCouponToPurchase = function(couponCode){
// 	var couponCodeFieldSelector = "body > ui-view > ui-view > main > div > div > div.col-md-4.side-panel > div > div:nth-child(2) > div > cart-items > div > div > div.m-t.ng-scope > div > div > input";

// 	this.find('body > ui-view > ui-view > main > div > div > div.col-md-4.side-panel > div > div:nth-child(2) > div > cart-items > div > div > div.m-t.ng-scope > a:nth-child(2)').click()
// 	.then(() => this.find(couponCodeFieldSelector).click())
// 	.then(() => this.write(couponCode,couponCodeFieldSelector))
// 	.then(() => sleep(5000))
// 	//Click Apply button
// 	.then(() => this.find('body > ui-view > ui-view > main > div > div > div.col-md-4.side-panel > div > div:nth-child(2) > div > cart-items > div > div > div.m-t.ng-scope > div > div > span > button').click());
// } 

Page.prototype.applyCouponToPurchase = function(couponCode){
	var couponCodeFieldSelector = "/html/body/ui-view/app/ui-view/cart/main/div/div/div[2]/div/div[2]/div/cart-items/div/div[2]/div[2]/div/div[2]/div/input";

	this.find('/html/body/ui-view/app/ui-view/cart/main/div/div/div[2]/div/div[2]/div/cart-items/div/div[2]/div[2]/div/div/a[1]','xpath').click()
	.then(() => this.find(couponCodeFieldSelector,'xpath').click())
	.then(() => this.write(couponCode,couponCodeFieldSelector,'xpath'))
	.then(() => sleep(5000))
	//Click Apply button
	.then(() => this.find('/html/body/ui-view/app/ui-view/cart/main/div/div/div[2]/div/div[2]/div/cart-items/div/div[2]/div[2]/div/div[2]/div/span/button','xpath').click());
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

// Page.prototype.proceedToAccountInfo = function(){
// 	var ret = this.find('body > ui-view > ui-view > main > div > div > div.col-md-4.side-panel > div > div:nth-child(2) > a').click()
// 	.then(() => sleep(2000));

// 	return ret
// }

Page.prototype.proceedToAccountInfo = function(){
	var ret = this.find(ProceedToCheckoutButtonXpath,'xpath').click()
	.then(() => sleep(2000));

	return ret
}

Page.prototype.fillOutAccountInfo = function(){
	var ranEmail = "test" + (Math.floor(Math.random() * 1000000) + 1) + "@gmail.com";
	var ranphone = (Math.floor(Math.random() * 1000000000000) + 1);

	//enter parent first name

	this.clickClearWrite("testparentfirstname", '//*[@name="parent_first_name"]','xpath')
	//enter parent last name
	this.clickClearWrite("testparentlastname", '//*[@name="parent_last_name"]','xpath')
	//enter parent email

	this.clickClearWrite(ranEmail, '//*[@name="parentEmail"]','xpath')
	//enter parent phone

	this.clickClearWrite(ranphone, '//*[@name="parent_phone"]','xpath')
	//address... FUCK!!!!!!!!!!!!!!!!!!!!!!!!
	// .then(() => this.find("#google_place").click())
	// .then(() => this.write(457,"#google_place"))
	// .then(() => sleep(2000))
	// .then(() => this.write("DOWN","#google_place"))
	// .then(() => this.write("RETURN","#google_place"))
	//enter student first name
	// .then(() => this.find("/html/body/ui-view/ui-view/main/div[2]/div/div[1]/form/ui-view/fieldset[3]/div[1]/div[1]/input",'xpath').click())
	// .then(() => this.write("teststudentfirstname","/html/body/ui-view/ui-view/main/div[2]/div/div[1]/form/ui-view/fieldset[3]/div[1]/div[1]/input",'xpath'))
	this.clickClearWrite("teststudentfirstname", '//*[@name="student_first_name"]','xpath')
	//enter student last name
	// .then(() => this.find("/html/body/ui-view/ui-view/main/div[2]/div/div[1]/form/ui-view/fieldset[3]/div[1]/div[2]/input","xpath").click())
	// .then(() => this.write("teststudentlastname","/html/body/ui-view/ui-view/main/div[2]/div/div[1]/form/ui-view/fieldset[3]/div[1]/div[2]/input","xpath"))
	this.clickClearWrite("teststudentlastname", '//*[@name="student_last_name"]','xpath')
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
	this.find('/html/body/ui-view/app/ui-view/main/div[2]/div/div[1]/form/ui-view/button','xpath').click()
	.then(() => sleep(2000))
}

Page.prototype.filloutPaymentInfo = function(){


	//address... FUCK!!!!!!!!!!!!!!!!!!!!!!!!
	this.find("#google_place").click()
	.then(() => this.write(457,"#google_place"))
	.then(() => sleep(2000))
	.then(() => this.write("DOWN","#google_place"))
	.then(() => this.write("RETURN","#google_place"))

	//CC number
	// this.find('//*[@id="card_number"]','xpath').click()
	// .then(() => this.write("4111111111111111",'//*[@id="card_number"]','xpath'))

	this.clickClearWrite("4111111111111111", '//*[@id="card_number"]','xpath')
	//CC name
	// .then(() => this.find('/html/body/ui-view/ui-view/main/div[2]/div/div[1]/form/ui-view/div/fieldset/div[1]/div/div[2]/div[2]/div/input','xpath').click())
	// .then(() => this.write("Testing Name",'/html/body/ui-view/ui-view/main/div[2]/div/div[1]/form/ui-view/div/fieldset/div[1]/div/div[2]/div[2]/div/input','xpath'))

	this.clickClearWrite("Testing Name", '//*[@name="CardName"]','xpath')
	//CC exp
	// .then(() => this.find('/html/body/ui-view/ui-view/main/div[2]/div/div[1]/form/ui-view/div/fieldset/div[1]/div/div[2]/div[3]/div[1]/input','xpath').click())
	// .then(() => this.write("022020",'/html/body/ui-view/ui-view/main/div[2]/div/div[1]/form/ui-view/div/fieldset/div[1]/div/div[2]/div[3]/div[1]/input','xpath'))

	this.clickClearWrite("022020", '//*[@name="CardExpiry"]','xpath')

	//CC CVC
	// .then(() => this.find('/html/body/ui-view/ui-view/main/div[2]/div/div[1]/form/ui-view/div/fieldset/div[1]/div/div[2]/div[3]/div[2]/input','xpath').click())
	// .then(() => this.write("222",'/html/body/ui-view/ui-view/main/div[2]/div/div[1]/form/ui-view/div/fieldset/div[1]/div/div[2]/div[3]/div[2]/input','xpath'))

	this.clickClearWrite("222", '//*[@name="CardCvc"]','xpath')
}

Page.prototype.proceedToConfirmation = function(){
	this.find('/html/body/ui-view/app/ui-view/main/div[2]/div/div[1]/form/ui-view/div/fieldset/button','xpath').click()
	.then(() => sleep(2000))
}

Page.prototype.filloutConfirmation = function(){
	this.find('/html/body/ui-view/app/ui-view/main/div[2]/div/div[1]/form/ui-view/div[6]/label/a',"xpath")
	.then((foundElement) => this.clickOffset(foundElement,-175,0))

}

// Page.prototype.filloutConfirmation = function(){
// 	this.find('//*[@id="terms_and_conditions"]',"xpath").click()
// 	// .then((foundElement) => this.clickOffset(foundElement,-175,0))

// }

Page.prototype.completePurchase = function(){
	this.find('/html/body/ui-view/app/ui-view/main/div[2]/div/div[1]/form/ui-view/div[7]/button',"xpath").click()	
}

Page.prototype.waitTillPurchaseComplete = function(){
	this.find('/html/body/ui-view/app/ui-view/main/div[2]/div/div[1]/form/ui-view/complete/div/div/div[2]/a',"xpath").click()
}

// Page.prototype.readTotal = function(){
// 	// this reads the total on the cart screen
// 	var readTotalVerificationText_old = this.getInnerHTML('body > ui-view > ui-view > main > div > div > div.col-md-4.side-panel > div > div:nth-child(2) > div > cart-items > div > div > div.cart__total.row > div > p > span.cart__total__amount.pull-right > strong');
// 	return readTotalVerificationText_old
// }

Page.prototype.readTotal = function(){
	// this reads the total on the cart screen
	var readTotalVerificationText_old = this.getInnerHTML('/html/body/ui-view/app/ui-view/cart/main/div/div/div[2]/div/div[2]/div/cart-items/div/div[2]/div[3]/p/span[2]','xpath');
	return readTotalVerificationText_old
}

Page.prototype.readError = function(){
	// this reads the error on the cart screen
  var readErrorVerificationText_old = this.getInnerHTML('/html/body/ui-view/app/ui-view/cart/main/div/div/div[2]/div/div[2]/div/cart-items/div/div[2]/div[2]/div/div[2]/span','xpath');
  return readErrorVerificationText_old

}





module.exports = Page;