const {By, until, Key, Builder} = require("selenium-webdriver");




/**
 * This will serve as the base class for subsequent page interactions dealing with the Student Dashboard
 */
class StudentDashboard {
constructor(){
    this.driver = new Builder().forBrowser("chrome").build();
    let currentTitle = "Revolution Prep: Login";
    this.locators = {

        userNameLocator: By.css("form[name='ctrl.form'] > div.form-group > input[name=login]"),
        passwordLocator: By.css("form[name='ctrl.form'] > div.form-group > input[name=password]"),
        logInBtn: By.css("button[type='submit'].btn")
        }
    
    this.mainUrl = "https://student.rev-prep.com/login/en";
   
        }   
    /**
     * opens to the login page for the student dashboard
     */
    openPage() {
        this.driver.get(this.mainUrl);
    }

    /**
     * 
     * @param {object} username is an attribute of the student object being passed in.
     * @param {object} password is an attribute of the student object being passed in.
     */

    async logintoSite(username, password){
        let usernameField = await this.driver.findElement(this.locators.userNameLocator);
        let passwordField = await this.driver.findElement(this.locators.passwordLocator);

        await usernameField.sendKeys(username);
        await passwordField.sendKeys(password);

        this.clickLogInBtn();
    }

    /** clicks the login button on the log in screen
     * @returns {void}
     */
    clickLogInBtn(){
        this.driver.findElement(this.locators.logInBtn).click();
    }
    
    /**
     * closes the page
     */
    closePage(){
        this.driver.quit();
    }

    async getPageTitle(){
        await this.driver.wait(until.titleIs(this.currentTitle));
        let title = await this.driver.getTitle();
        return title;
    }

    


}

module.exports = StudentDashboard;
