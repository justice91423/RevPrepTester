var Page = require('../lib/base_page');
var sleep = require('sleep-promise');

Page.prototype.clickSearchButton_CartSGC = function(){
	return this.find("/html/body/ui-view/app/ui-view/cart/main/div/div/div[1]/ui-view/course-search/div/div[1]/div[3]/button[2]",'xpath').click()
}
Page.prototype.setSubject_CartSGC = function(option){
	return this.find("subject",'name').click()
	.then(() => this.selectOption(option,'subject',"name"))
}

Page.prototype.getCorrectCourseLink = async function(CorrectCourseLink){
    var foundLink = "dave"
	await this.findAll("a","tagName")
	.then((linkElement) => {
		var linkElement = linkElement
		for (var i = linkElement.length - 1; i >= 0; i--) {
			var dave = this.checkLink(linkElement[i],CorrectCourseLink)
			if(dave){
				foundLink = dave
			}
		}
	})
	return foundLink
}

Page.prototype.checkLink = async function(linkElement,CorrectCourseLink){
	var ret = false
	await this.newGetHrefOfElement(linkElement)
	.then((linkText) => {
		if( linkText && linkText.includes("https://admin.rev-prep.com/courses/")){
			if(linkText.split("https://admin.rev-prep.com/courses/")[1] == CorrectCourseLink){
				varret = {linkText:linkElement}
			}
		}
	})
	return ret
}

Page.prototype.testThis = async function(linkElement,CorrectCourseLink){
	return this.find('//a[@href="https://admin.rev-prep.com/courses/23941"]','xpath').click()
}

module.exports = Page;

// return this.find(el, by).getAttribute("innerHTML")