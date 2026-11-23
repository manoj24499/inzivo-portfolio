export const NAV = [
  ["overview", "Overview"],
  ["problems", "Problems"],
  ["capabilities", "Capabilities"],
  ["payroll", "Payroll"],
  ["industries", "Industries"],
  ["numbers", "Numbers"],
  ["security", "Security"],
] as const;

export const OVERVIEW = [
  { name: "Admin Dashboard", who: "Owners, HR and managers", where: "Any desktop browser", tag: "Web Console", list: ["Live team dashboard and alerts", "People, shifts, offices and settings", "Approve leave, overtime and permissions", "Manual entries for missed days", "Field maps, routes and assigned places", "Excel and CSV reports, API keys"] },
  { name: "Employee Web App", who: "Every employee", where: "Any browser, same sign-in as the app", tag: "My Page", list: ["Today's status and time so far", "Hours over the last 7 days", "Late marks this month and average start time", "Recent activity and an attendance calendar", "Change PIN and sign out", "View-only: check in with the app or kiosk"] },
  { name: "Mobile App", who: "Employees, especially field staff", where: "Android phones and iPhones", platforms: ["Android", "iOS"], tag: "Android and IOS", list: ["Check in and out with selfie, PIN and face match", "Leave, overtime and permission requests", "Background tracking and live working time", "Today's places with turn-by-turn navigation", "Visit log with photo, contact and remarks", "Reminders and alerts"] },
];

export const PROBLEMS = [
  ["Attendance Is Hard to Manage", "Employee attendance is recorded in registers, spreadsheets and WhatsApp messages. Collecting and checking these records takes time.", "Accurate and reliable attendance", "Employees check in and out using a PIN, photo and face verification, with location checks where applicable."],
  ["No Clear Proof of Attendance", "Managers may not know whether employees checked in at the correct place or arrived on time.", "Know who checked in and where", "Managers can view employee attendance and check-in details from the admin dashboard."],
  ["Field Employees Are Difficult to Track", "Once employees leave the office, managers cannot easily see where they went, which places they visited or how far they travelled.", "Track field visits and travel", "View field workers' routes, visited places, travel distance and visit records from one place."],
  ["Working Hours Can Be Incorrect", "Forgotten check-outs and missing records make it difficult to calculate the correct working hours.", "Automatic attendance management", "Reminders and automatic check-out help reduce missed check-outs and incorrect working-hour records."],
  ["Different Teams Use Different Systems", "Office, work-from-home and field employees may use different methods to record attendance, making everything harder to manage.", "One platform for every work mode", "Manage office, work-from-home and field employees through one application and admin dashboard."],
];

export const INDUSTRIES = [
  { name: "FMCG and Consumer Goods", who: "Sales reps who visit dozens of shops a day", features: ["Today's shops assigned, sorted nearest-first", "Turn-by-turn navigation inside the app", "Visit log per shop: photo, contact person, order remarks", "Full route, km and time spent at each outlet"] },
  { name: "Pharma Sales", who: "Medical reps calling on doctors, chemists and hospitals", features: ["Planned call list of doctors and chemists", "Proof of every call: place, time, photo, contact", "Time spent at each call, arrival and departure", "Fake-GPS apps blocked, so visits are genuine", "Excel reports for area and regional managers"] },
  { name: "Field Service", who: "Installation and repair technicians at customer homes and sites", features: ["Assign the day's jobs as places on the map", "Navigation to each customer address", "Arrival time and time on site measured", "Job photos and remarks logged at each visit"] },
  { name: "Maintenance", who: "Facility, AMC and equipment teams on scheduled rounds", features: ["Shifts per weekday for planned service rounds", "Service visits recorded with site photos as proof", "Overtime requests with a work summary and photo", "Tracking-stopped alerts if a phone goes silent", "Manual entry for a missed day, with audit trail"] },
  { name: "Collections and Recovery", who: "Banks and lenders with agents visiting customers", features: ["Every visit stamped with place, time and photo", "Contact person and remarks recorded per visit", "Day's route with numbered stops for review", "Fake-GPS blocked and face-verified check-in", "Excel report of up to 31 days for audits"] },
  { name: "Surveys and Research", who: "Agencies with enumerators in towns and villages", features: ["Survey points assigned on the map", "Offline check-in in low-signal areas, synced later", "Visit log with photo and respondent contact", "Places covered and distance for each day", "Light on data: under 1 MB a day for tracking"] },
  { name: "Logistics and Delivery", who: "Delivery staff and drivers on the road all day", features: ["Live route tracking with 10-second GPS points", "Distance within 99.6% of the vehicle odometer", "Start and end km; estimate if a reading is missed", "Alerts when a phone stops sending location"] },
  { name: "Contract and Customer-Site Staff", who: "Security, housekeeping and staff deployed at client sites", features: ["Face match stops proxy attendance", "Live-face check blocks a photo of another person", "Shared kiosk check-in screen at the site", "Shift reminders and automatic check-out", "One face can belong to only one employee ID"] },
  { name: "Hybrid Offices", who: "IT and corporate offices mixing on-site and remote work", features: ["Office area and a home location for each person", "Choose Home or Office each day", "Leave, overtime and permissions in the app", "My Page web view of hours and calendar", "Excel and CSV exports for payroll"] },
];

