/* Illustrative "My Page" (employee web app) drawn from the portfolio's description, with sample data. */
const WEEK = [
  ["M", 9.2], ["T", 9.0], ["W", 9.2], ["T", 6.2], ["F", 0], ["S", 0], ["S", 0],
] as const;

type Day = "present" | "late" | "leave" | "off" | "future";

/* October 2026: the 1st is a Thursday; today is Thursday 22. */
function dayState(d: number): Day {
  const dow = (d + 2) % 7; // 0 = Monday
  if (d > 22) return "future";
  if (dow >= 5) return "off";
  if (d === 12) return "leave";
  if (d === 6 || d === 15) return "late";
  return "present";
}

const ACTIVITY = [
  ["Checked in", "Thu 22 Oct, 09:08 AM", "Work from home"],
  ["Checked out", "Wed 21 Oct, 06:33 PM", "9h 09m"],
  ["Checked in", "Wed 21 Oct, 09:24 AM", "Office"],
  ["Checked out", "Tue 20 Oct, 06:36 PM", "9h 00m"],
] as const;

export function MyPageMock() {
  const cells: (number | null)[] = [null, null, null, ...Array.from({ length: 31 }, (_, i) => i + 1)];
  return (
    <div className="mp" role="img" aria-label="My Page: today's status, hours over the last 7 days, late marks, recent activity and an attendance calendar (sample data)">
      <div className="mp-bar">
        <span className="mp-logo"><i />INZIVO</span>
        <b>My Page</b>
        <span className="mp-user"><em>PN</em>Priya N · EMP012</span>
      </div>
      <div className="mp-stats">
        <div><small>Today</small><b className="mp-on">Checked in</b><span>since 09:08 AM</span></div>
        <div><small>Time so far</small><b>02:33:18</b><span>Work from home</span></div>
        <div><small>Late marks</small><b>2</b><span>this month</span></div>
        <div><small>Average start</small><b>09:14</b><span>this month</span></div>
      </div>
      <div className="mp-main">
        <div className="mp-col">
          <div className="mp-card">
            <header><b>Hours, last 7 days</b><span>29h 23m</span></header>
            <div className="mp-chart">
              {WEEK.map(([d, h], i) => (
                <div key={i}>
                  <span style={{ height: `${Math.max(h / 10, 0.04) * 100}%` }} className={h === 0 ? "none" : i === 3 ? "today" : ""} />
                  <small>{d}</small>
                </div>
              ))}
            </div>
          </div>
          <div className="mp-card">
            <header><b>Recent activity</b></header>
            <ul className="mp-act">
              {ACTIVITY.map((a, i) => (
                <li key={i}><b>{a[0]}</b><span>{a[1]}</span><em>{a[2]}</em></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mp-col">
          <div className="mp-card">
            <header><b>October 2026</b><span>Attendance</span></header>
            <div className="mp-cal">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <small key={i}>{d}</small>)}
              {cells.map((d, i) => (d === null ? <span key={i} /> : <span key={i} className={`d ${dayState(d)}${d === 22 ? " now" : ""}`}>{d}</span>))}
            </div>
            <div className="mp-key"><span className="present">Present</span><span className="late">Late</span><span className="leave">Leave</span></div>
          </div>
          <p className="mp-note">View-only. Check in with the app or the kiosk.</p>
        </div>
      </div>
    </div>
  );
}
