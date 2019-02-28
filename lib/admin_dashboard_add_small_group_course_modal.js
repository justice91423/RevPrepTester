var Page = require('../lib/base_page');
var sleep = require('sleep-promise');


Page.prototype.fillAddSmallGroupCourseModal = function(coursePerams){
	// 	price,
	// enrollmentCap,
	// discountPrice,
	// note,
	// leadSource,
	// dynamicSubject,
	// subject,
	// material,
	// testDate,
	// segment,
	// grantManualAttendance,
	// thirdParty

	//enter price
	return this.find("price",'name').click()
	.then(() => this.find("price",'name').clear())
	.then(() => this.write(coursePerams["price"],"price",'name'))
	//enter enrollment cap
	.then(() => this.find("enrollment_cap",'name').click())
	.then(() => this.find("enrollment_cap",'name').clear())
	.then(() => this.write(coursePerams["enrollmentCap"],"enrollment_cap",'name'))
	//enter discount price
	.then(() => this.find("discount_price",'name').click())
	.then(() => this.find("discount_price",'name').clear())
	.then(() => this.write(coursePerams["discountPrice"],"discount_price",'name'))
	//enter notes
	.then(() => this.find("notes",'name').click())
	.then(() => this.write(coursePerams["note"],"notes",'name'))
	//enter lead source
	.then(() => this.find("school-typeahead",'id').click())
	.then(() => this.write(coursePerams["leadSource"],"school-typeahead",'id'))
	.then(() => sleep(2000))
	.then(() => this.write("DOWN","school-typeahead",'id'))
	.then(() => this.write("DOWN","school-typeahead",'id'))
	.then(() => this.write("RETURN","school-typeahead",'id'))
	.then(() => {
		if(coursePerams["dynamicSubject"]){
			//click dynamic Subject
			this.find('/html/body/div[1]/div/div/courses-edit-modal/div[2]/form/div/div[2]/div[2]/div/div/div','xpath').click()
		}else{
			// enter subject
			this.selectOption(coursePerams["subject"],"subject",'name')
		}
	})
	// enter material
	.then(() => this.selectOption(coursePerams["material"],"material",'name'))
	// enter test date
	.then(() => this.selectOption(coursePerams["testDate"],"/html/body/div[1]/div/div/courses-edit-modal/div[2]/form/div/div[2]/div[5]/div/select",'xpath'))
	// enter segment
	.then(() => this.selectOption(coursePerams["segment"],"segment",'name'))
	// enter Grant Manual Attendance
	.then(() => {
		if(coursePerams["grantManualAttendance"]){
			//click Grant Manual Attendance
			this.find('/html/body/div[1]/div/div/courses-edit-modal/div[2]/form/div/div[2]/div[7]/div/div/div','xpath').click()
		}
	})
	// enter Third Party
	.then(() => {
		if(coursePerams["thirdParty"]){
			//click Third Party?
			this.find('/html/body/div[1]/div/div/courses-edit-modal/div[2]/form/div/div[2]/div[8]/div/div/div','xpath').click()
		}
	})

}

Page.prototype.clickCreateButtonAddSmallGroupCourseModal = function(){
	return this.find('/html/body/div[1]/div/div/courses-edit-modal/div[3]/button','xpath').click()
      .then(() => sleep(500))
}

module.exports = Page;
