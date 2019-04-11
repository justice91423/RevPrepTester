var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    Keys = webdriver.Key,
    assert =require('assert'),
    until = webdriver.until;
var driver;
// var sleep = require('sleep-promise');
var tabs = false;

var {Dev,trys,adminBrowserss,Browserss,webdriver,sleep,describe,it,after,before,jquery,chai,chaiJquery,chaiAsPromised,should,sourceFile_credentials,addContext,testImageName} = require('../lib/top') 

    if(process.env.debug){
    // env dev=true mocha test/;
	  var debug = process.env.debug;
	   console.log("Base is running in Debug Mode")
	}else{
	  var debug = false;
	}

	if(process.env.demo){
    // env dev=true mocha test/;
	  var demo = process.env.demo;
	   console.log("Base is running in Demo Mode")
	}else{
	  var demo = false;
	}

var Page = function(browser){
	this.driver = new webdriver.Builder().forBrowser(browser).build();

	var driver = this.driver;

	this.visit = function(theUrl){
		return driver.get(theUrl);
	}

	this.quit = function(){
		return driver.quit();
	}

	this.checkFor = function(el,by='css'){
		if (by == 'css'){
			var checked = driver.findElements(By.css(el)).then(found => !!found.length);
		}
		if (by == 'xpath'){
			var checked = driver.findElements(By.xpath(el)).then(found => !!found.length);
		}
		return checked;
	}

	this.find = function(el,by='cssDefault',mouseOver=false){

		if (by == 'css' || by == 'cssDefault'){
			// I want to get all the selectors to be stron xpaths
			if(by == 'cssDefault'){
				this.debug("CSS was used by default");
			}
			driver.wait(until.elementLocated(By.css(el)));
			var foundElement = driver.findElement(By.css(el));
			driver.wait(until.elementIsVisible(foundElement), 10000);			
		}
		if (by == 'xpath'){
			driver.wait(until.elementLocated(By.xpath(el)));
			var foundElement = driver.findElement(By.xpath(el));
			driver.wait(until.elementIsVisible(foundElement), 10000);
		}
		if (by == 'id'){
			driver.wait(until.elementLocated(By.id(el)));
			var foundElement = driver.findElement(By.id(el));
			driver.wait(until.elementIsVisible(foundElement), 10000);
		}
		if (by == 'name'){
			driver.wait(until.elementLocated(By.name(el)));
			var foundElement = driver.findElement(By.name(el));
			driver.wait(until.elementIsVisible(foundElement), 10000);
		}

		if (mouseOver == true && by == 'xpath'){
			// this is used to click things that aren't visible or covered by other elements.  It should really be a separate function.
			this.debug("in mouseover if in find() in base_page");
			driver.actions().mouseMove(foundElement).click().perform()
		}

		driver.executeScript("arguments[0].scrollIntoView()", foundElement);

		if(demo || Dev){
			if(by == 'cssDefault'){
				driver.executeScript("arguments[0].style.outline = '3px solid red'", foundElement)
			}else if(by != 'xpath'){
				driver.executeScript("arguments[0].style.outline = '3px solid yellow'", foundElement)
			}else{
			driver.executeScript("arguments[0].style.outline = '3px solid green'", foundElement);
			}
		}
		
		return foundElement;
	}

	this.getInvisibleElement = function(el,by='css',forceClick=false){
		
		if (by == 'css'){
			driver.wait(until.elementLocated(By.css(el)));
			var foundElement = document.getElementById("terms_and_conditions");
			return foundElement;
		}
		if (by == 'xpath'){
			driver.wait(until.elementLocated(By.xpath(el)));
			var foundElement = driver.findElement(By.xpath(el));

		if (forceClick == true){
			this.debug("in forceClick if in getInvisibleElement() in base_page");
			driver.actions().mouseMove(foundElement).click().perform()
		}
			return foundElement;
		}
	}

	this.forceClick = function(element){
		var ret = this.execute_script("arguments[0].click();", element)
		return ret;
	}

	this.clickOffset = function(el,X,Y){
		driver.actions()
		.mouseMove(el)
		.mouseMove({x: X, y: Y})
		.click()
		.perform();
	}

	this.findClicker = function(el,by='css'){
		if (by == 'css'){
			driver.wait(until.elementLocated(By.css(el)));
			var foundElement = driver.findElement(By.css(el));
			driver.wait(until.elementIsVisible(foundElement), 10000);
			return foundElement;
		}
		if (by == 'xpath'){
			driver.wait(until.elementLocated(By.xpath(el)));
			var foundElement = driver.findElement(By.xpath(el));
			driver.wait(until.elementIsVisible(foundElement), 10000);
			foundElement.elementFromPoint(-20, 0).click()
			return foundElement;
		}
	}

	this.delay = function(delayMs){
		var startMs = Date.now();
		var curMs = Date.now();
		console.log("delay() in base_page is still being used.  Let's find out where and get rid of it");

		while((startMs + delayMs) > curMs)
		{
	  		console.log(curMs);
	    	curMs = Date.now();
		}
	}

	this.alertResponce = function(responce='yes'){
		var alert = driver.switchTo().alert();
		alert.getText().then(function(text) {
  			alert.accept();
  		})
  		return alert;
	}

	this.scroll = function(element){
		var foundElement = driver.findElement(By.xpath(element));
		driver.executeScript("arguments[0].scrollIntoView()", foundElement);
  		return ;
	}

	this.typeText = function(text){
		var ret = driver.SendKeys(text).perform();
  		return ret
	}

	this.switchToNewTab = function(){
		driver.getAllWindowHandles().then(function gotWindowHandles(allhandles) {
            driver.switchTo().window(allhandles[allhandles.length - 1]);
        });
	}

	this.switchToFirstTab = function(){
		driver.getAllWindowHandles().then(function gotWindowHandles(allhandles) {
            driver.switchTo().window(allhandles[0]);
        });
	}

	this.switchToPreviousTab = function(){
		driver.getAllWindowHandles().then(function gotWindowHandles(allhandles) {
			driver.getWindowHandle().then(function gotCurrentWindowHandle(currenthandle){
				var index = allhandles.indexOf(currenthandle);
				driver.switchTo().window(allhandles[index - 1]);
			});   
        });
	}

	this.switchToNextTab = function(){
		driver.getAllWindowHandles().then(function gotWindowHandles(allhandles) {
			driver.getWindowHandle().then(function gotCurrentWindowHandle(currenthandle){
				var index = allhandles.indexOf(currenthandle);
				driver.switchTo().window(allhandles[index + 1]);
			});   
        });
	}

	this.isFullOpacity = function(el){
		const waitForOpacity = function(element) {
		  	return driver.wait(() => (
		  		element.getCssValue('class').then(opacity => {
			      	if (opacity != '2') {
			      		console.log("opacity right..." + opacity+'...')
			       		return element;
			      	} 
			      	else {
			      		console.log("opacity wrong " + opacity)
			        	return false;
			        }
			    })
			))
		};
		return driver.wait(
  			until.elementLocated(By.xpath('/html/body/div[2]')),
  			20000
		)
		.then(waitForOpacity)
	}

	this.waitTillNotClear = function(el){
		driver.executeAsyncScript(function(callback) {
  			window.addEventListener('hidden.bs.modal', function onmessage() {
    			window.removeEventListener('hidden.bs.modal', onmessage);
    			callback();
 			});
		});
	}

	this.findAll = async function(el,by="css"){
		if(by=="css"){
			driver.wait(until.elementLocated(By.css(el)), 5000);
			return driver.findElements(By.css(el));
		}
		if(by=="xpath"){
			driver.wait(until.elementLocated(By.xpath(el)), 5000);
			return driver.findElements(By.xpath(el));
		}
		if(by=="name"){
			driver.wait(until.elementLocated(By.name(el)), 5000);
			return driver.findElements(By.name(el));
		}
		if(by=="partialLinkText"){
			driver.wait(until.elementLocated(By.partialLinkText(el)), 5000);
			return driver.findElements(By.partialLinkText(el));
		}
		if(by=="className"){
			driver.wait(until.elementLocated(By.className(el)), 5000);
			return driver.findElements(By.className(el));
		}
		if(by=="tagName"){
			// driver.wait(until.elementLocated(By.tagName(el)), 5000);
			var cards = await driver.findElements(By.tagName(el))
				// .then(() => sleep(200))
			return cards
			// return await driver.findElements(By.tagName(el));
		}
	}

	this.findAllByTageNameAndTitle = function(tagName,title){	
		this.debug("in findAllByTageNameAndTitle tagName:"+tagName+" title: "+title)
		var elementList = []
		driver.findElements(By.tagName(tagName))
		.then((els) => {
			for (var i = els.length - 1; i >= 0; i--) {
				if (els[i].getAttribute("title") == "Course Link"){
					elementList.push(els[i])
				}
			}
		})
		this.debug("in findAllByTageNameAndTitle About to return")
		return elementList
	}

	this.write = function(txt, el, by='css'){
		if (txt == "DOWN"){
			return this.find(el,by).sendKeys(Keys.DOWN);
		}
		if (txt == "RETURN"){
			return this.find(el,by).sendKeys(Keys.RETURN);
		}
		return this.find(el,by).sendKeys(txt);
	}

	this.getDopdownLength = function(){
		return driver.executeScript ("document.getElementsByName('deliverable_type').length");
	}

	this.debug = function(text){
		if(debug || Dev){
			console.log("Debug text: "+text);
		}
		return true
	}

	this.getOrderIdFromSessionStorage = async function(){
		var storage = await driver.executeScript('return window.sessionStorage.getItem("revolution-checkout.order")')
		this.debug("getOrderIdFromSessionStorage storage = ",storage)
		return storage.split(":")[1].split(",")[0]
	}

	this.screenshot = function(fileName){
		driver.takeScreenshot().then(
		    function(image, err) {
		        require('fs').writeFile('mochawesome-report/screenshots/'+fileName+'.png', image, 'base64', function(err) {
		        });
		    }
		);
	}

	this.adjustTrys = function(passFail,currentTrys){
		if (passFail == 'failed') {
	        if(currentTrys){
	          	return currentTrys-1
	        }
	    } else if (passFail == 'passed') {
	        return trys
	    }else{
	    	return currentTrys
	    }
	}

	this.getElementsForCounting = async function(el){
		this.debug("getElementsForCounting")
		return page.driver.findElements(By.xpath('//*[@id="toggleEdit"]'))
	}
}

