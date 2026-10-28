/* Small animated scenes, one per capability, shown with sample data. Every scene is plain CSS animation:
   the parent gives it a new key whenever the capability changes, so it replays from the start. */
import type { CSSProperties } from "react";
import { Icon, type IconName } from "./icons";

type Row = [IconName, string, string, string?, string?];
type Scene =
  | { k: "rows"; head: string; rows: Row[]; tiles?: [string, string, string][] }
  | { k: "approve"; head: string; rows: Row[] }
  | { k: "bars"; head: string; tiles: [string, string, string][]; bars: [string, number][]; hist: Row[] }
  | { k: "map"; head: string; path: boolean; pins: [number, number, string, IconName][]; stats?: [string, string][] }
  | { k: "cal"; head: string }
  | { k: "prog"; head: string; file: string; label: string; done: string }
  | { k: "odo"; head: string };

export const CAP_ICONS: IconName[][] = [
  ["activity", "upload", "calendar", "check", "edit", "bell", "file"],
  ["camera", "clock", "calendar", "bell", "zap", "monitor", "face"],
  ["route", "pin", "nav", "gauge", "offline", "search", "refresh"],
];
export const CAP_APPS = ["Admin console", "Employee app", "Field app"];

const SCENES: Scene[][] = [
  [
    { k: "rows", head: "Today, live", tiles: [["Working", "42", "ok"], ["Late", "3", "warn"], ["On leave", "5", ""], ["Not in yet", "8", ""]], rows: [["user", "Priya", "Office, in at 09:02", "Working"], ["clock", "Arun", "Expected 09:00", "Late 41 min"], ["calendar", "Meena", "Annual leave", "On leave"]] },
    { k: "prog", head: "Add people", file: "staff.xlsx", label: "Importing people from the spreadsheet", done: "500 people added" },
    { k: "rows", head: "Shifts and locations", rows: [["calendar", "Monday to Friday", "09:00 to 18:00", "Office"], ["home", "Saturday", "10:00 to 14:00", "Home"], ["pin", "Head office", "Geofence radius 150 m", "Set"]] },
    { k: "approve", head: "Requests waiting", rows: [["calendar", "Leave, Kavya", "2 days, 27 to 28 Oct", "Approve", "Approved"], ["clock", "Overtime, Ravi", "2 hours on Saturday", "Approve", "Approved"], ["user", "Short permission, Neha", "1 hour, 11:30 to 12:30", "Approve", "Approved"]] },
    { k: "rows", head: "Manual entry", rows: [["calendar", "Day and person", "21 Oct, Sana"], ["edit", "Reason", "Phone battery died before check-in"], ["file", "Audit trail", "Added by Admin at 11:20", "Logged"]] },
    { k: "rows", head: "Alerts centre", rows: [["bell", "Tracking stopped", "Ravi, 10:14", "New"], ["face", "Missed face check", "Ajay, 10:31", "New"], ["offline", "No signal for 20 min", "Field team, 10:48", "New"]] },
    { k: "rows", head: "Reports and API", rows: [["file", "Attendance, October", "Excel file", "Preparing", "Ready"], ["download", "People list", "CSV file", "Preparing", "Ready"], ["key", "API key", "Shown once, stored hashed", "Created"]] },
  ],
  [
    { k: "rows", head: "Check in", rows: [["camera", "Selfie", "Photo taken", "Taking", "Done"], ["lock", "PIN", "6 digits", "Checking", "Done"], ["face", "Face match", "Live-face check passed", "Checking", "Done"], ["pin", "Location", "Inside the office area", "Checking", "Done"]] },
    { k: "bars", head: "My time", tiles: [["Working now", "05:42", "ok"], ["Leave balance", "12 days", ""], ["This week", "38.5 h", ""]], bars: [["Mon", 82], ["Tue", 90], ["Wed", 76], ["Thu", 88], ["Fri", 64]], hist: [["check", "Wed 22 Oct", "09:02 to 18:05, 9 h 03 min", "On time"], ["clock", "Tue 21 Oct", "09:41 to 18:00, 8 h 19 min", "Late"]] },
    { k: "rows", head: "Requests", rows: [["calendar", "Leave", "24 to 25 Oct", "Sent", "Approved"], ["clock", "Overtime", "2 hours, Saturday", "Sent", "Approved"], ["edit", "Report an issue", "Screenshot attached", "Sent", "Received"]] },
    { k: "rows", head: "Reminders", rows: [["bell", "Shift starts at 09:00", "Remember to check in", "Now"], ["bell", "Check-in missed", "Tap to check in", "09:20"], ["bell", "Leaving the area", "Tracking is on", "Alert"]] },
    { k: "rows", head: "End of shift", rows: [["clock", "Shift ends", "18:00", "Today"], ["offline", "Forgot to check out", "No action taken", "Open", "Missed"], ["check", "Automatic check-out", "Recorded at the shift end", "18:00"]] },
    { k: "cal", head: "My Page, October" },
    { k: "rows", head: "Profile and security", rows: [["face", "Biometric unlock", "Fingerprint or face", "Off", "On"], ["user", "Profile photo", "Updated", "Saved"], ["lock", "Change PIN", "New 6-digit PIN", "Saved"]] },
  ],
  [
    { k: "map", head: "Route tracked", path: true, pins: [[90, 100, "Stop 1", "pin"], [180, 50, "Stop 2", "pin"], [270, 110, "Stop 3", "pin"]], stats: [["Distance", "12.4 km"], ["Places", "3"]] },
    { k: "rows", head: "Visit log", rows: [["camera", "Photo", "Shop front", "Saved"], ["user", "Contact person", "R. Kumar", "Saved"], ["edit", "Remarks", "Samples delivered", "Saved"]] },
    { k: "rows", head: "Today's places", rows: [["pin", "Bright Star Traders", "1.2 km away", "Next"], ["pin", "Metro Hardware", "2.8 km away"], ["pin", "Sunrise Pharmacy", "4.1 km away"]] },
    { k: "odo", head: "Odometer and reimbursement" },
    { k: "rows", head: "No signal", rows: [["offline", "Check-in saved on the phone", "No signal", "Saved"], ["pin", "14 location points waiting", "Kept on the phone", "Waiting", "Waiting"], ["refresh", "Signal is back", "Sending to the server", "Syncing", "Synced"]] },
    { k: "map", head: "Nearby", path: false, pins: [[70, 70, "Shop", "store"], [150, 120, "School", "building"], [220, 60, "Cafe", "store"], [250, 130, "Pharmacy", "pill"]] },
    { k: "rows", head: "Switching mode", rows: [["truck", "Field work", "On the road", "Field", "Field"], ["building", "Reached the office", "Inside the office area", "Arrived"], ["check", "Switched to Office", "No action needed", "Office"]] },
  ],
];

