var Page = require('../lib/base_page');
var sleep = require('sleep-promise');
var newLeadSourceModalSelector = require('../lib/admin_dashboard_xpaths.js').newLeadSourceModalXpaths;

Page.prototype.fillNewLeadSource= function(name=false, category="Business"){

	var ranphone = (Math.floor(Math.random() * 1000000000000) + 1);

	if(!name){
		 name = this.randomString(10,"alpha");
	}

	//enter name
	return this.clickClearWrite(name, newLeadSourceModalSelector.leadSourceField,'xpath')

	//enter category
	.then(() => this.selectOption(category,newLeadSourceModalSelector.catigoryField,"xpath"))

	//enter  phone
	.then(() => this.clickClearWrite(ranphone, newLeadSourceModalSelector.leadSourcePhoneField,'xpath'))
	.then(() => sleep(200))

	// add some notes
	.then(() => this.clickClearWrite("These are some notes", newLeadSourceModalSelector.notesField,'xpath'))
}

Page.prototype.addAddressNewLeadSourceModal = function(){
	return this.find(newLeadSourceModalSelector.addAddressButton,'xpath').click()
    .then(() => sleep(500))
    .then(() => this.clickClearWrite(457, newLeadSourceModalSelector.addressField,'xpath'))
	.then(() => sleep(2000))
	.then(() => this.write("DOWN",newLeadSourceModalSelector.addressField,'xpath'))
	.then(() => this.write("RETURN",newLeadSourceModalSelector.addressField,'xpath'))
}

Page.prototype.clickCreateButtonNewLeadSourceModal = function(){
	return this.find(newLeadSourceModalSelector.createButton,'xpath').click()
    .then(() => sleep(500))
}

module.exports = Page;