Page.prototype.getInnerHTML = function(el,by='css'){
	return{
		txt: this.find(el, by).getAttribute("innerHTML")
	}
}

Page.prototype.getID = function(el,by='css'){
	return{
		elementID: this.find(el, by).getAttribute("id")
	}
}

Page.prototype.newGetInnerHTML = async function(el,by='css'){
	return await this.find(el, by).getAttribute("innerHTML")
}

Page.prototype.newGetHref =  function(el,by='css'){
	return this.find(el, by).getAttribute("href")
}

Page.prototype.newGetHrefOfElement =  function(el){
	return el.getAttribute("href")
}

Page.prototype.ifThenClick =  function(target,el,by='css'){

	return this.find(el, by).getAttribute("innerHTML")
	.then((text) => {
		console.log("target "+"."+target+"."+" text " + "."+text+".")

		if(text == target){
			console.log("its a match " +"target "+"."+target+"."+" text " + "."+text+".")
			this.find(el, by).click()
		}
	})
}

Page.prototype.selectOption = function(item, selector, by="css",tagName="option"){
    var selectList, desiredOption;
    this.debug("into selectOption("+item+", "+selector+", "+by+", "+tagName+")")
    selectList = this.find(selector, by);
    // selectList.click();
    return selectList.findElements(By.tagName(tagName))
    .then(function findMatchingOption(options){
    	
    	// console.log("into findMatchingOption")
    	// console.log("options ",options)
    	// console.log("options count",options.length)
        options.some(function(option){

            option.getText().then(function doesOptionMatch(text){
            	// console.log("target "+"."+item+"."+" text " + "."+text+".")
                if (item === text){
                	// console.log("Got it target "+"."+item+"."+" text " + "."+text+".")
                    desiredOption = option;
                    return true;
                }
            });
        });
    })
    .then(function clickOption(){
        if (desiredOption){
        	// console.log("clicking")
            desiredOption.click();
        }
    });
}

