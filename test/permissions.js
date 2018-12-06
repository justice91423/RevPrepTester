// this is now

var Dev = false
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    assert =require('assert'),
    until = webdriver.until;
var sleep = require('sleep-promise');
var { describe, it , after, before} = require('selenium-webdriver/testing');
var Page = require('../lib/admin_dashboard');
var Page = require('../lib/admin_dashboard_permissions');
var Page = require('../lib/student_home_page');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var should = chai.should();
var page;
chai.use(chaiAsPromised);
var trys = 2
if(Dev){
  var trys = 0
}

function tests(browser){
  describe('revprep app scenarios - '+browser, function(){
    // this.timeout(20000);
    this.timeout(30000);
    beforeEach(function(){
      page = new Page(browser);
      page.driver.manage().window().setPosition(0, 0);
      page.driver.manage().window().setSize(1600,1080);
      page.visit('https://admin.rev-prep.com/login');
      // page.loginAdmin('permissions@permissions.com','revprep123');
      // page.loginAdmin('justice.sommer@revolutionprep.com','revprep123');
      // page.dismissRingCentralModal()
      // .then(() => sleep(500));
    });
    afterEach(function(){
      if(Dev){
        return
      }
      page.quit();
    });

    var adminDashSections = ["", "", "", "Home", "Call List", "Leads", "Customers", "Lead Sources", "Tutor Search", "Advisor Teams", "Tutor Teams", "Students", "Parents", "Tutors", "Employees", "Course Search", "Session Search", "Departmens", "Test Dates", "Transactions", "Daily Sales", "Advisor Activity", "Shipments", "Materials", "Payrolls", "Refunds", "Essay Graders", "Coupons"]

    function gotoCouponsScreen(){
      return page.clickElement('/html/body/ui-view/app/div/div/sidebar/nav/div/a[9]/span','xpath')
      .then(() => sleep(500))
    }

    var permissions = [
      {
        name:"Operations",
        singleItems: ["Home","Call List","Shipments","Materials","Refunds","Coupons"],
        sectionsAndItems: [
          {header: "Advisor", items :["Leads","Customers","Lead Sources","Tutor Search"]},
          {header: "Teams", items :["Advising Teams","Tutor Teams"]},
          {header: "Users", items :["Students","Parents"]},
          {header: "Courses", items :["Course Search","Session Search","Test Dates"]},
          {header: "Reports", items :["Transactions Report","Daily Sales Report","Advisor Activity Report"]},
          {header: "Essays", items :["Essay Graders"]}
        ],
      }
      ,
      {
        name:"Academic Advisor",
        singleItems: ["Home","Call List"],
        sectionsAndItems: [
          {header: "Advisor", items :["Leads","Customers","Lead Sources","Tutor Search"]},
          {header: "Teams", items :["Advising Teams"]},
          {header: "Users", items :["Students","Parents"]},
          {header: "Courses", items :["Course Search"]},
          {header: "Reports", items :["Transactions Report","Daily Sales Report","Advisor Activity Report"]}
        ],
      }


    ]

    for (var y = permissions.length - 1; y >= 0; y--) {
      
      navbarItemTest(permissions[y]["name"],permissions[y]["singleItems"],permissions[y]["sectionsAndItems"]);
    }

    function setTitle(title){
     
      // console.log("setTitle is happening");
      // page.visit('https://admin.rev-prep.com/employees/2327/contacts')
      var ret = sleep(500)
      .then(() => page.openEditEmployeeModal(title))
      .then(() => sleep(500))
      .then(() => page.setTitleFromEditEmployeeModal(title))
      .then(() => page.clickUpdateEditEmployeeModal(title))
      .then(() => page.openEditEmployeeModal(title))
      return ret
    }

    function navbarItemTest(name,singleItems,sectionsAndItems){
      it('Set '+name+' as the users Title', function(){
        page.loginAdmin('justice.sommer@revolutionprep.com','revprep123')
        .then(() => setTitle(name))

        var titleSelected = page.checkTitleFromEditEmployeeModal(name)
          titleSelected.sel.should.eventually.equal('true',name+" is not set as employee title");
      });
      it(name+' role provides correct Navbar items', function(){

      page.loginAdmin('permissions@permissions.com','revprep123')
        
        this.retries(trys)
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
          moreSectionItems.should.eventually.equal(false,header+" has at least one extra item.");
        }
      });
    }
  })
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

for (var i = Browserss.length - 1; i >= 0; i--) {
  tests(Browserss[i])
};