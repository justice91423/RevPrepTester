var Page = require('../lib/base_page');
var sleep = require('sleep-promise');



Page.prototype.enterDate = function(date,selector,by="css"){

	// console.log("testDate "+testDate);

	 var done = this.find(selector,by).click();
	 var done = this.find(selector,by).clear();
	 this.write(date,selector,by);

	 return done;
} 
Page.prototype.acceptAlert = function(){

	 var done = this.alertResponce();

	 return done;

} 

Page.prototype.dismissRingCentralModal = function(){

	 // var done = this.find('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > div.modal-header.ng-scope > button > span').click();

	 return ;
} 

Page.prototype.randomDate = function(){

	var day = Math.floor(Math.random() * 28) + 1;
	var month = Math.floor(Math.random() * 12) + 1;
	var year = Math.floor(Math.random() * 75) + 2024;
	var monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];


	var date = {
		numerical: month + "/" + day + "/" + year,
		// "name": year + " - " + monthNames[(day-1)] + " " + day + " Chemistry (SAT Subject Test)"
		name: year + " - " + monthNames[(month-1)] + " " + day
	}
	// console.log("date[numerical] " +date["numerical"])
	 return date;

} 


Page.prototype.clickCreate = function(item=false){
	this.find("/html/body/ui-view/app/div/div/sidebar/nav/div/div[8]/a",'xpath').click()
	.then(() => sleep(1000))
	.then(() => {
		if(item == "Lead"){
			this.find("/html/body/div[2]/div/a[1]",'xpath').click();
			console.log("im in");
		}
		if(item == "School"){
			this.find("/html/body/div[2]/div/a[2]",'xpath').click();
			console.log("im in");
		}
		if(item == "Lead Source"){
			this.find("/html/body/div[2]/div/a[3]",'xpath').click();
			console.log("im in");
		}
	})
}
Page.prototype.gotoCouponsScreen = function(){
	return this.find('/html/body/ui-view/app/div/div/sidebar/nav/div/a[9]/span','xpath').click()
      .then(() => sleep(1000))
}

Page.prototype.clickCreateOption = function(option){
	return this.find("/html/body/ui-view/app/div/div/sidebar/nav/div/div[8]/a/span",'xpath').click()
	.then(() => this.find("/html/body/div[2]/div/a["+option+"]",'xpath').click());
}

Page.prototype.clickSearch = function(option){
	return this.find("/html/body/ui-view/app/div/div/sidebar/nav/div/div[9]/a/span",'xpath').click()
	.then(() => this.find("/html/body/div[2]/div/a["+option+"]",'xpath').click());
}

Page.prototype.enterSearchText = function(text){
	return this.find('//*[@id="_value"]','xpath').click()
	.then(() => this.write("someStuff",'//*[@id="_value"]','xpath'))
	.then(() => this.write("RETURN",'//*[@id="_value"]','xpath'))
}






// Page.prototype.purchase = function(department){

// 	function tryDelay(delayMs){
// 	  var startMs = Date.now();
// 	  var curMs = Date.now();

// 	  while((startMs + delayMs) > curMs)
// 	  {
// 	    curMs = Date.now();
// 	  }
// 	}

// 	this.find('#new-purchase-btn').click();
// 	this.find('#navbar > ul > li:nth-child(2) > span > div > ul > li:nth-child(2) > a').click();

// 	tryDelay(2000);
// } 

// Page.prototype.getWelcomeModalText = function(){
// 	return{
// 		txt: this.find('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > div.modal-header.ng-scope > p').getAttribute("innerHTML")
// 	}
// }

// Page.prototype.getHomeworkHelpModalText = function(){
// 	return{
// 		txt: this.find('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > homework-help-info-modal > div.modal-body.text-center > div > p.m-b-md.lead').getAttribute("innerHTML")
// 	}
// }

// Page.prototype.WelcomeModalIsComplete = function(){

// 	var someStuff =  this.isFullOpacity('body > div.modal-backdrop.fade.ng-scope.in');
// 	return someStuff;
// }

// Page.prototype.clickDoneWelcomeModal = function(){
// 	this.find('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > div.modal-footer.ng-scope > button').click()
// }

// Page.prototype.WhatisHomeworkHelpModalComplete = function(){
// 	var done = this.find('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > homework-help-info-modal > div.modal-body.text-center > div > div > div > div').getAttribute("innerHTML");
// 	return done;
// }

// Page.prototype.clickCloseWhatisHomeworkHelpModal = function(){
// 	 var done = this.find('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > homework-help-info-modal > div.modal-footer > button').click();
// 	 return done;
// }

// Page.prototype.clickSignUpNow = function(){
// 	 var done = this.find('body > ui-view > app > div > div > div.view-container > div > ui-view > home > div > div.row.m-b-xl > div.col-sm-8 > div.upcoming-homework-help.clearfix > homework-help-overlay > div > div > div > span:nth-child(2) > div > button').click();
// 	 return done;
// }

// Page.prototype.getInnerHTML = function(el,by='css'){
// 	return{
// 		txt: this.find(el, by).getAttribute("innerHTML")
// 	}
// }

// Page.prototype.tryZWait = function(el,by='css'){
// 	var done = this.isFullOpacity(el);
// 	 return done;
// }

// Page.prototype.clickElement = function(el,by='css'){
// 	 var done = this.find(el, by).click();
// 	 return done;
// }

// Page.prototype.clickSignUpNowButton = function(){
// 	 var done = this.find('body > ui-view > app > div > div > div.view-container > div > ui-view > home > div > div.row.m-b-xl > div.col-sm-8 > div.upcoming-homework-help.clearfix > homework-help-overlay > div > div > div > span:nth-child(2) > div > button').click();
// 	 return done;
// }




module.exports = Page;



// #navbar > ul > li:nth-child(3) > a