Page.prototype.selectButtonOption = function(item, selector, by="css"){
    var selectList, desiredOption;
    // this.debug("into selectButtonOption")
    selectList = this.find(selector, by);
    // selectList.click();
    return selectList.findElements(By.tagName('button'))
    .then(function findMatchingOption(options){
    	// this.debug("into findMatchingOption")
        options.some(function(option){
        	// this.debug("into options.some(fungction(option)")
            option.getText().then(function doesOptionMatch(text){
            	// this.debug("target "+"."+item+"."+" text " + "."+text+".")
                if (item === text){
                	console.log("Got it target "+"."+item+"."+" text " + "."+text+".")
                    desiredOption = option;
                    return true;
                }
            });
        });
    })
    .then(function clickOption(){
        if (desiredOption){
            desiredOption.click();
        }
    });
}

Page.prototype.enterUsername = function(username){
	this.write(username,'body > ui-view > div > div:nth-child(1) > div:nth-child(2) > div > form > div:nth-child(1) > input');
	return{
		val: this.find('body > ui-view > div > div:nth-child(1) > div:nth-child(2) > div > form > div:nth-child(1) > input').getAttribute("value")
	}
}

Page.prototype.enterPassword = function(password){
	this.write(password, 'body > ui-view > div > div:nth-child(1) > div:nth-child(2) > div > form > div:nth-child(2) > input');
	return{
		val: this.find('body > ui-view > div > div:nth-child(1) > div:nth-child(2) > div > form > div:nth-child(2) > input').getAttribute("value")
	}
}
Page.prototype.clicklogin = function(){
	return this.find('body > ui-view > div > div:nth-child(1) > div:nth-child(2) > div > form > button').click();
}

