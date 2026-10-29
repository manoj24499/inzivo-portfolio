"use client";

import Image from "next/image";
import { Badge, Icon, iconFor, type IconName } from "./icons";
import { MyPageMock } from "./MyPage";
import { PhoneScreen } from "./PhoneUI";
import { CAP_APPS, CAP_ICONS, CapScene } from "./CapScenes";
import { memo, useEffect, useRef, useState } from "react";
import {
  CAPABILITIES, COMPETITORS, DELIVERED, FLOWS, INDUSTRIES, NAV, OVERVIEW,
  PROBLEMS, RELIABILITY, ROADMAP, SECURITY, STATS, STRONGEST,
} from "../data";

const SHOT = (n: number) => `/screens/screen-${n}.jpg`;

function Phone({ n, alt, priority = false }: { n: number; alt: string; priority?: boolean }) {
  return (
    <div className="device">
      <Image src={SHOT(n)} alt={alt} width={600} height={1298} priority={priority} sizes="300px" />
    </div>
  );
}

/* True while the slide with this id covers the middle of the screen; epoch counts arrivals so timers can restart from zero. */
function useInView(id: string) {
  const [v, setV] = useState({ inView: false, epoch: 0 });
  useEffect(() => {
    const el = document.getElementById(id);
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setV((s) => (e.isIntersecting ? { inView: true, epoch: s.epoch + 1 } : { ...s, inView: false })),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [id]);
  return v;
}

/* Rotates an index. The progress bar's CSS animation drives the timing, so pausing the bar pauses the rotation.
   It starts from the first item with an empty bar each time the slide is reached, and holds still while off screen. */
function useCycle(len: number, ms: number, id: string) {
  const { inView, epoch } = useInView(id);
  const [st, setSt] = useState({ i: 0, e: 0 });
  const [hover, setHover] = useState(false);
  const i = st.e === epoch ? st.i : 0;
  const setI = (n: number) => setSt({ i: n, e: epoch });
  const next = () => setSt({ i: (i + 1) % len, e: epoch });
  const bind = {
    onPointerEnter: (e: React.PointerEvent) => { if (e.pointerType === "mouse") setHover(true); },
    onPointerLeave: () => setHover(false),
  };
  return { i, setI, bind, paused: hover || !inView, next, len, ms, epoch };
}
type Cycle = ReturnType<typeof useCycle>;
type Bind = Cycle["bind"];

/* One segment per item: finished items are full, the current one fills, the rest are empty. */
function Progress({ c }: { c: Cycle }) {
  return (
    <div className="seg" {...c.bind} role="presentation">
      {Array.from({ length: c.len }, (_, j) => (
        <span key={j} className={`seg-i${j < c.i ? " done" : ""}`}>
          {j === c.i && (
            <span
              className="seg-fill"
              key={`${c.epoch}-${c.i}`}
              style={{ animationDuration: `${c.ms}ms`, animationPlayState: c.paused ? "paused" : "running" }}
              onAnimationEnd={c.next}
            />
          )}
        </span>
      ))}
      <span className="seg-n">{c.i + 1}/{c.len}</span>
    </div>
  );
}

function Tabs({ items, value, onChange, bind }: { items: string[]; value: number; onChange: (i: number) => void; bind: Bind }) {
  return (
    <div className="tabs" role="tablist" {...bind}>
      {items.map((t, i) => (
        <button key={t} type="button" role="tab" className="tab" aria-selected={value === i} onClick={() => onChange(i)}><Icon name={iconFor(t)} size={16} />{t}</button>
      ))}
    </div>
  );
}

const SLIDE_IDS = ["top", "overview", "problems", "capabilities", "flow", "calculator", "industries", "competitors", "numbers", "security", "reliability", "status", "roadmap"];
const PARENT: Record<string, string> = { flow: "capabilities", calculator: "capabilities", reliability: "security" };

/* Dots on the right edge: one per slide, click to jump. */
export function SlideDots() {
  const [cur, setCur] = useState("top");
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".slide"));
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        setCur(e.target.id);
        els.forEach((el) => el.classList.toggle("active", el === e.target));
      }),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    els.forEach((e) => io.observe(e));

    /* One wheel or trackpad scroll moves exactly one slide; extra input is ignored while it travels. */
    const slideMode = matchMedia("(min-width: 901px) and (min-height: 640px)");
    let locked = false;
    const onWheel = (ev: WheelEvent) => {
      if (!slideMode.matches || ev.ctrlKey) return;
      ev.preventDefault();
      if (locked || Math.abs(ev.deltaY) < 4) return;
      const now = Math.round(window.scrollY / window.innerHeight);
      const next = Math.min(els.length - 1, Math.max(0, now + (ev.deltaY > 0 ? 1 : -1)));
      if (next === now) return;
      locked = true;
      window.scrollTo({ top: els[next].offsetTop, behavior: "smooth" });
      setTimeout(() => { locked = false; }, 900);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => { io.disconnect(); window.removeEventListener("wheel", onWheel); };
  }, []);
  return (
    <div className="dots" aria-label="Slides">
      {SLIDE_IDS.map((id) => (
        <a key={id} href={`#${id}`} aria-label={id} aria-current={cur === id} />
      ))}
    </div>
  );
}

