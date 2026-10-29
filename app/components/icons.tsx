/* Inline stroke icons on a 24px grid. Each entry is a list of SVG path/shape strings. */
const P = {
  shield: ["M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z", "M9 12l2 2 4-4"],
  lock: ["M5 11h14v10H5z", "M8 11V8a4 4 0 018 0v3"],
  key: ["M11 12l9-9", "M16 7l3 3", "M8 11a4 4 0 100 8 4 4 0 000-8z"],
  user: ["M12 4a4 4 0 100 8 4 4 0 000-8z", "M4 21c0-4 3.6-7 8-7s8 3 8 7"],
  users: ["M9 4.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z", "M2 20c0-3.5 3-6 7-6s7 2.5 7 6", "M17 6a3 3 0 010 6", "M18 14c2.5.5 4 2.5 4 5"],
  pin: ["M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z", "M12 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"],
  route: ["M6 17a2 2 0 100 4 2 2 0 000-4z", "M18 3a2 2 0 100 4 2 2 0 000-4z", "M8 19h7a3 3 0 000-6H9a3 3 0 010-6h7"],
  nav: ["M3 11l18-8-8 18-2-8-8-2z"],
  clock: ["M12 3a9 9 0 100 18 9 9 0 000-18z", "M12 7v5l3 2"],
  calendar: ["M4 5h16v16H4z", "M4 10h16M8 3v4M16 3v4"],
  camera: ["M4 8h3l2-3h6l2 3h3v12H4z", "M12 10.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z"],
  face: ["M4 8V5a1 1 0 011-1h3M16 4h3a1 1 0 011 1v3M20 16v3a1 1 0 01-1 1h-3M8 20H5a1 1 0 01-1-1v-3", "M9 10v1.5M15 10v1.5", "M9.5 15c1.5 1.5 3.5 1.5 5 0"],
  phone: ["M7 2h10a1 1 0 011 1v18a1 1 0 01-1 1H7a1 1 0 01-1-1V3a1 1 0 011-1z", "M11 18h2"],
  monitor: ["M3 4h18v12H3z", "M8 21h8M12 16v5"],
  server: ["M4 4h16v6H4z", "M4 14h16v6H4z", "M8 7h.01M8 17h.01"],
  database: ["M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3z", "M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6", "M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"],
  cloud: ["M7 18a4 4 0 01-.5-8 6 6 0 0111.5 1.5A3.5 3.5 0 0117 18H7z"],
  file: ["M6 3h9l4 4v14H6z", "M14 3v5h5", "M9 13h7M9 17h7"],
  download: ["M12 3v12", "M7 10l5 5 5-5", "M4 21h16"],
  upload: ["M12 21V9", "M7 14l5-5 5 5", "M4 3h16"],
  bell: ["M6 16v-5a6 6 0 0112 0v5l2 2H4z", "M10 21h4"],
  offline: ["M2 8.8a15 15 0 0120 0", "M5 12.5a10 10 0 0114 0", "M8.5 16a5 5 0 017 0", "M12 20h.01", "M3 3l18 18"],
  check: ["M12 3a9 9 0 100 18 9 9 0 000-18z", "M8 12l3 3 5-6"],
  gauge: ["M4 18a9 9 0 1116 0", "M12 18l4-6"],
  activity: ["M3 12h4l3-8 4 16 3-8h4"],
  truck: ["M2 6h12v10H2z", "M14 9h4l4 4v3h-8", "M6 16a2 2 0 100 4 2 2 0 000-4z", "M17 16a2 2 0 100 4 2 2 0 000-4z"],
  store: ["M3 9l2-5h14l2 5", "M3 9a3 3 0 006 0 3 3 0 006 0 3 3 0 006 0", "M5 12v8h14v-8"],
  pill: ["M10.5 20.5a5 5 0 01-7-7l10-10a5 5 0 017 7z", "M8.5 8.5l7 7"],
  wrench: ["M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.8-3.8a6 6 0 01-7.9 7.9l-6.9 6.9a2.1 2.1 0 01-3-3l6.9-6.9a6 6 0 017.9-7.9z"],
  building: ["M5 21V3h10v18", "M15 9h4v12", "M3 21h18", "M9 7h2M9 11h2M9 15h2"],
  briefcase: ["M3 8h18v12H3z", "M9 8V5h6v3", "M3 14h18"],
  home: ["M3 11l9-8 9 8", "M5 10v11h14V10", "M10 21v-6h4v6"],
  search: ["M11 4a7 7 0 100 14 7 7 0 000-14z", "M20 20l-4-4"],
  money: ["M2 6h20v12H2z", "M12 9a3 3 0 100 6 3 3 0 000-6z", "M5.5 9v.01M18.5 15v.01"],
  layers: ["M12 3l9 5-9 5-9-5z", "M3 13l9 5 9-5"],
  settings: ["M12 9a3 3 0 100 6 3 3 0 000-6z", "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"],
  refresh: ["M20 11a8 8 0 00-14-4L4 9", "M4 4v5h5", "M4 13a8 8 0 0014 4l2-2", "M20 20v-5h-5"],
  zap: ["M13 2L4 14h7l-1 8 9-12h-7z"],
  eye: ["M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z", "M12 9.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"],
  globe: ["M12 3a9 9 0 100 18 9 9 0 000-18z", "M3 12h18", "M12 3a14 14 0 010 18M12 3a14 14 0 000 18"],
  receipt: ["M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z", "M9 8h6M9 12h6"],
  edit: ["M4 20h4L19 9l-4-4L4 16z", "M13 7l4 4"],
  cpu: ["M7 7h10v10H7z", "M10 10h4v4h-4z", "M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"],
  target: ["M12 3a9 9 0 100 18 9 9 0 000-18z", "M12 7a5 5 0 100 10 5 5 0 000-10z", "M12 11.5a.5.5 0 100 1 .5.5 0 000-1z"],
  login: ["M10 4H5v16h5", "M14 8l4 4-4 4", "M8 12h10"],
  arrow: ["M5 12h14", "M13 6l6 6-6 6"],
  card: ["M2 5h20v14H2z", "M2 10h20"],
  flag: ["M5 21V4", "M5 4h12l-2 4 2 4H5"],
} as const;

