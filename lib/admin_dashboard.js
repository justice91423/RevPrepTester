var Page = require('../lib/base_page');

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