var Page = require('../lib/base_page');
var sleep = require('sleep-promise');
var newSchoolModalSelector = require('../lib/admin_dashboard_xpaths.js').newSchoolModalXpaths;

Page.prototype.fillNewSchool = function(Name=false,schoolType="Public",schoolCategory="High School"){
	var ranphone = (Math.floor(Math.random() * 1000000000000) + 1);
	if(!Name){
		 Name = this.randomString(10,"alpha");
	}
	//enter lead first name
	return this.clickClearWrite(Name, newSchoolModalSelector.leadSourceField,'xpath')
	//enter category
	.then(() => this.selectOption(schoolCategory,newSchoolModalSelector.categoryField,'xpath'))
	//enter school
	.then(() => this.selectOption(schoolType,newSchoolModalSelector.schoolField,'xpath'))
	//enter phone
	.then(() => this.clickClearWrite(ranphone, newSchoolModalSelector.leadSourcePhoneField,'xpath'))
	//address... FUCK!!!!!!!!!!!!!!!!!!!!!!!!
	.then(() => this.clickClearWrite(457, newSchoolModalSelector.addressField,'xpath'))
	.then(() => sleep(2000))
	.then(() => this.write("DOWN",newSchoolModalSelector.addressField,'xpath'))
	.then(() => this.write("RETURN",newSchoolModalSelector.addressField,'xpath'))
	//enter low grade
	.then(() => this.clickClearWrite("1", newSchoolModalSelector.lowGradeField,'xpath'))
	//enter high grade
	.then(() => this.clickClearWrite("6", newSchoolModalSelector.highGradeField,'xpath'))
	// add some notes
	.then(() => this.clickClearWrite('This is a '+schoolType+' '+schoolCategory, newSchoolModalSelector.notesField,'xpath'))
}

Page.prototype.clickCreateButtonNewSchoolModal = function(){
	return this.find(newSchoolModalSelector.createButton,'xpath').click()
      .then(() => sleep(500))
}

module.exports = Page;