var Page = require('../lib/base_page');
var sleep = require('sleep-promise');



// Page.prototype.clickNewCourseButton = function(option){
// 	return this.find("new_course_btn",'id').click()
// 	.then(() =>this.find("/html/body/ui-view/app/div/div/div/div/ui-view/ui-view/courses/div[1]/div/div/button["+option+"]",'xpath').click())
// }
Page.prototype.clickNewCourseButton = function(option){
	return this.find("new_course_btn",'id').click()
	// .then(() =>this.find("/html/body/ui-view/app/div/div/div/div/ui-view/ui-view/courses/div[1]/div/div/button["+option+"]",'xpath').click())
	.then(() => this.selectOption(option,"/html/body/ui-view/app/div/div/div/div/ui-view/ui-view/courses/div[1]/div/div",'xpath',"button"))
}

Page.prototype.clickFirstCourseResult = function(option){
	return this.find('//*[@id="courses_table"]/tbody/tr[1]/td[1]/a/span','xpath').click()
}

module.exports = Page;

