var Page = require('../lib/base_page');
var sleep = require('sleep-promise');


Page.prototype.fillNewSchool = function(Name=false){
	// var ranEmail = "test" + (Math.floor(Math.random() * 1000000) + 1) + "@gmail.com";
	var ranphone = (Math.floor(Math.random() * 1000000000000) + 1);

	if(!Name){
		 Name = this.randomString(10,"alpha");
	}

	var LeadSourceSelector = "/html/body/div[1]/div/div/lead-source-form-modal/div[2]/form/div[1]/div/input";
	var TypeSelector = 'body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > lead-source-form-modal > div.modal-body > form > div:nth-child(2) > div > select';
	var SchoolSelector = 'body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > lead-source-form-modal > div.modal-body > form > div.form-group.row.required.ng-scope > div > select';
	var LeadSourcePhoneSelector = "/html/body/div[1]/div/div/lead-source-form-modal/div[2]/form/div[4]/div/international-phone/div/div[1]/input";

	//enter lead first name
	this.find(LeadSourceSelector,'xpath').click()
	.then(() => this.write(Name,LeadSourceSelector,'xpath'))
	//enter type
	.then(() => this.find(TypeSelector).click())
	.then(() => this.find("/html/body/div[1]/div/div/lead-source-form-modal/div[2]/form/div[2]/div/select/option[2]",'xpath').click())
	//enter school
	.then(() => this.find(SchoolSelector).click())
	.then(() => this.find('/html/body/div[1]/div/div/lead-source-form-modal/div[2]/form/div[3]/div/select/option[2]','xpath').click())

	//enter lead phone
	.then(() => this.find(LeadSourcePhoneSelector,'xpath').click())
	.then(() => this.write(ranphone, LeadSourcePhoneSelector,'xpath'))
	//address... FUCK!!!!!!!!!!!!!!!!!!!!!!!!
	.then(() => this.find("#google_place").click())
	.then(() => this.write(457,"#google_place"))
	.then(() => sleep(2000))
	.then(() => this.write("DOWN","#google_place"))
	.then(() => this.write("RETURN","#google_place"))
	//enter low grade
	this.find("/html/body/div[1]/div/div/lead-source-form-modal/div[2]/form/div[1]/div/input",'xpath').click()
	.then(() => this.write("1","/html/body/div[1]/div/div/lead-source-form-modal/div[2]/form/div[6]/div[2]/input",'xpath'))
	//enter high grade
	this.find("/html/body/div[1]/div/div/lead-source-form-modal/div[2]/form/div[6]/div[3]/input",'xpath').click()
	.then(() => this.write("6","/html/body/div[1]/div/div/lead-source-form-modal/div[2]/form/div[6]/div[3]/input",'xpath'))

	// add some notes
	.then(() => this.find("/html/body/div[1]/div/div/lead-source-form-modal/div[2]/form/div[7]/div/textarea",'xpath').click())
	.then(() => this.write("These are some notes","/html/body/div[1]/div/div/lead-source-form-modal/div[2]/form/div[7]/div/textarea",'xpath'))

}

Page.prototype.clickCreateButtonNewSchoolModal = function(){
	return this.find('/html/body/div[1]/div/div/lead-source-form-modal/div[3]/button','xpath').click()
      .then(() => sleep(500))
}




module.exports = Page;