export type IconName = keyof typeof P;

export function Icon({ name, size = 20, className = "" }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg className={`ico ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {P[name].map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

/* A rounded square holding an icon. */
export function Badge({ name, size = 20 }: { name: IconName; size?: number }) {
  return <span className="badge"><Icon name={name} size={size} /></span>;
}

/* Icon for each titled item in the content, so data files stay plain text. */
const BY_TITLE: Record<string, IconName> = {
  // overview
  "Admin dashboard": "monitor", "Employee web app": "globe", "Mobile app": "phone",
  // problems
  "Attendance is hard to manage": "file", "No clear proof of attendance": "eye", "Field employees are difficult to track": "route",
  "Working hours can be incorrect": "clock", "Travel expenses are difficult to calculate": "money", "Different teams use different systems": "layers",
  // console callouts
  "Approve in one tap": "check", "Missed face checks": "face", "Tracking stopped": "offline", "Who is working now": "users", "Today at a glance": "activity",
  // industries
  "FMCG and consumer goods": "store", "Pharma sales": "pill", "Field service": "wrench", "Maintenance": "settings", "Collections and recovery": "receipt",
  "Surveys and research": "search", "Logistics and delivery": "truck", "Contract and customer-site staff": "building", "Hybrid offices": "briefcase",
  // stats
  "Face verification": "face", "Mobile data a day": "download", "Distance accuracy": "gauge", "Field-worker tracking": "route", "Office and WFH staff": "clock",
  "Check-in zones": "target", "Location security": "shield", "Data sync": "refresh", "Automatic checks": "zap", "Check-out reminder": "bell",
  "Travel reimbursement": "money", "Work modes": "layers", "Live requests": "activity", "Bulk upload": "upload", "Photo retention": "camera",
  // capabilities
  Administrators: "monitor", Employees: "user", "Field teams": "truck",
  // app screens
  "Face-verified check-in": "login", Dashboard: "activity", "Today's places": "pin", Navigation: "nav", Requests: "calendar",
  "Background tracking": "route", "Guided phone settings": "settings", "Push notifications": "bell",
  // security
  "Secure connections": "lock", Credentials: "key", "Brute-force protection": "shield", Sessions: "refresh", "Company isolation": "building",
  "Presence integrity": "face", "Audit trail": "file", "Safe data handling": "database", Integrations: "layers", "Kept current": "check",
  // reliability
  Hosting: "cloud", Database: "database", "Fast face checks": "zap", "Health endpoint": "activity", Scheduler: "clock",
  "Offline check-in": "offline", "Phone settings": "phone", "Live admin screens": "monitor",
  // status categories
  Platform: "layers", Security: "shield", Field: "route", Automation: "zap", Reports: "file", Admin: "settings", Design: "edit", Business: "card",
  // roadmap
  "Check-in and locations": "pin", "Field work": "route", "Admin and integrations": "settings", "Employee app": "phone",
};

export function iconFor(title: string, fallback: IconName = "check"): IconName {
  return BY_TITLE[title] ?? fallback;
}
