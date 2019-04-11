module.exports.newLeadModalXpaths = {
  firstNameField:'//*[@name="first_name"]',
  lastNameField:'//*[@name="last_name"]',
  emailField:'//*[@name="email"]',
  phoneField:'//*[@name="phone"]',
  addressField:'//*[@id="google_place"]',
  leadSourceField:'//*[@name="source"]',
  timeZoneField:'//*[@name="time_zone_record"]',
  statusField:'//*[@name="status"]',
  notesField:'//*[@name="notes"]',
  addStudentButton:'//a[contains(., "Add student")]',
  studentFirstNameField:'//*[@name="student_first_name_[studentCount]"]',
  studentLastNameField:'//*[@name="student_last_name_[studentCount]"]',
  studentGradeField:'//*[@name="student_grade_level_[studentCount]"]',
  studentTimeZoneField: function(studentCount){
    return '//select[@name="time_zone_'+(studentCount-1)+'"]'
  },
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
  categoryField:'//*[@name="category"]',
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

module.exports.dailySalesReportXpaths = {
  dateField:'//input[@name="start_date"]',
  advisorField:'//select[@name="employee_id"]',
  departmentField:'//select[@name="departmentId"]',
  resetButton:'//button[@name="clear_search"]',
  searchButton:'//button[contains(., "Search")]',

  Listing: function(advisorFirstName,advisorLastName,columnName){
    var columns = ["DUMMY SPACE","Booked","Collected","New Tutoring Parents","Repurchase","Goal","Sales","Pacing to Goal"];
    var columnNumber = columns.indexOf(columnName)
    return '//td[contains(text(), "'+advisorFirstName+' '+advisorLastName+'")]/./following-sibling::td['+columnNumber+']'
  }
}

module.exports.couponsPageXpaths = {
  newCouponButton:'//button[contains(., "New Coupon")]',
  statusField:'//select[@name="status"]',
  categoryField:'//select[@name="category"]',
  nameField:'//input[@name="name"]',
  codeField:'//input[@name="code"]',
  clearButton:'//button[contains(., "Clear")]',
  searchButton:'//button[contains(., "Search")]',
  firstSearchResultName:'/html/body/ui-view/app/div/div/div/div/ui-view/coupons/table/tbody/tr[1]/td[1]'
}

module.exports.newCouponModalXpaths = {
  nameField:'//coupon-modal//input[@name="name"]',
  expirationDateField:'//coupon-modal//input[@name="expiration_date"]',
  departmentField:'//coupon-modal//select[@name="department"]',
  categoryField:'//coupon-modal//select[@name="category"]',
  descriptionField:'//coupon-modal//textarea[@name="description"]',
  discountAmountField:'//coupon-modal//input[@name="amount"]',
  lineItemMinAmountField:'//coupon-modal//input[@name="threshold"]',
  dollarsRadio:'//coupon-modal//input[@id="dollars"]',
  percentageRadio:'//coupon-modal//input[@id="percentage"]',
  applyToEachLineItemToggle:'//coupon-modal//input[@id="apply_to_each_line_item"]/following-sibling::div',
  customRecurrenceToggle:'//coupon-modal//input[@id="custom_recurrence"]/following-sibling::div',
  customRecurrenceField:'//coupon-modal//input[@name="occurrences"]',
  limitRedemptionsToggle:'//coupon-modal//input[@id="limit_redemptions"]/following-sibling::div',
  redemptionsLimitField:'//coupon-modal//input[@name="redeem_limit"]',
  restrictedToField:'//coupon-modal//select[@name="deliverable_type"]',
  createButton:'//coupon-modal//button[contains(., "Create")]',
  couponCodeField:'//textarea[@name="couponCodes"]',
  saveCouponCodesButton:'//button[contains(., "Save")]'
}

module.exports.usersPageXpaths = {
  searchField:'//input[@name="basic_keyword_search"]',
  searchButton:'//button[contains(., "Search")]',
  firstSearchResult:'/html/body/ui-view/app/div/div/div/div/ui-view/users/div/div[2]/ui-view/employee-search/div[3]/div[1]/table/tbody/tr/td[1]/a'
}

module.exports.employeePageXpaths = {
  editEmployeeButton:'//button[contains(., "Edit Employee")]',
  addNoteButton:'//button[contains(., "Add Note")]',
  noteTextarea:'//textarea[@name="new_note"]',
}

module.exports.editEmployeeModalXpaths = {
  firstNameField:'//employee-modal//input[@name="first_name"]',
  lastNameField:'//employee-modal//input[@name="last_name"]',
  revolutionPhoneField:'//employee-modal//input[@name="phone"]',
  revolutionEmailField:'//employee-modal//input[@name="email"]',
  personalPhoneField:'//employee-modal//input[@name="personal_phone"]',
  personalEmailField:'//employee-modal//input[@name="personal_email"]',
  timesoneField:'//employee-modal//select[@name="time_zone"]',
  scheduleURLField:'//employee-modal//input[@name="schedule_url"]',
  friendlyURLField:'//employee-modal//input[@name="param"]',
  titleField:'//employee-modal//select[@name="title"]',
  updateButton:'//employee-modal//button[contains(., "Update")]'
}

module.exports.refundsPageXpaths = {
  departmentCheckbox: function(department){
    return '//span[text()="'+department+'"]'
  },
  parentField:'//input[@id="parent_search_value"]',
  advisorField:'//input[@id="requested_by_search_value"]',
  statusField:'//select[@name="status"]',
  refundCategoryField:'//select[@name="category"]',
  refundReasonField:'//select[@name="reason"]',

  clearButton:'//button[contains(., "Clear")]',
  searchButton:'//button[contains(., "Search")]',
  Listing: function(parentFirstName,parentLastName,columnName){
    var columns = ["DUMMY SPACE","Requested By","Refund Amount","Refund Category","Refund Reason","viewButton"];
    var columnNumber = columns.indexOf(columnName)
    return '//a[contains(text(), "'+parentFirstName+' '+parentLastName+'")]/../following-sibling::td['+columnNumber+']'
  }
}

module.exports.ordersPageXpaths = {
  editButton:'//button[contains(., "Edit")]',
  makeAdjustmentButton:'//button[contains(., "Make Adjustment")]',
  requestRefundForm:{
    refundAmountField:'//input[@name="amount"]',
    refundCatigoryField:'//input[@name="refundCategory"]',
    refundReasonField:'//input[@name="refundReason"]',
    notesField:'//input[@name="notes"]',
    cancelButton:'//button[contains(., "Cancel")]',
    ConfirmButton:'//button[contains(., "Confirm")]'
  },
  requestRefundButton:'//button[contains(., "Request Refund")]',
  payButton:'//button[contains(., "pay")]',
  payCreditCardButton:'//button[contains(., "Credit Card")]',
  paySchedulePaymentsButton:'//button[contains(., "Schedule Payments")]',
  resendConfirmationEmailButton:'//button[contains(., "Resend Confirmation Email")]'

}

