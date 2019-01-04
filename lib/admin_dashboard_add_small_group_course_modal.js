var Page = require('../lib/base_page');
var sleep = require('sleep-promise');


Page.prototype.fillAddSmallGroupCourseModal = function(
	price,
	enrollmentCap,
	discountPrice,
	note,
	leadSource,
	dynamicSubject,
	subject,
	material,
	testDate,
	segment,
	grantManualAttendance
	){
	var ranEmail = "test" + (Math.floor(Math.random() * 1000000) + 1) + "@gmail.com";
	var ranphone = (Math.floor(Math.random() * 1000000000000) + 1);

	// if(!firstName){
	// 	 firstName = this.randomString(10,"alpha");
	// }
	// if(!lastName){
	// 	 lastName = this.randomString(10,"alpha");
	// }

	var firstNameSelector = "/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[1]/div/div/div[1]/input";
	var lastNameSelector = "/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[1]/div/div/div[2]/input";
	var emailSelector = "/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[2]/div/input";
	var phoneSelector = "/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[3]/div/international-phone/div/div[1]/input";
	var addressSelector = "#google_place";
	var leadSourceSelector = "/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[6]/div/select";
	var timeZoneSelector = "/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[4]/timezone-select/div/select";

	var statusSelector = "/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[7]/div/select";

	var notesSelector = "/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[9]/div/textarea"

	//enter price
	return this.find("price",'name').click()
	.then(() => this.write(price,"price",'name'))
	//enter enrollment cap
	.then(() => this.find("enrollment_cap",'name').click())
	.then(() => this.write(enrollmentCap,"enrollment_cap",'name'))
	//enter discount price
	.then(() => this.find("discount_price",'name').click())
	.then(() => this.write(discountPrice,"discount_price",'name'))
	//enter notes
	.then(() => this.find("notes",'name').click())
	.then(() => this.write(note,"notes",'name'))
	//enter lead source
	.then(() => this.find("lead_source",'name').click())
	.then(() => this.write(leadSource,"lead_source",'name'))
	.then(() => sleep(2000))
	.then(() => this.write("DOWN","lead_source",'name'))
	.then(() => this.write("DOWN","lead_source",'name'))
	.then(() => this.write("RETURN","lead_source",'name'))
	.then(() => {
		if(dynamicSubject){
			//click dynamic Subject
			this.find('/html/body/div[1]/div/div/courses-edit-modal/div[2]/form/div/div[2]/div[2]/div/div/div','xpath').click()
		}else{
			// enter subject
			this.selectOption(subject,"/html/body/div[1]/div/div/courses-edit-modal/div[2]/form/div/div[2]/div[3]/div/select",'xpath')
		}
	})
	// enter material
	.then(() => this.selectOption(material,"material",'name'))
	// enter test date
	.then(() => this.selectOption(testDate,"/html/body/div[1]/div/div/courses-edit-modal/div[2]/form/div/div[2]/div[5]/div/select",'xpath'))
	// enter segment
	.then(() => this.selectOption(segment,"segment",'name'))
	// enter Grant Manual Attendance
	.then(() => {
		if(grantManualAttendance){
			//click Grant Manual Attendance
			this.find('/html/body/div[1]/div/div/courses-edit-modal/div[2]/form/div/div[2]/div[7]/div/div/div','xpath').click()
		}
	})
	// enter Third Party
	.then(() => {
		if(dynamicSubject){
			//click Third Party?
			this.find('/html/body/div[1]/div/div/courses-edit-modal/div[2]/form/div/div[2]/div[8]/div/div/div','xpath').click()
		}
	})

	
	//address... FUCK!!!!!!!!!!!!!!!!!!!!!!!!
	// .then(() => this.find(addressSelector).click())
	// .then(() => this.write(457,addressSelector))
	// .then(() => sleep(2000))
	// .then(() => this.write("DOWN",addressSelector))
	// .then(() => this.write("RETURN",addressSelector))


	// .then(() => this.find(leadSourceSelector,"xpath").click())
	// 	.then(() => this.find('/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[6]/div/select/option[5]',"xpath").click())

	// .then(() => this.find(timeZoneSelector,'xpath').click())
	// .then(() => this.find("/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[4]/timezone-select/div/select/option[2]",'xpath').click())

	// // set status to pre-conversation
	// .then(() => this.find(statusSelector,'xpath').click())
	// .then(() => this.find('/html/body/div[1]/div/div/lead-form-modal/div[2]/form/div[7]/div/select/option[2]','xpath').click())

	// // add some notes
	// .then(() => this.find(notesSelector,'xpath').click())
	// .then(() => this.write("Here are some notes",notesSelector,'xpath'))

}

Page.prototype.clickCreateButtonNewLeadModal = function(){
	return this.find('/html/body/div[1]/div/div/lead-form-modal/div[3]/button','xpath').click()
      .then(() => sleep(500))
}

module.exports = Page;
