var {Dev,trys,adminBrowserss,Browserss,webdriver,sleep,describe,it,after,before,jquery,chai,chaiJquery,chaiAsPromised,should,sourceFile_credentials,addContext,testImageName} = require('../lib/top')

var Page = require('../lib/base_page');
var Page = require('../lib/admin_dashboard');
var Page = require('../lib/admin_dashboard_permissions');
var Page = require('../lib/student_home_page');
var Page = require('../lib/admin_employee');
var Page = require('../lib/admin_dashboard_lead_sources');
var Page = require('../lib/admin_dashboard_lead_source_page');
// var By = webdriver.By

var username = sourceFile_credentials.credentials_a['wonka_tester']['username']
var password = sourceFile_credentials.credentials_a['wonka_tester']['password']
var permissions_tester_username = sourceFile_credentials.credentials_a['permissions_tester']['username']
var permissions_tester_password = sourceFile_credentials.credentials_a['permissions_tester']['password']

chai.use(chaiAsPromised);
// var expect = chai.expect
var assert = chai.assert

var jsdom = require('jsdom');

const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

  // var $ = jQuery = require('jquery')(window);


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
        addContext(this, 'screenshots/'+testImageName+'.png');
        page.screenshot(testImageName)
      }
      if(Dev){
        return
      }
      page.quit();
    });

    var sourceFile = require('../lib/permissions_array.js');
    var permissions = sourceFile.permissions_a;

    for (var y = permissions.length - 1; y >= 0; y--) {
      
      navbarItemTest(permissions[y]["name"],permissions[y]["singleItems"],permissions[y]["sectionsAndItems"],permissions[y]["optionNumber"]);
    }

    function setTitle(name){
      var ret = sleep(500)
      .then(() => page.visit('https://admin.rev-prep.com/employees/2371/contacts'))
      // .then(() => page.findAndOpenEmployee(permissions_tester_username))
      .then(() => page.clickEditedEmplyeeButton())
      .then(() => page.setTitleFromEditEmployeeModal(name))
      .then(() => page.clickUpdateEditEmployeeModal())
      .then(() => page.clickEditedEmplyeeButton())
      return ret
    }

    function navbarItemTest(name,singleItems,sectionsAndItems,optionNumber){
      
      it('Set '+name+' as the users Title',  function(done){
        passing = true;
        permissionsSettingsTest = true;
        this.retries(trys)
        testImageName = this.test.title.replace(/ /g,"_");
        page.loginAdmin(username,password)
        // .then(() => page.dismissRingCentralModal())
        .then(() => setTitle(name))

        .then(() => page.checkTitleFromEditEmployeeModal(name))
        .then((titleSelected) => {
          // console.log("titleSelected ",titleSelected.sel);
          page.debug("Return from checkTitleFromEditEmployeeModal() = "+titleSelected.sel)
          titleSelected.sel.should.equal('true',name+" is not set as employee title");
        })
        .then(() => {
          // passing = true
          done()
        })
      });

      
      it(name+' role provides correct Navbar items', function(done){
        this.retries(trys)
        testImageName = this.test.title.replace(/ /g,"_");
        if(passing==false){
          this.retries(0);
          name.should.equal(true, name+' was not set properly.  This test can not be run');
        }
        page.loginAdmin(permissions_tester_username,permissions_tester_password)
        var itemCounter = 3;
        var singleItemsVerificationTexts={};
        for (var i = singleItems.length - 1; i >= 0; i--) {
          singleItemsVerificationTexts[singleItems[i]] = page.checkNavBarItem(i);
          singleItemsVerificationTexts[singleItems[i]].txt.should.eventually.equal(''+singleItems[i]+'' , singleItems[i]+' is not present on the navbar');
        };
        var headerVerificationTexts={};
        for (var i = sectionsAndItems.length - 1; i >= 0; i--) {
          var header = sectionsAndItems[i]["header"];
          headerVerificationTexts[header] = page.checkSectionHeader(i+1);
          headerVerificationTexts[header].txt.should.eventually.equal(header, header+' is not present on the navbar');
          var items = sectionsAndItems[i]["items"];
          var itemVerificationTexts={};
          var enoughItems={};
          page.openSection(i+1);
          for (var x = items.length - 1; x >= 0; x--) {
            enoughItems[items[x]] = page.sectionItemIsThere(x+1,header)
            enoughItems[items[x]].should.eventually.equal(true, items[x]+' is not present on the navbar');
            itemVerificationTexts[items[x]] = page.checkSectionItem(x+1,items[x],header);
            itemVerificationTexts[items[x]].txt.should.eventually.equal(' '+items[x]+' ', items[x]+' is not present, or misplaced, on the navbar');
          }
          var moreSectionItems = page.sectionItemIsThere(items.length+1,header)
          moreSectionItems.should.eventually.equal(false,header+" has at least one extra item.").notify(done);
        }
      });

      var verbs = ["can NOT","can"]

      for (var ii = sectionsAndItems.length - 1; ii >= 0; ii--) {
        var items = sectionsAndItems[ii]["items"];
        for (var xx = items.length - 1; xx >= 0; xx--) {
          if(items[xx]=="Lead Sources"){
            if(name=="Operations"||name=="Wonka"){
              var advisorToggleEditButtonsCount = 1
              var closerToggleEditButtonsCount = 1
              var statusToggleEditButtonsCount = 1
            }else if(name=="Advising Manager"||name=="Director of Academic Advising"){
              var advisorToggleEditButtonsCount = 1
              var closerToggleEditButtonsCount = 0
              var statusToggleEditButtonsCount = 0
            }else{
              var advisorToggleEditButtonsCount = 0
              var closerToggleEditButtonsCount = 0
              var statusToggleEditButtonsCount = 0
            }
            // https://revolutionprep.atlassian.net/browse/OD-4436
            it(name+" "+verbs[advisorToggleEditButtonsCount]+" edit the Advisor on the Lead Source page", function(done){
              this.retries(trys)
              testImageName = this.test.title.replace(/ /g,"_");
              if(passing==false){
                this.retries(0)
                name.should.equal(true, name+' was not set properly.  This test can not be run')
              }
              page.loginAdmin(permissions_tester_username,permissions_tester_password)
              .then(() => sleep(5000))
              .then(() => page.visit('https://admin.rev-prep.com/lead-sources?searchType=advanced&page=1&per=25&employeeId=all&closerId=all&idType=All%20Revolution&currentYearRevenueScope=greater%20than'))
              .then(() => page.clickFirstLeadSource())
              .then(() => sleep(1000))
              .then(() => page.mouseOverAdvisor())
              .then(() => sleep(200))
              .then(() => page.getToggleEditButtons())
              .then((gotten) => assert.lengthOf(gotten, advisorToggleEditButtonsCount, name+" "+verbs[advisorToggleEditButtonsCount]+" edit Advisor on lead source page"))
              .then(() => done())
            });

            it(name+" "+verbs[closerToggleEditButtonsCount]+" edit the Closer on the Lead Source page", function(done){
              this.retries(trys)
              testImageName = this.test.title.replace(/ /g,"_");
              if(passing==false){
                this.retries(0)
                name.should.equal(true, name+' was not set properly.  This test can not be run')
              }
              page.loginAdmin(permissions_tester_username,permissions_tester_password)
              .then(() => sleep(5000))
              .then(() => page.visit('https://admin.rev-prep.com/lead-sources?searchType=advanced&page=1&per=25&employeeId=all&closerId=all&idType=All%20Revolution&currentYearRevenueScope=greater%20than'))
              .then(() => page.clickFirstLeadSource())
              .then(() => sleep(1000))
              .then(() => page.mouseOverCloser())
              .then(() => sleep(200))
              .then(() => page.getToggleEditButtons())
              .then((gotten) => assert.lengthOf(gotten, closerToggleEditButtonsCount, name+" "+verbs[closerToggleEditButtonsCount]+" edit Closer on lead source page"))
              .then(() => done())
            });

            it(name+" "+verbs[statusToggleEditButtonsCount]+" edit the Status on the Lead Source page", function(done){
              this.retries(trys)
              testImageName = this.test.title.replace(/ /g,"_");
              if(passing==false){
                this.retries(0)
                name.should.equal(true, name+' was not set properly.  This test can not be run')
              }
              page.loginAdmin(permissions_tester_username,permissions_tester_password)
              .then(() => sleep(5000))
              .then(() => page.visit('https://admin.rev-prep.com/lead-sources?searchType=advanced&page=1&per=25&employeeId=all&closerId=all&idType=All%20Revolution&currentYearRevenueScope=greater%20than'))
              .then(() => page.clickFirstLeadSource())
              .then(() => sleep(1000))
              .then(() => page.mouseOverStatus())
              .then(() => sleep(200))
              .then(() => page.getToggleEditButtons())
              .then((gotten) => assert.lengthOf(gotten, closerToggleEditButtonsCount, name+" "+verbs[statusToggleEditButtonsCount]+" edit Closer on lead source page"))
              .then(() => done())
            });
          }
        }
      }

      if(name=="Wonka"){
        it('Removing Spoof Advisor role removes spoof ability',  function(done){
          this.retries(trys)
          testImageName = this.test.title.replace(/ /g,"_");
          if(passing==false){
            this.retries(0)
            name.should.equal(true, name+' was not set properly in a previous test.  Therefore this test can not be run')
          }
          page.loginAdmin(username,password)
          .then(() => sleep(500))
          // .then(() => page.dismissRingCentralModal())
          .then(() => page.findAndOpenEmployee(permissions_tester_username))
          .then(() => page.clickEditedEmplyeeButton())
          .then(() => page.removeSpoofAdvisorFromWonkaEditEmployeeModal())
          .then(() => page.clickUpdateEditEmployeeModal())
          .then(() => page.visit('https://admin.rev-prep.com/logout'))
          .then(() => page.loginAdmin(permissions_tester_username,permissions_tester_password))
          .then(() => page.clickUserNameAdminDashboard())
          .then(() => page.getSpoofAdvisorOptions())
          .then((gotten) => assert.lengthOf(gotten, 0, "The Spoof Advisor option is present"))
          .then(() => done())
        });
      }
      
    }
  })
}
