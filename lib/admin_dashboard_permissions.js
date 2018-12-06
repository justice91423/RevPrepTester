var Page = require('../lib/base_page');
var sleep = require('sleep-promise');

Page.prototype.homeCheck = function(){
	var verificationHomeText = this.getInnerHTML("/html/body/ui-view/app/div/div/sidebar/nav/div/a[3]/span", "xpath");
    verificationHomeText.txt.should.eventually.equal('Home', 'Home is not present')
} 

Page.prototype.callListCheck = function(){
	var verificationHomeText = this.getInnerHTML("/html/body/ui-view/app/div/div/sidebar/nav/div/a[3]/span", "xpath");
    verificationHomeText.txt.should.eventually.equal('Home', 'Home is not present')
} 

Page.prototype.checkSection = function(positionCounter, items=[]){
	this.find("/html/body/ui-view/app/div/div/sidebar/nav/div/div["+positionCounter+"]/a",'xpath').click();
	var verificationTexts = {};
	for (var i = 0; i >= items.length - 1; i--) {
		verificationTexts[items[i]] = this.getInnerHTML("/html/body/div[2]/div/div["+(i+1)+"]/a", "xpath");
    	verificationTexts[items[i]].txt.should.eventually.equal(' '+items[i]+' ' , items[i]+' Teams is not present');
	}
}

Page.prototype.checkNavBarItem = function(counter){
		verificationText = this.getInnerHTML("/html/body/ui-view/app/div/div/sidebar/nav/div/a["+(counter+3)+"]/span", "xpath");
		return verificationText;
}


Page.prototype.checkSectionHeader = function(positionCounter){
	verificationText = this.getInnerHTML("/html/body/ui-view/app/div/div/sidebar/nav/div/div["+positionCounter+"]/a/span",'xpath');
	return verificationText;
}

Page.prototype.openSection = function(positionCounter){
	this.find("/html/body/ui-view/app/div/div/sidebar/nav/div/div["+positionCounter+"]/a/span",'xpath').click();
}

Page.prototype.checkSectionItem = function(itemPositionCounter,item,header){

	var path = "/html/body/div[2]/div/a["+itemPositionCounter+"]";
	if(header == "Users"){
		path = "/html/body/div[2]/div/div["+itemPositionCounter+"]/a"
	}
	verificationText = this.getInnerHTML(path, "xpath");
	return verificationText;
}

Page.prototype.sectionItemIsThere = function(itemPositionCounter,header){
	var path = "/html/body/div[2]/div/a["+itemPositionCounter+"]";
	if(header == "Users"){
		path = "/html/body/div[2]/div/div["+itemPositionCounter+"]/a"
	}
	return this.checkFor(path,"xpath");
}

Page.prototype.openEditEmployeeModal  = function(title){
	var ret = this.visit('https://admin.rev-prep.com/employees/2327/contacts')
	.then(() => sleep(1000))
	.then(() => this.find("/html/body/ui-view/app/div/div/div/div/ui-view/employee-show/div[1]/button",'xpath').click())
	.then(() => sleep(1000));

	return ret
}



Page.prototype.setTitleFromEditEmployeeModal = function(title){

	var option = {
		"Wonka":1,
		"Director of Academic Advising":2,
		"Advising Manager":3,
		"Academic Advisor":4,
		"Director of Instruction Management":5,
		"Instruction Manager":6,
		"Director of Finance and Analytics":7,
		"Accountant":8,
		"Operations":9,
		"Human Resources":10,
		"Business Analyst":11,
		"Admin":12,
		"Faculty Leader":13,
		"Tutor":14,
		"Parent":15,
		"Closer":16
	}

	var ret = this.find("/html/body/div[1]/div/div/employee-modal/div[2]/form/div[4]/div[1]/role-manager/div/div/div/select",'xpath').click()
	.then(() => sleep(250))
	.then(() => this.find("/html/body/div[1]/div/div/employee-modal/div[2]/form/div[4]/div[1]/role-manager/div/div/div/select/option["+option[title]+"]",'xpath').click())
	// .then(() => sleep(5000))
	.then(() => this.find("/html/body/div[1]/div/div/employee-modal/div[2]/form/div[4]/div[1]/role-manager/div/div/div/select",'xpath').click())

	return ret

}

