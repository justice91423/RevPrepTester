// module.exports.permissions_a = [
//   {
//     name:"Wonka",
//     optionNumber:1,
//     singleItems: ["Home","Call List","Shipments","Materials","Payrolls","Refunds","Coupons"],
//     sectionsAndItems: [
//       {header: "Advisor", items :["Family Search","Lead Sources","Tutor Search"]},
//       {header: "Teams", items :["Advising Teams","Tutor Teams"]},
//       {header: "Users", items :["Students","Parents","Tutors","Employees"]},
//       {header: "Courses", items :["Course Search","Session Search","Departments","Test Dates"]},
//       {header: "Reports", items :["Transactions Report","Daily Sales Report","Advisor Activity Report"]},
//       {header: "Essays", items :["Essay Graders"]}
//     ]
//   }
// ]


module.exports.permissions_a = [
  {
    name:"Wonka",
    optionNumber:1,
    singleItems: ["Home","Call List","Shipments","Materials","Payrolls","Refunds","Coupons"],
    sectionsAndItems: [
      {header: "Advisor", items :["Family Search","Lead Sources","Tutor Search"]},
      {header: "Teams", items :["Advising Teams","Tutor Teams"]},
      {header: "Users", items :["Students","Parents","Tutors","Employees"]},
      {header: "Courses", items :["Course Search","Session Search","Departments","Test Dates"]},
      {header: "Reports", items :["Transactions Report","Daily Sales Report","Advisor Activity Report"]},
      {header: "Essays", items :["Essay Graders"]}
    ],
    setLeadSourceAdvisor: false,
    setLeadSourceCloser: false,
    setLeadAdvisor: false
  }
  ,
  {
    name:"Director of Academic Advising",
    optionNumber:2,
    singleItems: ["Home","Call List","Payrolls"],
    sectionsAndItems: [
      {header: "Advisor", items :["Family Search","Lead Sources","Tutor Search"]},
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
      {header: "Advisor", items :["Family Search","Lead Sources","Tutor Search"]},
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
      {header: "Advisor", items :["Family Search","Lead Sources","Tutor Search"]},
      {header: "Teams", items :["Advising Teams"]},
      {header: "Users", items :["Students","Parents"]},
      {header: "Courses", items :["Course Search"]},
      {header: "Reports", items :["Transactions Report","Daily Sales Report","Advisor Activity Report"]}
    ],
    
  }
  ,
  {
    name:"Director of Instruction Management",
    optionNumber:5,
    singleItems: ["Home","Payrolls"],
    sectionsAndItems: [
      {header: "Advisor", items :["Family Search","Lead Sources"]},
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
      {header: "Advisor", items :["Family Search","Lead Sources"]},
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
      {header: "Advisor", items :["Family Search","Lead Sources"]},
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
      {header: "Advisor", items :["Family Search","Lead Sources"]},
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
      {header: "Advisor", items :["Family Search","Lead Sources","Tutor Search"]},
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
      {header: "Advisor", items :["Family Search","Lead Sources"]},
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
      {header: "Advisor", items :["Family Search","Lead Sources"]},
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
      {header: "Advisor", items :["Family Search","Lead Sources"]},
      {header: "Teams", items :["Advising Teams"]},
      {header: "Users", items :["Students","Parents"]},
      {header: "Courses", items :["Course Search"]},
      {header: "Reports", items :["Transactions Report","Daily Sales Report","Advisor Activity Report"]}
    ],
  }
];     



