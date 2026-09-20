export const MENTOR_INFO = {
  name: "Dr. S. Ramanathan",
  title: "Professor & Academic Mentor",
  department: "Information Technology",
  email: "s.ramanathan@college.edu",
  officeHours: "Tue, Thu 2:00 PM - 4:00 PM",
  nextFollowUpDate: "2026-09-24"
};

export const INITIAL_MEETINGS = [
  {
    id: 'meet-101',
    student_id: 'rahul-kumar',
    meeting_type: 'Performance Review',
    mode: 'Phone',
    scheduled_date: '2026-09-15',
    scheduled_time: '03:30 PM',
    status: 'Completed',
    agenda: 'Review CAT 2 math score drop and DBMS attendance warning.',
    discussion_summary: 'Discussed test performance drop in Mathematics (64) and Physics (56). Rahul acknowledged struggling with Integration by Parts topics.',
    outcome: 'Agreed to attend remedial tutorial sessions on Thursdays and complete problem set #3.',
    action_items: '1. Practice 3 Integration problem sets. 2. Catch up on DBMS lab attendance.',
    follow_up_date: '2026-09-24'
  },
  {
    id: 'meet-102',
    student_id: 'rahul-kumar',
    meeting_type: 'Academic Follow-up',
    mode: 'In-person',
    scheduled_date: '2026-09-24',
    scheduled_time: '02:30 PM',
    status: 'Scheduled',
    agenda: 'Follow up on Integration problem set progress and DBMS lab catch-up attendance.',
    discussion_summary: '',
    outcome: '',
    action_items: '',
    follow_up_date: '2026-09-24'
  },

  {
    id: 'meet-201',
    student_id: 'priya-s',
    meeting_type: 'Career Discussion',
    mode: 'In-person',
    scheduled_date: '2026-09-10',
    scheduled_time: '02:00 PM',
    status: 'Completed',
    agenda: 'Discuss AWS certification progress and student mentor role nomination.',
    discussion_summary: 'Priya presented her AWS Cloud practitioner badge and expressed interest in leading the Women in Tech student ACM chapter.',
    outcome: 'Nominated for Student Mentorship role in IT department.',
    action_items: '1. Prepare mentorship application draft.',
    follow_up_date: '2026-10-01'
  },

  {
    id: 'meet-301',
    student_id: 'arun-m',
    meeting_type: 'Attendance Review',
    mode: 'In-person',
    scheduled_date: '2026-09-25',
    scheduled_time: '03:00 PM',
    status: 'Scheduled',
    agenda: 'Discuss class attendance consistency and hackathon team registration.',
    discussion_summary: '',
    outcome: '',
    action_items: '',
    follow_up_date: '2026-09-25'
  },

  {
    id: 'meet-401',
    student_id: 'ananya-r',
    meeting_type: 'Academic Follow-up',
    mode: 'Online',
    scheduled_date: '2026-09-18',
    scheduled_time: '04:00 PM',
    status: 'Completed',
    agenda: 'Review draft abstract for IEEE Conference submission.',
    discussion_summary: 'Reviewed AI in Healthcare paper draft 2. Structure and experimental setup look solid.',
    outcome: 'Abstract approved for submission to upcoming IEEE Student Conference.',
    action_items: '1. Finalize camera-ready PDF.',
    follow_up_date: '2026-09-30'
  },

  {
    id: 'meet-501',
    student_id: 'karthik-v',
    meeting_type: 'Performance Review',
    mode: 'In-person',
    scheduled_date: '2026-09-26',
    scheduled_time: '11:00 AM',
    status: 'Scheduled',
    agenda: 'Review remedial attendance and pending lab assignment submission.',
    discussion_summary: '',
    outcome: '',
    action_items: '',
    follow_up_date: '2026-09-26'
  }
];

