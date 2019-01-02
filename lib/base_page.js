var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    Keys = webdriver.Key,
    assert =require('assert'),
    until = webdriver.until;
    var driver;
    var sleep = require('sleep-promise');
    var tabs = false;

    if(process.env.debug){
    // env dev=true mocha test/;
	  debug = process.env.debug;
	   console.log("Base is running in Debug Mode")
	}else{
	  var debug = false;
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

	this.find = function(el,by='css'){

		if (by == 'css'){
			driver.wait(until.elementLocated(By.css(el)));
			var foundElement = driver.findElement(By.css(el));
			driver.wait(until.elementIsVisible(foundElement), 10000);
			// var foundElement = driver.findElement(By.xpath(element));
			
		}
		if (by == 'xpath'){
			driver.wait(until.elementLocated(By.xpath(el)));
			var foundElement = driver.findElement(By.xpath(el));
			driver.wait(until.elementIsVisible(foundElement), 10000);
			// return foundElement;
		}
		driver.executeScript("arguments[0].scrollIntoView()", foundElement);
		return foundElement;
	}

	this.getInvisibleElement = function(el,by='css',id){
		

		if (by == 'css'){
			driver.wait(until.elementLocated(By.css(el)));
			var foundElement = document.getElementById("terms_and_conditions");
			return foundElement;
		}
		if (by == 'xpath'){
			driver.wait(until.elementLocated(By.xpath(el)));
			var foundElement = driver.findElement(By.xpath(el));

			return foundElement;
		}
	}

	this.clickOffset = function(el,X,Y){
		// console.log("clickoffset " + el +X+Y)
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
		// function tryDelay(delayMs){
		  var startMs = Date.now();
		  var curMs = Date.now();

		  while((startMs + delayMs) > curMs)
		  {
		  	console.log(curMs);
		    curMs = Date.now();
		  }
		// }

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

	this.findAll = function(el){
		driver.wait(until.elementLocated(By.css(el)), 5000);
		return driver.findElemenets(By.css(el));
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
}

// Page.prototype.getDopdownLength = function(el,by='css'){
// 	return this.find(el, by).options.length
	
// }
Page.prototype.debug = function(text){
	if(debug){
		console.log(text);
	}
	return true
}

Page.prototype.getInnerHTML = function(el,by='css'){
	return{
		txt: this.find(el, by).getAttribute("innerHTML")
	}
}

Page.prototype.newGetInnerHTML =  function(el,by='css'){

	return this.find(el, by).getAttribute("innerHTML")

	// return{
	// 	innerHTML: this.find(el, by).getAttribute("innerHTML"),
	// 	element: this.find(el, by)
	// }
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


Page.prototype.selectOption = function(item, selector, by="css"){
    var selectList, desiredOption;

    selectList = this.find(selector, by);
    // selectList.click();

    selectList.findElements(By.tagName('option'))
        .then(function findMatchingOption(options){
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
	this.enterUsername(username);
	this.enterPassword(password);
	var ret = this.clicklogin();
	return ret;
}



// function tryDelay(delayMs){
//   var startMs = Date.now();
//   var curMs = Date.now();

//   while((startMs + delayMs) > curMs)
//   {
//   	console.log(curMs);
//     curMs = Date.now();
//   }
// }



var Akbar = ". . . . . . . . . . . . . . . . _,,,--~~~~~~~~--,_\r\n. . . . . . . . . . . . . . ,-\' : : : :::: :::: :: : : : : :\u00BA \'-, ITS A TRAP!\r\n. . . . . . . . . . . . .,-\' :: : : :::: :::: :::: :::: : : :o : \'-,\r\n. . . . . . . . . . . ,-\' :: ::: :: : : :: :::: :::: :: : : : : :O \'-,\r\n. . . . . . . . . .,-\' : :: :: :: :: :: : : : : : , : : :\u00BA :::: :::: ::\';\r\n. . . . . . . . .,-\' \/ \/ : :: :: :: :: : : :::: :::-, ;; ;; ;; ;; ;; ;; ;\\\r\n. . . . . . . . \/,-\',\' :: : : : : : : : : :: :: :: : \'-, ;; ;; ;; ;; ;; ;;|\r\n. . . . . . . \/,\',-\' :: :: :: :: :: :: :: : ::_,-~~,_\'-, ;; ;; ;; ;; |\r\n. . . . . _\/ :,\' :\/ :: :: :: : : :: :: _,-\'\/ : ,-\';\'-\'\'\'\'\'~-, ;; ;; ;;,\'\r\n. . . ,-\' \/ : : : : : : ,-\'\'\' : : :,--\'\' :|| \/,-\'-\'--\'\'\'__,\'\'\' \\ ;; ;,-\'\/\r\n. . . \\ :\/,, : : : _,-\' --,,_ : : \\ :\\ ||\/ \/,-\'-\'x### ::\\ \\ ;;\/\r\n. . . . \\\/ \/---\'\'\'\' : \\ #\\ : :\\ : : \\ :\\ \\| | : (O##\u00BA : :\/ \/-\'\'\r\n. . . . \/,\'____ : :\\ \'-#\\ : \\, : :\\ :\\ \\ \\ : \'-,___,-\',-`-,,\r\n. . . . \' ) : : : :\'\'\'\'--,,--,,,,,,\u00AF \\ \\ :: ::--,,_\'\'-,,\'\'\'\u00AF :\'- :\'-,\r\n. . . . .) : : : : : : ,, : \'\'\'\'~~~~\' \\ :: :: :: :\'\'\'\'\'\u00AF :: ,-\' :,\/\\\r\n. . . . .\\,\/ \/|\\\\| | :\/ \/ : : : : : : : ,\'-, :: :: :: :: ::,--\'\' :,-\' \\ \\\r\n. . . . .\\\\\'|\\\\ \\|\/ \'\/ \/ :: :_--,, : , | )\'; :: :: :: :,-\'\' : ,-\' : : :\\ \\,\r\n. . . .\/\u00AF :| \\ |\\ : |\/\\ :: ::----, :\\\/ :|\/ :: :: ,-\'\' : :,-\' : : : : : : \'\'-,,\r\n. . ..| : : :\/ \'\'-(, :: :: :: \'\'\'\'\'~,,,,,\'\' :: ,-\'\' : :,-\' : : : : : : : : :,-\'\'\'\\\\\r\n. ,-\' : : : | : : \'\') : : :\u00AF\'\'\'\'~-,: : ,--\'\'\' : :,-\'\' : : : : : : : : : ,-\' :\u00AF\'\'\'\'\'-,_ .\r\n.\/ : : : : :\'-, :: | :: :: :: _,,-\'\'\'\'\u00AF : ,--\'\' : : : : : : : : : : : \/ : : : : : : :\'\'-,\r\n\/ : : : : : -, :\u00AF\'\'\'\'\'\'\'\'\'\'\'\u00AF : : _,,-~\'\' : : : : : : : : : : : : : :| : : : : : : : : :\r\n: : : : : : : :\u00AF\'\'~~~~~~\'\'\' : : : : : : : : : : : : : : : : : : | : : : : : : : : :";

module.exports = Page;