Page.prototype.checkTitleFromEditEmployeeModal = function(title){

	var option = {
		"Wonka":1,
		"Director of Academic Advising":2,
		"Advising Manager":3,
		"Academic Advisor":4,
		"Director of Instruction Management":5,
		"Instruction Manager":6,
		"Director of Finance and Analytics":7,
		"Accountant":8,
		"Operations":9,
		"Human Resources":10,
		"Business Analyst":11,
		"Admin":12,
		"Faculty Leader":13,
		"Tutor":14,
		"Parent":15,
		"Closer":16
	}

	// var ret = this.find("/html/body/div[1]/div/div/employee-modal/div[2]/form/div[4]/div[1]/role-manager/div/div/div/select",'xpath').click()
	// sel: this.find("/html/body/div[1]/div/div/employee-modal/div[2]/form/div[4]/div[1]/role-manager/div/div/div/select/option["+option[title]+"]",'xpath').getAttribute("selected")
	// .then(() => sleep(500));

	return {
		sel: this.find("/html/body/div[1]/div/div/employee-modal/div[2]/form/div[4]/div[1]/role-manager/div/div/div/select/option["+option[title]+"]",'xpath').getAttribute("selected")
	}

}

Page.prototype.clickUpdateEditEmployeeModal  = function(title){
	var ret = this.find("/html/body/div[1]/div/div/employee-modal/div[3]/button[2]/span",'xpath').click()
	.then(() => sleep(500));
	return ret
}

// Page.prototype.TeamsCheck = function(positionCounter, advisingTeams=false,tutorTeams=false){
//  	this.find("/html/body/ui-view/app/div/div/sidebar/nav/div/div["+positionCounter+"]/a",'xpath').click();

//  	var itemCounter = 1;

//  	if(advisingTeams){
//  		var verificationAdvisingTeamsText = this.getInnerHTML("/html/body/div[2]/div/a["+itemCounter+"]", "xpath");
//     	verificationAdvisingTeamsText.txt.should.eventually.equal(' Advising Teams ' , 'Advising Teams is not present');
//     	itemCounter++
//  	}

//  	if(tutorTeams){
//  		var verificationTutorTeamsHomeText = this.getInnerHTML("/html/body/div[2]/div/a["+itemCounter+"]", "xpath");
//     	verificationTutorTeamsHomeText.txt.should.eventually.equal(' Tutors Teams ' , 'Advising Teams is not present');
//  	}
// } 

// Page.prototype.usersCheck = function(positionCounter, students=false, parents=false, tutors=false, employees=false){
//  	this.find("/html/body/ui-view/app/div/div/sidebar/nav/div/div["+positionCounter+"]/a/span",'xpath').click();
//  	var itemCounter = 1;

//  	if(students){
//  		var item1Text = this.getInnerHTML("/html/body/div[2]/div/a["+itemCounter+"]", "xpath");
//     	item1Text.txt.should.eventually.equal(' Students ' , 'Students is not present');
//     	itemCounter++
//  	}

//  	if(parents){
//  		var item2Text = this.getInnerHTML("/html/body/div[2]/div/a["+itemCounter+"]", "xpath");
//     	item2Text.txt.should.eventually.equal(' Parents ' , 'Advising Teams is not present');
//     	itemCounter++
//  	}
//  	if(tutors){
//  		var item3Text = this.getInnerHTML("/html/body/div[2]/div/a["+itemCounter+"]", "xpath");
//     	item3Text.txt.should.eventually.equal(' Tutors ' , 'Students is not present');
//     	itemCounter++
//  	}

//  	if(employees){
//  		var item4Text = this.getInnerHTML("/html/body/div[2]/div/a["+itemCounter+"]", "xpath");
//     	item4Text.txt.should.eventually.equal(' Employees ' , 'Advising Teams is not present');
//     	itemCounter++
//  	}
    
    
// } 

Page.prototype.advisingTeamsCheck = function(){
 	this.find("/html/body/ui-view/app/div/div/sidebar/nav/div/div[1]/a",'xpath').click();
    var verificationHomeText = this.getInnerHTML("/html/body/div[2]/div/a", "xpath");
    verificationHomeText.txt.should.eventually.equal(' Advising Teams ' , 'Advising Teams is not present');
} 




module.exports = Page;
