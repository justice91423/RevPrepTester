// module.exports.permissions_a = [
//   {
//     name:"Wonka",
//     optionNumber:1,
//     singleItems: ["Home","Call List","Shipments","Materials","Payrolls","Refunds","Coupons"],
//     sectionsAndItems: [
//       {header: "Advisor", items :["Leads","Customers","Lead Sources","Tutor Search"]},
//       {header: "Teams", items :["Advising Teams","Tutor Teams"]},
//       {header: "Users", items :["Students","Parents","Tutors","Employees"]},
//       {header: "Courses", items :["Course Search","Session Search","Departments","Test Dates"]},
//       {header: "Reports", items :["Transactions Report","Daily Sales Report","Advisor Activity Report"]},
//       {header: "Essays", items :["Essay Graders"]}
//     ],
//   }
// ]


module.exports.permissions_a = [
  {
    name:"Wonka",
    optionNumber:1,
    singleItems: ["Home","Call List","Shipments","Materials","Payrolls","Refunds","Coupons"],
    sectionsAndItems: [
      {header: "Advisor", items :["Leads","Customers","Lead Sources","Tutor Search"]},
      {header: "Teams", items :["Advising Teams","Tutor Teams"]},
      {header: "Users", items :["Students","Parents","Tutors","Employees"]},
      {header: "Courses", items :["Course Search","Session Search","Departments","Test Dates"]},
      {header: "Reports", items :["Transactions Report","Daily Sales Report","Advisor Activity Report"]},
      {header: "Essays", items :["Essay Graders"]}
    ],
  }
  ,
  {
    name:"Director of Academic Advising",
    optionNumber:2,
    singleItems: ["Home","Call List","Payrolls"],
    sectionsAndItems: [
      {header: "Advisor", items :["Leads","Customers","Lead Sources","Tutor Search"]},
      {header: "Teams", items :["Advising Teams"]},
      {header: "Users", items :["Students","Parents","Tutors","Employees"]},
      {header: "Courses", items :["Course Search"]},
      {header: "Reports", items :["Transactions Report","Daily Sales Report","Advisor Activity Report"]}
    ],
  }
  ,
  {
    name:"Advising Manager",
    optionNumber:3,
    singleItems: ["Home","Call List"],
    sectionsAndItems: [
      {header: "Advisor", items :["Leads","Customers","Lead Sources","Tutor Search"]},
      {header: "Teams", items :["Advising Teams"]},
      {header: "Users", items :["Students","Parents"]},
      {header: "Courses", items :["Course Search"]},
      {header: "Reports", items :["Transactions Report","Daily Sales Report","Advisor Activity Report"]}
    ],
  }
  ,
  {
    name:"Academic Advisor",
    optionNumber:4,
    singleItems: ["Home","Call List"],
    sectionsAndItems: [
      {header: "Advisor", items :["Leads","Customers","Lead Sources","Tutor Search"]},
      {header: "Teams", items :["Advising Teams"]},
      {header: "Users", items :["Students","Parents"]},
      {header: "Courses", items :["Course Search"]},
      {header: "Reports", items :["Transactions Report","Daily Sales Report","Advisor Activity Report"]}
    ],
  }
  ,
  {
    name:"Director of Instruction Manager",
    optionNumber:5,
    singleItems: ["Home","Payrolls"],
    sectionsAndItems: [
      {header: "Teams", items :["Advising Teams","Tutor Teams"]},
      {header: "Users", items :["Students","Parents","Tutors","Employees"]},
      {header: "Courses", items :["Course Search","Session Search","Test Dates"]},
      {header: "Reports", items :["Transactions Report","Daily Sales Report","Advisor Activity Report"]},
      {header: "Essays", items :["Essay Graders"]}
    ],
  }
  ,
  {
    name:"Instruction Manager",
    optionNumber:6,
    singleItems: ["Home","Payrolls"],
    sectionsAndItems: [
      {header: "Teams", items :["Advising Teams","Tutor Teams"]},
      {header: "Users", items :["Students","Parents","Tutors","Employees"]},
      {header: "Courses", items :["Course Search","Session Search","Test Dates"]},
      {header: "Reports", items :["Transactions Report","Daily Sales Report","Advisor Activity Report"]},
      {header: "Essays", items :["Essay Graders"]}
    ],
  }
  ,
  {
    name:"Director of Finance and Analytics",
    optionNumber:7,
    singleItems: ["Home","Payrolls","Refunds"],
    sectionsAndItems: [
      {header: "Teams", items :["Advising Teams"]},
      {header: "Users", items :["Students","Parents"]},
      {header: "Courses", items :["Course Search"]},
      {header: "Reports", items :["Transactions Report","Daily Sales Report","Advisor Activity Report"]}
    ],
  }
  ,
  {
    name:"Accountant",
    optionNumber:8,
    singleItems: ["Home","Payrolls"],
    sectionsAndItems: [
      {header: "Teams", items :["Advising Teams"]},
      {header: "Users", items :["Students","Parents"]},
      {header: "Courses", items :["Course Search"]},
      {header: "Reports", items :["Transactions Report","Daily Sales Report","Advisor Activity Report"]}
    ],
  }
  ,
  {
    name:"Operations",
    optionNumber:9,
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
    name:"Human Resources",
    optionNumber:10,
    singleItems: ["Home","Payrolls"],
    sectionsAndItems: [
      {header: "Teams", items :["Advising Teams"]},
      {header: "Users", items :["Students","Parents","Tutors","Employees"]},
      {header: "Courses", items :["Course Search"]},
      {header: "Reports", items :["Transactions Report","Daily Sales Report","Advisor Activity Report"]}
    ],
  }
  ,
  {
    name:"Business Analyst",
    optionNumber:11,
    singleItems: ["Home"],
    sectionsAndItems: [
      {header: "Teams", items :["Advising Teams"]},
      {header: "Users", items :["Students","Parents"]},
      {header: "Courses", items :["Course Search"]},
      {header: "Reports", items :["Transactions Report","Daily Sales Report","Advisor Activity Report"]}
    ],
  }
  ,
  {
    name:"Admin",
    optionNumber:12,
    singleItems: ["Home"],
    sectionsAndItems: [
      {header: "Teams", items :["Advising Teams"]},
      {header: "Users", items :["Students","Parents"]},
      {header: "Courses", items :["Course Search"]},
      {header: "Reports", items :["Transactions Report","Daily Sales Report","Advisor Activity Report"]}
    ],
  }
];

    