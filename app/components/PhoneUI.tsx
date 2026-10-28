/* Drawn app screens in the style of the real Inzivo mobile app, with sample data.
   Used for flow steps that have no matching screenshot. Keyed by "modeIndex:stepIndex". */
import { Icon, type IconName } from "./icons";

type Block =
  | { t: "notice"; icon: IconName; title: string; text: string }
  | { t: "seg"; opts: string[]; on: number }
  | { t: "photo"; ok: boolean }
  | { t: "pin"; filled: number }
  | { t: "rows"; rows: [string, string, "ok"?][] }
  | { t: "big"; value: string; sub: string; chip?: string }
  | { t: "btn"; label: string; done?: boolean }
  | { t: "form"; rows: [string, string][] }
  | { t: "list"; items: [IconName, string, string, "ok"?][] }
  | { t: "route" };

type Screen = { eyebrow: string; title: string; nav: number; blocks: Block[] };

const MODES = ["Office", "Home", "Field work"];
const DAY = "Thursday 22 October";

export const SCREENS: Record<string, Screen> = {
  // Requests screen of the app tour
  req: { eyebrow: "Requests", title: "Requests", nav: 2, blocks: [
    { t: "list", items: [["calendar", "Request leave", "Pick dates"], ["clock", "Request overtime", "Summary and photo"], ["user", "Short permission", "Up to a few hours"], ["edit", "Report an issue", "Add a screenshot"]] },
    { t: "rows", rows: [["Leave, 24 to 25 Oct", "Approved", "ok"], ["Overtime, Saturday", "Pending"], ["Permission, 1 hour", "Approved", "ok"]] },
  ] },
  // Office
  "0:0": { eyebrow: DAY, title: "Today", nav: 0, blocks: [
    { t: "notice", icon: "bell", title: "Your shift starts at 09:00", text: "Check in when you arrive. We remind you again if the check-in is missed." },
    { t: "rows", rows: [["Shift", "09:00 to 18:00"], ["Mode", "Office"]] },
    { t: "btn", label: "Check in" },
  ] },
  "0:1": { eyebrow: DAY, title: "Check in", nav: 1, blocks: [
    { t: "seg", opts: MODES, on: 0 },
    { t: "notice", icon: "pin", title: "Office for today", text: "Field staff who reach the office switch to Office automatically." },
    { t: "photo", ok: false },
    { t: "pin", filled: 0 },
  ] },
  "0:2": { eyebrow: DAY, title: "Check in", nav: 1, blocks: [
    { t: "seg", opts: MODES, on: 0 },
    { t: "photo", ok: true },
    { t: "rows", rows: [["Face match", "Verified", "ok"], ["Live-face check", "Passed", "ok"]] },
    { t: "pin", filled: 6 },
    { t: "btn", label: "Slide to check in" },
  ] },
  "0:3": { eyebrow: DAY, title: "Check in", nav: 1, blocks: [
    { t: "rows", rows: [["Face match", "Verified", "ok"], ["Live-face check", "Passed", "ok"], ["Location", "In the office area", "ok"], ["Mock location", "Not detected", "ok"]] },
    { t: "notice", icon: "target", title: "Server re-check passed", text: "The server checks your PIN, photo and distance again before it counts." },
    { t: "btn", label: "Checked in at 09:02", done: true },
  ] },
  "0:4": { eyebrow: "Thu 22 Oct", title: "Priya", nav: 0, blocks: [
    { t: "big", value: "04:37:12", sub: "Worked so far today. Pauses if you leave the office area.", chip: "Checked in, sharing live" },
    { t: "rows", rows: [["In at", "09:02 AM"], ["Mode", "Office"], ["Location ping", "Every 2 min"]] },
    { t: "btn", label: "Check out" },
  ] },
  "0:5": { eyebrow: DAY, title: "Check out", nav: 1, blocks: [
    { t: "big", value: "09:01:44", sub: "Worked today. Stops the moment you check out." },
    { t: "notice", icon: "clock", title: "Forgot to check out?", text: "The system checks you out at the shift end time, 18:00." },
    { t: "btn", label: "Check out" },
  ] },
  // Work from home
  "1:0": { eyebrow: DAY, title: "Check in", nav: 1, blocks: [
    { t: "seg", opts: MODES, on: 1 },
    { t: "notice", icon: "home", title: "Home location set", text: "Check-in works within your home radius." },
    { t: "photo", ok: false },
    { t: "pin", filled: 0 },
  ] },
  "1:1": { eyebrow: DAY, title: "Check in", nav: 1, blocks: [
    { t: "seg", opts: MODES, on: 1 },
    { t: "photo", ok: true },
    { t: "rows", rows: [["Face match", "Verified", "ok"], ["Live-face check", "Passed", "ok"]] },
    { t: "pin", filled: 6 },
    { t: "btn", label: "Slide to check in" },
  ] },
  "1:2": { eyebrow: DAY, title: "Check in", nav: 1, blocks: [
    { t: "rows", rows: [["Face match", "Verified", "ok"], ["Location", "Inside your home area", "ok"], ["Mock location", "Not detected", "ok"]] },
    { t: "notice", icon: "home", title: "Working from home", text: "Outside the home radius the check-in is rejected." },
    { t: "btn", label: "Checked in at 09:08", done: true },
  ] },
  "1:4": { eyebrow: "Requests", title: "Requests", nav: 2, blocks: [
    { t: "list", items: [["calendar", "Request leave", "Pick dates"], ["clock", "Request overtime", "Summary and photo"], ["user", "Short permission", "1 hour"]] },
    { t: "rows", rows: [["Short permission", "Approved", "ok"], ["Today", "11:53 to 12:53"]] },
  ] },
  "1:5": { eyebrow: DAY, title: "Check out", nav: 1, blocks: [
    { t: "big", value: "08:52:10", sub: "Worked today. Stops the moment you check out." },
    { t: "notice", icon: "clock", title: "Automatic check-out", text: "If you forget, the system does it at the shift end time." },
    { t: "btn", label: "Check out" },
  ] },
  // Field
  "2:3": { eyebrow: "Field work", title: "Arrived", nav: 0, blocks: [
    { t: "notice", icon: "check", title: "Bright Star Traders", text: "Arrival detected. Deliver samples." },
    { t: "rows", rows: [["Arrived", "11:08 AM", "ok"], ["Time on site", "00:12:40"], ["Stop", "1 of 3"]] },
    { t: "btn", label: "Open visit form" },
  ] },
  "2:4": { eyebrow: "Field work", title: "Visit log", nav: 0, blocks: [
    { t: "form", rows: [["Photo", "Taken"], ["Contact person", "R. Kumar"], ["Remarks", "Samples delivered"]] },
    { t: "btn", label: "Save visit" },
    { t: "notice", icon: "pin", title: "Can't visit this place?", text: "Skip it and give a reason." },
  ] },
  "2:5": { eyebrow: "Field work", title: "Tracking", nav: 0, blocks: [
    { t: "route" },
    { t: "rows", rows: [["GPS point", "Every 10 s"], ["Unsent points", "14, saved on the phone"], ["Signal", "Syncs when it returns", "ok"]] },
  ] },
  "2:6": { eyebrow: DAY, title: "Check out", nav: 1, blocks: [
    { t: "form", rows: [["Odometer start", "12,640"], ["Odometer end", "12,775"], ["Distance", "135 km"]] },
    { t: "notice", icon: "money", title: "Reimbursement", text: "Worked out from GPS distance and the odometer readings." },
    { t: "btn", label: "Check out" },
  ] },
};

