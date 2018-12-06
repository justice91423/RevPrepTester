var Page = require('../lib/base_page');
var sleep = require('sleep-promise');

Page.prototype.checkNavBarItem = function(counter){
		verificationText = this.getInnerHTML("/html/body/ui-view/app/div/div/sidebar/nav/div/a["+(counter+3)+"]/span", "xpath");
		return verificationText;
}

Page.prototype.checkSectionHeader = function(positionCounter){
	verificationText = this.getInnerHTML("/html/body/ui-view/app/div/div/sidebar/nav/div/div["+positionCounter+"]/a/span",'xpath');
	return verificationText;
}

Page.prototype.openSection = function(positionCounter){
	this.find("/html/body/ui-view/app/div/div/sidebar/nav/div/div["+positionCounter+"]/a/span",'xpath').click();
}

Page.prototype.checkSectionItem = function(itemPositionCounter,item,header){

	var path = "/html/body/div[2]/div/a["+itemPositionCounter+"]";
	if(header == "Users"){
		path = "/html/body/div[2]/div/div["+itemPositionCounter+"]/a"
	}
	verificationText = this.getInnerHTML(path, "xpath");
	return verificationText;
}

Page.prototype.sectionItemIsThere = function(itemPositionCounter,header){
	var path = "/html/body/div[2]/div/a["+itemPositionCounter+"]";
	if(header == "Users"){
		path = "/html/body/div[2]/div/div["+itemPositionCounter+"]/a"
	}
	return this.checkFor(path,"xpath");
}

module.exports = Page;
