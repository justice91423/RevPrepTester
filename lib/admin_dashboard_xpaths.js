module.exports.newLeadModalXpaths = {
  firstNameField:'//*[@name="first_name"]',
  lastNameField:'//*[@name="last_name"]',
  emailField:'//*[@name="email"]',
  phoneField:'//*[@name="phone"]',
  addressField:'//*[@id="google_place"]',
  leadSourceField:'//*[@name="source"]',
  timeZoneField:'(//*[@name="time_zone"])',
  statusField:'//*[@name="status"]',
  notesField:'//*[@name="notes"]',
  addStudentButton:'//a[contains(., "Add student")]',
  studentFirstNameField:'//*[@name="student_first_name_[studentCount]"]',
  studentLastNameField:'//*[@name="student_last_name_[studentCount]"]',
  studentGradeField:'//*[@name="student_grade_level_[studentCount]"]',
  vipToggle:'//*[@id="vip"]/following-sibling::div',
  emailError:'//h6[contains(., "This email is already taken!")]',
  createButton:'//button[contains(., "Create")]',
  exitButton:'//button[contains(., "×")]'
}

module.exports.newSchoolModalXpaths = {
  leadSourceField:'//*[@name="name"]',
  categoryField:'//*[@name="category"]',
  schoolField:'//*[@name="school_type"]',
  leadSourcePhoneField:'//*[@name="institution_phone"]',
  addressField:'//*[@id="google_place"]',
  studentsField:'//*[@name="number_of_students"]',
  lowGradeField:'(//*[@name="low_grade"])',
  highGradeField:'//*[@name="high_grade"]',
  notesField:'//*[@name="notes"]',
  createButton:'//button[contains(., "Create")]',
  exitButton:'//button[contains(., "×")]'
}

module.exports.newLeadSourceModalXpaths = {
  leadSourceField:'//*[@name="name"]',
  catigoryField:'//*[@name="category"]',
  leadSourcePhoneField:'//*[@name="institution_phone"]',
  addAddressButton:'//a[contains(., "Add address info")]',
  removeAddressButton:'//a[contains(., "Remove address info")]',
  addressField:'//*[@id="google_place"]',
  notesField:'//*[@name="notes"]',
  createButton:'//button[contains(., "Create")]',
  exitButton:'//button[contains(., "×")]'
}

module.exports.transactionReportXpaths = {
  startingDateRangeField:'//input[@name="start_date"]',
  endingDateRangeField:'//input[@name="end_date"]',
  advisorField:'//select[@name="employee_id"]',
  schoolField:'//input[@name="school_id"]',
  sourceTypeField:'//select[@name="source"]',
  orderTypeField:'/html/body/ui-view/app/div/div/div/div/ui-view/ui-view/transactions-report/transactions-report-filters/div/div/div[2]/div[1]/div[2]/select',
  departmentCheckbox: function(department){
    return '//span[text()="'+department+'"]'
  },
  brandCheckbox: function(brand){
    return '//span[text()="'+brand+'"]'
  },
  segmentCheckbox: function(segment){
    return '//span[text()="'+segment+'"]'
  },
  thirdPartyOnlyToggle:'//input[@id="hidden"]/following-sibling::div',
  resetButton:'//button[@name="clear_search"]',
  searchButton:'//button[contains(., "Search")]',
  exportCSVButton:'//button[contains(., "Export CSV")]',
  trasactionListing: function(studentFirstName,studentLastName,columnName){
    var columns = ["DUMMY SPACE","School","Advisor","Source,","Source Detail","Order","Revenue"];
    var columnNumber = columns.indexOf(columnName)
    return '//a[contains(text(), "'+studentFirstName+' '+studentLastName+'")]/../following-sibling::td['+columnNumber+']'
  },
  dateTimeSorter:'//a[contains(., "Date/Time")]'
}