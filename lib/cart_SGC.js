var Page = require('../lib/base_page');
var sleep = require('sleep-promise');



Page.prototype.clickSearchButton_CartSGC = function(){
	return this.find("/html/body/ui-view/app/ui-view/cart/main/div/div/div[1]/ui-view/course-search/div/div[1]/div[3]/button[2]",'xpath').click()
	// .then(() =>this.find("add_sessions",'id').click())
}
Page.prototype.setSubject_CartSGC = function(option){
	return this.find("subject",'name').click()
	// .then(() =>this.find("/html/body/ui-view/app/div/div/div/div/ui-view/ui-view/courses/div[1]/div/div/button["+option+"]",'xpath').click())
	.then(() => this.selectOption(option,'subject',"name"))
}


Page.prototype.getCorrectCourseLink = async function(CorrectCourseLink){

    var foundLink = "dave"
    // var checkPeram = {}
	await this.findAll("a","tagName")
	.then((linkElement) => {
		var linkElement = linkElement
		for (var i = linkElement.length - 1; i >= 0; i--) {
			// checkPeram[i] = linkElement[i]
			var dave = this.checkLink(linkElement[i],CorrectCourseLink)
			if(dave){
				foundLink = dave
			}

		}
		// this.newGetHrefOfElement(linkElement)
	})

	return foundLink
}

Page.prototype.checkLink = async function(linkElement,CorrectCourseLink){

	

	var ret = false
	await this.newGetHrefOfElement(linkElement)
	.then((linkText) => {

		if( linkText && linkText.includes("https://admin.rev-prep.com/courses/")){
		console.log("linkText ",linkText.split("https://admin.rev-prep.com/courses/")[1])
		if(linkText.split("https://admin.rev-prep.com/courses/")[1] == CorrectCourseLink){
			console.log("fount it. i=",i)
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