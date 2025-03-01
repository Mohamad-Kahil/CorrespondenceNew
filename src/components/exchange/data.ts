import { Message } from "./types";

// Create sample messages for each folder with different departments and priorities
export const messages: Message[] = [
  // INBOX - 10 messages
  {
    id: 1,
    subject: "Budget Approval Request",
    sender: "finance.director@example.com",
    recipient: "me@company.com",
    preview: "Please review the attached budget proposal...",
    content:
      "Please review the attached budget proposal for Q3 2024. We need your approval by Friday.",
    date: "2024-06-01T09:30:00",
    hasDocument: true,
    isUnread: true,
    department: "Finance",
    priority: "high",
    folder: "inbox",
    documentName: "Q3-Budget-Proposal-2024.pdf",
    documentSize: "3.2MB",
  },
  {
    id: 2,
    subject: "New Employee Onboarding",
    sender: "hr.manager@example.com",
    recipient: "me@company.com",
    preview: "New employee starting next week...",
    content:
      "We have a new employee starting next Monday. Please review the onboarding checklist and prepare necessary access credentials.",
    date: "2024-06-01T10:15:00",
    hasDocument: true,
    isUnread: true,
    department: "HR",
    priority: "medium",
    folder: "inbox",
    documentName: "Onboarding-Checklist.pdf",
    documentSize: "1.5MB",
  },
  {
    id: 3,
    subject: "Server Maintenance Schedule",
    sender: "it.admin@example.com",
    recipient: "me@company.com",
    preview: "Upcoming server maintenance...",
    content:
      "Please be informed that we will be performing server maintenance this weekend. Services will be unavailable from Saturday 10 PM to Sunday 2 AM.",
    date: "2024-06-01T11:45:00",
    hasDocument: false,
    isUnread: true,
    department: "IT",
    priority: "high",
    folder: "inbox",
    documentName: "",
    documentSize: "",
  },
  {
    id: 4,
    subject: "Q2 Sales Report",
    sender: "sales.director@example.com",
    recipient: "me@company.com",
    preview: "Q2 sales performance report...",
    content:
      "Attached is the Q2 sales performance report. We've exceeded our targets by 12%. Let's discuss the details in our next meeting.",
    date: "2024-05-31T14:20:00",
    hasDocument: true,
    isUnread: false,
    department: "Sales",
    priority: "medium",
    folder: "inbox",
    documentName: "Q2-Sales-Report.xlsx",
    documentSize: "4.7MB",
  },
  {
    id: 5,
    subject: "Marketing Campaign Proposal",
    sender: "marketing.lead@example.com",
    recipient: "me@company.com",
    preview: "New marketing campaign proposal...",
    content:
      "I've attached our proposal for the summer marketing campaign. We need your feedback by Wednesday to proceed with the implementation.",
    date: "2024-05-31T15:10:00",
    hasDocument: true,
    isUnread: false,
    department: "Marketing",
    priority: "medium",
    folder: "inbox",
    documentName: "Summer-Campaign-Proposal.pptx",
    documentSize: "8.3MB",
  },
  {
    id: 6,
    subject: "Legal Contract Review",
    sender: "legal.counsel@example.com",
    recipient: "me@company.com",
    preview: "Vendor contract for review...",
    content:
      "Please review the attached vendor contract. We need your input on sections 3.2 and 4.5 regarding data security compliance.",
    date: "2024-05-30T09:45:00",
    hasDocument: true,
    isUnread: false,
    department: "Legal",
    priority: "high",
    folder: "inbox",
    documentName: "Vendor-Contract-v2.docx",
    documentSize: "1.8MB",
  },
  {
    id: 7,
    subject: "Office Supplies Request",
    sender: "operations.assistant@example.com",
    recipient: "me@company.com",
    preview: "Monthly office supplies order...",
    content:
      "Attached is the monthly office supplies order form. Please approve so we can place the order by tomorrow.",
    date: "2024-05-30T11:30:00",
    hasDocument: true,
    isUnread: false,
    department: "Operations",
    priority: "low",
    folder: "inbox",
    documentName: "Office-Supplies-Order.xlsx",
    documentSize: "0.9MB",
  },
  {
    id: 8,
    subject: "Security Incident Report",
    sender: "security.officer@example.com",
    recipient: "me@company.com",
    preview: "Security incident report from last week...",
    content:
      "Please find attached the report on last week's security incident. All affected systems have been secured and no data breach occurred.",
    date: "2024-05-29T16:20:00",
    hasDocument: true,
    isUnread: false,
    department: "Security",
    priority: "high",
    folder: "inbox",
    documentName: "Security-Incident-Report.pdf",
    documentSize: "2.1MB",
  },
  {
    id: 9,
    subject: "Training Program Update",
    sender: "hr.training@example.com",
    recipient: "me@company.com",
    preview: "Updates to employee training program...",
    content:
      "We've updated the employee training program for Q3. Please review the attached schedule and let us know if you have any suggestions.",
    date: "2024-05-29T13:45:00",
    hasDocument: true,
    isUnread: false,
    department: "HR",
    priority: "low",
    folder: "inbox",
    documentName: "Q3-Training-Schedule.pdf",
    documentSize: "1.3MB",
  },
  {
    id: 10,
    subject: "Project Status Update",
    sender: "project.manager@example.com",
    recipient: "me@company.com",
    preview: "Weekly project status update...",
    content:
      "Here's our weekly project status update. We're on track with most deliverables, but there are some delays in the IT infrastructure upgrade.",
    date: "2024-05-28T10:30:00",
    hasDocument: true,
    isUnread: false,
    department: "Project",
    priority: "medium",
    folder: "inbox",
    documentName: "Project-Status-Week22.pptx",
    documentSize: "5.6MB",
  },

  // SENT - 10 messages
  {
    id: 11,
    subject: "Re: Budget Approval Request",
    sender: "me@company.com",
    recipient: "finance.director@example.com",
    preview: "I've reviewed the budget proposal...",
    content:
      "I've reviewed the budget proposal and approved it with some minor adjustments. Please see my comments in the attached document.",
    date: "2024-06-01T14:30:00",
    hasDocument: true,
    isUnread: false,
    department: "Finance",
    priority: "high",
    folder: "sent",
    documentName: "Q3-Budget-Proposal-Approved.pdf",
    documentSize: "3.3MB",
  },
  {
    id: 12,
    subject: "Re: New Employee Onboarding",
    sender: "me@company.com",
    recipient: "hr.manager@example.com",
    preview: "Onboarding preparations complete...",
    content:
      "I've prepared all necessary access credentials for the new employee. Everything will be ready by Monday morning.",
    date: "2024-06-01T15:20:00",
    hasDocument: false,
    isUnread: false,
    department: "HR",
    priority: "medium",
    folder: "sent",
    documentName: "",
    documentSize: "",
  },
  {
    id: 13,
    subject: "Monthly Department Report",
    sender: "me@company.com",
    recipient: "executive.team@example.com",
    preview: "May department performance report...",
    content:
      "Attached is my department's performance report for May. We've made significant progress on our key objectives and are on track to meet Q2 goals.",
    date: "2024-05-31T16:45:00",
    hasDocument: true,
    isUnread: false,
    department: "Operations",
    priority: "medium",
    folder: "sent",
    documentName: "May-Department-Report.pdf",
    documentSize: "4.2MB",
  },
  {
    id: 14,
    subject: "IT Support Request",
    sender: "me@company.com",
    recipient: "it.helpdesk@example.com",
    preview: "Issue with email synchronization...",
    content:
      "I'm experiencing issues with email synchronization on my mobile device. Could someone from the IT team help me resolve this?",
    date: "2024-05-30T10:15:00",
    hasDocument: false,
    isUnread: false,
    department: "IT",
    priority: "low",
    folder: "sent",
    documentName: "",
    documentSize: "",
  },
  {
    id: 15,
    subject: "Marketing Campaign Feedback",
    sender: "me@company.com",
    recipient: "marketing.lead@example.com",
    preview: "Feedback on summer campaign proposal...",
    content:
      "I've reviewed the summer campaign proposal and have some suggestions. Overall, it looks great, but we should consider adjusting the timeline slightly.",
    date: "2024-05-30T17:30:00",
    hasDocument: true,
    isUnread: false,
    department: "Marketing",
    priority: "medium",
    folder: "sent",
    documentName: "Summer-Campaign-Feedback.docx",
    documentSize: "1.1MB",
  },
  {
    id: 16,
    subject: "Sales Team Recognition",
    sender: "me@company.com",
    recipient: "sales.team@example.com",
    preview: "Congratulations on exceeding Q2 targets...",
    content:
      "Congratulations to the entire sales team for exceeding our Q2 targets! Your hard work and dedication have been instrumental to our success this quarter.",
    date: "2024-05-29T14:20:00",
    hasDocument: false,
    isUnread: false,
    department: "Sales",
    priority: "low",
    folder: "sent",
    documentName: "",
    documentSize: "",
  },
  {
    id: 17,
    subject: "Legal Contract Approval",
    sender: "me@company.com",
    recipient: "legal.counsel@example.com",
    preview: "Vendor contract approved with changes...",
    content:
      "I've reviewed and approved the vendor contract with some changes to sections 3.2 and 4.5. Please see the attached document with my comments.",
    date: "2024-05-29T11:45:00",
    hasDocument: true,
    isUnread: false,
    department: "Legal",
    priority: "high",
    folder: "sent",
    documentName: "Vendor-Contract-Approved.docx",
    documentSize: "1.9MB",
  },
  {
    id: 18,
    subject: "Security Protocol Update",
    sender: "me@company.com",
    recipient: "security.team@example.com",
    preview: "Updated security protocols for remote access...",
    content:
      "I've attached the updated security protocols for remote access. Please implement these changes by the end of the week and inform all employees.",
    date: "2024-05-28T15:30:00",
    hasDocument: true,
    isUnread: false,
    department: "Security",
    priority: "high",
    folder: "sent",
    documentName: "Remote-Access-Security-Protocols.pdf",
    documentSize: "2.3MB",
  },
  {
    id: 19,
    subject: "Project Timeline Adjustment",
    sender: "me@company.com",
    recipient: "project.team@example.com",
    preview: "Adjustments to project timeline...",
    content:
      "Based on our recent progress, I've made some adjustments to the project timeline. Please review the attached updated schedule and let me know if you have any concerns.",
    date: "2024-05-28T13:15:00",
    hasDocument: true,
    isUnread: false,
    department: "Project",
    priority: "medium",
    folder: "sent",
    documentName: "Updated-Project-Timeline.xlsx",
    documentSize: "1.7MB",
  },
  {
    id: 20,
    subject: "Office Supplies Approval",
    sender: "me@company.com",
    recipient: "operations.assistant@example.com",
    preview: "Monthly supplies order approved...",
    content:
      "I've approved the monthly office supplies order. Please proceed with placing the order as soon as possible.",
    date: "2024-05-27T16:45:00",
    hasDocument: false,
    isUnread: false,
    department: "Operations",
    priority: "low",
    folder: "sent",
    documentName: "",
    documentSize: "",
  },

  // DRAFTS - 10 messages
  {
    id: 21,
    subject: "Quarterly Business Review",
    sender: "me@company.com",
    recipient: "executive.board@example.com",
    preview: "Draft of quarterly business review...",
    content:
      "[DRAFT] Attached is the quarterly business review presentation for our upcoming board meeting. I'm still finalizing some financial figures in slides 15-18.",
    date: "2024-06-01T16:30:00",
    hasDocument: true,
    isUnread: false,
    department: "Finance",
    priority: "high",
    folder: "drafts",
    documentName: "Q2-Business-Review-DRAFT.pptx",
    documentSize: "12.5MB",
  },
  {
    id: 22,
    subject: "Employee Performance Reviews",
    sender: "me@company.com",
    recipient: "department.managers@example.com",
    preview: "Schedule for mid-year performance reviews...",
    content:
      "[DRAFT] Here's the proposed schedule for mid-year performance reviews. Please review and let me know if the timeline works for your departments.",
    date: "2024-05-31T17:20:00",
    hasDocument: true,
    isUnread: false,
    department: "HR",
    priority: "medium",
    folder: "drafts",
    documentName: "Mid-Year-Review-Schedule-DRAFT.xlsx",
    documentSize: "1.8MB",
  },
  {
    id: 23,
    subject: "IT Infrastructure Upgrade Plan",
    sender: "me@company.com",
    recipient: "it.director@example.com",
    preview: "Proposal for infrastructure upgrades...",
    content:
      "[DRAFT] I've outlined a proposal for our IT infrastructure upgrades for the next fiscal year. The budget estimates still need refinement.",
    date: "2024-05-30T14:45:00",
    hasDocument: true,
    isUnread: false,
    department: "IT",
    priority: "high",
    folder: "drafts",
    documentName: "IT-Infrastructure-Plan-DRAFT.pdf",
    documentSize: "5.3MB",
  },
  {
    id: 24,
    subject: "Sales Strategy for Q3",
    sender: "me@company.com",
    recipient: "sales.leadership@example.com",
    preview: "Draft of Q3 sales strategy...",
    content:
      "[DRAFT] Here's my initial draft of our Q3 sales strategy. I'm still working on the regional targets and incentive structure sections.",
    date: "2024-05-30T11:30:00",
    hasDocument: true,
    isUnread: false,
    department: "Sales",
    priority: "medium",
    folder: "drafts",
    documentName: "Q3-Sales-Strategy-DRAFT.docx",
    documentSize: "3.7MB",
  },
  {
    id: 25,
    subject: "Digital Marketing Initiative",
    sender: "me@company.com",
    recipient: "marketing.team@example.com",
    preview: "New digital marketing initiative proposal...",
    content:
      "[DRAFT] I'm working on a proposal for a new digital marketing initiative. Here's what I have so far, but I still need to complete the budget section.",
    date: "2024-05-29T15:20:00",
    hasDocument: true,
    isUnread: false,
    department: "Marketing",
    priority: "medium",
    folder: "drafts",
    documentName: "Digital-Marketing-Initiative-DRAFT.pptx",
    documentSize: "7.2MB",
  },
  {
    id: 26,
    subject: "Vendor Agreement Amendments",
    sender: "me@company.com",
    recipient: "legal.department@example.com",
    preview: "Proposed amendments to vendor agreement...",
    content:
      "[DRAFT] I've drafted some proposed amendments to our standard vendor agreement. Please review when you have a chance and provide feedback.",
    date: "2024-05-29T10:15:00",
    hasDocument: true,
    isUnread: false,
    department: "Legal",
    priority: "high",
    folder: "drafts",
    documentName: "Vendor-Agreement-Amendments-DRAFT.docx",
    documentSize: "2.1MB",
  },
  {
    id: 27,
    subject: "Office Relocation Timeline",
    sender: "me@company.com",
    recipient: "facilities.manager@example.com",
    preview: "Draft timeline for office relocation...",
    content:
      "[DRAFT] Here's a draft timeline for our office relocation project. I'm still working on coordinating with some of the vendors for exact dates.",
    date: "2024-05-28T16:40:00",
    hasDocument: true,
    isUnread: false,
    department: "Operations",
    priority: "medium",
    folder: "drafts",
    documentName: "Office-Relocation-Timeline-DRAFT.xlsx",
    documentSize: "2.8MB",
  },
  {
    id: 28,
    subject: "Data Security Audit Results",
    sender: "me@company.com",
    recipient: "security.committee@example.com",
    preview: "Preliminary results of security audit...",
    content:
      "[DRAFT] Here are the preliminary results of our data security audit. I still need to add the recommendations section and executive summary.",
    date: "2024-05-28T13:25:00",
    hasDocument: true,
    isUnread: false,
    department: "Security",
    priority: "high",
    folder: "drafts",
    documentName: "Security-Audit-Results-DRAFT.pdf",
    documentSize: "4.5MB",
  },
  {
    id: 29,
    subject: "Project Status Report",
    sender: "me@company.com",
    recipient: "stakeholders@example.com",
    preview: "Monthly project status report draft...",
    content:
      "[DRAFT] Here's the draft of our monthly project status report. I still need to update the risk assessment section and add the latest milestone achievements.",
    date: "2024-05-27T15:10:00",
    hasDocument: true,
    isUnread: false,
    department: "Project",
    priority: "medium",
    folder: "drafts",
    documentName: "Project-Status-Report-DRAFT.pdf",
    documentSize: "3.9MB",
  },
  {
    id: 30,
    subject: "Budget Reallocation Request",
    sender: "me@company.com",
    recipient: "finance.committee@example.com",
    preview: "Request for budget reallocation...",
    content:
      "[DRAFT] I'm preparing a request for budget reallocation between departments. Still finalizing the exact figures and justification.",
    date: "2024-05-27T11:30:00",
    hasDocument: true,
    isUnread: false,
    department: "Finance",
    priority: "high",
    folder: "drafts",
    documentName: "Budget-Reallocation-Request-DRAFT.xlsx",
    documentSize: "2.3MB",
  },

  // ARCHIVE - 10 messages
  {
    id: 31,
    subject: "2023 Annual Financial Report",
    sender: "finance.team@example.com",
    recipient: "me@company.com",
    preview: "Annual financial report for 2023...",
    content:
      "Attached is the final version of our 2023 Annual Financial Report. This has been approved by the board and is now ready for distribution to shareholders.",
    date: "2024-01-15T10:30:00",
    hasDocument: true,
    isUnread: false,
    department: "Finance",
    priority: "high",
    folder: "archive",
    documentName: "2023-Annual-Financial-Report.pdf",
    documentSize: "15.7MB",
  },
  {
    id: 32,
    subject: "Employee Handbook Updates",
    sender: "hr.director@example.com",
    recipient: "me@company.com",
    preview: "Updated employee handbook for 2024...",
    content:
      "Please find attached the updated employee handbook for 2024. The main changes are in the remote work policy and benefits sections.",
    date: "2024-01-10T14:15:00",
    hasDocument: true,
    isUnread: false,
    department: "HR",
    priority: "medium",
    folder: "archive",
    documentName: "Employee-Handbook-2024.pdf",
    documentSize: "8.3MB",
  },
  {
    id: 33,
    subject: "System Migration Complete",
    sender: "it.projectlead@example.com",
    recipient: "me@company.com",
    preview: "Successful completion of system migration...",
    content:
      "I'm pleased to inform you that we have successfully completed the system migration. All services are now running on the new infrastructure with improved performance and security.",
    date: "2024-02-05T16:45:00",
    hasDocument: true,
    isUnread: false,
    department: "IT",
    priority: "high",
    folder: "archive",
    documentName: "System-Migration-Final-Report.pdf",
    documentSize: "5.2MB",
  },
  {
    id: 34,
    subject: "Q4 2023 Sales Results",
    sender: "sales.analytics@example.com",
    recipient: "me@company.com",
    preview: "Q4 and full year 2023 sales results...",
    content:
      "Attached is the comprehensive report of our Q4 and full year 2023 sales results. We exceeded our annual target by 7% despite challenges in the market.",
    date: "2024-01-20T11:30:00",
    hasDocument: true,
    isUnread: false,
    department: "Sales",
    priority: "medium",
    folder: "archive",
    documentName: "2023-Q4-Sales-Results.xlsx",
    documentSize: "6.8MB",
  },
  {
    id: 35,
    subject: "Holiday Marketing Campaign Results",
    sender: "marketing.analytics@example.com",
    recipient: "me@company.com",
    preview: "Results from our holiday marketing campaign...",
    content:
      "Here's the analysis of our holiday marketing campaign results. The campaign generated a 22% increase in sales compared to last year's holiday season.",
    date: "2024-01-25T13:20:00",
    hasDocument: true,
    isUnread: false,
    department: "Marketing",
    priority: "medium",
    folder: "archive",
    documentName: "Holiday-Campaign-Analysis.pptx",
    documentSize: "9.1MB",
  },
  {
    id: 36,
    subject: "Contract Negotiation Completed",
    sender: "legal.team@example.com",
    recipient: "me@company.com",
    preview: "Successfully completed contract negotiations...",
    content:
      "We have successfully completed the negotiations for the strategic partnership contract. The final version is attached for your records.",
    date: "2024-02-15T15:10:00",
    hasDocument: true,
    isUnread: false,
    department: "Legal",
    priority: "high",
    folder: "archive",
    documentName: "Strategic-Partnership-Contract-Final.pdf",
    documentSize: "4.3MB",
  },
  {
    id: 37,
    subject: "Office Renovation Completion",
    sender: "facilities.manager@example.com",
    recipient: "me@company.com",
    preview: "Office renovation project completed...",
    content:
      "I'm pleased to inform you that the office renovation project has been completed on schedule and within budget. Attached is the final report with before and after photos.",
    date: "2024-02-28T10:45:00",
    hasDocument: true,
    isUnread: false,
    department: "Operations",
    priority: "low",
    folder: "archive",
    documentName: "Office-Renovation-Final-Report.pdf",
    documentSize: "12.6MB",
  },
  {
    id: 38,
    subject: "Annual Security Compliance Report",
    sender: "security.compliance@example.com",
    recipient: "me@company.com",
    preview: "Annual security compliance audit results...",
    content:
      "Attached is our annual security compliance report. We have successfully addressed all the findings from last year's audit and implemented additional security measures.",
    date: "2024-03-10T14:30:00",
    hasDocument: true,
    isUnread: false,
    department: "Security",
    priority: "high",
    folder: "archive",
    documentName: "Annual-Security-Compliance-Report.pdf",
    documentSize: "7.4MB",
  },
  {
    id: 39,
    subject: "Project Completion: Mobile App Launch",
    sender: "project.manager@example.com",
    recipient: "me@company.com",
    preview: "Successful completion of mobile app project...",
    content:
      "I'm happy to report that we have successfully completed the mobile app development project and launched it in both app stores. Attached is the final project report.",
    date: "2024-03-20T16:15:00",
    hasDocument: true,
    isUnread: false,
    department: "Project",
    priority: "medium",
    folder: "archive",
    documentName: "Mobile-App-Project-Completion-Report.pdf",
    documentSize: "8.9MB",
  },
  {
    id: 40,
    subject: "2023 Tax Filing Confirmation",
    sender: "finance.tax@example.com",
    recipient: "me@company.com",
    preview: "Confirmation of 2023 tax filings...",
    content:
      "This email confirms that all corporate tax filings for 2023 have been completed and submitted. Attached are the receipts and confirmation numbers for your records.",
    date: "2024-04-05T11:20:00",
    hasDocument: true,
    isUnread: false,
    department: "Finance",
    priority: "high",
    folder: "archive",
    documentName: "2023-Tax-Filing-Confirmation.pdf",
    documentSize: "3.2MB",
  },

  // TRASH - 10 messages
  {
    id: 41,
    subject: "Office Party Invitation",
    sender: "events.committee@example.com",
    recipient: "me@company.com",
    preview: "Invitation to the summer office party...",
    content:
      "You're invited to our annual summer office party on July 15th at 6 PM. Please RSVP by July 5th.",
    date: "2024-06-01T09:15:00",
    hasDocument: false,
    isUnread: false,
    department: "HR",
    priority: "low",
    folder: "trash",
    documentName: "",
    documentSize: "",
  },
  {
    id: 42,
    subject: "Software License Renewal",
    sender: "vendor.licensing@example.com",
    recipient: "me@company.com",
    preview: "Your software license is expiring soon...",
    content:
      "This is a reminder that your software license will expire in 30 days. Please renew to avoid service interruption.",
    date: "2024-05-30T14:20:00",
    hasDocument: false,
    isUnread: false,
    department: "IT",
    priority: "medium",
    folder: "trash",
    documentName: "",
    documentSize: "",
  },
  {
    id: 43,
    subject: "Sales Conference Registration",
    sender: "conference.organizer@example.com",
    recipient: "me@company.com",
    preview: "Registration for annual sales conference...",
    content:
      "Registration is now open for the annual sales conference. Early bird pricing ends on June 15th.",
    date: "2024-05-29T11:30:00",
    hasDocument: true,
    isUnread: false,
    department: "Sales",
    priority: "low",
    folder: "trash",
    documentName: "Sales-Conference-Brochure.pdf",
    documentSize: "2.8MB",
  },
  {
    id: 44,
    subject: "Marketing Newsletter",
    sender: "marketing.newsletter@example.com",
    recipient: "me@company.com",
    preview: "Latest marketing trends and insights...",
    content:
      "Check out our latest newsletter featuring marketing trends and insights for Q2 2024.",
    date: "2024-05-28T15:45:00",
    hasDocument: true,
    isUnread: false,
    department: "Marketing",
    priority: "low",
    folder: "trash",
    documentName: "Marketing-Newsletter-Q2.pdf",
    documentSize: "1.5MB",
  },
  {
    id: 45,
    subject: "Legal Webinar Invitation",
    sender: "legal.education@example.com",
    recipient: "me@company.com",
    preview: "Invitation to compliance webinar...",
    content:
      "Join our upcoming webinar on the latest compliance regulations affecting our industry. Registration is free for employees.",
    date: "2024-05-27T10:20:00",
    hasDocument: true,
    isUnread: false,
    department: "Legal",
    priority: "low",
    folder: "trash",
    documentName: "Compliance-Webinar-Details.pdf",
    documentSize: "0.9MB",
  },
  {
    id: 46,
    subject: "Office Supplies Catalog",
    sender: "supplies.vendor@example.com",
    recipient: "me@company.com",
    preview: "Updated office supplies catalog...",
    content:
      "Here's our updated office supplies catalog for 2024 with new products and pricing.",
    date: "2024-05-26T13:15:00",
    hasDocument: true,
    isUnread: false,
    department: "Operations",
    priority: "low",
    folder: "trash",
    documentName: "Office-Supplies-Catalog-2024.pdf",
    documentSize: "5.7MB",
  },
  {
    id: 47,
    subject: "Security Training Reminder",
    sender: "security.training@example.com",
    recipient: "me@company.com",
    preview: "Reminder to complete security training...",
    content:
      "This is a reminder that your annual security awareness training must be completed by June 30th.",
    date: "2024-05-25T09:45:00",
    hasDocument: false,
    isUnread: false,
    department: "Security",
    priority: "medium",
    folder: "trash",
    documentName: "",
    documentSize: "",
  },
  {
    id: 48,
    subject: "Project Management Tool Update",
    sender: "software.updates@example.com",
    recipient: "me@company.com",
    preview: "New features in project management tool...",
    content:
      "We've updated our project management tool with new features. Check out the attached guide to learn more.",
    date: "2024-05-24T16:30:00",
    hasDocument: true,
    isUnread: false,
    department: "Project",
    priority: "low",
    folder: "trash",
    documentName: "PM-Tool-Update-Guide.pdf",
    documentSize: "2.1MB",
  },
  {
    id: 49,
    subject: "Budget Template",
    sender: "finance.templates@example.com",
    recipient: "me@company.com",
    preview: "Updated budget template for Q3...",
    content:
      "Attached is the updated budget template for Q3 planning. Please use this version for all budget submissions.",
    date: "2024-05-23T11:20:00",
    hasDocument: true,
    isUnread: false,
    department: "Finance",
    priority: "medium",
    folder: "trash",
    documentName: "Q3-Budget-Template.xlsx",
    documentSize: "1.3MB",
  },
  {
    id: 50,
    subject: "Industry Conference Highlights",
    sender: "industry.news@example.com",
    recipient: "me@company.com",
    preview: "Highlights from recent industry conference...",
    content:
      "Here are the highlights and key takeaways from the recent industry conference. Includes presentation slides from keynote speakers.",
    date: "2024-05-22T14:15:00",
    hasDocument: true,
    isUnread: false,
    department: "Marketing",
    priority: "low",
    folder: "trash",
    documentName: "Industry-Conference-Highlights.pdf",
    documentSize: "7.2MB",
  },
];
