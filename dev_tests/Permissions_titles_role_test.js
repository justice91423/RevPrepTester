var {Dev,trys,adminBrowserss,Browserss,webdriver,sleep,describe,it,after,before,jquery,chai,chaiJquery,chaiAsPromised,should,sourceFile_credentials,addContext,testImageName} = require('../lib/top')

var By = webdriver.By
var assert = chai.assert

var Page = require('../lib/base_page');
var Page = require('../lib/admin_dashboard');
var Page = require('../lib/admin_dashboard_permissions');
var Page = require('../lib/student_home_page');
var Page = require('../lib/admin_employee');
var Page = require('../lib/admin_dashboard_lead_sources');
var Page = require('../lib/admin_dashboard_lead_source_page');
var Page = require('../lib/admin_dashboard_users');
var Page = require('../lib/admin_dashboard_refunds')

var startingTrys = trys

var username = sourceFile_credentials.credentials_a['wonka_tester']['username']
var password = sourceFile_credentials.credentials_a['wonka_tester']['password']
var permissions_tester_username = sourceFile_credentials.credentials_a['permissions_tester']['username']
var permissions_tester_password = sourceFile_credentials.credentials_a['permissions_tester']['password']

chai.use(chaiAsPromised);

var jsdom = require('jsdom');

const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
for (var i = adminBrowserss.length - 1; i >= 0; i--) {
  tests(adminBrowserss[i])
};

function tests(browser){
  describe('Admin Dashboard permission scenarios - '+browser, function(){
    this.timeout(30000);
    // this.timeout(90000);
    var passing = true;
    var permissionsSettingsTest = true;

    beforeEach(function(){
      page = new Page(browser);
      page.driver.manage().window().setPosition(0, 0);
      page.driver.manage().window().setSize(1600,1080);
      page.visit('https://admin.rev-prep.com/login');
    });
    afterEach(function(){
      if (this.currentTest.state == 'failed') {
        if(permissionsSettingsTest){
          passing = false;
          permissionsSettingsTest = false;
        }
        if(trys){
          trys = trys-1
        }
        addContext(this, 'screenshots/'+this.currentTest.title.replace(/ /g,"_")+'.png');
        page.screenshot(this.currentTest.title.replace(/ /g,"_"))
      }
      if (this.currentTest.state == 'passed') {
        trys = startingTrys
      }
      if(Dev){
        return
      }
      page.quit();
    });

    var sourceFile = require('../lib/permissions_array.js');
    var titles = sourceFile.permissions_titles_roles;

    for (var y = titles.length - 1; y >= 0; y--) {
      navbarItemTest(titles[y]);
    }

    function setTitle(name){
      var ret = sleep(500)
      .then(() => page.visit('https://admin.rev-prep.com/users/employees?query=permissions_tester@rainforest.com&per=25&page=1&orderBy=score&orderSort=asc&active=true'))
      .then(() => page.findAndOpenEmployee(permissions_tester_username))
      .then(() => page.clickEditedEmplyeeButton())
      .then(() => {
        if(name=="Wonka"){
          page.setTitleFromEditEmployeeModal("Admin")
        }
        sleep(500)
      })
      .then(() => page.setTitleFromEditEmployeeModal(name))
      return ret
    }

    // function navbarItemTest(title){
      
    //   it(title.name+' selects the proper roles',  function(done){
    //     passing = true;
    //     permissionsSettingsTest = true;
    //     this.retries(trys)
    //     page.loginAdmin(username,password)
    //     // .then(() => page.dismissRingCentralModal())
    //     .then(() => setTitle(title.name))
    //     .then(() => {
    //       title.roles.forEach(function(role) {
    //         page.getRoleCards(role)
    //         .then((gottenRoleCards) => assert.lengthOf(gottenRoleCards, 1, role+" was not added when "+title.name+" was selected"))
    //       })
    //     })
    //     .then(() => done())
    //   });
    // }



    function navbarItemTest(title){
      
      it(title.name+' selects the proper roles',  function(done){
        passing = true;
        permissionsSettingsTest = true;
        this.retries(trys)
        var foundCardValues =[]
        page.loginAdmin(username,password)
        // .then(() => page.dismissRingCentralModal())
        .then(() => setTitle(title.name))
        .then(() => page.countRoleCards())
        .then((count) => {
          console.log("count1 ", count.length)
          for (var i = count.length; i >= 1; i--) {
            console.log("here is some suff", page.getRoleCardValue(i) )
            foundCardValues.push(page.getRoleCardValue(i))
          }
        })
        .then(() => {
          console.log("count ", count.length)
          console.log("title.roles ", title.roles)
          console.log("foundCardValues ", foundCardValues)
        })
        // var moreSectionItems = page.sectionItemIsThere(items.length+1,header)
        // foundCardValues.should.eventually.equal(title.roles," no match.").notify(done)

        // .then(() => {
        //   title.roles.forEach(function(role) {
        //     page.getRoleCards(role)
        //     .then((gottenRoleCards) => assert.lengthOf(gottenRoleCards, 1, role+" was not added when "+title.name+" was selected"))
        //   })
        // })
        // .then(() => done())
      });
    }



  });
}
