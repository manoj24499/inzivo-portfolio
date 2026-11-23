"use client";

import Image from "next/image";
import { Badge, Icon, iconFor, type IconName } from "./icons";
import { MyPageMock } from "./MyPage";
import { PhoneScreen } from "./PhoneUI";
import { CAP_APPS, CAP_ICONS, CapScene } from "./CapScenes";
import { useEffect, useState } from "react";
import {
  CAPABILITIES, FLOWS, INDUSTRIES, NAV, OVERVIEW,
  PAYROLL, PAYROLL_FLOW, PAYROLL_ROLES,
  PROBLEMS, SECURITY, STATS,
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

const SLIDE_IDS = ["top", "overview", "problems", "capabilities", "flow", "payroll", "industries", "numbers", "security"];
const PARENT: Record<string, string> = { flow: "capabilities" };

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
            <h1>Attendance and Field-Force Management, <em>In One Platform</em></h1>
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
    d.name === "Admin Dashboard" ? (
      <div className="browser">
        <div className="browser-bar"><i /><i /><i /></div>
        <Image src="/screens/cover.jpg" alt="Admin dashboard with alerts and team totals" width={1900} height={1372} sizes="(max-width: 900px) 100vw, 640px" />
      </div>
    ) : d.name === "Employee Web App" ? (
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
      <h2>One Platform for Every Kind of Working Day</h2>
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
            <h3><Badge name="zap" />{d.tag}: What It Does</h3>
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
      <h2>The Problem, and How Inzivo Solves It</h2>
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

const PAY_CLASS = { "Built": "ok", "Partly built": "part", "Not started": "off" } as const;

export function Payroll() {
  const [g, setG] = useState(0);
  const x = PAYROLL[g];
  return (
    <section className="slide" id="payroll"><div className="wrap">
      <div className="eyebrow">Payroll and HR</div>
      <h2>From Attendance to Payslip</h2>
      <p className="lede">Set up a company, manage employees, run payroll and issue HR letters in one app. It works for any country, and each organisation&apos;s data stays separate.</p>
      <ol className="pay-flow">
        {PAYROLL_FLOW.map((f) => <li key={f[0]}><b>{f[0]}</b><small>{f[1]}</small></li>)}
      </ol>
      <div className="chips">
        {PAYROLL.map((p, j) => (
          <button key={p.group} type="button" className="chip" aria-pressed={g === j} onClick={() => setG(j)}><Icon name={p.icon as IconName} size={16} />{p.group}</button>
        ))}
      </div>
      <div className="pay-grid" aria-live="polite">
        {x.cards.map((c) => (
          <div className="card panel" key={c.title}>
            <h3>{c.title}<span className={`pill ${PAY_CLASS[c.status]}`}>{c.status}</span></h3>
            <ul className="tick">{c.points.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
        ))}
      </div>
      <p className="pay-roles"><b>Seven fixed roles control access:</b>{PAYROLL_ROLES.map((r) => <span key={r}>{r}</span>)}</p>
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
      <h2>Who Inzivo Is For</h2>
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
      <h2>The Product at a Glance</h2>
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
      <h2>What Each Group of People Gets</h2>
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
      <h2>A Day for Every Work Mode</h2>
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
        <h2>Built to Protect People&apos;s Data</h2>
        <Details items={SECURITY} />
        <footer className="foot">
          <span className="logo"><i />INZIVO</span>
          <span>Thank you · Inzivo team · October 2026</span>
        </footer>
      </div></section>
    </>
  );
}
