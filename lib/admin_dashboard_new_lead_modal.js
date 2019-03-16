var Page = require('../lib/base_page');
var Page = require('../lib/tasks');
var sleep = require('sleep-promise');


Page.prototype.fillNewLead = function(firstName=false,lastName=false,leadSource="Gift Card",courseID="nothing"){
	var ranEmail = "test" + (Math.floor(Math.random() * 1000000) + 1) + "@gmail.com";
	var ranphone = (Math.floor(Math.random() * 1000000000000) + 1);

	if(!firstName){
		 firstName = this.randomString(10,"alpha");
	}
	if(!lastName){
		 lastName = this.randomString(10,"alpha");
	}

	var firstNameSelector = "/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[1]/div/div/div[1]/input";
	var lastNameSelector = "/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[1]/div/div/div[2]/input";
	var emailSelector = "/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[2]/div/input";
	var phoneSelector = "/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[3]/div/international-phone/div/div[1]/input";
	var addressSelector = "#google_place";
	var leadSourceSelector = "/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[6]/div/select";
	var timeZoneSelector = "/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[4]/timezone-select/div/select";
	var statusSelector = "/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[7]/div/select";
	var notesSelector = "/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[9]/div/textarea"

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
	return this.find(firstNameSelector,'xpath').click()
	.then(() => this.write(firstName,firstNameSelector,'xpath'))
	//enter lead last name
	.then(() => this.find(lastNameSelector,'xpath').click())
	.then(() => this.write(lastName,lastNameSelector,'xpath'))
	//enter lead email
	.then(() => this.find(emailSelector,'xpath').click())
	.then(() => this.write(ranEmail,emailSelector,'xpath'))
	//enter lead phone
	.then(() => this.find(phoneSelector,'xpath').click())
	.then(() => this.write(ranphone,phoneSelector,'xpath'))
	//address... FUCK!!!!!!!!!!!!!!!!!!!!!!!!
	.then(() => this.find(addressSelector).click())
	.then(() => this.write(457,addressSelector))
	.then(() => sleep(2000))
	.then(() => this.write("DOWN",addressSelector))
	.then(() => this.write("RETURN",addressSelector))



	.then(() => this.selectOption(leadSource,leadSourceSelector,"xpath"))
	.then(() => {
		if(sourcelinkID){
			if(leadSource == "Seminar/Workshop" || leadSource == "Mock Exam"){
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

	.then(() => this.selectOption("Pacific Time (US & Canada) (GMT-08:00)",timeZoneSelector,'xpath'))

	// set status to pre-conversation
	.then(() => this.selectOption("Pre-Conversation",statusSelector,'xpath'))

	// add some notes
	.then(() => this.find(notesSelector,'xpath').click())
	.then(() => this.write("Here are some notes",notesSelector,'xpath'))

}

Page.prototype.clickCreateButtonNewLeadModal = function(){
	return this.find('/html/body/div[1]/div/div/lead-form-modal/div[3]/button','xpath').click()
      .then(() => sleep(500))
}

module.exports = Page;


//*[@id="source_link_lead_source_value"]