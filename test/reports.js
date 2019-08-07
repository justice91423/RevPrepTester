var {Dev,trys,adminBrowserss,Browserss,webdriver,sleep,describe,it,after,before,chai,chaiAsPromised,should,sourceFile_credentials,addContext} = require('../lib/top')

var Page = require('../lib/admin_dashboard');
var Page = require('../lib/admin_dashboard_new_lead_modal');
var Page = require('../lib/admin_dashboard_new_school_modal');
var Page = require('../lib/admin_dashboard_new_lead_source_modal');
var Page = require('../lib/admin_dashboard_CRM');
var Page = require('../lib/admin_dashboard_advisor_leads');
var Page = require('../lib/admin_dashboard_advisor_lead_sources');
var Page = require('../lib/student_home_page');
var Page = require('../lib/tasks');
var Page = require('../lib/purchase');
var Page = require('../lib/admin_dashboard_transactions_report');
var Page = require('../lib/admin_dashboard_daily_sales_report');
var transactionReportSelector = require('../lib/admin_dashboard_xpaths.js').transactionReportXpaths;
var dailySalesReportSelector = require('../lib/admin_dashboard_xpaths.js').dailySalesReportXpaths;
var username = sourceFile_credentials.credentials_a['wonka_tester']['username'];
var password = sourceFile_credentials.credentials_a['wonka_tester']['password'];
var userFirstName = sourceFile_credentials.credentials_a['wonka_tester']['firstName'];
var userLastName = sourceFile_credentials.credentials_a['wonka_tester']['lastName'];
chai.use(chaiAsPromised);
var assert = chai.assert;

for (var i = adminBrowserss.length - 1; i >= 0; i--) {
  tests(adminBrowserss[i])
};