const at = (i: number): CSSProperties => ({ "--i": i } as CSSProperties);

function RowItem({ r, i, btn }: { r: Row; i: number; btn?: boolean }) {
  const [ic, t, s, a, b] = r;
  return (
    <div className="cs-row" style={at(i)}>
      <span className="cs-ic"><Icon name={ic} size={17} /></span>
      <div className="cs-tx"><b>{t}</b><p>{s}</p></div>
      {a && (
        <span className={`cs-tags${b ? " swap" : ""}${btn ? " btn" : ""}`}>
          <em className="a">{a}</em>
          {b && <em className="b"><Icon name="check" size={13} />{b}</em>}
        </span>
      )}
    </div>
  );
}

const CAL: string[] = (() => {
  const out: string[] = [];
  for (let d = 1; d <= 31; d++) out.push(d === 2 || d === 14 ? "late" : d === 9 || d === 10 ? "leave" : "ok");
  return out;
})();

export function CapScene({ role, cap }: { role: number; cap: number }) {
  const sc = SCENES[role][cap];
  let body;
  switch (sc.k) {
    case "rows":
    case "approve":
      body = (
        <>
          {"tiles" in sc && sc.tiles && (
            <div className="cs-tiles">{sc.tiles.map(([l, v, tone], i) => <div key={l} className={`cs-tile ${tone}`} style={at(i)}><b>{v}</b><span>{l}</span></div>)}</div>
          )}
          <div className="cs-list">{sc.rows.map((r, i) => <RowItem key={r[1]} r={r} i={i + ("tiles" in sc && sc.tiles ? 2 : 0)} btn={sc.k === "approve"} />)}</div>
        </>
      );
      break;
    case "bars":
      body = (
        <div className="cs-bars">
          <div className="cs-tiles t3">{sc.tiles.map(([l, v, tone], i) => <div key={l} className={`cs-tile ${tone}`} style={at(i)}><b>{v}</b><span>{l}</span></div>)}</div>
          <div className="cs-chart">{sc.bars.map(([l, h], i) => <div key={l} style={{ ...at(i), "--h": `${h}%` } as CSSProperties}><i /><span>{l}</span></div>)}</div>
          <div className="cs-list">{sc.hist.map((r, i) => <RowItem key={r[1]} r={r} i={i + 6} />)}</div>
        </div>
      );
      break;
    case "prog":
      body = (
        <div className="cs-prog">
          <div className="cs-row" style={at(0)}><span className="cs-ic"><Icon name="file" size={17} /></span><div className="cs-tx"><b>{sc.file}</b><p>{sc.label}</p></div></div>
          <div className="cs-track"><i /></div>
          <div className="cs-done"><Icon name="check" size={16} />{sc.done}</div>
        </div>
      );
      break;
    case "cal":
      body = (
        <div className="cs-cal">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <span key={i} className="h">{d}</span>)}
          {CAL.map((c, i) => <span key={i} className={c} style={at(i)}>{i + 1}</span>)}
        </div>
      );
      break;
    case "odo":
      body = (
        <div className="cs-odo">
          <div style={at(0)}><span>Start</span><b>12,640</b></div>
          <div style={at(1)}><span>End</span><b>12,775</b></div>
          <div style={at(2)}><span>Odometer</span><b>135 km</b></div>
          <div style={at(3)}><span>GPS distance</span><b>134.5 km</b></div>
          <div className="pay" style={at(4)}><span>Reimbursement at ₹3 per km</span><b>₹403.5</b></div>
        </div>
      );
      break;
    case "map":
      body = (
        <div className={`cs-map${sc.stats ? "" : " full"}`}>
          <svg viewBox="0 0 300 180" role="img" aria-label={sc.head}>
            <rect width="300" height="180" fill="#f3f0ea" />
            {[40, 100, 160].map((y) => <path key={y} d={`M0 ${y}H300`} stroke="#fff" strokeWidth="7" />)}
            {[20, 90, 180, 270].map((x) => <path key={x} d={`M${x} 0V180`} stroke="#fff" strokeWidth="7" />)}
            {sc.path && <path d="M20 150L20 100L90 100L90 50L180 50L180 110L270 110" pathLength={1} className="cs-draw" fill="none" stroke="#ef6c00" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />}
            {sc.pins.map(([x, y, l], i) => (
              <g key={l} transform={`translate(${x} ${y})`}>
                <g className="cs-pin" style={at(i + (sc.path ? 3 : 0))}>
                  <circle r="9" fill="#fff" stroke="#ef6c00" strokeWidth="2.5" />
                  <text textAnchor="middle" y="3.5" fontSize="9" fontWeight="800" fill="#b85200">{i + 1}</text>
                  <rect x={-(l.length * 2.9 + 5)} y="-28" width={l.length * 5.8 + 10} height="14" rx="7" fill="#fff" stroke="#e5ded5" />
                  <text textAnchor="middle" y="-18" fontSize="9" fontWeight="600" fill="#1f1a17">{l}</text>
                </g>
              </g>
            ))}
          </svg>
          {sc.stats && <div className="cs-stats">{sc.stats.map(([l, v]) => <div key={l}><span>{l}</span><b>{v}</b></div>)}</div>}
        </div>
      );
      break;
  }
  return <div className="cs-body"><div className="cs-head">{sc.head}</div>{body}</div>;
}