module.exports.permissions_roles = [
  {
    name:"Admin",
    singleItems: ["Home"],
    sectionsAndItems: [
      {header: "Advisor", items :["Family Search","Lead Sources"]},
      {header: "Teams", items :["Advising Teams"]},
      {header: "Users", items :["Students","Parents"]},
      {header: "Courses", items :["Course Search"]},
      {header: "Reports", items :["Transactions Report","Daily Sales Report","Advisor Activity Report"]}
    ],
    setLeadSourceAdvisor: false,
    setLeadSourceCloser: false,
    setLeadAdvisor: false
  }
   ,
  {
    name:"Academic Advisor",
    singleItems: ["Home","Call List"],
    sectionsAndItems: [
      {header: "Advisor", items :["Family Search","Lead Sources","Tutor Search"]},
      {header: "Teams", items :["Advising Teams"]},
      {header: "Users", items :["Students","Parents"]},
      {header: "Courses", items :["Course Search"]},
      {header: "Reports", items :["Transactions Report","Daily Sales Report","Advisor Activity Report"]}
    ],
    setLeadSourceAdvisor: false,
    setLeadSourceCloser: false,
    setLeadAdvisor: true
  }
  ,
  {
    name:"Accountant",
    singleItems: ["Home","Payrolls"],
    sectionsAndItems: [
      {header: "Advisor", items :["Family Search","Lead Sources"]},
      {header: "Teams", items :["Advising Teams"]},
      {header: "Users", items :["Students","Parents"]},
      {header: "Courses", items :["Course Search"]},
      {header: "Reports", items :["Transactions Report","Daily Sales Report","Advisor Activity Report"]}
    ],
    setLeadSourceAdvisor: false,
    setLeadSourceCloser: false,
    setLeadAdvisor: false
  }
  ,
  {
    name:"Advising Manager",
    singleItems: ["Home","Call List"],
    sectionsAndItems: [
      {header: "Advisor", items :["Family Search","Lead Sources","Tutor Search"]},
      {header: "Teams", items :["Advising Teams"]},
      {header: "Users", items :["Students","Parents"]},
      {header: "Courses", items :["Course Search"]},
      {header: "Reports", items :["Transactions Report","Daily Sales Report","Advisor Activity Report"]}
    ],
    setLeadSourceAdvisor: true,
    setLeadSourceCloser: false,
    setLeadAdvisor: true
  }
  ,
  {
    name:"Analyst",
    singleItems: ["Home"],
    sectionsAndItems: [
      {header: "Advisor", items :["Family Search","Lead Sources"]},
      {header: "Teams", items :["Advising Teams"]},
      {header: "Users", items :["Students","Parents"]},
      {header: "Courses", items :["Course Search"]},
      {header: "Reports", items :["Transactions Report","Daily Sales Report","Advisor Activity Report"]}
    ],
    setLeadSourceAdvisor: false,
    setLeadSourceCloser: false,
    setLeadAdvisor: false
  }
  ,
  {
    name:"Closer",
    singleItems: ["Home"],
    sectionsAndItems: [
      {header: "Advisor", items :["Family Search","Lead Sources"]},
      {header: "Teams", items :["Advising Teams"]},
      {header: "Users", items :["Students","Parents"]},
      {header: "Courses", items :["Course Search"]},
      {header: "Reports", items :["Transactions Report","Daily Sales Report","Advisor Activity Report"]}
    ],
    setLeadSourceAdvisor: false,
    setLeadSourceCloser: false,
    setLeadAdvisor: false
  }
  ,
  {
    name:"Contact",
    singleItems: ["Home"],
    sectionsAndItems: [
      {header: "Advisor", items :["Family Search","Lead Sources"]},
      {header: "Teams", items :["Advising Teams"]},
      {header: "Users", items :["Students","Parents"]},
      {header: "Courses", items :["Course Search"]},
      {header: "Reports", items :["Transactions Report","Daily Sales Report","Advisor Activity Report"]}
    ],
    setLeadSourceAdvisor: false,
    setLeadSourceCloser: false,
    setLeadAdvisor: false
  }
  ,
  {
    name:"Developer",
    singleItems: ["Home","Call List"],
    sectionsAndItems: [
      {header: "Advisor", items :["Family Search","Lead Sources","Tutor Search"]},
      {header: "Teams", items :["Advising Teams"]},
      {header: "Users", items :["Students","Parents"]},
      {header: "Courses", items :["Course Search","Departments"]},
      {header: "Reports", items :["Transactions Report","Daily Sales Report","Advisor Activity Report"]}
    ],
    setLeadSourceAdvisor: false,
    setLeadSourceCloser: false,
    setLeadAdvisor: false
  }
  ,
  {
    name:"Director of Academic Advising",
    optionNumber:2,
    singleItems: ["Home","Call List"],
    sectionsAndItems: [
      {header: "Advisor", items :["Family Search","Lead Sources","Tutor Search"]},
      {header: "Teams", items :["Advising Teams"]},
      {header: "Users", items :["Students","Parents"]},
      {header: "Courses", items :["Course Search"]},
      {header: "Reports", items :["Transactions Report","Daily Sales Report","Advisor Activity Report"]}
    ],
    setLeadSourceAdvisor: false,
    setLeadSourceCloser: false,
    setLeadAdvisor: true
  }
  ,
  {
    name:"Director of Finance and Analytics",
    optionNumber:7,
    singleItems: ["Home","Payrolls","Refunds"],
    sectionsAndItems: [
      {header: "Advisor", items :["Family Search","Lead Sources"]},
      {header: "Teams", items :["Advising Teams"]},
      {header: "Users", items :["Students","Parents"]},
      {header: "Courses", items :["Course Search"]},
      {header: "Reports", items :["Transactions Report","Daily Sales Report","Advisor Activity Report"]}
    ],
    setLeadSourceAdvisor: false,
    setLeadSourceCloser: false,
    setLeadAdvisor: false
  }
  ,
  {
    name:"Director of Instruction Management",
    optionNumber:5,
    singleItems: ["Home"],
    sectionsAndItems: [
      {header: "Advisor", items :["Family Search","Lead Sources"]},
      {header: "Teams", items :["Advising Teams","Tutor Teams"]},
      {header: "Users", items :["Students","Parents"]},
      {header: "Courses", items :["Course Search"]},
      {header: "Reports", items :["Transactions Report","Daily Sales Report","Advisor Activity Report"]}
    ],
    setLeadSourceAdvisor: false,
    setLeadSourceCloser: false,
    setLeadAdvisor: false
  }
  ,
  {
    name:"Faculty Leader",
    optionNumber:5,
    singleItems: ["Home"],
    sectionsAndItems: [
      {header: "Advisor", items :["Family Search","Lead Sources"]},
      {header: "Teams", items :["Advising Teams"]},
      {header: "Users", items :["Students","Parents"]},
      {header: "Courses", items :["Course Search"]},
      {header: "Reports", items :["Transactions Report","Daily Sales Report","Advisor Activity Report"]}
    ],
    setLeadSourceAdvisor: false,
    setLeadSourceCloser: false,
    setLeadAdvisor: false
  }
  ,
  {
    name:"Hr",
    optionNumber:5,
    singleItems: ["Home","Payrolls"],
    sectionsAndItems: [
      {header: "Advisor", items :["Family Search","Lead Sources"]},
      {header: "Teams", items :["Advising Teams"]},
      {header: "Users", items :["Students","Parents","Tutors","Employees"]},
      {header: "Courses", items :["Course Search"]},
      {header: "Reports", items :["Transactions Report","Daily Sales Report","Advisor Activity Report"]}
    ],
    setLeadSourceAdvisor: false,
    setLeadSourceCloser: false,
    setLeadAdvisor: false
  }
  ,
  {
    name:"Instruction Manager",
    optionNumber:5,
    singleItems: ["Home"],
    sectionsAndItems: [
      {header: "Advisor", items :["Family Search","Lead Sources"]},
      {header: "Teams", items :["Advising Teams","Tutor Teams"]},
      {header: "Users", items :["Students","Parents"]},
      {header: "Courses", items :["Course Search","Session Search","Test Dates"]},
      {header: "Reports", items :["Transactions Report","Daily Sales Report","Advisor Activity Report"]},
      {header: "Essays", items :["Essay Graders"]}
    ],
    setLeadSourceAdvisor: false,
    setLeadSourceCloser: false,
    setLeadAdvisor: false
  }
  ,
  {
    name:"Operations",
    optionNumber:9,
    singleItems: ["Home","Shipments","Materials","Refunds","Coupons"],
    sectionsAndItems: [
      {header: "Advisor", items :["Family Search","Lead Sources"]},
      {header: "Teams", items :["Advising Teams"]},
      {header: "Users", items :["Students","Parents"]},
      {header: "Courses", items :["Course Search"]},
      {header: "Reports", items :["Transactions Report","Daily Sales Report","Advisor Activity Report"]}
    ],
    setLeadSourceAdvisor: true,
    setLeadSourceCloser: true,
    setLeadAdvisor: true,
    batchEnroll: true
  }
  ,
  {
    name:"Spoof Advisor",
    singleItems: ["Home"],
    sectionsAndItems: [
      {header: "Advisor", items :["Family Search","Lead Sources"]},
      {header: "Teams", items :["Advising Teams"]},
      {header: "Users", items :["Students","Parents"]},
      {header: "Courses", items :["Course Search"]},
      {header: "Reports", items :["Transactions Report","Daily Sales Report","Advisor Activity Report"]}
    ],
    setLeadSourceAdvisor: false,
    setLeadSourceCloser: false,
    setLeadAdvisor: false
  }
]

