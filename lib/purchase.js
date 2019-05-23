var Page = require('../lib/checkout_pages');
var Page = require('../lib/base_page');
var sleep = require('sleep-promise');



Page.prototype.purchaseMembership = async function(parentFirstName="testparentfirstname", parentLastName="testparentlastname", studentFirstName= "teststudentfirstname",studentLastName= "teststudentlastname", studentGrade="3rd Grade"){
	var orderId = ""

	page.debug("purchaseMembership("+parentFirstName+" "+parentLastName+" "+studentFirstName+" "+studentLastName+" "+studentGrade)

	await page.visit('https://enroll.rev-prep.com/cart/tutor-packages')
	  	.then(() => sleep(500))
	  	.then(() => page.addMembershipToCart())
		.then(() => sleep(200))
	  	.then(() => page.proceedToAccountInfo())
	  	.then(() => page.fillOutAccountInfo(parentFirstName,parentLastName,studentFirstName,studentLastName,studentGrade))
	  	.then(() => sleep(200))
	  	.then(() => page.proceedToPaymentInfo())
	  	.then(() => page.filloutPaymentInfo())
	  	.then(() => page.proceedToConfirmation())
	  	.then(() => page.debug("Done with proceedToConfirmation.  Moving to filloutConfirmation"))
	  	.then(() => page.filloutConfirmation())
	  	.then(() => page.getOrderIdFromSessionStorage())
	  	.then((storage) => {
	      	orderId=storage
	      	page.debug(("purchaseMembership_storage"+storage))
	  	})
	  	.then(() => page.completePurchase())
	  	.then(() => page.waitTillPurchaseComplete())
  	return orderId
}

Page.prototype.purchaseMembershipPublic = async function(parentFirstName="testparentfirstname", parentLastName="testparentlastname", studentFirstName= "teststudentfirstname",studentLastName= "teststudentlastname", studentGrade="3rd Grade"){
	var OrderId = ""

	await page.visit('https://enroll.rev-prep.com/checkout/add/Course-273')
	  	.then(() => sleep(500))
	  	.then(() => page.enterMagicLinkEmail(false))
      	.then(() => page.clickContinueButtonMagicLinkEmail())
	  	.then(() => page.fillOutAccountInfo(parentFirstName,parentLastName,studentFirstName,studentLastName,studentGrade))
	  	.then(() => sleep(200))
	  	.then(() => page.proceedToPaymentInfo())
	  	.then(() => page.filloutPaymentInfo())
	  	.then(() => page.proceedToConfirmation())
	  	.then(() => page.debug("Done with proceedToConfirmation.  Moving to filloutConfirmation"))
	  	.then(() => page.filloutConfirmation())
	  	.then(() => page.getOrderIdFromSessionStorage())
	  	.then((storage) => {
	      	OrderId=storage
	      	page.debug(("completePurchaseFromCart_storage"+storage))
	  	})
	  	.then(() => page.completePurchase())
	  	.then(() => page.waitTillPurchaseCompletePublic())
  	return OrderId
}

Page.prototype.completePurchaseFromCart = async function(parentFirstName="testparentfirstname", parentLastName="testparentlastname", studentFirstName= "teststudentfirstname",studentLastName= "teststudentlastname", studentGrade="3rd Grade"){
	var OrderId = ""

		await sleep(200)
	  	.then(() => page.proceedToAccountInfo())
	  	.then(() => page.fillOutAccountInfo(parentFirstName,parentLastName,studentFirstName,studentLastName,studentGrade))
	  	.then(() => sleep(200))
	  	.then(() => page.proceedToPaymentInfo())
	  	.then(() => page.filloutPaymentInfo())
	  	.then(() => page.proceedToConfirmation())
	  	.then(() => page.debug("Done with proceedToConfirmation.  Moving to filloutConfirmation"))
	  	.then(() => page.filloutConfirmation())
	  	.then(() => page.getOrderIdFromSessionStorage())
	  	.then((storage) => {
	      	OrderId = storage
	      	page.debug(("completePurchaseFromCart_storage"+storage))
	  	})
	  	.then(() => page.completePurchase())
	  	.then(() => page.waitTillPurchaseComplete())
  	return OrderId
}

