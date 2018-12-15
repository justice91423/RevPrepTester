var Page = require('../lib/base_page');


Page.prototype.clickAnOrder = function(number){
	return this.find('/html/body/ui-view/app/div/div/div/div/ui-view/ui-view/transactions-report/div[2]/div/table/tbody/tr['+number+']/td[7]/a','xpath').click();
}


Page.prototype.trying =  function(){
	var ret =   this.newGetInnerHTML('/html/body/ui-view/app/div/div/div/div/ui-view/ui-view/transactions-report/div[2]/div/p','xpath')
	return ret
}

Page.prototype.clickNameOnOrder = function(){
	return this.find('/html/body/ui-view/app/div/div/div/div/ui-view/order-show/div/div[1]/h2/a[2]','xpath').click();
}


module.exports = Page;
