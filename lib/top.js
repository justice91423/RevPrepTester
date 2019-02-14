if(process.env.dev){
    // env dev=true mocha test/;
  Dev = process.env.dev;
   console.log("This test suite is running in Development Mode")
}else{
  var Dev = false;
}

var Browserss = [
  // 'internet explorer',
  'firefox',
  'chrome'
  ];

if(Dev){
  var Browserss = [
  'chrome'
  ];
}

if(process.env.browser && process.env.browser != "all"){
  var Browserss = [
    process.env.browser
  ];
  // env KEY=YOUR_KEY mocha test/;
  // https://stackoverflow.com/questions/16144455/mocha-tests-with-extra-options-or-parameters
}

var trys = 2
if(Dev){
  var trys = 0
}

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    assert =require('assert'),
    until = webdriver.until;

var sleep = require('sleep-promise');
var { describe, it , after, before} = require('selenium-webdriver/testing');
var jquery = require('jquery');
var chai = require('chai');
var chaiJquery = require('chai-jquery');
var chaiAsPromised = require('chai-as-promised');
var should = chai.should();
var sourceFile_credentials = require('../lib/credentials.js');

module.exports = { Dev,trys,Browserss,webdriver,sleep,describe,it,after,before,jquery,chai,chaiJquery,chaiAsPromised,should,sourceFile_credentials}