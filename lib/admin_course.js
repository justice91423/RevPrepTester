var Page = require('../lib/base_page');
var sleep = require('sleep-promise');



Page.prototype.clickNewCourseButton = function(){
	return this.find("new_course_btn",'id').click()
}

module.exports = Page;