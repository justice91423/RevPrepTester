var Page = require('../lib/base_page');



Page.prototype.dismissRingCentralModal = function(){

	 // var done = this.find('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > div.modal-header.ng-scope > button > span').click();

	 // return done;
	 return true
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
Page.prototype.isCart = function(){
	return{
		txt: this.find('body > ui-view > ui-view > main > div > div > div.col-md-8.col-lg-8 > h1').getAttribute("innerHTML")
	}
}

Page.prototype.findEverything = function(){
	
	this.find('body > ui-view > app > div > div > div > left-nav > div > ul > li.active > a > spanasd');
	
}

module.exports = Page;