/* box = [left, top, width, height] as percentages of the 1900 x 1372 console screenshot */
export const CONSOLE_CALLOUTS = [
  { title: "Approve in One Tap", text: "Leave, overtime and short permissions wait here. Approve or decline without leaving the dashboard.", box: [19.7, 13.7, 78.2, 12.7] },
  { title: "Missed Face Checks", text: "Check-ins that went through without a face check because the face service could not be reached, flagged for review.", box: [19.7, 28.4, 78.2, 17.9] },
  { title: "Tracking Stopped", text: "A field worker's phone stopped sending location. See who it is and when the phone last reported. The employee has already been sent a reminder.", box: [19.7, 48.3, 78.2, 19.6] },
  { title: "Who Is Working Now", text: "Live totals: working, late, on leave and not in yet.", box: [19.7, 69.9, 78.2, 14.8] },
  { title: "Today at a Glance", text: "One bar for the whole team's status today.", box: [19.7, 86.7, 78.2, 12.4] },
] as const;

export const STATS = [
  ["AI", "Face Verification", "Each check-in selfie is matched to the enrolled face; a liveness check blocks photos of another person."],
  ["< 1 MB", "Mobile Data a Day", "Tracking for a full eight-hour field day."],
  ["99.6%", "Distance Accuracy", "Measured at 99.6% against the vehicle odometer on a 135 km field trip (134.5 km by GPS)."],
  ["10 s", "Field-Worker Tracking", "A GPS point every 10 seconds, sent in batches, records the true road route."],
  ["2 min", "Office and WFH Staff", "Live location every 2 minutes for checked-in office and work-from-home staff, with low battery use."],
  ["Geofence", "Check-In Zones", "Office and home staff check in within a set radius; working time pauses if they leave it."],
  ["Anti-spoof", "Location Security", "Mock-location apps are detected and the check-in is rejected, re-verified on the server."],
  ["Offline", "Data Sync", "Check-ins and GPS route points are stored on the phone and synced when the signal returns."],
  ["5 min", "Automatic Checks", "Every five minutes the system alerts employees and admins: shift reminders, silent field-worker alerts, auto check-out if forgotten."],
  ["After shift", "Check-Out Reminder", "Then checked out automatically at the shift end time."],
  ["3", "Work Modes", "Office, work from home and field, each with its own rules."],
  ["15 s", "Live Requests", "New requests appear live; approve in one tap."],
  ["500+", "Bulk Upload", "Add a whole team from one spreadsheet."],
  ["45 days", "Photo Retention", "Photos are retained for 45 days by default. Each organisation can customise the period."],
];

export const CAPABILITIES: Record<string, string[]> = {
  Administrators: ["Live dashboard: who is working, late, on leave or not in yet", "Add people one by one, or up to 500 at once from a spreadsheet", "Shifts per weekday, with office and home locations and geofence radius", "Approve leave, overtime and short permissions in one tap", "Manual entries: record a day the phone missed, with a reason and an audit trail", "Alerts centre for stopped tracking and missed face checks", "Excel and CSV reports, plus a public API with keys"],
  Employees: ["Check in and out with a photo, PIN and face check", "See working time, leave balance, history and weekly hours", "Request leave, overtime or a short permission, and report an issue with a screenshot", "Reminders before the shift and when a check-in is missed", "Automatic check-out if they forget at the end of the shift", "My Page on the web: status, weekly hours, late marks and a calendar", "Biometric unlock, profile photo and change-PIN in the app"],
  "Field Teams": ["Background tracking of the route, distance and places visited", "Log each visit with photo, contact person and remarks", "Assigned places in nearest-first order, with turn-by-turn directions in the app", "Odometer start and end readings, with distance worked out from GPS", "Offline check-in when there is no signal, synced later", "Nearby shops, schools and restaurants on the map", "Automatic switch between Field and Office when they reach the office"],
};

