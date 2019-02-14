var Page = require('../lib/base_page');
var sleep = require('sleep-promise');


Page.prototype.fillSessionEditorModal = function(sessionsPerams){
	// type,
	// date,
	// time,
	// duration,
	// tutorsRequired,
	// repeat,

	// subject,
	// material,
	// testDate,
	// segment,
	// grantManualAttendance,
	// thirdParty

	//enter type
	return this.selectOption(sessionsPerams["type"],"session_type",'name')
	// enter date
	// .then(() => this.clickClearWrite(sessionsPerams["date"],"startDate",'name'))
	// .then(() => sleep(1000))
	//enter time
	.then(() => this.clickClearWrite(sessionsPerams["time"],"startTime",'name'))
	.then(() => sleep(1000))
	//enter duration
	.then(() => this.clickClearWrite(sessionsPerams["duration"],"duration",'name'))
	.then(() => sleep(1000))
	//enter Tutors required
	.then(() => this.clickClearWrite(sessionsPerams["tutorsRequired"],"employees_required",'name'))
	//enter repeat
	.then(() => this.clickClearWrite(sessionsPerams["repeat"],"repeat_weeks",'name'))

	.then(() => this.clickClearWrite(sessionsPerams["date"],"startDate",'name'))
	.then(() => sleep(1000))
	//enter time
	


	//enter lead source
	// .then(() => this.find("lead_source",'name').click())
	// .then(() => this.write(coursePerams["leadSource"],"lead_source",'name'))
	// .then(() => sleep(2000))
	// .then(() => this.write("DOWN","lead_source",'name'))
	// .then(() => this.write("DOWN","lead_source",'name'))
	// .then(() => this.write("RETURN","lead_source",'name'))
	// .then(() => {
	// 	if(coursePerams["dynamicSubject"]){
	// 		//click dynamic Subject
	// 		this.find('/html/body/div[1]/div/div/courses-edit-modal/div[2]/form/div/div[2]/div[2]/div/div/div','xpath').click()
	// 	}else{
	// 		// enter subject
	// 		this.selectOption(coursePerams["subject"],"/html/body/div[1]/div/div/courses-edit-modal/div[2]/form/div/div[2]/div[3]/div/select",'xpath')
	// 	}
	// })
	// // enter material
	// .then(() => this.selectOption(coursePerams["material"],"material",'name'))
	// // enter test date
	// .then(() => this.selectOption(coursePerams["testDate"],"/html/body/div[1]/div/div/courses-edit-modal/div[2]/form/div/div[2]/div[5]/div/select",'xpath'))
	// // enter segment
	// .then(() => this.selectOption(coursePerams["segment"],"segment",'name'))
	// // enter Grant Manual Attendance
	// .then(() => {
	// 	if(coursePerams["grantManualAttendance"]){
	// 		//click Grant Manual Attendance
	// 		this.find('/html/body/div[1]/div/div/courses-edit-modal/div[2]/form/div/div[2]/div[7]/div/div/div','xpath').click()
	// 	}
	// })
	// // enter Third Party
	// .then(() => {
	// 	if(coursePerams["thirdParty"]){
	// 		//click Third Party?
	// 		this.find('/html/body/div[1]/div/div/courses-edit-modal/div[2]/form/div/div[2]/div[8]/div/div/div','xpath').click()
	// 	}
	// })

}

Page.prototype.clickAddSessionsButtonSessionEditorModal = function(){
	return this.find('/html/body/div[1]/div/div/div[2]/form/div[1]/div/button','xpath').click()
      .then(() => sleep(500))
}
Page.prototype.clickSaveButtonSessionEditorModal = function(){
	return this.find('/html/body/div[1]/div/div/div[3]/button','xpath').click()
      .then(() => sleep(500))
}

module.exports = Page;