Page.prototype.randomString = function(Length,alphanumeric=false){
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	if(alphanumeric=="alpha"){
		possible = "abcdefghijklmnopqrstuvwxyz";
	};
	if(alphanumeric=="numeric"){
		possible = "0123456789";
	}

	for (var i = 0; i < Length; i++)
	text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

Page.prototype.loginAdmin = function(username = 'justice.sommer@revolutionprep.com', password = 'revprep123'){
	var ret = this.find('/html/body/ng-include/div','xpath').getText()
	.then((build) => {
		this.enterUsername(username);
		this.enterPassword(password);
		this.clicklogin();
		
	})
	return ret;
}

Page.prototype.clickClearWrite = function(text,el,by){
	var ret = this.find(el,by).click()
	.then(() => this.find(el,by).clear())
	.then(() => this.write(text,el,by))
	.then(() => this.find(el,by).click())
	return ret;
}

Page.prototype.dismissToast = function(){
	var ret = this.find('//*[@id="toast-container"]',"xpath").click()
	return ret;
}
Page.prototype.randomDate = function(){

	var day = Math.floor(Math.random() * 28) + 1;
	var month = Math.floor(Math.random() * 12) + 1;
	var year = Math.floor(Math.random() * 75) + 2024;
	var monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	var date = {
		numerical: month + "/" + day + "/" + year,
		name: year + " - " + monthNames[(month-1)] + " " + day
	}
	 return date;
} 
Page.prototype.Akbar = function(){
	return "\r\n. . . . . . . . . . . . . . . . _,,,--~~~~~~~~--,_\r\n. . . . . . . . . . . . . . ,-\' : : : :::: :::: :: : : : : :\u00BA \'-, ITS A TRAP!\r\n. . . . . . . . . . . . .,-\' :: : : :::: :::: :::: :::: : : :o : \'-,\r\n. . . . . . . . . . . ,-\' :: ::: :: : : :: :::: :::: :: : : : : :O \'-,\r\n. . . . . . . . . .,-\' : :: :: :: :: :: : : : : : , : : :\u00BA :::: :::: ::\';\r\n. . . . . . . . .,-\' \/ \/ : :: :: :: :: : : :::: :::-, ;; ;; ;; ;; ;; ;; ;\\\r\n. . . . . . . . \/,-\',\' :: : : : : : : : : :: :: :: : \'-, ;; ;; ;; ;; ;; ;;|\r\n. . . . . . . \/,\',-\' :: :: :: :: :: :: :: : ::_,-~~,_\'-, ;; ;; ;; ;; |\r\n. . . . . _\/ :,\' :\/ :: :: :: : : :: :: _,-\'\/ : ,-\';\'-\'\'\'\'\'~-, ;; ;; ;;,\'\r\n. . . ,-\' \/ : : : : : : ,-\'\'\' : : :,--\'\' :|| \/,-\'-\'--\'\'\'__,\'\'\' \\ ;; ;,-\'\/\r\n. . . \\ :\/,, : : : _,-\' --,,_ : : \\ :\\ ||\/ \/,-\'-\'x### ::\\ \\ ;;\/\r\n. . . . \\\/ \/---\'\'\'\' : \\ #\\ : :\\ : : \\ :\\ \\| | : (O##\u00BA : :\/ \/-\'\'\r\n. . . . \/,\'____ : :\\ \'-#\\ : \\, : :\\ :\\ \\ \\ : \'-,___,-\',-`-,,\r\n. . . . \' ) : : : :\'\'\'\'--,,--,,,,,,\u00AF \\ \\ :: ::--,,_\'\'-,,\'\'\'\u00AF :\'- :\'-,\r\n. . . . .) : : : : : : ,, : \'\'\'\'~~~~\' \\ :: :: :: :\'\'\'\'\'\u00AF :: ,-\' :,\/\\\r\n. . . . .\\,\/ \/|\\\\| | :\/ \/ : : : : : : : ,\'-, :: :: :: :: ::,--\'\' :,-\' \\ \\\r\n. . . . .\\\\\'|\\\\ \\|\/ \'\/ \/ :: :_--,, : , | )\'; :: :: :: :,-\'\' : ,-\' : : :\\ \\,\r\n. . . .\/\u00AF :| \\ |\\ : |\/\\ :: ::----, :\\\/ :|\/ :: :: ,-\'\' : :,-\' : : : : : : \'\'-,,\r\n. . ..| : : :\/ \'\'-(, :: :: :: \'\'\'\'\'~,,,,,\'\' :: ,-\'\' : :,-\' : : : : : : : : :,-\'\'\'\\\\\r\n. ,-\' : : : | : : \'\') : : :\u00AF\'\'\'\'~-,: : ,--\'\'\' : :,-\'\' : : : : : : : : : ,-\' :\u00AF\'\'\'\'\'-,_ .\r\n.\/ : : : : :\'-, :: | :: :: :: _,,-\'\'\'\'\u00AF : ,--\'\' : : : : : : : : : : : \/ : : : : : : :\'\'-,\r\n\/ : : : : : -, :\u00AF\'\'\'\'\'\'\'\'\'\'\'\u00AF : : _,,-~\'\' : : : : : : : : : : : : : :| : : : : : : : : :\r\n: : : : : : : :\u00AF\'\'~~~~~~\'\'\' : : : : : : : : : : : : : : : : : : | : : : : : : : : :";
}
Page.prototype.reportScreenshot = function(){

	addContext(this, 'screenshots/'+this.currentTest.title.replace(/ /g,"_")+'.png');
    page.screenshot(this.currentTest.title.replace(/ /g,"_"))
	return date;
} 
module.exports = Page;