export const STUDENTS_DATA = [
  {
    id: "rahul-kumar",
    name: "Rahul Kumar",
    studentId: "IT2024-042",
    department: "Information Technology",
    year: "II Year",
    section: "A",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    email: "rahul@growlink.demo",
    phone: "+91 98765 43210",
    attendance: 74,
    status: "Needs Attention",
    currentCGPA: 8.42,
    previousCGPA: 8.18,
    cgpaTrend: "+0.24",
    potentialReviewArea: "Integration",
    reviewDescription: "Recent assessment responses indicate this topic (Integration & Integral Calculus applications in Physics) may require additional review.",
    cat: {
      cat1: 78,
      cat2: 61,
      average: 69.5
    },
    subjects: [
      { name: "Mathematics", attendance: 81, cat1: 82, cat2: 64, target: 80 },
      { name: "DBMS", attendance: 68, cat1: 76, cat2: 58, target: 75 },
      { name: "Java Programming", attendance: 76, cat1: 80, cat2: 66, target: 75 },
      { name: "Physics", attendance: 79, cat1: 74, cat2: 56, target: 75 }
    ],
    skillDevelopment: [
      { id: 1, platform: "LeetCode", activity: "Data Structures Practice", progress: "18 → 24 problems", evidence: "Profile Verified" },
      { id: 2, platform: "Python Course", activity: "Data Science Fundamentals", progress: "72% → 81%", evidence: "Module 4 Quiz Passed" },
      { id: 3, platform: "GitHub Projects", activity: "Campus Attendance Alert", progress: "2 projects", evidence: "Repository Active" },
      { id: 4, platform: "Workshop", activity: "Full-Stack Bootcamp", progress: "1 completed", evidence: "IEEE Certificate" }
    ],
    activitiesCount: {
      hackathons: 2,
      symposiums: 3,
      workshops: 4,
      courses: 5,
      projects: 2,
      certifications: 3
    },
    activityList: [
      { id: 1, type: "Hackathon", title: "Smart India Hackathon College Level", role: "Frontend Dev", date: "Aug 2026", status: "Finalist" },
      { id: 2, type: "Hackathon", title: "HackNight 2026", role: "Participant", date: "May 2026", status: "Participated" },
      { id: 3, type: "Symposium", title: "TechVision '26 Paper Presentation", role: "Presenter", date: "Jul 2026", status: "2nd Place" },
      { id: 4, type: "Workshop", title: "Full-Stack Development Bootcamp", organizer: "IEEE Student Branch", date: "Jun 2026", status: "Completed" },
      { id: 5, type: "Course", title: "Data Structures & Algorithms in Java", platform: "NPTEL", date: "Jul 2026", status: "Completed (Elite)" },
      { id: 6, type: "Project", title: "Campus Attendance Alert System", tech: "React, Node.js", date: "Aug 2026", status: "Completed" }
    ],
    timeline: [
      { date: "Sep 15, 2026", title: "CAT 2 Marks Published", description: "Score dropped in Mathematics (64) and Physics (56). Needs focused revision.", type: "academic", alert: true },
      { date: "Sep 02, 2026", title: "Mentor Check-in Completed", description: "Discussed CAT 2 preparation and attendance drop in DBMS.", type: "mentor" },
      { date: "Aug 28, 2026", title: "Smart India Hackathon Finalist", description: "Selected among top 10 teams in college internal rounds.", type: "activity" },
      { date: "Aug 10, 2026", title: "Attendance Warning Flagged", description: "DBMS subject attendance fell below 70% threshold.", type: "attendance", alert: true }
    ],
    mentorNotes: [
      { id: 1, date: "Sep 02, 2026", author: "Dr. S. Ramanathan", text: "Rahul demonstrates strong programming skills in React & Java but needs to improve consistency in core Math and DBMS. Advised attending extra remedial tutorial sessions on Thursdays.", tag: "Academic Guidance" },
      { id: 2, date: "Aug 10, 2026", author: "Dr. S. Ramanathan", text: "Attendance in DBMS fell to 68%. Sent reminder notification regarding 75% mandatory requirement.", tag: "Attendance Notice" }
    ],
    initialActions: [
      {
        id: "act-101",
        area: "Integration",
        action: "Schedule remedial discussion on Integration by Parts and Definite Integrals",
        status: "Pending",
        followUpDate: "2026-09-24",
        notes: "Review Module 3 problem set before next assessment.",
        createdAt: "2026-09-18"
      }
    ],
    weeklyReview: {
      period: "14 – 20 SEP",
      attendanceStat: "4 / 5 classes",
      academicStat: "CAT 2: 61%",
      skillStat: "LeetCode: 18 → 24 problems",
      activitiesStat: "1 Symposium",
      coursesStat: "72% → 81%",
      previousFollowUp: "Integration — Pending",
      summaryText: "Attendance remained stable this week. Coding activity improved, while the previous academic follow-up remains pending."
    },
    assessmentAnalysis: {
      subject: "Mathematics",
      assessment: "CAT 2",
      syllabusMapping: [
        { module: "Module 3 — Integral Calculus", topics: ["Integration by Parts", "Definite Integrals"] }
      ],
      performanceEvidence: [
        { question: "Q4 — Integration by Parts", status: "Incorrect" },
        { question: "Q7 — Definite Integrals", status: "Incorrect" },
        { question: "Q9 — Definite Integrals", status: "Correct" }
      ],
      weakAreas: ["Integration by Parts", "Definite Integrals"],
      strongAreas: ["Object Oriented Java", "SQL Queries"],
      evidenceText: "2 of 3 related questions require review.",
      recommendedAction: "Review the underlying integration method and identify whether the difficulty is conceptual or procedural."
    }
  },

  {
    id: "priya-s",
    name: "Priya S",
    studentId: "IT2024-018",
    department: "Information Technology",
    year: "II Year",
    section: "A",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    email: "priya@growlink.demo",
    phone: "+91 98765 43211",
    attendance: 84,
    status: "On Track",
    currentCGPA: 9.12,
    previousCGPA: 8.96,
    cgpaTrend: "+0.16",
    potentialReviewArea: "Advanced DBMS",
    reviewDescription: "Good overall steady progress across tests with consistent upward trajectory.",
    cat: {
      cat1: 72,
      cat2: 79,
      average: 75.5
    },
    subjects: [
      { name: "Mathematics", attendance: 88, cat1: 74, cat2: 82, target: 80 },
      { name: "DBMS", attendance: 82, cat1: 70, cat2: 78, target: 75 },
      { name: "Java Programming", attendance: 85, cat1: 75, cat2: 80, target: 75 },
      { name: "Physics", attendance: 81, cat1: 69, cat2: 76, target: 75 }
    ],
    skillDevelopment: [
      { id: 1, platform: "LeetCode", activity: "Algorithms Practice", progress: "45 → 62 problems", evidence: "Profile Verified" },
      { id: 2, platform: "AWS Cloud", activity: "Cloud Architecture", progress: "80% → 95%", evidence: "AWS Academy Badge" },
      { id: 3, platform: "GitHub Projects", activity: "Smart Canteen App", progress: "3 projects", evidence: "Maintained Repo" }
    ],
    activitiesCount: {
      hackathons: 3,
      symposiums: 2,
      workshops: 3,
      courses: 4,
      projects: 3,
      certifications: 4
    },
    activityList: [
      { id: 1, type: "Hackathon", title: "Women in Tech Hackathon", role: "Team Lead", date: "Aug 2026", status: "1st Runner Up" },
      { id: 2, type: "Symposium", title: "National Level TechFest", role: "Web Master", date: "Jun 2026", status: "Organizer" }
    ],
    timeline: [
      { date: "Sep 15, 2026", title: "CAT 2 Marks Published", description: "Improved performance by +7% across all subjects.", type: "academic" }
    ],
    mentorNotes: [
      { id: 1, date: "Aug 25, 2026", author: "Dr. S. Ramanathan", text: "Priya is showing consistent leadership qualities and balanced academic performance. Encouraged her to apply for student mentor role.", tag: "Leadership" }
    ],
    initialActions: [
      {
        id: "act-201",
        area: "Database Indexing",
        action: "Review database indexing and query plan execution",
        status: "Completed",
        followUpDate: "2026-09-10",
        notes: "Completed practical indexing exercise in DBMS lab.",
        createdAt: "2026-09-01"
      }
    ],
    weeklyReview: {
      period: "14 – 20 SEP",
      attendanceStat: "5 / 5 classes",
      academicStat: "CAT 2: 79%",
      skillStat: "LeetCode: 45 → 62 problems",
      activitiesStat: "1 Hackathon win",
      coursesStat: "80% → 95%",
      previousFollowUp: "Indexing — Completed",
      summaryText: "Excellent weekly engagement. Academic performance and coding progress remain strong."
    },
    assessmentAnalysis: {
      subject: "DBMS",
      assessment: "CAT 2",
      syllabusMapping: [
        { module: "Module 4 — Relational Algebra & Indexing", topics: ["B+ Trees", "Query Optimization"] }
      ],
      performanceEvidence: [
        { question: "Q2 — B+ Trees", status: "Correct" },
        { question: "Q5 — Query Optimization", status: "Incorrect" }
      ],
      weakAreas: ["Query Optimization"],
      strongAreas: ["Probability & Statistics", "Java Multithreading"],
      evidenceText: "1 of 2 related questions requires review.",
      recommendedAction: "Focus on database indexing and query plan execution in upcoming lab sessions."
    }
  },

  {
    id: "arun-m",
    name: "Arun M",
    studentId: "IT2024-009",
    department: "Information Technology",
    year: "II Year",
    section: "A",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    email: "arun@growlink.demo",
    phone: "+91 98765 43212",
    attendance: 81,
    status: "Monitor",
    currentCGPA: 7.86,
    previousCGPA: 7.91,
    cgpaTrend: "-0.05",
    potentialReviewArea: "Extracurricular Participation",
    reviewDescription: "Academic scores are steady, but low participation in technical hackathons and practical projects.",
    cat: {
      cat1: 74,
      cat2: 76,
      average: 75
    },
    subjects: [
      { name: "Mathematics", attendance: 82, cat1: 76, cat2: 78, target: 80 },
      { name: "DBMS", attendance: 79, cat1: 72, cat2: 74, target: 75 },
      { name: "Java Programming", attendance: 80, cat1: 75, cat2: 77, target: 75 },
      { name: "Physics", attendance: 84, cat1: 73, cat2: 75, target: 75 }
    ],
    skillDevelopment: [
      { id: 1, platform: "Coursera", activity: "Python Basics for Data Science", progress: "100% completed", evidence: "Certificate Verified" },
      { id: 2, platform: "LeetCode", activity: "Basic Problem Solving", progress: "10 → 15 problems", evidence: "Profile Active" }
    ],
    activitiesCount: {
      hackathons: 0,
      symposiums: 1,
      workshops: 2,
      courses: 5,
      projects: 1,
      certifications: 2
    },
    activityList: [
      { id: 1, type: "Symposium", title: "State Level Tech Quiz", role: "Participant", date: "May 2026", status: "Participant" }
    ],
    timeline: [
      { date: "Sep 15, 2026", title: "CAT 2 Marks Published", description: "Steady scores maintained around 75%.", type: "academic" }
    ],
    mentorNotes: [
      { id: 1, date: "Aug 18, 2026", author: "Dr. S. Ramanathan", text: "Arun is regular to class but hesitant to participate in team hackathons. Recommended teaming up with Rahul or Priya for the upcoming college hackathon.", tag: "Skill Development" }
    ],
    initialActions: [
      {
        id: "act-301",
        area: "Practical Project",
        action: "Register for upcoming college hackathon team",
        status: "In Progress",
        followUpDate: "2026-09-28",
        notes: "Discuss team formation in next mentor slot.",
        createdAt: "2026-09-15"
      }
    ],
    weeklyReview: {
      period: "14 – 20 SEP",
      attendanceStat: "4 / 5 classes",
      academicStat: "CAT 2: 76%",
      skillStat: "LeetCode: 10 → 15 problems",
      activitiesStat: "0 Hackathons",
      coursesStat: "100% Python",
      previousFollowUp: "Hackathon Registration — In Progress",
      summaryText: "Class attendance is consistent. Encouraging student to team up for upcoming technical hackathon."
    },
    assessmentAnalysis: {
      subject: "Java Programming",
      assessment: "CAT 2",
      syllabusMapping: [
        { module: "Module 2 — OOP Concepts", topics: ["Inheritance", "Interface vs Abstract Class"] }
      ],
      performanceEvidence: [
        { question: "Q3 — Abstract Class", status: "Correct" },
        { question: "Q8 — Interface Polymorphism", status: "Incorrect" }
      ],
      weakAreas: ["Hands-on Application Building"],
      strongAreas: ["Theory Concepts", "Physics Fundamentals"],
      evidenceText: "1 of 2 related questions requires review.",
      recommendedAction: "Join one coding challenge or build a portfolio project this month."
    }
  },

  {
    id: "ananya-r",
    name: "Ananya R",
    studentId: "IT2024-004",
    department: "Information Technology",
    year: "II Year",
    section: "B",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    email: "ananya@growlink.demo",
    phone: "+91 98765 43213",
    attendance: 92,
    status: "On Track",
    currentCGPA: 8.74,
    previousCGPA: 8.61,
    cgpaTrend: "+0.13",
    potentialReviewArea: "Research Paper Submission",
    reviewDescription: "Exceptional performance in academics and active research contribution.",
    cat: {
      cat1: 88,
      cat2: 91,
      average: 89.5
    },
    subjects: [
      { name: "Mathematics", attendance: 94, cat1: 90, cat2: 93, target: 80 },
      { name: "DBMS", attendance: 90, cat1: 86, cat2: 90, target: 75 },
      { name: "Java Programming", attendance: 92, cat1: 89, cat2: 92, target: 75 },
      { name: "Physics", attendance: 92, cat1: 87, cat2: 89, target: 75 }
    ],
    skillDevelopment: [
      { id: 1, platform: "LeetCode", activity: "Advanced Algorithms", progress: "110 → 135 problems", evidence: "Knight Badge" },
      { id: 2, platform: "Research Paper", activity: "AI in Healthcare", progress: "Draft 2 complete", evidence: "Overleaf Link" }
    ],
    activitiesCount: {
      hackathons: 4,
      symposiums: 4,
      workshops: 5,
      courses: 6,
      projects: 4,
      certifications: 5
    },
    activityList: [
      { id: 1, type: "Hackathon", title: "AI Innovation Challenge", role: "AI Lead", date: "Aug 2026", status: "1st Winner" }
    ],
    timeline: [
      { date: "Sep 15, 2026", title: "CAT 2 Marks Published", description: "Top scorer in Section B with 91% average.", type: "academic" }
    ],
    mentorNotes: [
      { id: 1, date: "Sep 05, 2026", author: "Dr. S. Ramanathan", text: "Ananya is performing exceptionally well. Guiding her towards submitting a journal paper on her AI project.", tag: "Research Guidance" }
    ],
    initialActions: [
      {
        id: "act-401",
        area: "IEEE Paper Abstract",
        action: "Prepare abstract for IEEE conference submission",
        status: "In Progress",
        followUpDate: "2026-09-30",
        notes: "Review final abstract draft.",
        createdAt: "2026-09-10"
      }
    ],
    weeklyReview: {
      period: "14 – 20 SEP",
      attendanceStat: "5 / 5 classes",
      academicStat: "CAT 2: 91%",
      skillStat: "LeetCode: 110 → 135 problems",
      activitiesStat: "1 Paper Draft",
      coursesStat: "100% ML",
      previousFollowUp: "IEEE Paper — In Progress",
      summaryText: "Outstanding progress across all indicators. Research draft is progressing on schedule."
    },
    assessmentAnalysis: {
      subject: "Mathematics",
      assessment: "CAT 2",
      syllabusMapping: [
        { module: "Module 5 — Vector Calculus", topics: ["Green's Theorem", "Stokes' Theorem"] }
      ],
      performanceEvidence: [
        { question: "Q1 — Green's Theorem", status: "Correct" },
        { question: "Q6 — Stokes' Theorem", status: "Correct" }
      ],
      weakAreas: [],
      strongAreas: ["Machine Learning Basics", "Advanced Calculus", "System Design"],
      evidenceText: "All evaluated topics mastered.",
      recommendedAction: "Prepare abstract for IEEE conference submission."
    }
  },

  {
    id: "karthik-v",
    name: "Karthik V",
    studentId: "IT2024-055",
    department: "Information Technology",
    year: "II Year",
    section: "B",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    email: "karthik@growlink.demo",
    phone: "+91 98765 43214",
    attendance: 68,
    status: "Needs Attention",
    currentCGPA: 7.42,
    previousCGPA: 7.68,
    cgpaTrend: "-0.26",
    potentialReviewArea: "Data Structures & Core Math",
    reviewDescription: "Attendance below threshold (68%) and declining test performance across CAT 1 & 2.",
    cat: {
      cat1: 58,
      cat2: 64,
      average: 61
    },
    subjects: [
      { name: "Mathematics", attendance: 65, cat1: 52, cat2: 60, target: 80 },
      { name: "DBMS", attendance: 70, cat1: 62, cat2: 66, target: 75 },
      { name: "Java Programming", attendance: 64, cat1: 56, cat2: 62, target: 75 },
      { name: "Physics", attendance: 73, cat1: 62, cat2: 68, target: 75 }
    ],
    skillDevelopment: [
      { id: 1, platform: "GitHub", activity: "Git Essentials", progress: "1 workshop", evidence: "Certificate" },
      { id: 2, platform: "LeetCode", activity: "Arrays & Strings", progress: "5 problems", evidence: "Profile Active" }
    ],
    activitiesCount: {
      hackathons: 1,
      symposiums: 0,
      workshops: 1,
      courses: 2,
      projects: 1,
      certifications: 1
    },
    activityList: [
      { id: 1, type: "Workshop", title: "Git & GitHub Essentials", organizer: "Coding Club", date: "May 2026", status: "Completed" }
    ],
    timeline: [
      { date: "Sep 12, 2026", title: "Parent - Mentor Call Scheduled", description: "Discussing low attendance (68%) and academic support plan.", type: "mentor", alert: true }
    ],
    mentorNotes: [
      { id: 1, date: "Sep 10, 2026", author: "Dr. S. Ramanathan", text: "Karthik missed several classes due to health reasons. Arranged catch-up notes and peer assistance with Section B class rep.", tag: "Attendance & Remedial" }
    ],
    initialActions: [
      {
        id: "act-501",
        area: "Remedial Attendance & Lab Notes",
        action: "Attend mandatory remedial tutorial classes on Tuesday afternoons",
        status: "Pending",
        followUpDate: "2026-09-25",
        notes: "Submit pending lab assignments to subject teacher.",
        createdAt: "2026-09-12"
      }
    ],
    weeklyReview: {
      period: "14 – 20 SEP",
      attendanceStat: "3 / 5 classes",
      academicStat: "CAT 2: 64%",
      skillStat: "LeetCode: 5 problems",
      activitiesStat: "1 Workshop",
      coursesStat: "2 Courses",
      previousFollowUp: "Remedial Attendance — Pending",
      summaryText: "Attendance requires continuous monitoring. Student is working through catch-up lab assignments."
    },
    assessmentAnalysis: {
      subject: "Java Programming",
      assessment: "CAT 2",
      syllabusMapping: [
        { module: "Module 3 — Data Structures", topics: ["Pointers", "Linked Lists"] }
      ],
      performanceEvidence: [
        { question: "Q1 — Linked List Traversal", status: "Incorrect" },
        { question: "Q4 — Memory Pointers", status: "Incorrect" }
      ],
      weakAreas: ["Pointers & Linked Lists in Java", "Matrix Diagonalization"],
      strongAreas: ["Physics Mechanics"],
      evidenceText: "2 of 2 related questions require review.",
      recommendedAction: "Mandatory attendance in remedial classes and submission of pending lab assignments."
    }
  }
];

// Helper functions for Meetings persistence with localStorage
export function getStudentMeetings(studentId) {
  try {
    const stored = localStorage.getItem('growlink_meetings');
    let allMeetings = stored ? JSON.parse(stored) : INITIAL_MEETINGS;
    return allMeetings.filter(m => m.student_id === studentId);
  } catch {
    return INITIAL_MEETINGS.filter(m => m.student_id === studentId);
  }
}