export const APP_SCREENS = [
  { name: "Face-Verified Check-In", bullets: ["Selfie matched to the enrolled face", "Liveness check blocks photos of another person", "Location verified against the work area", "Field workers add start and end km"] },
  { name: "Dashboard", bullets: ["Live working time and distance to the office", "Leave balance, history and weekly hours", "Late and leave notices"] },
  { name: "Today's Places", bullets: ["The day's stops, nearest first", "Re-orders after every stop", "Open the visit form, or skip with a reason"] },
  { name: "Navigation", bullets: ["Turn-by-turn directions inside the app", "Spoken prompts and automatic re-routing", "Arrival detected at each stop"] },
  { name: "Requests", bullets: ["Request leave, overtime or a short permission", "Report an issue with a screenshot", "See each request as pending, approved or declined", "Managers decide in one tap from the admin console"] },
];

export const SECURITY = [
  ["Secure Connections", "HTTPS throughout, strict transport security, a content-security policy, clickjacking protection and no-sniff headers."],
  ["Credentials", "Passwords and PINs are stored securely, never in plain text; chosen PINs must be at least 6 digits."],
  ["Brute-Force Protection", "Per-person attempt limits (10 per 5 minutes, 30 per hour) shared by kiosk, app and web, plus per-address limits on sign-in, kiosk, password reset and other public endpoints."],
  ["Sessions", "Separate signing keys for web and mobile, 15-minute access tokens, refresh tokens that rotate and can be revoked, and sign-out everywhere in one step."],
  ["Company Isolation", "Data access is scoped to the signed-in company, keeping each company's data separate."],
  ["Presence Integrity", "Face verification, live-face check, geofence checks, mock-GPS rejection, and one check-in and check-out a day enforced by the database."],
  ["Audit Trail", "Manual entries and permission decisions record who approved them and why."],
  ["Safe Data Handling", "Every request is validated and database access is parameterised. Photos are type-checked, size-limited, resized and removed after the retention period each organisation chooses."],
  ["Integrations", "API keys are stored hashed, payment webhooks are signature-checked, and the scheduler is protected by a secret."],
  ["Kept Current", "Dependencies audited and patched, with critical findings closed in October 2026."],
];

/* Employee flow per work mode. `shot` is a real app screenshot (screen-N.jpg) that matches the step. */
export type FlowStep = { icon: string; title: string; text: string; shot?: number };
export const FLOWS: { mode: string; icon: string; steps: FlowStep[] }[] = [
  {
    mode: "Office", icon: "building", steps: [
      { icon: "bell", title: "Shift Reminder", text: "A reminder arrives before the shift starts, and again if the check-in is missed." },
      { icon: "phone", title: "Open the App", text: "Choose Office for the day. Field staff who reach the office switch to Office automatically." },
      { icon: "face", title: "Selfie, PIN and Face Match", text: "The selfie is matched to the enrolled face. A live-face check blocks a photo of another person." },
      { icon: "target", title: "Location Verified", text: "The check-in counts only inside the office radius. Mock-location apps are rejected." },
      { icon: "clock", title: "Working Time Runs", text: "Live location every 2 minutes. If the employee leaves the area, working time pauses and a warning is sent." },
      { icon: "login", title: "Check Out", text: "Check out in the app or at the kiosk. If it is forgotten, the system checks out at the shift end time." },
    ],
  },
  {
    mode: "Work from Home", icon: "home", steps: [
      { icon: "home", title: "Choose Home", text: "Pick Home for the day. Each person has a home location with its own check-in radius." },
      { icon: "face", title: "Selfie, PIN and Face Match", text: "The same checks as the office: selfie, PIN, face match and a live-face check." },
      { icon: "target", title: "Home Location Verified", text: "Check-in works within the home radius and is rejected outside it." },
      { icon: "clock", title: "Working Time Runs", text: "The dashboard shows Checked in, live working time and the week's hours. Location every 2 minutes.", shot: 2 },
      { icon: "calendar", title: "Requests from the App", text: "Leave, overtime and short permissions are requested in the app and approved in one tap by the admin." },
      { icon: "login", title: "Check Out", text: "Check out when the day ends, or the system does it at the shift end time." },
    ],
  },
  {
    mode: "Field", icon: "truck", steps: [
      { icon: "gauge", title: "Check In with Odometer", text: "Choose Field work, take the selfie, enter the PIN and the vehicle's odometer reading.", shot: 1 },
      { icon: "pin", title: "Today's Places", text: "The day's stops, nearest first. They re-order after every stop.", shot: 3 },
      { icon: "nav", title: "Navigate", text: "Turn-by-turn directions inside the app, with spoken prompts and automatic re-routing.", shot: 4 },
      { icon: "check", title: "Arrival Detected", text: "Arrival is detected at each stop and the time on site is measured." },
      { icon: "camera", title: "Log the Visit", text: "Photo, contact person and remarks for every visit, or skip the place with a reason." },
      { icon: "route", title: "Tracked on the Road", text: "A GPS point every 10 seconds, kept on the phone and synced when the signal returns." },
      { icon: "check", title: "Check Out", text: "Enter the end odometer reading. Distance is worked out from GPS and odometer." },
    ],
  },
];

