var {Dev,trys,adminBrowserss,Browserss,webdriver,sleep,describe,it,after,before,jquery,chai,chaiJquery,chaiAsPromised,should,sourceFile_credentials,addContext,testImageName} = require('../lib/top')

var By = webdriver.By
var assert = chai.assert

var Page = require('../lib/admin_dashboard_new_lead_modal');
var Page = require('../lib/admin_dashboard_course_search');
var Page = require('../lib/admin_dashboard_course');
var Page = require('../lib/admin_dashboard_CRM');
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
var usersFullName = sourceFile_credentials.credentials_a['permissions_tester']['firstName']+" "+sourceFile_credentials.credentials_a['permissions_tester']['lastName']

var studentPageSelector = require('../lib/admin_dashboard_xpaths.js').studentPageXpaths;

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
    this.timeout(60000);
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
      if (this.currentTest.state == 'failed' && this.currentTest.title.includes(' as the users Role')) {
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
    var permissions = sourceFile.permissions_roles;

    // for (var y = permissions.length - 1; y >= 0; y--) {
    //   navbarItemTest(permissions[y]["name"],permissions[y]["singleItems"],permissions[y]["sectionsAndItems"],permissions[y]["optionNumber"]);
    // }

    for (var y = permissions.length - 1; y >= 0; y--) {
      navbarItemTest(permissions[y]);
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
      .then(() => page.clickUpdateEditEmployeeModal())
      .then(() => page.clickEditedEmplyeeButton())
      return ret
    }

    function setBasicAdmin(){
      var ret = sleep(500)
      .then(() => page.visit('https://admin.rev-prep.com/users/employees?query=permissions_tester@rainforest.com&per=25&page=1&orderBy=score&orderSort=asc&active=true'))
      .then(() => page.findAndOpenEmployee(permissions_tester_username))
      .then(() => page.clickEditedEmplyeeButton())
      .then(() => page.setTitleFromEditEmployeeModal("Wonka"))
      .then(() => sleep(500))
      .then(() => page.setTitleFromEditEmployeeModal("Admin"))
      // .then(() => page.clickUpdateEditEmployeeModal())
      return ret
    }

    // function navbarItemTest(name,singleItems,sectionsAndItems,optionNumber){

    function navbarItemTest(role){
      
      it('Set '+role.name+' as the users Role',  function(done){
        passing = true;
        permissionsSettingsTest = true;
        this.retries(trys)
        page.loginAdmin(username,password)
        // .then(() => page.dismissRingCentralModal())
        .then(() => setBasicAdmin())
        .then(() => page.addARoleEditEmployeeModal(role.name))
        .then(() => page.clickUpdateEditEmployeeModal())
        .then(() => page.clickEditedEmplyeeButton())
        .then(() => page.checkTitleFromEditEmployeeModal("Admin"))
        .then((titleSelected) => {
          // console.log("titleSelected ",titleSelected.sel);
          page.debug("Return from checkTitleFromEditEmployeeModal() = "+titleSelected.sel)
          titleSelected.sel.should.equal('true',role.name+" is not set as employee title");
        })
        .then(() => done())
      });
      
      it(role.name+' role provides correct Navbar items', function(done){
        this.retries(trys)
        if(passing==false){
          this.retries(0);
          role.name.should.equal(true, role.name+' was not set properly.  This test can not be run');
        }
        page.loginAdmin(permissions_tester_username,permissions_tester_password)
        var itemCounter = 3;
        var singleItemsVerificationTexts={};
        for (var i = role.singleItems.length - 1; i >= 0; i--) {
          singleItemsVerificationTexts[role.singleItems[i]] = page.checkNavBarItem(i);
          singleItemsVerificationTexts[role.singleItems[i]].txt.should.eventually.equal(''+role.singleItems[i]+'' , role.singleItems[i]+' is not present on the navbar');
        };
        var headerVerificationTexts={};
        for (var i = role.sectionsAndItems.length - 1; i >= 0; i--) {
          var header = role.sectionsAndItems[i]["header"];
          headerVerificationTexts[header] = page.checkSectionHeader(i+1)
          headerVerificationTexts[header].txt.should.eventually.equal(header, 'the header '+header+' is not present on the navbar')
          var items = role.sectionsAndItems[i]["items"];
          var itemVerificationTexts={};
          var enoughItems={};
          page.openSection(i+1);
          for (var x = items.length - 1; x >= 0; x--) {
            enoughItems[items[x]] = page.sectionItemIsThere(x+1,header)
            enoughItems[items[x]].should.eventually.equal(true, items[x]+' is not present on the navbar')
            itemVerificationTexts[items[x]] = page.checkSectionItem(x+1,items[x],header);
            itemVerificationTexts[items[x]].txt.should.eventually.equal(' '+items[x]+' ', items[x]+' is not present, or misplaced, on the navbar')
          }
          var moreSectionItems = page.sectionItemIsThere(items.length+1,header)
          moreSectionItems.should.eventually.equal(false,header+" has at least one extra item.").notify(done);
        }
      });

      if (role.name == "Spoof Advisor"){
        var spoofTestName= role.name+" adds ability to spoof"
        var spoofOptions = 1
        var not = " NOT"
      }else{
        var spoofTestName= role.name+" does not add ability to spoof"
        var spoofOptions = 0
        var not = ""
      }
      it(spoofTestName,  function(done){
        this.retries(trys)
        if(passing==false){
          this.retries(0)
          role.name.should.equal(true, role.name+' was not set properly in a previous test.  Therefore this test can not be run')
        }
        page.loginAdmin(permissions_tester_username,permissions_tester_password)
        .then(() => page.clickUserNameAdminDashboard(usersFullName))
        .then(() => page.getSpoofAdvisorOptions())
        .then((gotten) => assert.lengthOf(gotten, spoofOptions, "The Spoof Advisor option is"+not+" present"))
        .then(() => done())
      });
      

      if (role.sectionsAndItems[0].items.includes("Lead Sources")){
        // if(role.setLeadSourceAdvisor && role.setLeadSourceCloser){
        //   var testname = role.name+" can edit the Advisor or Closer on the Lead Source page"
        // }
        // if(role.setLeadSourceAdvisor && !role.setLeadSourceCloser){
        //   var testname = role.name+" can edit the Advisor but not the Closer on the Lead Source page"
        // }
        // if(!role.setLeadSourceAdvisor && role.setLeadSourceCloser){
        //   var testname = role.name+" can not edit the Advisor but can edit the Closer on the Lead Source page"
        // }
        // if(!role.setLeadSourceAdvisor && !role.setLeadSourceCloser){
        //   var testname = role.name+" can not edit the Advisor or the Closer on the Lead Source page"
        // }
        it(role.name+" has correct editing restriction on Lead Source page", function(done){
          this.retries(trys)
          if(passing==false){
            this.retries(0)
            role.name.should.equal(true,role. name+' was not set properly.  This test can not be run')
          }
          page.loginAdmin(permissions_tester_username,permissions_tester_password)
          .then(() => sleep(5000))
          .then(() => page.visit('https://admin.rev-prep.com/lead-sources?searchType=advanced&page=1&per=25&employeeId=all&closerId=all&idType=All%20Revolution&currentYearRevenueScope=greater%20than'))
          .then(() => page.clickFirstLeadSource())
          .then(() => sleep(1000))
          .then(() => {
            if(role.setLeadSourceAdvisor){
              page.mouseOverAdvisor()
              .then(() => sleep(200))
              .then(() => page.getToggleEditButtons())
              .then((gottenLead) => assert.lengthOf(gottenLead, 1, role.name+" can NOT edit Advisor on lead source page"))
            }
            sleep(200)
          })
          .then(() => {
            if(role.setLeadSourceCloser){
              page.mouseOverCloser()
              .then(() => sleep(200))
              .then(() => page.getToggleEditButtons())
              .then((gottenCloser) => assert.lengthOf(gottenCloser, 1, role.name+" can NOT edit Closer on lead source page"))
            }
            sleep(200)
          })
          .then(() => {
            if(!role.setLeadSourceAdvisor){
              page.mouseOverAdvisor()
              .then(() => sleep(200))
              .then(() => page.getToggleEditButtons())
              .then((gottenLead) => assert.lengthOf(gottenLead, 0, role.name+" can edit Advisor on lead source page"))
            }
            sleep(200)
          })
          .then(() => {
            if(!role.setLeadSourceCloser){
              page.mouseOverCloser()
              .then(() => sleep(200))
              .then(() => page.getToggleEditButtons())
              .then((gottenCloser) => assert.lengthOf(gottenCloser, 0, role.name+" can edit Closer on lead source page"))
            }
            sleep(200)
          })
          .then(() => page.toggleOpenLeadSourceInfo())
          .then(() => {
            if(role.setRevenueShare){
              page.mouseOverRevenueShare()
              .then(() => sleep(200))
              .then(() => page.getToggleEditButtons())
              .then((gottenLead) => assert.lengthOf(gottenLead, 1, role.name+" can NOT edit Revenue Share on lead source page"))
            }
            sleep(200)
          })
          .then(() => {
            if(!role.setRevenueShare){
              page.mouseOverRevenueShare()
              .then(() => sleep(200))
              .then(() => page.getToggleEditButtons())
              .then((gottenLead) => assert.lengthOf(gottenLead, 0, role.name+" can edit Revenue Share on lead source page"))
            }
            sleep(200)
          })
          .then(() => done())
        });
      }



      it(role.name +' can or can NOT edit Advisor on newly created lead', function(done){
        this.retries(trys)
        if(passing==false){
          this.retries(0)
          role.name.should.equal(true,role. name+' was not set properly.  This test can not be run')
        }
        var firstName = page.randomString(10,"alpha");
        var lastName = page.randomString(10,"alpha");
        page.loginAdmin(permissions_tester_username,permissions_tester_password)
        .then(() => sleep(5000))
        .then(() => page.clickCreateOption(1))
        .then(() => page.fillNewLead(firstName,lastName,false,"Gift Card","nothing","Pre-Conversation"))
        .then(() => sleep(500))
        .then(() => page.clickCreateButtonNewLeadModal())
        .then(() => sleep(2000))
        .then(() => page.mouseOverAdvisorCRM())
        .then(() => sleep(200))
        .then(() => page.getToggleEditAdvisorButtons())


        .then((gotten) => {
        if(role.setLeadAdvisor){
          assert.isAtLeast(gotten.length, 1, role.name+" can NOT edit Advisor")
        }
        if(!role.setLeadAdvisor){
          assert.lengthOf(gotten, 0, role.name+" CAN edit Advisor")
        }
        sleep(200)
        })
        .then(() => done())
      });



      it(role.name +' is or is not permitted to batch enroll', function(done){
        this.retries(trys)
        if(passing==false){
          this.retries(0)
          role.name.should.equal(true,role. name+' was not set properly.  This test can not be run')
        }
        page.loginAdmin(permissions_tester_username,permissions_tester_password)
        .then(() => sleep(5000))
        .then(() => page.visit('https://admin.rev-prep.com/courses'))
        .then(() => sleep(500))
        .then(() => page.clickFirstCourseResult())
        .then(() => sleep(2000))



        .then(() => page.countElements('//button[contains(., "Batch Enroll")]'))
        .then((gotten) => {
          if(role.batchEnroll){
            assert.isAtLeast(gotten.length, 1, role.name+" can NOT batch enroll")
          }
          if(!role.batchEnroll){
            assert.lengthOf(gotten, 0, role.name+" CAN batch enroll")
          }
          sleep(200)
        })
        .then(() => done())

      });



      it(role.name +' is or is not permitted to delete exams properly', function(done){
        this.retries(trys)
        if(passing==false){
          this.retries(0)
          role.name.should.equal(true,role. name+' was not set properly.  This test can not be run')
        }
        page.loginAdmin(permissions_tester_username,permissions_tester_password)
        .then(() => sleep(5000))
        .then(() => page.visit('https://admin.rev-prep.com/students/390021/exams'))
        .then(() => sleep(5000))
        .then(() => page.countElements(studentPageSelector.deleteExamButtons))
        .then((gotten) => {
          if(role.deleteExam){
            assert.isAtLeast(gotten.length, 1, role.name+" can NOT delete exams")
          }
          if(!role.deleteExam){
            assert.lengthOf(gotten, 0, role.name+" CAN delete exams")
          }
          sleep(200)
        })
        .then(() => done())
      });

      if(role.setHandoff){
        it(role.name +' can set Handoff via CRM', function(done){
          this.retries(trys)
          if(passing==false){
            this.retries(0)
            role.name.should.equal(true,role.name+' was not set properly.  This test can not be run')
          }
          var firstName = page.randomString(10,"alpha");
          var lastName = page.randomString(10,"alpha");
          page.loginAdmin(permissions_tester_username,permissions_tester_password)
          .then(() => sleep(5000))
          .then(() => page.clickCreateOption(1))
          .then(() => page.fillNewLead(firstName,lastName,false,"Gift Card","nothing","Pre-Conversation"))
          .then(() => sleep(500))
          .then(() => page.clickCreateButtonNewLeadModal())
          .then(() => sleep(2000))

          .then(() => page.clickProfileAndBillingTab())
          .then(() => sleep(200))
          .then(() => page.clickEditButtonOnProfileAndBillingTab())
          .then(() => sleep(200))
          .then(() => page.getHandofftoggles())
          .then((gotten) => {

            if(role.setHandoff){
              assert.lengthOf(gotten, 1, role.name+" can NOT set Handoff via CRM")
            }

            if(!role.setHandoff){
              assert.lengthOf(gotten, 0, role.name+" Can set Handoff via CRM")
            }
            sleep(200)
          })
          .then(() => done())
        });
      }





      it(role.name +' is or is not permitted to delete a payment method on CRM properly', function(done){
        this.retries(trys)
        if(passing==false){
          this.retries(0)
          role.name.should.equal(true,role.name+' was not set properly.  This test can not be run')
        }
        var firstName = page.randomString(10,"alpha");
        var lastName = page.randomString(10,"alpha");
        page.loginAdmin(permissions_tester_username,permissions_tester_password)
        .then(() => sleep(5000))
        .then(() => page.clickCreateOption(1))
        .then(() => page.fillNewLead(firstName,lastName,false,"Gift Card","nothing","Pre-Conversation"))
        .then(() => sleep(500))
        .then(() => page.clickCreateButtonNewLeadModal())
        .then(() => sleep(2000))

        .then(() => page.clickProfileAndBillingTab())
        .then(() => sleep(200))
        .then(() => page.clickEnterPaymentMethodButtonOnProfileAndBillingTab())
        .then(() => sleep(200))
        .then(() => page.fillOutPaymentMethod())
        .then(() => sleep(200))
        .then(() => page.clickSavePaymentMethodButtonOnProfileAndBillingTab())
        .then(() => sleep(2000))
        .then(() => page.clickEditPaymentMethodButtonOnProfileAndBillingTab())
        .then(() => sleep(2000))

        .then(() => page.getTrashButtons())
        .then((gotten) => {

          if(role.deletePaymentMethod){
            assert.lengthOf(gotten, 1, role.name+" can NOT delete payment method via CRM")
          }

          if(!role.deletePaymentMethod){
            assert.lengthOf(gotten, 0, role.name+" Can set delete payment method via CRM")
          }
          sleep(200)
        })
        .then(() => done())
      });
    }
  })
}
