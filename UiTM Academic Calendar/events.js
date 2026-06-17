const academicEvents = [
    // General / Both Modes
    { title: "Commencement of Semester March 2026", start: "2026-03-30", end: "2026-03-30", modes: ["research", "coursework"], category: "general" },
    
    // Registration Activities
    { title: "Registration Date (NEW Research)", start: "2026-03-09", end: "2026-06-12", modes: ["research"], category: "registration" },
    { title: "Registration Date (RETURNING Research)", start: "2026-03-25", end: "2026-04-26", modes: ["research"], category: "registration" },
    { title: "Registration Date (NEW Coursework)", start: "2026-03-09", end: "2026-03-29", modes: ["coursework"], category: "registration" },
    { title: "Registration Date (RETURNING Coursework)", start: "2026-03-25", end: "2026-04-26", modes: ["coursework"], category: "registration" },
    { title: "Deferment Application Due (Coursework)", start: "2026-03-30", end: "2026-03-30", modes: ["coursework"], category: "registration" },
    { title: "Deferment Application Due (Research)", start: "2026-06-12", end: "2026-06-12", modes: ["research"], category: "registration" },
    
    // Coursework Specific
    { title: "Appeal for Continuation of Study", start: "2026-03-17", end: "2026-03-31", modes: ["coursework"], category: "coursework" },
    { title: "Course Registration", start: "2026-03-25", end: "2026-04-26", modes: ["coursework"], category: "coursework" },
    { title: "Add & Drop of Courses", start: "2026-03-25", end: "2026-04-26", modes: ["coursework"], category: "coursework" },
    { title: "Validation of Registered Courses", start: "2026-04-27", end: "2026-05-03", modes: ["coursework"], category: "coursework" },
    { title: "Appeal for Re-Marking (Feb 2026)", start: "2026-03-17", end: "2026-03-31", modes: ["coursework"], category: "coursework" },
    { title: "SuFO Screen Open", start: "2026-06-29", end: "2026-08-02", modes: ["coursework"], category: "coursework" },
    { title: "Final Assessment / Examination", start: "2026-07-20", end: "2026-08-09", modes: ["coursework"], category: "coursework" },

    // Research Specific
    { title: "Continuation Appeal of Study", start: "2026-04-01", end: "2026-04-01", modes: ["research"], category: "research" },
    { title: "Research Progress Submission Report", start: "2026-07-06", end: "2026-07-06", modes: ["research"], category: "research" },
    { title: "RESUFO Screen Open", start: "2026-03-25", end: "2026-04-26", modes: ["research"], category: "research" },
    { title: "IPSis Research Skill Seminars 1", start: "2026-04-20", end: "2026-04-30", modes: ["research"], category: "research" },
    { title: "IPSis Research Skill Seminars 2", start: "2026-06-15", end: "2026-06-24", modes: ["research"], category: "research" },

    // Fees (Applies to both)
    { title: "Due Date of Tuition Fees Payment", start: "2026-05-16", end: "2026-05-16", modes: ["research", "coursework"], category: "fees" },
    { title: "Revocation of Student Status (GT)", start: "2026-05-22", end: "2026-05-22", modes: ["research", "coursework"], category: "fees" },
    { title: "Appeal Application Revocation (RPGT)", start: "2026-05-22", end: "2026-05-29", modes: ["research", "coursework"], category: "fees" },
    { title: "Result of Appeal Application (RPGT)", start: "2026-05-23", end: "2026-06-01", modes: ["research", "coursework"], category: "fees" },
    { title: "Fees Deferment Online Application", start: "2026-03-24", end: "2026-04-26", modes: ["research", "coursework"], category: "fees" },
    { title: "Result of Fees Deferment Application", start: "2026-04-27", end: "2026-04-27", modes: ["research", "coursework"], category: "fees" },
    { title: "Final Fees Payment (RPGT)", start: "2026-06-12", end: "2026-06-12", modes: ["research", "coursework"], category: "fees" },
    { title: "Final Fees Payment (e-Deferment)", start: "2026-06-26", end: "2026-06-26", modes: ["research", "coursework"], category: "fees" },
    { title: "Final Revocation of Student Status", start: "2026-07-01", end: "2026-07-01", modes: ["research", "coursework"], category: "fees" },

    // Academic Appeal / Activities
    { title: "Appeal for Changing Mode/Program", start: "2026-03-31", end: "2026-03-31", modes: ["research", "coursework"], category: "academic" },
    { title: "Deadline Special Leave / Deferment", start: "2026-06-29", end: "2026-06-29", modes: ["research", "coursework"], category: "academic" },
    
    // UPTA
    { title: "UPTA Online Application", start: "2026-03-10", end: "2026-03-27", modes: ["research", "coursework"], category: "upta" },
    { title: "UPTA Selection by Faculty", start: "2026-03-30", end: "2026-04-05", modes: ["research", "coursework"], category: "upta" },
    { title: "UPTA Offer Letter Issuance", start: "2026-04-06", end: "2026-04-10", modes: ["research", "coursework"], category: "upta" },
    { title: "UPTA Report Duty", start: "2026-04-13", end: "2026-04-13", modes: ["research", "coursework"], category: "upta" },

    // National & Selangor Public Holidays (2026)
    { title: "Nuzul Al-Quran (Selangor)", start: "2026-03-07", end: "2026-03-07", modes: ["research", "coursework"], category: "holiday" },
    { title: "Hari Raya Puasa", start: "2026-03-21", end: "2026-03-22", modes: ["research", "coursework"], category: "holiday" },
    { title: "Labour Day", start: "2026-05-01", end: "2026-05-01", modes: ["research", "coursework"], category: "holiday" },
    { title: "Hari Raya Haji", start: "2026-05-27", end: "2026-05-27", modes: ["research", "coursework"], category: "holiday" },
    { title: "Wesak Day", start: "2026-05-31", end: "2026-05-31", modes: ["research", "coursework"], category: "holiday" },
    { title: "The Yang di-Pertuan Agong's Birthday", start: "2026-06-01", end: "2026-06-01", modes: ["research", "coursework"], category: "holiday" },
    { title: "Awal Muharram", start: "2026-06-17", end: "2026-06-17", modes: ["research", "coursework"], category: "holiday" },
    { title: "The Prophet Muhammad's Birthday", start: "2026-08-25", end: "2026-08-25", modes: ["research", "coursework"], category: "holiday" },
    { title: "National Day", start: "2026-08-31", end: "2026-08-31", modes: ["research", "coursework"], category: "holiday" },

    // UiTM Events
    { title: "104th UiTM Convocation (Shah Alam)", start: "2026-05-06", end: "2026-05-23", modes: ["research", "coursework"], category: "convocation" },
];
