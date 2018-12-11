var Page = require('../lib/base_page');
var sleep = require('sleep-promise');


Page.prototype.fillNewLead = function(firstName=false,lastName=false){
	var ranEmail = "test" + (Math.floor(Math.random() * 1000000) + 1) + "@gmail.com";
	var ranphone = (Math.floor(Math.random() * 1000000000000) + 1);

	if(!firstName){
		 firstName = this.randomString(10,"alpha");
	}
	if(!lastName){
		 lastName = this.randomString(10,"alpha");
	}

	//enter lead first name
	this.find("/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[1]/div/div/div[1]/input",'xpath').click()
	.then(() => this.write(firstName,"/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[1]/div/div/div[1]/input",'xpath'))
	//enter lead last name
	.then(() => this.find("/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[1]/div/div/div[2]/input",'xpath').click())
	.then(() => this.write(lastName,"/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[1]/div/div/div[2]/input",'xpath'))
	//enter lead email
	.then(() => this.find("/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[2]/div/input",'xpath').click())
	.then(() => this.write(ranEmail,"/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[2]/div/input",'xpath'))
	//enter lead phone
	.then(() => this.find("/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[3]/div/international-phone/div/div[1]/input",'xpath').click())
	.then(() => this.write(ranphone,"/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[3]/div/international-phone/div/div[1]/input",'xpath'))
	//address... FUCK!!!!!!!!!!!!!!!!!!!!!!!!
	.then(() => this.find("#google_place").click())
	.then(() => this.write(457,"#google_place"))
	.then(() => sleep(2000))
	.then(() => this.write("DOWN","#google_place"))
	.then(() => this.write("RETURN","#google_place"))

	// set lead source to Employee referal
	.then(() => this.find("/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[6]/div/select",'xpath').click())
	.then(() => this.write("DOWN","/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[6]/div/select",'xpath'))
	.then(() => this.write("DOWN","/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[6]/div/select",'xpath'))
	.then(() => this.write("DOWN","/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[6]/div/select",'xpath'))
	.then(() => this.write("DOWN","/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[6]/div/select",'xpath'))
	.then(() => this.write("RETURN","/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[6]/div/select",'xpath'))

	// set timezone to pac
	.then(() => this.find("/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[4]/timezone-select/div/select",'xpath').click())
	.then(() => this.write("DOWN","/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[4]/timezone-select/div/select",'xpath'))
	.then(() => this.write("DOWN","/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[4]/timezone-select/div/select",'xpath'))
	.then(() => this.write("DOWN","/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[4]/timezone-select/div/select",'xpath'))
	.then(() => this.write("RETURN","/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[4]/timezone-select/div/select",'xpath'))

	// set status to pre-conversation
	.then(() => this.find("/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[7]/div/select",'xpath').click())
	.then(() => this.write("DOWN","/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[7]/div/select",'xpath'))
	.then(() => this.write("RETURN","/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[7]/div/select",'xpath'))

	// add some notes
	.then(() => this.find("/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[9]/div/textarea",'xpath').click())
	.then(() => this.write("These are some notes","/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[9]/div/textarea",'xpath'))

}

Page.prototype.clickCreateButtonNewLeadModal = function(){
	return this.find('/html/body/div[1]/div/div/lead-form-modal/div[3]/button','xpath').click()
      .then(() => sleep(500))
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

var Akbar = ". . . . . . . . . . . . . . . . _,,,--~~~~~~~~--,_\r\n. . . . . . . . . . . . . . ,-\' : : : :::: :::: :: : : : : :\u00BA \'-, ITS A TRAP!\r\n. . . . . . . . . . . . .,-\' :: : : :::: :::: :::: :::: : : :o : \'-,\r\n. . . . . . . . . . . ,-\' :: ::: :: : : :: :::: :::: :: : : : : :O \'-,\r\n. . . . . . . . . .,-\' : :: :: :: :: :: : : : : : , : : :\u00BA :::: :::: ::\';\r\n. . . . . . . . .,-\' \/ \/ : :: :: :: :: : : :::: :::-, ;; ;; ;; ;; ;; ;; ;\\\r\n. . . . . . . . \/,-\',\' :: : : : : : : : : :: :: :: : \'-, ;; ;; ;; ;; ;; ;;|\r\n. . . . . . . \/,\',-\' :: :: :: :: :: :: :: : ::_,-~~,_\'-, ;; ;; ;; ;; |\r\n. . . . . _\/ :,\' :\/ :: :: :: : : :: :: _,-\'\/ : ,-\';\'-\'\'\'\'\'~-, ;; ;; ;;,\'\r\n. . . ,-\' \/ : : : : : : ,-\'\'\' : : :,--\'\' :|| \/,-\'-\'--\'\'\'__,\'\'\' \\ ;; ;,-\'\/\r\n. . . \\ :\/,, : : : _,-\' --,,_ : : \\ :\\ ||\/ \/,-\'-\'x### ::\\ \\ ;;\/\r\n. . . . \\\/ \/---\'\'\'\' : \\ #\\ : :\\ : : \\ :\\ \\| | : (O##\u00BA : :\/ \/-\'\'\r\n. . . . \/,\'____ : :\\ \'-#\\ : \\, : :\\ :\\ \\ \\ : \'-,___,-\',-`-,,\r\n. . . . \' ) : : : :\'\'\'\'--,,--,,,,,,\u00AF \\ \\ :: ::--,,_\'\'-,,\'\'\'\u00AF :\'- :\'-,\r\n. . . . .) : : : : : : ,, : \'\'\'\'~~~~\' \\ :: :: :: :\'\'\'\'\'\u00AF :: ,-\' :,\/\\\r\n. . . . .\\,\/ \/|\\\\| | :\/ \/ : : : : : : : ,\'-, :: :: :: :: ::,--\'\' :,-\' \\ \\\r\n. . . . .\\\\\'|\\\\ \\|\/ \'\/ \/ :: :_--,, : , | )\'; :: :: :: :,-\'\' : ,-\' : : :\\ \\,\r\n. . . .\/\u00AF :| \\ |\\ : |\/\\ :: ::----, :\\\/ :|\/ :: :: ,-\'\' : :,-\' : : : : : : \'\'-,,\r\n. . ..| : : :\/ \'\'-(, :: :: :: \'\'\'\'\'~,,,,,\'\' :: ,-\'\' : :,-\' : : : : : : : : :,-\'\'\'\\\\\r\n. ,-\' : : : | : : \'\') : : :\u00AF\'\'\'\'~-,: : ,--\'\'\' : :,-\'\' : : : : : : : : : ,-\' :\u00AF\'\'\'\'\'-,_ .\r\n.\/ : : : : :\'-, :: | :: :: :: _,,-\'\'\'\'\u00AF : ,--\'\' : : : : : : : : : : : \/ : : : : : : :\'\'-,\r\n\/ : : : : : -, :\u00AF\'\'\'\'\'\'\'\'\'\'\'\u00AF : : _,,-~\'\' : : : : : : : : : : : : : :| : : : : : : : : :\r\n: : : : : : : :\u00AF\'\'~~~~~~\'\'\' : : : : : : : : : : : : : : : : : : | : : : : : : : : :";



module.exports = Page;



// #navbar > ul > li:nth-child(3) > a