var Page = require('../lib/base_page');
var sleep = require('sleep-promise');


Page.prototype.fillNewLeadSource= function(Name=false){
	// var ranEmail = "test" + (Math.floor(Math.random() * 1000000) + 1) + "@gmail.com";
	var ranphone = (Math.floor(Math.random() * 1000000000000) + 1);

	if(!Name){
		 Name = this.randomString(10,"alpha");
	}

	var LeadSourceSelector = "/html/body/div[1]/div/div/lead-source-form-modal/div[2]/form/div[1]/div/input";
	var TypeSelector = 'body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > lead-source-form-modal > div.modal-body > form > div:nth-child(2) > div > select';
	var SchoolSelector = 'body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > lead-source-form-modal > div.modal-body > form > div.form-group.row.required.ng-scope > div > select';
	var LeadSourcePhoneSelector = "/html/body/div[1]/div/div/lead-source-form-modal/div[2]/form/div[3]/div/international-phone/div/div[1]/input";
	var LeadSourceNotesSelector = "/html/body/div[1]/div/div/lead-source-form-modal/div[2]/form/div[4]/div/textarea";

	//enter lead first name
	this.find(LeadSourceSelector,'xpath').click()
	.then(() => this.write(Name,LeadSourceSelector,'xpath'))
	//enter type
	.then(() => this.find(TypeSelector).click())
	.then(() => this.find('/html/body/div[1]/div/div/lead-source-form-modal/div[2]/form/div[2]/div/select/option[2]','xpath').click())

	//enter lead phone
	.then(() => this.find(LeadSourcePhoneSelector,'xpath').click())
	.then(() => this.write(ranphone, LeadSourcePhoneSelector,'xpath'))
	.then(() => sleep(200))

	// add some notes
	.then(() => this.find(LeadSourceNotesSelector,'xpath').click())
	.then(() => this.write("These are some notes", LeadSourceNotesSelector,'xpath'))

}

Page.prototype.clickCreateButtonNewLeadSourceModal = function(){
	return this.find('/html/body/div[1]/div/div/lead-source-form-modal/div[3]/button','xpath').click()
      .then(() => sleep(500))
}

module.exports = Page;