import { useEffect, useState } from 'react'
import {
  profile, bio, stats, skills, marquee, mainProject, featured, moreProjects, timeline, education, languages,
} from './data'
import {
  Scramble, Rotator, Clock, Tilt, useReveal, usePointerVars, useScrollProgress,
} from './components/effects'

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
]

const Arrow = () => (
  <svg className="arrow" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M4 12L12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

function SectionHead({ index, title, kicker }) {
  return (
    <header className="section-head" data-reveal>
      <span className="mono dim">[{index}]</span>
      <h2>{title}</h2>
      {kicker && <span className="mono dim kicker">{kicker}</span>}
      <span className="rule" />
    </header>
  )
}

function Nav() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const p = useScrollProgress()
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <nav className={`nav ${solid ? 'is-solid' : ''} ${open ? 'is-open' : ''}`}>
      <div className="nav-inner">
        <a href="#top" className="logo mono" onClick={() => setOpen(false)}>
          <span className="logo-box">AP</span><span className="dim">/portfolio</span>
        </a>
        <ul className="nav-links">
          {NAV.map((n, i) => (
            <li key={n.id}>
              <a href={`#${n.id}`} onClick={() => setOpen(false)}>
                <span className="mono dim">0{i + 1}</span>{n.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-meta mono">
          <span className="dot" /> JKT <Clock />
        </div>
        <button className="burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span />
        </button>
      </div>
      <div className="progress" style={{ transform: `scaleX(${p})` }} />
    </nav>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="mono eyebrow" data-reveal>
            <span className="dot" /> Available for internships &amp; freelance
          </p>
          <h1 className="hero-title">
            <Scramble text="ADRIEL" className="line" />
            <Scramble text="PANJAITAN" className="line outline" delay={250} />
          </h1>
          <p className="hero-role mono" data-reveal>
            &gt; <Rotator words={profile.roles} /><span className="caret">_</span>
          </p>
          <p className="hero-lede" data-reveal>
            Computer Science student at BINUS University, building clean, fast and
            thoughtful interfaces for the web.
          </p>
          <div className="hero-cta" data-reveal>
            <a href="#work" className="btn btn-solid">View work <Arrow /></a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="btn">GitHub <Arrow /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn">LinkedIn <Arrow /></a>
          </div>
        </div>

        <div className="hero-visual" data-reveal>
          <Tilt className="portrait">
            <img src={profile.photo} alt="Portrait of Adriel Panjaitan" width="720" height="960" />
            <div className="scan" />
            <span className="corner tl" /><span className="corner tr" />
            <span className="corner bl" /><span className="corner br" />
            <div className="portrait-tag mono">
              <span>ID // JAEP-2024</span>
              <span>6.20°S 106.78°E</span>
            </div>
          </Tilt>
          <div className="hud mono">
            <div><span className="dim">STATUS</span> ONLINE</div>
            <div><span className="dim">BASE</span> {profile.location}</div>
            <div><span className="dim">FOCUS</span> Frontend · UI/UX</div>
          </div>
        </div>
      </div>
      <a href="#about" className="scroll-cue mono dim">SCROLL <span /></a>
    </section>
  )
}

function Marquee() {
  const row = [...marquee, ...marquee]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((m, i) => (
          <span key={i}>{m}<i>✦</i></span>
        ))}
      </div>
    </div>
  )
}

function About() {
  return (
    <section id="about" className="section wrap">
      <SectionHead index="01" title="About" kicker="whoami" />
      <div className="about-grid">
        <div className="about-text">
          {bio.map((p, i) => (
            <p key={i} data-reveal style={{ '--d': `${i * 80}ms` }}>{p}</p>
          ))}
        </div>
        <aside className="about-side" data-reveal>
          <div className="terminal">
            <div className="terminal-bar mono"><i /><i /><i /> <span>adriel@binus:~</span></div>
            <pre className="mono">{`$ cat profile.json
{
  "name": "Jeff Adriel E. Panjaitan",
  "study": "Computer Science",
  "campus": "BINUS University",
  "focus": ["frontend", "ui/ux"],
  "specialization": "database",
  "langs": ["id", "en"]
}`}<span className="caret">▍</span></pre>
          </div>
          <div className="stats">
            {stats.map((s) => (
              <div key={s.label} className="stat">
                <span className="stat-value">{s.value}</span>
                <span className="mono dim">{s.label}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="section wrap">
      <SectionHead index="02" title="Skills" kicker="stack & toolkit" />
      <div className="skills-grid">
        {skills.map((g, i) => (
          <article key={g.group} className="skill-card" data-reveal style={{ '--d': `${i * 90}ms` }}>
            <div className="skill-top">
              <span className="mono skill-code">{g.code}</span>
              <span className="mono dim">0{i + 1}/0{skills.length}</span>
            </div>
            <h3>{g.group}</h3>
            <ul className="chips">
              {g.items.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </article>
        ))}
      </div>
      <div className="soft" data-reveal>
        <span className="mono dim">SOFT SKILLS</span>
        <p>Problem solving · Team collaboration · Analytical thinking · Communication</p>
        <span className="mono dim">LANGUAGES</span>
        <p>{languages.join(' · ')}</p>
      </div>
    </section>
  )
}

function Project({ p, i }) {
  return (
    <article className={`project ${i % 2 ? 'flip' : ''}`} data-reveal>
      <div className="project-media">
        <div className="media-main"><img src={p.images[0]} alt={`${p.title} screenshot`} loading="lazy" /></div>
        {p.images[1] && (
          <div className="media-sub"><img src={p.images[1]} alt={`${p.title} second screenshot`} loading="lazy" /></div>
        )}
        <span className="media-index mono">{String(i + 1).padStart(2, '0')}</span>
      </div>
      <div className="project-body">
        <div className="mono dim project-meta">
          <span>{p.year}</span><span>{p.type}</span>
        </div>
        <h3>{p.title}</h3>
        <p className="mono project-role">{p.role}</p>
        <p className="project-desc">{p.description}</p>
        <ul className="chips small">
          {p.stack.map((s) => <li key={s}>{s}</li>)}
        </ul>
        {p.links.length > 0 && (
          <div className="project-links">
            {p.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="link">
                {l.label} <Arrow />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

function MainProject() {
  const m = mainProject
  return (
    <article className="main-project" data-reveal>
      <div className="mp-label mono">
        <span className="dot" /> Main project <span className="dim">// {m.type}</span>
      </div>
      <div className="mp-grid">
        <a href={m.href} target="_blank" rel="noreferrer" className="mp-visual" aria-label="Visit natynext.com">
          <div className="mp-visual-top mono dim">
            <span>natynext.com</span><span>EST. 2026</span>
          </div>
          <div className="mp-wordmark">NATY</div>
          <p className="mp-full mono">{m.full}</p>
          <p className="mp-tagline">“{m.tagline}”</p>
          <ul className="mp-services mono">
            {m.services.map((s) => <li key={s}>{s}</li>)}
          </ul>
          <span className="corner tl" /><span className="corner tr" />
          <span className="corner bl" /><span className="corner br" />
          <div className="mp-orbit" aria-hidden="true"><i /><i /><i /></div>
        </a>
        <div className="mp-body">
          <div className="mono dim project-meta"><span>{m.year}</span></div>
          <h3>{m.title} <span className="outline">— {m.full}</span></h3>
          <p className="mono project-role">{m.role}</p>
          <p className="project-desc">{m.description}</p>
          <ul className="mp-highlights">
            {m.highlights.map((h) => <li key={h}>{h}</li>)}
          </ul>
          <div className="mp-stats">
            {m.stats.map((s) => (
              <div key={s.label} className="stat">
                <span className="stat-value">{s.value}</span>
                <span className="mono dim">{s.label}</span>
              </div>
            ))}
          </div>
          <ul className="chips small">
            {m.stack.map((s) => <li key={s}>{s}</li>)}
          </ul>
          <div className="project-links">
            <a href={m.href} target="_blank" rel="noreferrer" className="link">Visit natynext.com <Arrow /></a>
          </div>
        </div>
      </div>
    </article>
  )
}

function Work() {
  return (
    <section id="work" className="section wrap">
      <SectionHead index="03" title="Selected Work" kicker={`${1 + featured.length + moreProjects.length} projects`} />
      <MainProject />
      <div className="projects">
        {featured.map((p, i) => <Project key={p.id} p={p} i={i} />)}
      </div>
      <h3 className="more-title mono dim" data-reveal>// More projects</h3>
      <ul className="more">
        {moreProjects.map((m, i) => {
          const Tag = m.href ? 'a' : 'div'
          return (
            <li key={m.title} data-reveal style={{ '--d': `${i * 70}ms` }}>
              <Tag className="more-row" {...(m.href ? { href: m.href, target: '_blank', rel: 'noreferrer' } : {})}>
                <span className="mono dim">{m.year}</span>
                <span className="more-name">{m.title}</span>
                <span className="more-desc">{m.description}</span>
                <span className="mono dim more-role">{m.role}</span>
                {m.href ? <Arrow /> : <span />}
              </Tag>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function Journey() {
  return (
    <section id="journey" className="section wrap">
      <SectionHead index="04" title="Journey" kicker="experience & education" />
      <div className="journey-grid">
        <div>
          <h3 className="col-title mono dim">Experience</h3>
          <ol className="timeline">
            {timeline.map((t, i) => (
              <li key={t.title} data-reveal style={{ '--d': `${i * 70}ms` }}>
                <span className="mono dim t-period">{t.period}</span>
                <div>
                  <h4>{t.title}</h4>
                  <p className="mono t-role">{t.role}</p>
                  <p className="dim">{t.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h3 className="col-title mono dim">Education</h3>
          <ol className="timeline">
            {education.map((e) => (
              <li key={e.title} data-reveal>
                <span className="mono dim t-period">{e.period}</span>
                <div>
                  <h4>{e.title}</h4>
                  <p className="dim">{e.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch { window.location.href = `mailto:${profile.email}` }
  }
  return (
    <section id="contact" className="section wrap contact">
      <SectionHead index="05" title="Contact" kicker="say hello" />
      <p className="contact-lede" data-reveal>Have a project, an internship, or just want to talk interfaces?</p>
      <a href={`mailto:${profile.email}`} className="contact-big" data-reveal>
        Let&apos;s build<br /><span className="outline">something.</span>
      </a>
      <div className="contact-row" data-reveal>
        <button className="btn btn-solid mono" onClick={copy}>
          {copied ? 'Copied ✓' : profile.email}
        </button>
        <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
        <a className="btn" href={profile.github} target="_blank" rel="noreferrer">GitHub <Arrow /></a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer wrap mono dim">
      <span>© {new Date().getFullYear()} {profile.name}</span>
      <span>Designed &amp; built by Adriel · React + Vite</span>
      <a href="#top">Back to top ↑</a>
    </footer>
  )
}

export default function App() {
  useReveal()
  usePointerVars()
  return (
    <>
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-noise" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Work />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
