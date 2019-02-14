/**
 * This script will drive all interactions having to do with the Student Dashboard
 */

const {Builder, By, until, Key, WebDriver}               = require("selenium-webdriver");
const {assert, expect}                                   = require("chai");
const Student                                            = require("../lib/student");
const StudentDashboard                                   = require("../lib/student_home_page_updated");
require("chromedriver");

const student = new Student();
const page    = new StudentDashboard();

describe("Testing logging into the Student Dashboard", async function(){

    it("Log in page for Student Dashboard appears", async function(){
        await page.openPage();
        let title = await page.getPageTitle();
        expect(title).to.equal("Revolution Prep: Login");
     });

     it("should be able to log in", async function(){
        let loginUsername = student.getUsername();
        let loginPassword = student.getPassword();

        await page.driver.wait(until.elementLocated(page.locators.passwordLocator));
        await page.driver.wait(until.elementLocated(page.locators.userNameLocator));

        await page.logintoSite(loginUsername, loginPassword);
     });

});
