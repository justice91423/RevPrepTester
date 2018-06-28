var Page = require('../lib/base_page');

Page.prototype.dismissRingCentralModal = function(){

	 var done = this.find('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > div.modal-header.ng-scope > button > span').click();

	 return done;
} 
Page.prototype.purchase = function(department){

	function tryDelay(delayMs){
	  var startMs = Date.now();
	  var curMs = Date.now();

	  while((startMs + delayMs) > curMs)
	  {
	    curMs = Date.now();
	  }
	}

	this.find('#new-purchase-btn').click();
	this.find('#navbar > ul > li:nth-child(2) > span > div > ul > li:nth-child(2) > a').click();

	tryDelay(2000);
} 

Page.prototype.getWelcomeModalText = function(){
	return{
		txt: this.find('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > div.modal-header.ng-scope > p').getAttribute("innerHTML")
	}
}

Page.prototype.getHomeworkHelpModalText = function(){
	return{
		txt: this.find('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > homework-help-info-modal > div.modal-body.text-center > div > p.m-b-md.lead').getAttribute("innerHTML")
	}
}

Page.prototype.WelcomeModalIsComplete = function(){

	var someStuff =  this.isFullOpacity('body > div.modal-backdrop.fade.ng-scope.in');
	return someStuff;
}

Page.prototype.clickDoneWelcomeModal = function(){
	this.find('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > div.modal-footer.ng-scope > button').click()
}

Page.prototype.WhatisHomeworkHelpModalComplete = function(){
	var done = this.find('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > homework-help-info-modal > div.modal-body.text-center > div > div > div > div').getAttribute("innerHTML");
	return done;
}

Page.prototype.clickCloseWhatisHomeworkHelpModal = function(){
	 var done = this.find('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > homework-help-info-modal > div.modal-footer > button').click();
	 return done;
}

Page.prototype.clickSignUpNow = function(){
	 var done = this.find('body > ui-view > app > div > div > div.view-container > div > ui-view > home > div > div.row.m-b-xl > div.col-sm-8 > div.upcoming-homework-help.clearfix > homework-help-overlay > div > div > div > span:nth-child(2) > div > button').click();
	 return done;
}

Page.prototype.getInnerHTML = function(el,by='css'){
	return{
		txt: this.find(el, by).getAttribute("innerHTML")
	}
}



Page.prototype.tryZWait = function(el,by='css'){
	var done = this.isFullOpacity('body > div.modal.fade.ng-scope.ng-isolate-scope.in');
	 return done;
}




Page.prototype.clickElement = function(el,by='css'){
	 var done = this.find(el, by).click();
	 return done;
}

Page.prototype.clickSignUpNowButton = function(){
	 var done = this.find('body > ui-view > app > div > div > div.view-container > div > ui-view > home > div > div.row.m-b-xl > div.col-sm-8 > div.upcoming-homework-help.clearfix > homework-help-overlay > div > div > div > span:nth-child(2) > div > button').click();
	 return done;
}

module.exports = Page;



// #navbar > ul > li:nth-child(3) > a