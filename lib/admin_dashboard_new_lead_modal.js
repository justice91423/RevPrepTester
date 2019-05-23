var Page = require('../lib/base_page');
var Page = require('../lib/tasks');
var sleep = require('sleep-promise');
var newLeadModalSelector = require('../lib/admin_dashboard_xpaths.js').newLeadModalXpaths;

Page.prototype.fillNewLead = function(firstName=false,lastName=false,email=false,leadSource="Gift Card",courseID="nothing",status="Pre-Conversation"){
	var phone = (Math.floor(Math.random() * 1000000000000) + 1);
	if(!firstName){
		 firstName = this.randomString(10,"alpha");
	}
	if(!lastName){
		 lastName = this.randomString(10,"alpha");
	}
	if(!email){
		email = "test" + (Math.floor(Math.random() * 1000000) + 1) + "@gmail.com";
	}
	var sourcelinkID = 0
	switch (leadSource) {
      	case "School Direct Referral":
		    sourcelinkID = "source_link_contact_value";
		    break;
      	case "Non-School Referral":
        	sourcelinkID = "source_link_lead_source_value";
        	break;
      	case "Parent Referral":
        	sourcelinkID = "source_link_parent_value";
        	break;
      	case "Mock Exam":
      	case "Parent Event":
      	case "Seminar/Workshop":
        sourcelinkID = "source_link_course_value";
        break;
      }
	//enter lead first name
	return this.clickClearWrite(firstName, newLeadModalSelector.firstNameField,'xpath')
	//enter lead last name
	.then(() => this.clickClearWrite(lastName, newLeadModalSelector.lastNameField,'xpath'))
	//enter lead email
	.then(() => this.clickClearWrite(email, newLeadModalSelector.emailField,'xpath'))
	//enter lead phone
	.then(() => this.clickClearWrite(phone, newLeadModalSelector.phoneField,'xpath'))
	//address... FUCK!!!!!!!!!!!!!!!!!!!!!!!!
	.then(() => this.clickClearWrite(457, newLeadModalSelector.addressField,'xpath'))
	.then(() => sleep(2000))
	.then(() => this.write("DOWN",newLeadModalSelector.addressField,'xpath'))
	.then(() => this.write("RETURN",newLeadModalSelector.addressField,'xpath'))
	//enter lead source
	.then(() => this.selectOption(leadSource,newLeadModalSelector.leadSourceField,"xpath"))
	.then(() => {
		if(sourcelinkID){
			if(leadSource == "Seminar/Workshop" || leadSource == "Mock Exam"|| leadSource == "Parent Event"){
				this.write(courseID, sourcelinkID, "id")
				.then(() => sleep(2000))
				.then(() => this.write("DOWN",sourcelinkID, "id"))
				.then(() => this.write("RETURN",sourcelinkID, "id"))
			}else{
				this.write("sher",sourcelinkID, "id")
				.then(() => sleep(2000))
				.then(() => this.write("DOWN",sourcelinkID, "id"))
				.then(() => this.write("RETURN",sourcelinkID, "id"))
				}
		}else{
			sleep(1)
		}
	})
	.then(() => this.selectOption("Pacific Time (US & Canada) (GMT-08:00)",newLeadModalSelector.timeZoneField,'xpath'))
	// set status to pre-conversation
	.then(() => this.selectOption(status,newLeadModalSelector.statusField,'xpath'))
	// add some notes
	.then(() => this.clickClearWrite("Here are some notes", newLeadModalSelector.notesField,'xpath'))
}

Page.prototype.clickCreateButtonNewLeadModal = function(){
	return this.find(newLeadModalSelector.createButton,'xpath').click()
      .then(() => sleep(500))
}

Page.prototype.toggleVIPNewLeadModal = function(){
	return this.find(newLeadModalSelector.vipToggle,'xpath').click()
      .then(() => sleep(500))
}

Page.prototype.clickAddStudentNewLeadModal = function(){
	return this.find(newLeadModalSelector.addStudentButton,'xpath').click()
      .then(() => sleep(500))
}

Page.prototype.fillStudentNewLeadModal = function(studentCount=1, firstName=false,lastName=false,studentGrade="3rd Grade"){
	if(!firstName){
		 firstName = this.randomString(10,"alpha");
	}
	if(!lastName){
		 lastName = this.randomString(10,"alpha");
	}
	//enter lead first name
	return this.clickClearWrite(firstName, newLeadModalSelector.studentFirstNameField.replace("[studentCount]",studentCount-1),'xpath')
	//enter lead last name
	.then(() => this.clickClearWrite(lastName, newLeadModalSelector.studentLastNameField.replace("[studentCount]",studentCount-1),'xpath'))
	//enter grade
	// .then(() => this.selectOption(studentGrade, newLeadModalSelector.studentGradeField.replace("[studentCount]",studentCount-1),"xpath", "option"))
	// .then(() => this.find(newLeadModalSelector.studentGradeField(studentGrade),'xpath').click())

	.then(() => this.selectOption(studentGrade,newLeadModalSelector.studentGradeField(studentCount),'xpath', "option"))
	//enter time-zone
	.then(() => this.selectOption("Pacific Time (US & Canada) (GMT-08:00)",newLeadModalSelector.studentTimeZoneField(studentCount),'xpath', "option"))
}

Page.prototype.getErrorTextNewLeadModal = function(){
	return this.getInnerHTML(newLeadModalSelector.emailError,'xpath')
      // .then(() => sleep(500))
}

module.exports = Page;