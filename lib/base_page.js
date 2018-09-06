var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    Keys = webdriver.Key,
    assert =require('assert'),
    until = webdriver.until;
    var driver;
    var sleep = require('sleep-promise');

var Page = function(browser){
	this.driver = new webdriver.Builder().forBrowser(browser).build();

	var driver = this.driver;

	this.visit = function(theUrl){
		return driver.get(theUrl);
	}

	this.quit = function(){
		return driver.quit();
	}

	this.find = function(el,by='css'){

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
			return foundElement;
		}
	}

	// this.getInvisibleElement = function(el,by='css'){

	// 	if (by == 'css'){
	// 		driver.wait(until.elementLocated(By.css(el)));
	// 		var foundElement = driver.findElement(By.css(el));
	// 		// driver.wait(until.elementIsVisible(foundElement), 10000);
	// 		return foundElement;
	// 	}
	// 	if (by == 'xpath'){
	// 		driver.wait(until.elementLocated(By.xpath(el)))
	// 		var foundElement = driver.findElement(By.xpath(el));
	// 		// driver.wait(until.elementIsVisible(foundElement), 10000);
	// 		console.log("foundElement " +foundElement)
	// 		foundElement.style.visibility = "visible"
	// 		return foundElement;
	// 	}
	// }
// var compare = {}
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
  			console.log('alert text: ' + text);
  			alert.accept();
  		})
  		
  		return alert;

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
		// .then();

		// return driver.findElement(By.css(el));
		// .then(driver.wait(
  // 			until.elementLocated(By.css('body > div.modal.fade.ng-scope.ng-isolate-scope.in > div > div > div.modal-footer.ng-scope > button'))));


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

Page.prototype.loginAdmin = function(username = 'justice.sommer@revolutionprep.com', password = 'revprep123'){
	this.enterUsername(username);
	this.enterPassword(password);
	this.clicklogin();
}

function tryDelay(delayMs){
  var startMs = Date.now();
  var curMs = Date.now();

  while((startMs + delayMs) > curMs)
  {
  	console.log(curMs);
    curMs = Date.now();
  }
}


module.exports = Page;