module.exports.permissions_titles_roles= [
  {
    name:"Wonka",
    roles: ["Accountant","Operations","Advising Manager","Analyst","Director of Instruction Management","Director of Academic Advising","Director of Finance and Analytics","Hr","Instruction Manager","Developer","Admin","Spoof Advisor","this is not a thing"
    ]
  },
  {
    name:"Director of Academic Advising",
    roles: ["Director of Academic Advising","Advising Manager","Academic Advisor","Hr","Admin","Spoof Advisor"
    ]
  }
  // {
  //   name:"Advising Manager",
  //   roles: ["Advising Manager","Admin","Spoof Advisor"
  //   ]
  // },
  // {
  //   name:"Academic Advisor",
  //   roles: ["Academic Advisor","Admin"
  //   ]
  // },
  // {
  //   name:"Director of Instruction Management",
  //   roles: ["Director of Instruction Management","Instruction Manager","Hr","Admin"
  //   ]
  // },
  // {
  //   name:"Instruction Manager",
  //   roles: ["Instruction Manager", "Hr","Admin"
  //   ]
  // },
  // {
  //   name:"Director of Finance and Analytics",
  //   roles: ["Director of Finance and Analytics","Accountant","Analyst","Admin","Spoof Advisor"
  //   ]
  // },
  // {
  //   name:"Accountant",
  //   roles: ["Accountant","Admin"
  //   ]
  // },
  // {
  //   name:"Operations",
  //   roles: ["Operations","Admin","Advising Manager","Spoof Advisor"
  //   ]
  // },
  // {
  //   name:"Human Resources",
  //   roles: ["Hr","Admin"
  //   ]
  // },
  // {
  //   name:"Business Analyst",
  //   roles: ["Analyst","Admin"
  //   ]
  // },
  // {
  //   name:"Admin",
  //   roles: ["Admin"
  //   ]
  // },
  // {
  //   name:"Closer",
  //   roles: ["Advising Advisor","Admin","Spoof Advisor","Closer"
  //   ]
  // },
  // {
  //   name:"Executive Director",
  //   roles: ["Advising Advisor","Advising Manager","Admin","Spoof Advisor","Closer"
  //   ]
  // },
  // {
  //   name:"Regional Director",
  //   roles: ["Advising Advisor","Advising Manager","Admin","Spoof Advisor","Closer"
  //   ]
  // },
  // {
  //   name:"Area Director",
  //   roles: ["Advising Advisor","Advising Manager","Admin","Spoof Advisor","Closer"
  //   ]
  // }
]