/* Competitor list prices as supplied. `perUser` is the approximate monthly cost per user for a 100-employee team. */

/* Payroll module: feature groups, each card tagged Built, Partly built or Not started. */
export type PayStatus = "Built" | "Partly built" | "Not started";
export const PAYROLL_FLOW = [
  ["Set Up Company", "Entities, branches, tax rules"],
  ["Add Employees", "Profiles and documents"],
  ["Run Payroll", "Attendance in, salaries out"],
  ["Issue Payslips", "PDF, email, self-service"],
  ["Notify", "Alerts and announcements"],
];
export const PAYROLL: { group: string; icon: string; cards: { title: string; status: PayStatus; points: string[] }[] }[] = [
  { group: "Company Setup", icon: "building", cards: [
    { title: "Organisation", status: "Built", points: ["Company, legal entities, branches", "Departments and work locations", "State registrations per entity"] },
    { title: "Tax and Statutory Rules", status: "Built", points: ["PF, ESI, PT, TDS, US federal and more", "Stored as editable, versioned data", "A platform checker approves before use"] },
    { title: "Custom Fields", status: "Built", points: ["Country IDs like PAN, Aadhaar, SSN", "Added per country, no code change"] },
    { title: "ID Formats", status: "Built", points: ["Auto-fills the next employee ID", "Same for document numbers", "HR can override"] },
  ] },
  { group: "Employees", icon: "users", cards: [
    { title: "Employee Records", status: "Built", points: ["Step-by-step add-employee wizard", "Full profile with salary and payslip tabs", "History of status changes"] },
    { title: "Documents Wallet", status: "Built", points: ["One place for every employee document", "Required-document checklist", "Expiry alerts at 30, 7 and 0 days"] },
    { title: "Exits", status: "Partly built", points: ["Resignation, manager and HR approval", "Last day, notice waiver, clearance checklist", "Coming: full and final settlement"] },
  ] },
  { group: "Payroll", icon: "money", cards: [
    { title: "Attendance Sync", status: "Built", points: ["Pulls attendance, leave and holidays", "Fills loss-of-pay days automatically", "Daily sync or on demand"] },
    { title: "Salary Engine", status: "Built", points: ["Components and salary templates", "Overtime, new-joiner pro-rating", "Income tax and deductions, gross to net"] },
    { title: "Pay Cycles", status: "Built", points: ["Enter inputs, review salary register", "Finalize to lock the cycle", "Reopen only before payslips go out"] },
    { title: "Payslips", status: "Built", points: ["PDF on your company letterhead", "Choose what each payslip shows", "Sensitive IDs can be masked"] },
    { title: "Email Payslips", status: "Built", points: ["Send to all employees in one go", "See which emails were delivered", "Resend the failed ones"] },
  ] },
  { group: "HR Documents", icon: "file", cards: [
    { title: "Letterheads", status: "Built", points: ["Design one in the app", "Upload your own", "Or let AI design it"] },
    { title: "Offer and Appointment Letters", status: "Built", points: ["Candidates and letter templates", "Candidates sign online, no login needed"] },
    { title: "Relieving and Experience Letters", status: "Not started", points: ["Issued at the end of an exit"] },
    { title: "Appraisals and Certificates", status: "Not started", points: ["Planned for a later stage"] },
  ] },
  { group: "Self-Service", icon: "user", cards: [
    { title: "My Payslips and Letters", status: "Built", points: ["View and download payslips", "View their own letters"] },
    { title: "My Documents", status: "Built", points: ["Upload documents", "HR reviews and verifies them"] },
    { title: "My Requests", status: "Built", points: ["Request changes to personal details", "Submit or withdraw resignation"] },
  ] },
  { group: "Notifications", icon: "bell", cards: [
    { title: "Notification Bell", status: "Built", points: ["Payslip ready, approvals waiting", "Expiring documents, sync failures", "Reminders after 2 days of no action"] },
    { title: "Announcements", status: "Built", points: ["Company-wide banners", "Daily summary email"] },
    { title: "Mobile Push", status: "Not started", points: ["Push alerts on phones"] },
  ] },
];
export const PAYROLL_ROLES = ["Admin", "HR", "Payroll Admin", "Manager", "Finance", "Auditor", "Employee"];
