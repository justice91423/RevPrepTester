const {By, until, Key, Builder} = require("selenium-webdriver");

const StudentDasboard = require("../lib/student_home_page_updated");

class StudentDashboardHome extends StudentDasboard{
    
constructor(){
    super();
    let currentTitle = "Home";
    
    this.homeLocators = {
        subjectModal: By.tagName("study-area-edit-modal"),
        reviewModal: By.tagName('reviews-modal')
    }



}

async subjectModal(){

let subjectModal = await this.driver.findElement(By.tagName('study-area-edit-modal'));
let modal_header = await subjectModal.findElement(By.className('study-area-edit-modal__header'));
let modalText = await modal_header.findElement(By.tagName('h2')).getText();
return modalText;
}

async dismissSubjecModal(){
let subjectModal = await this.driver.findElement(By.tagName('study-area-edit-modal'));
let modal_header = await subjectModal.findElement(By.className('study-area-edit-modal__header'));
let closeModalButton = await modal_header.findElement(By.tagName('button'));
closeModalButton.click();
}

async reviewsModal(){
let reviewmodal = await this.driver.findElement(this.homeLocators.reviewModal);
let modalBody = await reviewmodal.findElement(By.css("div.modal-body"));
let submitBtn = await modalBody.findElement(By.css('button'));
let text = submitBtn.getText();
return text;
}

async dismissReviewsModal(){
    let reviewmodal = await this.driver.findElement(this.homeLocators.reviewModal);
    let modalBody = await reviewmodal.findElement(By.css("div.modal-body"));
    let submitBtn = await modalBody.findElement(By.css('button'));
    submitBtn.click();
}


async getPageTitle(){
    await this.driver.wait(until.titleIs("Home"));
    let title = await this.driver.getTitle();
    return title;
    }
}

module.exports = StudentDashboardHome;