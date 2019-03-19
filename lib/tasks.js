var Page = require('../lib/base_page');
var sleep = require('sleep-promise');



// Page.prototype.getACourseID = function(){

// 	page.visit('https://admin.rev-prep.com/courses?brandIds%5B%5D=26&departmentId=1&hosted=false&reserved=false&orderBy=starts_at&orderSort=desc&page=1&per=25&schedule=upcoming%20%2B%20ongoing&status=Published');
// 	.then(() => sleep(500))
// 	return this.find("/html/body/div[1]/div/div/parent-crm-modal/div/div[1]/button",'xpath')
// 	.then(() => sleep(500))
// 	.then(() => this.find("/html/body/div[1]/div/div/parent-crm-modal/div/div[1]/button",'xpath').click())
// }


Page.prototype.getACourseID = async function(courseType){
	var ret = ""

	var brandNamesToIDs = {
		"Mock Exam": 4,
		// "School Direct Referral",
		// "Non-School Referral",
		// "Parent Referral",
		// "Mock Exam",
		// "Internet Search",
		// "Initial School Contact",
		"Parent Event": 30,
		// "Gift Card",
		// "Non-Gift Card Offer"
		"Seminar": 26
	}

	await page.visit('https://admin.rev-prep.com/courses?brandIds%5B%5D='+brandNamesToIDs[courseType]+'&departmentId=1&hosted=false&reserved=false&orderBy=starts_at&orderSort=desc&page=1&per=25&schedule=upcoming%20%2B%20ongoing&status=Published')
   	.then(() =>   this.newGetHref('//*[@id="courses_table"]/tbody/tr[1]/td[1]/a','xpath'))
   	.then((href) =>  {
   		ret = href.split('courses/')[1].split('/')[0]
   		sleep(100)
   	})
	return ret
}

module.exports = Page;