export function TopNav() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(PARENT[e.target.id] ?? e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    document.querySelectorAll("section[id]").forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);
  return (
    <nav className="top">
      <div className="wrap">
        <div className="logo"><i />INZIVO</div>
        <div className="links">
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? "on" : ""}>{label}</a>
          ))}
        </div>
      </div>
    </nav>
  );
}

export function Hero() {
  return (
    <header className="slide hero" id="top">
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <div className="eyebrow">Project portfolio · October 2026</div>
            <h1>Attendance and field-force management, <em>in one platform</em></h1>
            <p className="lede">Office, work-from-home and field teams check in with face verification, are tracked on the road, and are managed from a single console.</p>
            <div className="hero-cta">
              <a className="btn" href="#flow">See a day&apos;s flow <Icon name="arrow" size={18} /></a>
              <a className="btn ghost" href="#capabilities"><Icon name="monitor" size={18} /> Explore capabilities</a>
            </div>
            <div className="meta">Prepared by the Inzivo team</div>
          </div>
          <div className="hero-art" aria-hidden={false}>
            <div className="ph a"><Phone n={3} alt="Today's places screen listing four stops, nearest first" priority /></div>
            <div className="ph b"><Phone n={2} alt="Dashboard screen showing live working time and weekly hours" priority /></div>
          </div>
        </div>
        <div className="strip">
          <div><Icon name="gauge" size={22} /><b>99.6%</b><span>Distance accuracy on a 135 km trip</span></div>
          <div><Icon name="route" size={22} /><b>10 s</b><span>Between GPS points for field staff</span></div>
          <div><Icon name="download" size={22} /><b>&lt; 1 MB</b><span>Mobile data per field day</span></div>
          <div><Icon name="face" size={22} /><b>AI</b><span>Face check on every check-in</span></div>
        </div>
      </div>
    </header>
  );
}