const NAV: [IconName, string][] = [["activity", "Dashboard"], ["check", "Check in/out"], ["calendar", "Requests"], ["user", "Profile"]];

function Blk({ b }: { b: Block }) {
  switch (b.t) {
    case "notice":
      return (
        <div className="pui-card pui-notice">
          <span className="pui-ico"><Icon name={b.icon} size={18} /></span>
          <div><b>{b.title}</b><p>{b.text}</p></div>
        </div>
      );
    case "seg":
      return (
        <div className="pui-seg">
          {b.opts.map((o, i) => <span key={o} className={i === b.on ? "on" : ""}>{o}</span>)}
        </div>
      );
    case "photo":
      return (
        <div className="pui-card pui-photo">
          <small>Presence photo</small>
          <div className="pui-photo-row">
            <span className={`pui-face${b.ok ? " ok" : ""}`}>{b.ok ? <i /> : <Icon name="camera" size={22} />}</span>
            <p>{b.ok ? "Photo taken. The server checks it before your check-in counts." : "Take a selfie. It is matched to your enrolled face."}</p>
          </div>
        </div>
      );
    case "pin":
      return (
        <div className="pui-card">
          <small>PIN</small>
          <div className="pui-pin">{Array.from({ length: 6 }, (_, i) => <span key={i}>{i < b.filled ? "●" : ""}</span>)}</div>
        </div>
      );
    case "rows":
      return (
        <div className="pui-card pui-rows">
          {b.rows.map(([k, v, s]) => <div key={k}><span>{k}</span><b className={s}>{v}</b></div>)}
        </div>
      );
    case "big":
      return (
        <div className="pui-card pui-big">
          {b.chip && <em>{b.chip}</em>}
          <strong>{b.value}</strong>
          <p>{b.sub}</p>
        </div>
      );
    case "btn":
      return <div className={`pui-btn${b.done ? " done" : ""}`}>{b.done && <Icon name="check" size={18} />}{b.label}</div>;
    case "form":
      return (
        <div className="pui-card pui-form">
          {b.rows.map(([k, v]) => <div key={k}><small>{k}</small><b>{v}</b></div>)}
        </div>
      );
    case "list":
      return (
        <div className="pui-card pui-list">
          {b.items.map(([ic, t, s]) => (
            <div key={t}><span className="pui-ico"><Icon name={ic} size={18} /></span><div><b>{t}</b><p>{s}</p></div></div>
          ))}
        </div>
      );
    case "route":
      return (
        <div className="pui-card pui-route">
          <svg viewBox="0 0 200 120" aria-hidden="true">
            <path d="M14 98 C40 70 52 40 84 44 S 126 88 150 58 S 176 22 188 26" fill="none" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" />
            {[[14, 98], [44, 64], [84, 44], [118, 72], [150, 58], [170, 34]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3.5" fill="#fff" stroke="var(--accent)" strokeWidth="2" />)}
            <circle cx="188" cy="26" r="6" fill="var(--pin)" />
          </svg>
        </div>
      );
  }
}

export function PhoneScreen({ id }: { id: string }) {
  const s = SCREENS[id];
  if (!s) return null;
  return (
    <div className="pui" role="img" aria-label={`${s.title} screen (sample data)`}>
      <div className="pui-sb"><b>11:42</b><span className="pui-bat" /></div>
      <header><small>{s.eyebrow}</small><h4>{s.title}</h4></header>
      <div className="pui-body">{s.blocks.map((b, i) => <Blk key={i} b={b} />)}</div>
      <nav className="pui-nav">
        {NAV.map(([ic, l], i) => <span key={l} className={i === s.nav ? "on" : ""}><Icon name={ic} size={18} />{l}</span>)}
      </nav>
    </div>
  );
}