function tests(browser){
  describe('Admin Dashboard Reports scenarios - '+browser, function(){
    // this.timeout(20000);
    if(browser=='internet explorer'){
        this.timeout(90000);
    }else{
        this.timeout(90000);
    }
    
    beforeEach(function(){
        page = new Page(browser);
        page.driver.manage().window().setPosition(0, 0);
        page.driver.manage().window().setSize(1600,1080);
        
    });
    afterEach(function(){
        addContext(this, 'screenshots/'+this.currentTest.title.replace(/ /g,"_")+'.png');
        page.screenshot(this.currentTest.title.replace(/ /g,"_"))
        trys = page.adjustTrys(this.currentTest.state,trys)
        if(Dev){
        return
        }
        page.quit();
    });

      it('Transaction report Membership purchase', function(done){
        this.retries(trys)

        var parentFirstName = page.randomString(10,"alpha");
        var parentLastName = page.randomString(10,"alpha");
        var studentFirstName = page.randomString(10,"alpha");
        var studentLastName = page.randomString(10,"alpha");
        page.visit('https://admin.rev-prep.com/login');
        page.loginAdmin(username,password)
        .then(() => sleep(5000))
        .then(() => page.purchaseMembership(parentFirstName,parentLastName,studentFirstName,studentLastName))
        .then(() => page.clickReportsOption("transactions"))
        .then(() => sleep(500))
        .then(() => page.enterFiltersTransactionReport(["Retail"],["Membership"]))
        .then(() => page.clickSearchButtonTransactionReport())
        .then(() => sleep(2500))
        .then(() => page.clickDateTimeSorterTransactionReport())
        .then(() => sleep(3500))
        .then(() => {
            var verificationText = page.getInnerHTML(transactionReportSelector.trasactionListing(studentFirstName,studentLastName,"Revenue"),'xpath')
            verificationText.txt.should.eventually.include("$99", "the Revenue was wrong");
        })
        .then(() => {
            var verificationText = page.getInnerHTML(transactionReportSelector.trasactionListing(studentFirstName,studentLastName,"Advisor"),'xpath')
            verificationText.txt.should.eventually.include("Wonka_tester rainforest", "The advisor was wrong");
        })
        .then(() => {
            page.enterFiltersTransactionReport(["Retail"],["Private Tutoring"],[],false,false,false,false,"Admin Dashboard")
            .then(() => page.clickSearchButtonTransactionReport())
            .then(() => sleep(2500))
            .then(() => page.clickDateTimeSorterTransactionReport())
            .then(() => sleep(3500))
            .then(() => page.findAnyListing(transactionReportSelector.trasactionListing(studentFirstName,studentLastName,"Advisor")))
            .then((gotten) => assert.lengthOf(gotten, 0, "the Membership transactions appeared when the brand was set to Private Tutoring"))
            .then(() => done())
        })
      });


    it('Transaction report Membership purchase from Website', function(done){
        this.retries(trys)

        var parentFirstName = page.randomString(10,"alpha");
        var parentLastName = page.randomString(10,"alpha");
        var studentFirstName = page.randomString(10,"alpha");
        var studentLastName = page.randomString(10,"alpha");
        page.purchaseMembershipPublic(parentFirstName,parentLastName,studentFirstName,studentLastName)
        .then(() => page.visit('https://admin.rev-prep.com/login'))
        .then(() => page.loginAdmin(username,password))
        .then(() => sleep(5000))
        .then(() => page.clickReportsOption("transactions"))
        .then(() => sleep(500))
        .then(() => page.enterFiltersTransactionReport(["Retail"],["Membership"],[],false,false,false,false,"Website"))
        .then(() => page.clickSearchButtonTransactionReport())
        .then(() => sleep(2500))
        .then(() => page.clickDateTimeSorterTransactionReport())
        .then(() => sleep(3500))
        .then(() => {
            var verificationText = page.getInnerHTML(transactionReportSelector.trasactionListing(studentFirstName,studentLastName,"Revenue"),'xpath')
            verificationText.txt.should.eventually.include("$99", "the Revenue was wrong");
        })
        .then(() => {
            var verificationText = page.getInnerHTML(transactionReportSelector.trasactionListing(studentFirstName,studentLastName,"Advisor"),'xpath')
            verificationText.txt.should.eventually.include("N/A", "The advisor was wrong");
        })
        // .then(() => {
        //     page.enterFiltersTransactionReport(["Retail"],["Membership"],[],false,false,false,false,false,true)
        //     .then(() => page.clickSearchButtonTransactionReport())
        //     .then(() => sleep(2500))
        //     // .then(() => page.clickDateTimeSorterTransactionReport())
        //     // .then(() => sleep(3500))
        //     .then(() => page.findAnyListing(transactionReportSelector.trasactionListing(studentFirstName,studentLastName,"Advisor")))
        //     .then((gotten1) => {
        //         console.log("gotten1 ",gotten1," gotten1.length ",gotten1.length)
        //         assert.lengthOf(gotten1, 0, "the Membership transactions appeared when Third Party was set to Yes")
        //     })
        // })
        .then(() => {
            page.enterFiltersTransactionReport(["Retail"],["Membership"],[],false,false,false,false,"Admin Dashboard")
            .then(() => page.clickSearchButtonTransactionReport())
            .then(() => sleep(2500))
            .then(() => page.clickDateTimeSorterTransactionReport())
            .then(() => sleep(3500))
            .then(() => page.findAnyListing(transactionReportSelector.trasactionListing(studentFirstName,studentLastName,"Advisor")))
            .then((gotten2) => assert.lengthOf(gotten2, 0, "the Membership transactions appeared when the Order Type was set to Admin Dashboard"))
            .then(() => done())
        })
    });



      it('Transaction report Private Tutoring purchase', function(done){
        this.retries(trys)

        var parentFirstName = page.randomString(10,"alpha");
        var parentLastName = page.randomString(10,"alpha");
        var studentFirstName = page.randomString(10,"alpha");
        var studentLastName = page.randomString(10,"alpha");
        page.visit('https://admin.rev-prep.com/login');
        page.loginAdmin(username,password)
        .then(() => sleep(5000))
        .then(() => page.visit('https://enroll.rev-prep.com/cart/tutor-packages'))
        .then(() => page.addPtHoursToCart("PSAT/NMSQT", "Advanced", 3, 10, 129, true, false))
        .then(() => page.completePurchaseFromCart(parentFirstName,parentLastName,studentFirstName,studentLastName))
        // page.purchaseMembership(parentFirstName,parentLastName,studentFirstName,studentLastName)
        .then(() => page.clickReportsOption("transactions"))
        .then(() => sleep(500))
        .then(() => page.enterFiltersTransactionReport(["Retail"],["Private Tutoring"]))
        .then(() => page.clickSearchButtonTransactionReport())
        .then(() => sleep(2500))
        .then(() => page.clickDateTimeSorterTransactionReport())
        .then(() => sleep(3500))
        .then(() => {
          var verificationText = page.getInnerHTML(transactionReportSelector.trasactionListing(studentFirstName,studentLastName,"Revenue"),'xpath')
          verificationText.txt.should.eventually.include("$1,290", "the Revenue was wrong");
        })
        .then(() => {
          var verificationText = page.getInnerHTML(transactionReportSelector.trasactionListing(studentFirstName,studentLastName,"Advisor"),'xpath')
          verificationText.txt.should.eventually.include("Wonka_tester rainforest", "The advisor was wrong");
        })
        .then(() => {
          page.enterFiltersTransactionReport(["Retail"],["Membership"])
          .then(() => page.clickSearchButtonTransactionReport())
          .then(() => sleep(2500))
          .then(() => page.clickDateTimeSorterTransactionReport())
          .then(() => sleep(3500))
          .then(() => page.findAnyListing(transactionReportSelector.trasactionListing(studentFirstName,studentLastName,"Advisor")))
          .then((gotten) => assert.lengthOf(gotten, 0, "the Private Tutoring transactions appeared when the brand was set to Membership"))
          .then(() => done())
        })
      });

        it('Daily Sales Report after Private Tutoring purchase', function(done){
            this.retries(trys)
            var parentFirstName = page.randomString(10,"alpha");
            var parentLastName = page.randomString(10,"alpha");
            var studentFirstName = page.randomString(10,"alpha");
            var studentLastName = page.randomString(10,"alpha");
            var originalSales =""
            var originalNewTutoringParents =""

            page.visit('https://admin.rev-prep.com/login');
            page.loginAdmin(username,password)
            .then(() => sleep(5000))
            .then(() => page.clickReportsOption("daily-sales"))
            .then(() => sleep(500))
            .then(() => page.enterFiltersDailySalesReport(false,"Me",false))
            .then(() => page.clickSearchButtonDailySalesReport())
            .then(() => sleep(5000))
            .then(() => {
                page.find(dailySalesReportSelector.Listing(userFirstName,userLastName,"Sales"),'xpath').getText()
                .then((gotten) => {
                    originalSales = Number(gotten.replace(/[^0-9.-]+/g,""))
                    sleep(100);
                })
            })
            .then(() => {
                page.find(dailySalesReportSelector.Listing(userFirstName,userLastName,"New Tutoring Parents"),'xpath').getText()
                .then((gotten) => {
                    originalNewTutoringParents = Number(gotten)
                    sleep(100);
                })
            })
            .then(() => page.visit('https://enroll.rev-prep.com/cart/tutor-packages'))
            .then(() => page.addPtHoursToCart("PSAT/NMSQT", "Advanced", 3, 10, 129, true, false))
            .then(() => page.completePurchaseFromCart(parentFirstName,parentLastName,studentFirstName,studentLastName))
            .then(() => page.clickReportsOption("daily-sales"))
            .then(() => sleep(500))
            .then(() => page.enterFiltersDailySalesReport(false,"Me",false))
            .then(() => page.clickSearchButtonDailySalesReport())
            .then(() => sleep(2500))
            .then(() => {
                page.find(dailySalesReportSelector.Listing(userFirstName,userLastName,"Sales"),'xpath').getText()
                .then((gotten) => {
                    gotten = Number(gotten.replace(/[^0-9.-]+/g,""))
                    gotten.should.equal(originalSales+1540, "Sales is not correct");
                })
            })
            .then(() => {
                page.find(dailySalesReportSelector.Listing(userFirstName,userLastName,"New Tutoring Parents"),'xpath').getText()
                .then((gotten) => {
                    gotten = Number(gotten)
                    gotten.should.equal(originalNewTutoringParents+1, "New Tutoring Parents is not correct");
                })
            })
            .then(() => done()) 
        });
    })
}