export function Overview() {
  const c = useCycle(OVERVIEW.length, 6000, "overview");
  const { i, setI, bind } = c;
  const d = OVERVIEW[i];
  const img =
    d.name === "Admin dashboard" ? (
      <div className="browser">
        <div className="browser-bar"><i /><i /><i /></div>
        <Image src="/screens/cover.jpg" alt="Admin dashboard with alerts and team totals" width={1900} height={1372} sizes="(max-width: 900px) 100vw, 640px" />
      </div>
    ) : d.name === "Employee web app" ? (
      <div className="browser light">
        <div className="browser-bar"><i /><i /><i /></div>
        <MyPageMock />
      </div>
    ) : (
      <div className="ov-phones">
        <Phone n={1} alt="Check-in screen with presence photo, odometer and PIN" />
        <Phone n={2} alt="Dashboard screen with live working time and weekly hours" />
      </div>
    );
  return (
    <section className="slide" id="overview"><div className="wrap">
      <div className="eyebrow">Overview</div>
      <h2>One platform for every kind of working day</h2>
      <p className="lede">Each organisation runs in its own isolated workspace. Employees record attendance through a mobile app or a shared kiosk, and managers oversee operations from a web console. All three share one backend, so an admin sees an employee&apos;s action straight away. A kiosk screen for each company and a public API with keys are part of the platform too.</p>
      <Tabs items={OVERVIEW.map((o) => o.name)} value={i} onChange={setI} bind={bind} />
      <Progress c={c} />
      <div className="ov" {...bind}>
        <div className="ov-text">
          <div className="card panel">
            <h3><Badge name={iconFor(d.name)} />{d.name}</h3>
            <dl className="facts">
              <div><dt><Icon name="users" size={14} />Who uses it</dt><dd>{d.who}</dd></div>
              <div><dt><Icon name="globe" size={14} />Where it runs</dt><dd>{d.where}{d.platforms && <span className="plats">{d.platforms.map((x) => <span key={x} className="plat"><Icon name="phone" size={13} />{x}</span>)}</span>}</dd></div>
            </dl>
          </div>
          <div className="card panel">
            <h3><Badge name="zap" />{d.tag}: what it does</h3>
            <ul className="tick">{d.list.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
        </div>
        <div className="ov-img">{img}</div>
      </div>
    </div></section>
  );
}

export function Problems() {
  const c = useCycle(PROBLEMS.length, 5000, "problems");
  const { i: open, setI: setOpen, bind } = c;
  return (
    <section className="slide" id="problems"><div className="wrap">
      <div className="eyebrow">The business case</div>
      <h2>The problem, and how Inzivo solves it</h2>
      <p className="lede">Managing employee attendance shouldn&apos;t be complicated. Open each row.</p>
      <div className="acc-col" {...bind}>
      <Progress c={c} />
      <div className="acc">
        {PROBLEMS.map((r, i) => (
          <div key={r[0]} className={`card acc-item${open === i ? " open" : ""}`}>
            <button className="acc-q" type="button" aria-expanded={open === i} onClick={() => setOpen(i)}>
              <span className="acc-n">0{i + 1}</span><Badge name={iconFor(r[0])} size={18} /><span className="t">{r[0]}</span><i />
            </button>
            <div className="acc-a">
              <div className="p"><small>Problem</small>{r[1]}</div>
              <div className="s"><small>How Inzivo helps</small><b>{r[2]}</b>{r[3]}</div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div></section>
  );
}

export function Industries() {
  const c = useCycle(INDUSTRIES.length, 4500, "industries");
  const { i, setI, bind } = c;
  const x = INDUSTRIES[i];
  return (
    <section className="slide" id="industries"><div className="wrap">
      <div className="eyebrow">Audience</div>
      <h2>Who Inzivo is for</h2>
      <p className="lede">Pick an industry to see the features that cover its needs. Built for teams anywhere, with your own working rules and public-holiday calendar.</p>
      <div className="chips" {...bind}>
        {INDUSTRIES.map((n, j) => (
          <button key={n.name} type="button" className="chip" aria-pressed={i === j} onClick={() => setI(j)}><Icon name={iconFor(n.name)} size={16} />{n.name}</button>
        ))}
      </div>
      <Progress c={c} />
      <div className="card ind" aria-live="polite" {...bind}>
        <div><div className="eyebrow">Inzivo features they use</div><h3><Badge name={iconFor(x.name)} size={24} />{x.name}</h3><p>{x.who}</p></div>
        <ul className="tick">{x.features.map((f) => <li key={f}>{f}</li>)}</ul>
      </div>
    </div></section>
  );
}


export function Numbers() {
  return (
    <section className="slide" id="numbers"><div className="wrap">
      <div className="eyebrow">In numbers</div>
      <h2>The product at a glance</h2>
      <p className="lede">Figures describe the product as built in October 2026. Distance accuracy and data use come from a measured 135 km field trip.</p>
      <div className="stats">
        {STATS.map((s) => (
          <div key={s[1]} className="stat">
            <Badge name={iconFor(s[1])} size={18} /><b>{s[0]}</b><span>{s[1]}</span><p>{s[2]}</p>
          </div>
        ))}
      </div>
    </div></section>
  );
}

/* A sample 135 km field day on a generated city map. The camera follows the vehicle, then pulls back to show the whole trip. */
const MW = 1200, MH = 840, G = 60;
type Pt = [number, number];
function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function smoothCurve(pts: Pt[], steps: number): Pt[] {
  const out: Pt[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] ?? pts[i + 1];
    for (let k = 0; k < steps; k++) {
      const u = k / steps, u2 = u * u, u3 = u2 * u;
      const f = (a: number, b: number, c: number, d: number) => 0.5 * (2 * b + (-a + c) * u + (2 * a - 5 * b + 4 * c - d) * u2 + (-a + 3 * b - 3 * c + d) * u3);
      out.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
}
/* corners of the route are rounded so the vehicle turns like it would on a road */
function roundCorners(pts: Pt[], r: number): Pt[] {
  const out: Pt[] = [pts[0]];
  for (let i = 1; i < pts.length - 1; i++) {
    const [a, b, c] = [pts[i - 1], pts[i], pts[i + 1]];
    const l1 = Math.hypot(b[0] - a[0], b[1] - a[1]), l2 = Math.hypot(c[0] - b[0], c[1] - b[1]);
    const p1: Pt = [b[0] - ((b[0] - a[0]) / l1) * r, b[1] - ((b[1] - a[1]) / l1) * r];
    const p2: Pt = [b[0] + ((c[0] - b[0]) / l2) * r, b[1] + ((c[1] - b[1]) / l2) * r];
    for (let k = 0; k <= 8; k++) {
      const u = k / 8, v = 1 - u;
      out.push([v * v * p1[0] + 2 * v * u * b[0] + u * u * p2[0], v * v * p1[1] + 2 * v * u * b[1] + u * u * p2[1]]);
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
}

const VERTS: Pt[] = [[120, 720], [120, 600], [300, 600], [300, 420], [540, 420], [540, 540], [720, 540], [720, 300], [960, 300], [960, 180], [1080, 180], [1080, 420], [1080, 660], [840, 660], [840, 780]];
const ROUTE = roundCorners(VERTS, 20);
const CUMF = ROUTE.reduce<number[]>((acc, q, i) => (i === 0 ? [0] : [...acc, acc[i - 1] + Math.hypot(q[0] - ROUTE[i - 1][0], q[1] - ROUTE[i - 1][1])]), []);
const ROUTE_LEN = CUMF[CUMF.length - 1];
const CUM = CUMF.map((l) => l / ROUTE_LEN);
const ROUTE_D = `M${ROUTE.map((q) => `${q[0].toFixed(1)} ${q[1].toFixed(1)}`).join("L")}`;
function onRoute(t: number): Pt {
  const c = Math.min(1, Math.max(0, t));
  let i = 1;
  while (i < CUM.length - 1 && CUM[i] < c) i++;
  const k = (c - CUM[i - 1]) / (CUM[i] - CUM[i - 1] || 1);
  return [ROUTE[i - 1][0] + (ROUTE[i][0] - ROUTE[i - 1][0]) * k, ROUTE[i - 1][1] + (ROUTE[i][1] - ROUTE[i - 1][1]) * k];
}
const STOPS = ([[0, "Start", "Head office"], [3, "Bright Star Traders", "Stop 1"], [6, "Metro Hardware", "Stop 2"], [8, "Sunrise Pharmacy", "Stop 3"], [10, "Greenfield Supermart", "Stop 4"], [12, "Lakeside Distributors", "Stop 5"], [14, "End", "Back at base"]] as [number, string, string][]).map(([vi, name, tag]) => {
  let best = 0;
  ROUTE.forEach((q, i) => { if (Math.hypot(q[0] - VERTS[vi][0], q[1] - VERTS[vi][1]) < Math.hypot(ROUTE[best][0] - VERTS[vi][0], ROUTE[best][1] - VERTS[vi][1])) best = i; });
  return { name, tag, f: CUM[best], p: ROUTE[best] };
});
const TRIP = { km: 135, match: 134.5 / 135, rate: 3, hours: 8, runMs: 20000, holdMs: 3500 };
/* the vehicle halts at each place for a moment, so the clock keeps running while the position holds */
const DWELL = 0.03, MOVE = 1 - DWELL * (STOPS.length - 2);
function tOf(u: number) {
  let rem = u, prev = 0;
  for (let i = 1; i < STOPS.length; i++) {
    const leg = (STOPS[i].f - prev) * MOVE;
    if (rem <= leg) return prev + rem / MOVE;
    rem -= leg; prev = STOPS[i].f;
    if (i < STOPS.length - 1) { if (rem <= DWELL) return prev; rem -= DWELL; }
  }
  return 1;
}

const RIVER = smoothCurve([[-60, 250], [200, 215], [420, 305], [640, 255], [880, 165], [1260, 200]], 12);
const RIVER_D = `M${RIVER.map((q) => `${q[0].toFixed(0)} ${q[1].toFixed(0)}`).join("L")}`;
const PARKS = [[360, 600, 120, 120], [780, 420, 120, 120], [120, 180, 120, 120], [600, 60, 120, 120]];
const BIG_X = [240, 480, 720, 960], BIG_Y = [240, 480, 720];
const xs = Array.from({ length: MW / G + 1 }, (_, i) => i * G), ys = Array.from({ length: MH / G + 1 }, (_, i) => i * G);
const MINOR_D = xs.filter((x) => !BIG_X.includes(x)).map((x) => `M${x} 0V${MH}`).join("") + ys.filter((y) => !BIG_Y.includes(y)).map((y) => `M0 ${y}H${MW}`).join("");
const BIG_D = BIG_X.map((x) => `M${x} 0V${MH}`).join("") + BIG_Y.map((y) => `M0 ${y}H${MW}`).join("");
const BUILDINGS = (() => {
  const r = rng(7), out: { x: number; y: number; w: number; h: number; c: number }[] = [];
  for (let cx = 0; cx < MW / G; cx++) for (let cy = 0; cy < MH / G; cy++) {
    const mx = cx * G + 30, my = cy * G + 30;
    if (RIVER.some(([a, b]) => Math.hypot(a - mx, b - my) < 46)) continue;
    if (PARKS.some(([px, py, pw, ph]) => mx > px && mx < px + pw && my > py && my < py + ph)) continue;
    for (let sx = 0; sx < 2; sx++) for (let sy = 0; sy < 2; sy++) {
      if (r() < 0.14) continue;
      out.push({ x: cx * G + 9 + sx * 22 + r() * 3, y: cy * G + 9 + sy * 22 + r() * 3, w: 16 + r() * 4, h: 16 + r() * 4, c: Math.floor(r() * 4) });
    }
  }
  return out;
})();
const BCOL = ["#e8e2d8", "#ebe6dd", "#e1dbd0", "#eeeae2"];

const BaseMap = memo(function BaseMap() {
  return (
    <g>
      <rect width={MW} height={MH} fill="#f3f0ea" />
      {PARKS.map(([x, y, w, h]) => <rect key={x + "-" + y} x={x} y={y} width={w} height={h} rx="10" fill="#cfe6c6" />)}
      <path d={RIVER_D} fill="none" stroke="#a9d3df" strokeWidth="50" strokeLinecap="round" strokeLinejoin="round" />
      {BUILDINGS.map((b, i) => <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx="1.5" fill={BCOL[b.c]} stroke="#d9d2c6" strokeWidth="0.5" />)}
      <path d={MINOR_D} stroke="#dcd5c9" strokeWidth="9.5" fill="none" />
      <path d={BIG_D} stroke="#e6c768" strokeWidth="15" fill="none" />
      <path d={MINOR_D} stroke="#fff" strokeWidth="7" fill="none" />
      <path d={BIG_D} stroke="#fdf1c4" strokeWidth="12" fill="none" />
      <g fontSize="9" fill="#8a8377" fontWeight="600" letterSpacing="1.5" style={{ textTransform: "uppercase" }} textAnchor="middle">
        <text x="360" y="237">Lake View Road</text>
        <text x="840" y="477">Market Street</text>
        <text x="420" y="717">Station Road</text>
        <text x="1080" y="477">Orchard Road</text>
        <text transform="translate(477 650) rotate(-90)">Ring Road</text>
        <text transform="translate(717 120) rotate(-90)">Civil Lines</text>
      </g>
      <g fontSize="10" fill="#4f8ca0" fontStyle="italic" textAnchor="middle"><text x="520" y="290">River</text></g>
      <g fontSize="10" fill="#5c8a52" fontWeight="600" textAnchor="middle"><text x="420" y="664">City Park</text><text x="840" y="484">Garden</text></g>
    </g>
  );
});

const nfm = (n: number, d = 1) => n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
const ease = (x: number) => { const c = Math.min(1, Math.max(0, x)); return c * c * (3 - 2 * c); };

export function Calculator() {
  const { inView, epoch } = useInView("calculator");
  const [hov, setHov] = useState(false);
  const [u, setU] = useState(0);
  const t = tOf(u);
  const paused = hov || !inView;
  const pausedRef = useRef(paused);
  useEffect(() => { pausedRef.current = paused; });
  /* One clock: restarts from zero on every arrival, holds while hovered or off screen, replays after a pause on the finished trip. */
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, last = performance.now(), el = 0;
    const tick = (now: number) => {
      if (!pausedRef.current) el += now - last;
      last = now;
      if (el >= TRIP.runMs + TRIP.holdMs) el = 0;
      setU(reduce ? 1 : Math.min(1, el / TRIP.runMs));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [epoch]);
  const totalKm = TRIP.km * TRIP.match;
  const gps = t * totalKm;
  const mins = Math.round(u * TRIP.hours * 60);
  const clock = `${String(9 + Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`;
  const [mx, my] = onRoute(t);
  const [bx, by] = onRoute(t - 0.006), [fx, fy] = onRoute(t + 0.006);
  const heading = (Math.atan2(fx - bx, -(fy - by)) * 180) / Math.PI;
  const visits = STOPS.filter((st, i) => i > 0 && i < STOPS.length - 1 && t >= st.f).length;
  const next = STOPS.findIndex((st) => t < st.f - 0.001);
  const atStop = STOPS.findIndex((st, i) => i > 0 && Math.abs(t - st.f) < 0.012);
  const nearest = Math.min(...STOPS.map((st) => Math.abs(t - st.f)));
  const speed = t <= 0 || t >= 1 ? 0 : Math.round((42 + 20 * Math.sin(t * 38)) * Math.min(1, nearest / 0.02));
  /* camera: follows just behind the vehicle, then pulls back over the finished trip */
  const sc = ease((t - 0.9) / 0.1);
  const cw = 330 + (MW - 330) * sc, ch = cw * 0.7, k = cw / 600;
  const [cpx, cpy] = onRoute(t - 0.02);
  const camX = Math.min(MW - cw, Math.max(0, cpx + (600 - cpx) * sc - cw / 2));
  const camY = Math.min(MH - ch, Math.max(0, cpy + (420 - cpy) * sc - ch / 2));
  const lat = 12.9716 + ((420 - my) / MH) * 0.06, lng = 77.5946 + ((mx - 600) / MW) * 0.08;
  const status = t >= 1 ? "Trip complete" : atStop > 0 ? `At ${STOPS[atStop].name}, visit logged ${clock}` : t <= 0 ? "Ready to start" : `Heading to ${STOPS[next].name}`;
  return (
    <section className="slide" id="calculator"><div className="wrap">
      <div className="eyebrow">Live tracking and travel reimbursement</div>
      <h2>Every kilometre, tracked and counted</h2>
      <div className="card lm" onPointerEnter={(e) => { if (e.pointerType === "mouse") setHov(true); }} onPointerLeave={() => setHov(false)}>
        <div className="lm-bar"><span style={{ transform: `scaleX(${u})` }} /></div>
        <div className="lm-map">
          <div className="lm-tag"><i />Live<span>{clock}</span></div>
          <div className="lm-speed"><b>{speed}</b><span>km/h</span></div>
          <div className="lm-compass" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 3l4 9h-8z" fill="#d93025" /><path d="M12 21l-4-9h8z" fill="#9a928a" /></svg><span>N</span></div>
          <svg viewBox={`${camX.toFixed(1)} ${camY.toFixed(1)} ${cw.toFixed(1)} ${ch.toFixed(1)}`} role="img" aria-label="Live map following a field worker's vehicle between stops (sample trip)">
            <BaseMap />
            <path d={ROUTE_D} fill="none" stroke="#ef6c00" strokeOpacity="0.2" strokeWidth="10" strokeLinejoin="round" strokeLinecap="round" />
            <path d={ROUTE_D} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - t} fill="none" stroke="#ef6c00" strokeWidth="4.6" strokeLinejoin="round" strokeLinecap="round" />
            {STOPS.map((st, i) => {
              const reached = t >= st.f - 0.001;
              const label = i === 0 || reached || i === next;
              return (
                <g key={st.name} transform={`translate(${st.p[0]} ${st.p[1]}) scale(${k})`}>
                  {i === 0 || i === STOPS.length - 1 ? (
                    <circle r="9" fill="#fff" stroke="#1f1a17" strokeWidth="3" />
                  ) : (
                    <g>
                      <path d="M0 0C-8-9-12-15-12-20a12 12 0 1 1 24 0c0 5-4 11-12 20z" fill={reached ? "#ef6c00" : "#fff"} stroke="#ef6c00" strokeWidth="2.4" style={{ transition: "fill 0.3s" }} />
                      <text textAnchor="middle" y="-15" fontSize="12" fontWeight="800" fill={reached ? "#fff" : "#b85200"}>{i}</text>
                    </g>
                  )}
                  {label && (
                    <g transform={`translate(0 ${i === 0 || i === STOPS.length - 1 ? 24 : -40})`} opacity={reached || i === 0 ? 1 : 0.8}>
                      <rect x={-(st.name.length * 3.4 + 9)} y="-10" width={st.name.length * 6.8 + 18} height="20" rx="10" fill="#fff" stroke="#e5ded5" />
                      <text textAnchor="middle" y="4" fontSize="11" fontWeight="600" fill="#1f1a17">{st.name}</text>
                    </g>
                  )}
                </g>
              );
            })}
            {t > 0 && t < 1 && (
              <g transform={`translate(${mx} ${my}) scale(${k})`}>
                <circle r="11" fill="#ef6c00" opacity="0.28" className="lm-pulse" />
                <g transform={`rotate(${heading})`}>
                  <circle r="11" fill="#fff" stroke="#e5ded5" strokeWidth="1" />
                  <path d="M0-7L5.5 6 0 3-5.5 6z" fill="#ef6c00" />
                </g>
              </g>
            )}
          </svg>
          <div className="lm-status"><i />{status}</div>
        </div>
        <div className="lm-out">
          <div className="lm-row"><span><Icon name="route" size={16} />Distance travelled</span><b>{nfm(gps)} <small>km</small></b></div>
          <div className="lm-row"><span><Icon name="pin" size={16} />Places visited</span><b>{visits} <small>of 5</small></b></div>
          <div className="lm-chips">{STOPS.slice(1, -1).map((st, i) => <span key={st.name} className={t >= st.f - 0.001 ? "on" : ""} title={st.name}>{t >= st.f - 0.001 ? <Icon name="check" size={12} /> : i + 1}</span>)}</div>
          <div className="lm-row"><span><Icon name="clock" size={16} />GPS points recorded</span><b>{Math.round(u * TRIP.hours * 360).toLocaleString("en-US")}</b></div>
          <div className="lm-row"><span><Icon name="target" size={16} />Last point</span><b className="lm-ll">{nfm(lat, 4)}, {nfm(lng, 4)}</b></div>
          <div className="lm-big"><span><Icon name="money" size={18} />Reimbursement</span><b>₹{nfm(gps * TRIP.rate)}</b><small>at ₹{TRIP.rate} per km{t >= 1 ? `, matches the ${TRIP.km} km odometer` : ""}</small></div>
          <p>Sample 135 km field day on an illustrative map. In this sample the GPS distance is 134.5 km against a 135 km odometer reading. The ₹3 per km rate is a sample, set per person and day in the product.</p>
        </div>
      </div>
    </div></section>
  );
}

/* Every capability of every role in one list, so one timer plays them in turn and the scene beside it changes with each. */
const CAPKEYS = Object.keys(CAPABILITIES);
const CFLAT = CAPKEYS.flatMap((k, ri) => CAPABILITIES[k].map((_, ci) => ({ ri, ci })));
const CSTART = CAPKEYS.map((_, ri) => CFLAT.findIndex((f) => f.ri === ri));

export function Capabilities() {
  const c = useCycle(CFLAT.length, 5500, "capabilities");
  const { ri, ci } = CFLAT[c.i];
  const list = CAPABILITIES[CAPKEYS[ri]];
  const anim = { animationDuration: `${c.ms}ms`, animationPlayState: c.paused ? "paused" : "running" } as const;
  const key = `${c.epoch}-${c.i}`;
  return (
    <section className="slide" id="capabilities"><div className="wrap">
      <div className="eyebrow">Capabilities</div>
      <h2>What each group of people gets</h2>
      <p className="lede"><b style={{ color: "var(--ink)" }}>Role-based by design.</b> Each person sees only the tools their role needs, and each company&apos;s data is kept separate.</p>
      <div className="caps">
        <div className="caps-l" {...c.bind}>
          <div className="tabs" role="tablist">
            {CAPKEYS.map((k, j) => (
              <button key={k} type="button" role="tab" className="tab" aria-selected={ri === j} onClick={() => c.setI(CSTART[j])}>
                <Icon name={iconFor(k)} size={16} />{k}
              </button>
            ))}
          </div>
          <div className="seg" role="presentation">
            {list.map((_, j) => (
              <span key={j} className={`seg-i${j < ci ? " done" : ""}`}>
                {j === ci && <span className="seg-fill" key={key} style={anim} onAnimationEnd={c.next} />}
              </span>
            ))}
            <span className="seg-n">{ci + 1}/{list.length}</span>
          </div>
          <ul className="caps-list">
            {list.map((x, j) => (
              <li key={`${ri}-${j}`}>
                <button type="button" className={j === ci ? "cur" : ""} onClick={() => c.setI(CSTART[ri] + j)}>
                  <span className="caps-ic"><Icon name={CAP_ICONS[ri][j]} size={16} /></span>
                  <span>{x}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="caps-r" {...c.bind}>
          <div className="cs-win">
            <div className="cs-bar"><i /><i /><i /><span>{CAP_APPS[ri]}</span><em>Sample data</em></div>
            <div key={`${ri}-${ci}`} className="cs-stage"><CapScene role={ri} cap={ci} /></div>
          </div>
        </div>
      </div>
    </div></section>
  );
}

/* Every step of every work mode in one list, so a single timer walks through Office, then Work from home, then Field. */
const FLAT = FLOWS.flatMap((m, mi) => m.steps.map((_, si) => ({ mi, si })));
const START = FLOWS.map((_, mi) => FLAT.findIndex((f) => f.mi === mi));

export function Flow() {
  const c = useCycle(FLAT.length, 4200, "flow");
  const { mi, si } = FLAT[c.i];
  const mode = FLOWS[mi];
  const step = mode.steps[si];
  const anim = { animationDuration: `${c.ms}ms`, animationPlayState: c.paused ? "paused" : "running" } as const;
  const key = `${c.epoch}-${c.i}`;
  return (
    <section className="slide" id="flow"><div className="wrap">
      <div className="eyebrow">Employee flow</div>
      <h2>A day for every work mode</h2>
      <p className="lede">Follow an employee from the first reminder to check-out. Each work mode has its own rules.</p>
      <div className="tabs" role="tablist" {...c.bind}>
        {FLOWS.map((m, j) => (
          <button key={m.mode} type="button" role="tab" className="tab" aria-selected={mi === j} onClick={() => c.setI(START[j])}>
            <Icon name={m.icon as IconName} size={16} />{m.mode}
          </button>
        ))}
      </div>
      <div className="seg" {...c.bind} role="presentation">
        {mode.steps.map((_, j) => (
          <span key={j} className={`seg-i${j < si ? " done" : ""}`}>
            {j === si && <span className="seg-fill" key={key} style={anim} onAnimationEnd={c.next} />}
          </span>
        ))}
        <span className="seg-n">{si + 1}/{mode.steps.length}</span>
      </div>
      <ol className="fsteps" {...c.bind}>
        {mode.steps.map((s, j) => (
          <li key={`${mi}-${j}`} className={`fstep${j < si ? " done" : j === si ? " cur" : ""}`}>
            <button type="button" onClick={() => c.setI(START[mi] + j)}>
              <span className="fnode"><Icon name={s.icon as IconName} size={16} /></span>
              <span className="ftxt"><b>{s.title}</b>{j === si && <span key={key}>{s.text}</span>}</span>
            </button>
            {j === si && <span className="fline" key={key} style={anim} />}
          </li>
        ))}
      </ol>
      <div className="fstage" key={`${mi}-${si}`} {...c.bind}>
        {step.shot ? <Phone n={step.shot} alt={step.title} /> : <div className="device"><PhoneScreen id={`${mi}:${si}`} /></div>}
      </div>
    </div></section>
  );
}

function Details({ items }: { items: string[][] }) {
  return (
    <div className="det-grid">
      {items.map((x) => (
        <div key={x[0]} className="det">
          <Badge name={iconFor(x[0])} size={18} />
          <div><b>{x[0]}</b><p>{x[1]}</p></div>
        </div>
      ))}
    </div>
  );
}

export function Security() {
  return (
    <>
      <section className="slide" id="security"><div className="wrap">
        <div className="eyebrow">Security</div>
        <h2>Built to protect people&apos;s data</h2>
        <Details items={SECURITY} />
      </div></section>
      <section className="slide" id="reliability"><div className="wrap">
        <div className="eyebrow">Reliability and operations</div>
        <h2>Built to keep running</h2>
        <Details items={RELIABILITY} />
      </div></section>
    </>
  );
}

export function Status() {
  const cats = ["All", ...Array.from(new Set(DELIVERED.map((d) => d[0])))];
  const [cur, setCur] = useState("All");
  return (
    <section className="slide" id="status"><div className="wrap">
      <div className="eyebrow">Status</div>
      <h2>Where things stand</h2>
      <div className="filter">
        {cats.map((c) => <button key={c} type="button" className="chip" aria-pressed={cur === c} onClick={() => setCur(c)}>{c !== "All" && <Icon name={iconFor(c)} size={16} />}{c}</button>)}
      </div>
      <div className="list">
        {DELIVERED.filter((d) => cur === "All" || d[0] === cur).map((d) => (
          <div className="item" key={d[1]}><Badge name={iconFor(d[0])} size={16} /><span>{d[1]}</span></div>
        ))}
      </div>
    </div></section>
  );
}

export function Roadmap() {
  return (
    <section className="slide" id="roadmap"><div className="wrap">
      <div className="eyebrow">Roadmap</div>
      <h2>What comes after launch</h2>
      <div className="road">
        {Object.entries(ROADMAP).map(([k, v]) => (
          <div className="card panel" key={k}><h3><Badge name={iconFor(k)} size={18} />{k}</h3><ul className="tick">{v.map((x) => <li key={x}>{x}</li>)}</ul></div>
        ))}
      </div>
      <footer className="foot">
        <span className="logo"><i />INZIVO</span>
        <span>Thank you · Inzivo team · October 2026</span>
      </footer>
    </div></section>
  );
}

export function Competitors() {
  const markets = ["All", "India", "Global"];
  const [m, setM] = useState("All");
  const rows = COMPETITORS.filter((c) => m === "All" || c[1].includes(m));
  return (
    <section className="slide" id="competitors"><div className="wrap">
      <div className="eyebrow">Competitor list</div>
      <h2>Who Inzivo is up against</h2>
      <p className="lede">Ten products that teams in India and worldwide use today for attendance and workforce management.</p>
      <div className="filter">
        {markets.map((x) => <button key={x} type="button" className="chip" aria-pressed={m === x} onClick={() => setM(x)}>{x === "All" ? <Icon name="layers" size={16} /> : <Icon name="globe" size={16} />}{x}<span className="chip-n">{COMPETITORS.filter((c) => x === "All" || c[1].includes(x)).length}</span></button>)}
      </div>
      <div className="comp">
        {rows.map((c, i) => (
          <div className="comp-i card" key={c[0]} style={{ animationDelay: `${i * 40}ms` }}>
            <span className="comp-n">{String(COMPETITORS.indexOf(c) + 1).padStart(2, "0")}</span>
            <div className="comp-t"><b>{c[0]}</b><span className="comp-m"><Icon name="globe" size={13} />{c[1]}</span></div>
            <p>{c[2]}</p>
          </div>
        ))}
      </div>
      <div className="strong card">
        <div className="strong-h"><Badge name="target" size={20} /><b>{STRONGEST.title}</b><span className="strong-tag"><Icon name="check" size={14} />{STRONGEST.note}</span></div>
        <div className="strong-g">
          {STRONGEST.items.map((x, i) => (
            <div className="strong-i" key={x[1]} style={{ animationDelay: `${i * 80}ms` }}><Badge name={x[0]} size={18} /><span><b>{x[1]}</b><small>{x[2]}</small></span></div>
          ))}
        </div>
      </div>
      <p className="fine">Service categories are simplified; exact features depend on each product&rsquo;s plan.</p>
    </div></section>
  );
}
