const {Builder, By, until, Key, WebDriver, }               = require("selenium-webdriver");
const {assert, expect}                                     = require("chai");
const Student                                              = require("../lib/student");
const StudentPage                                          = require("../lib/student_dashboard_home");
require("chromedriver");

const student = new Student();
const page    = new StudentPage();

describe("Testing the Home page", async function(){
    it("should verify that I am on the Home page", async function(){
        await page.openPage();
        let currentPageTitle;
        let loginUsername = student.getUsername();
        let loginPassword = student.getPassword();
        await page.driver.wait(until.elementLocated(page.locators.passwordLocator));
        await page.driver.wait(until.elementLocated(page.locators.userNameLocator));

        await page.logintoSite(loginUsername, loginPassword);
        await page.driver.wait(until.titleIs("Home"));
        currentPageTitle = await page.driver.getTitle();
        expect(currentPageTitle).to.equal("Home");
        
    });

    it("Located the first modal", async function(){
        let modalText = await page.subjectModal();
        let modifiedText = modalText.substr(0,14);
        if(modifiedText === `Hello ${student.first_name}!`){
             page.dismissSubjecModal();
        } else {
            console.log('Subject Modal was closed previously');
        }
        
    })

    it("located the second modal", async function(){
        let text = await page.reviewsModal();
        console.log(text);
       if(text === 'Submit Review'){
        page.dismissReviewsModal();
        page.driver.executeScript("window.scrollTo({top:100,left:100,behavior:'smooth'});");
       }
    })
})