Page.prototype.addPtHoursToCart = async function(subject, tier, hoursPerWeek, hours, price, custom=false, membership=true){
		var ret = sleep(2000)
		.then(() => {
			if(!membership){
				page.clickMembershipBox()
			}
			sleep(1)
		})
	  	.then(() => page.selectPtSubject1(subject))
	  	.then(() => page.selectPtTier(tier, price))
	  	.then(() => page.setHoursPerWeek(hoursPerWeek))
	  	.then(() => sleep(2000))
	  	.then(() => {
	  		if(tier != "Global Elite"){
	  			page.clickShowMore()
	  			.then(() => sleep(2000))
	  		}
	  		sleep(1)
	  	})
	  	.then(() => page.setPackage(hours,custom))
	  	.then(() => sleep(2000))
	  	.then(() => page.clickStaffLater())
  	return ret
}

// Page.prototype.completePurchaseFromCart = function(){
// 	// var ret = page.visit('https://enroll.rev-prep.com/cart/tutor-packages')
//  //      // .then(() => page.find('//*[@id="hs-eu-confirmation-button"]').click)
//  //      .then(() => sleep(500))
//  //      .then(() => page.addMembershipToCart())
//  //      // .then(() => page.addAHabbitsToCart())
//  //      // .then(() => page.applyCouponToPurchase(couponCode))
//  //      // .then(() => sleep(500))
// 	.then(() => sleep(200))
//     .then(() => page.proceedToAccountInfo())
//     .then(() => page.fillOutAccountInfo())
//     .then(() => sleep(200))
//     .then(() => page.proceedToPaymentInfo())
//     .then(() => page.filloutPaymentInfo())
//     .then(() => page.proceedToConfirmation())
//     .then(() => page.debug("Done with proceedToConfirmation.  Moving to filloutConfirmation"))
//     .then(() => page.filloutConfirmation())
//     .then(() => page.completePurchase())
//       // .then(() => page.waitTillPurchaseComplete())
//       return ret
// }
// Page.prototype.setSubject_CartSGC = function(option){
// 	return this.find("subject",'name').click()
// 	// .then(() =>this.find("/html/body/ui-view/app/div/div/div/div/ui-view/ui-view/courses/div[1]/div/div/button["+option+"]",'xpath').click())
// 	.then(() => this.selectOption(option,'subject',"name"))
// }


// Page.prototype.getCorrectCourseLink = async function(CorrectCourseLink){

//     var foundLink = "dave"
//     // var checkPeram = {}
// 	await this.findAll("a","tagName")
// 	.then((linkElement) => {
// 		var linkElement = linkElement
// 		for (var i = linkElement.length - 1; i >= 0; i--) {
// 			// checkPeram[i] = linkElement[i]
// 			var dave = this.checkLink(linkElement[i],CorrectCourseLink)
// 			if(dave){
// 				foundLink = dave
// 			}

// 		}
// 		// this.newGetHrefOfElement(linkElement)
// 	})

// 	return foundLink
// }

// Page.prototype.checkLink = async function(linkElement,CorrectCourseLink){

	

// 	var ret = false
// 	await this.newGetHrefOfElement(linkElement)
// 	.then((linkText) => {

// 		if( linkText && linkText.includes("https://admin.rev-prep.com/courses/")){
// 		console.log("linkText ",linkText.split("https://admin.rev-prep.com/courses/")[1])
// 		if(linkText.split("https://admin.rev-prep.com/courses/")[1] == CorrectCourseLink){
// 			console.log("fount it. i=",i)
// 			varret = {linkText:linkElement}
// 		}
// 		}
// 	})
// 	return ret
	
// }


// Page.prototype.testThis = async function(linkElement,CorrectCourseLink){

	

// 	return this.find('//a[@href="https://admin.rev-prep.com/courses/23941"]','xpath').click()
// }


module.exports = Page;




// return this.find(el, by).getAttribute("innerHTML")