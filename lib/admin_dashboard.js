var Page = require('../lib/base_page');
var sleep = require('sleep-promise');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By

Page.prototype.enterDate = function(date,selector,by="css"){
	 var done = this.find(selector,by).click();
	 var done = this.find(selector,by).clear();
	 this.write(date,selector,by);
	 return done;
}

Page.prototype.acceptAlert = function(){
	 var done = this.alertResponce();
	 return done;
} 

Page.prototype.dismissRingCentralModal = function(){
	 var done = this.find('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > div.modal-header.ng-scope > button > span').click();
	 return done;
} 

Page.prototype.clickCreate = function(item=false){
	this.find("/html/body/ui-view/app/div/div/sidebar/nav/div/div[8]/a",'xpath').click()
	.then(() => sleep(1000))
	.then(() => {
		if(item == "Lead"){
			this.find("/html/body/div[2]/div/a[1]",'xpath').click();
			console.log("im in");
		}
		if(item == "School"){
			this.find("/html/body/div[2]/div/a[2]",'xpath').click();
			console.log("im in");
		}
		if(item == "Lead Source"){
			this.find("/html/body/div[2]/div/a[3]",'xpath').click();
			console.log("im in");
		}
	})
}

Page.prototype.gotoCouponsScreen = function(){
	return this.find('/html/body/ui-view/app/div/div/sidebar/nav/div/a[9]/span','xpath').click()
      .then(() => sleep(1000))
}

Page.prototype.clickNavBarItem = function(navBarItemCounter=false,navBarSectionCounter=false,navBarSectionItemCounter=false){

	if(navBarItemCounter){
		return this.find("/html/body/ui-view/app/div/div/sidebar/nav/div/a["+(navBarItemCounter+3	)+"]/span", "xpath").click()
	}
	if(navBarSectionCounter){
		return this.find("/html/body/ui-view/app/div/div/sidebar/nav/div/div["+navBarSectionCounter+"]/a/span",'xpath').click()
		.then(() => sleep(250))
		.then(() => {
			if(navBarSectionCounter == 3){
				this.find("/html/body/div[2]/div/div["+navBarSectionItemCounter+"]/a",'xpath').click()
			}else{
				this.find("/html/body/div[2]/div/a["+navBarSectionItemCounter+"]",'xpath').click()
			}
		})
	}
}

Page.prototype.clickCreateOption = function(option){
	return this.find('//span[contains(., "Create")]','xpath').click()
	.then(() => {
		if(option == 1 || option =="Lead"){
			this.find('//a[.//text()=" Lead "]','xpath').click()
		}
		if(option == 2 || option =="School"){
			this.find('//a[.//text()=" School "]','xpath').click()
		}
		if(option == 3 || option =="Lead Source"){
			this.find('//a[.//text()=" Lead Source "]','xpath').click()
		}
	})
}

Page.prototype.clickSearch = function(option){
	return this.find("/html/body/ui-view/app/div/div/sidebar/nav/div/div[9]/a/span",'xpath').click()
	.then(() => this.find("/html/body/div[2]/div/a["+option+"]",'xpath').click());
}

Page.prototype.enterSearchText = function(text){
	return this.find('//*[@id="_value"]','xpath').click()
	.then(() => this.write("someStuff",'//*[@id="_value"]','xpath'))
	.then(() => this.write("RETURN",'//*[@id="_value"]','xpath'))
}

Page.prototype.clickAdvisorOption = function(option){
	this.debug("clickAdvisorOption " + option)
	return this.find("/html/body/ui-view/app/div/div/sidebar/nav/div/div[1]/a",'xpath').click()
	.then(() => sleep(500))
	.then(() => this.find('//a[@href="/'+option+'"]','xpath').click());
}

Page.prototype.startPurchase = function(){
	var ret = this.find('#new-purchase-btn').click()
	.then(() => this.find('#navbar > ul > li:nth-child(2) > span > div > ul > li:nth-child(2) > a').click())
	return ret 
}

Page.prototype.clickRefunds = function(){
	return this.find("/html/body/ui-view/app/div/div/sidebar/nav/div/a[8]/span",'xpath').click();
}

Page.prototype.clickReportsOption = function(option){
	return this.find("/html/body/ui-view/app/div/div/sidebar/nav/div/div[5]/a",'xpath').click()
	.then(() => this.find('//a[@href="/reports/'+option+'"]','xpath').click());
}

Page.prototype.getBuild = function(){
  build = this.find('/html/body/ng-include/div','xpath').getText()
  return build
}

Page.prototype.clickUserNameAdminDashboard = function(name){
	return this.find("//span[text()='"+name+"']",'xpath').click()
}

Page.prototype.getSpoofAdvisorOptions = async function(){
	this.debug("getSpoofAdvisorOptions")
	return page.driver.findElements(By.xpath("//*[text()[contains(., 'Spoof Advisor')]]"))
}

module.exports = Page;