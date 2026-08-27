import { useEffect, useState } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  Droplets,
  ExternalLink,
  Flame,
  HeartPulse,
  House,
  Info,
  MapPin,
  Menu,
  Navigation,
  Phone,
  Radio,
  Search,
  Share2,
  ShieldCheck,
  Siren,
  Waves,
  X,
} from 'lucide-react'

type Route = 'home' | 'alerts' | 'preparedness' | 'shelters' | 'contacts'
type Severity = 'warning' | 'watch' | 'all-clear'

type Alert = {
  id: string
  severity: Severity
  label: string
  title: string
  summary: string
  action: string
  parishes: string[]
  issued: string
  expires: string
}

const alerts: Alert[] = [
  {
    id: 'flash-flood-st-andrew',
    severity: 'warning',
    label: 'Flash flood warning',
    title: 'Move to higher ground',
    summary: 'Heavy rainfall may cause sudden flooding in low-lying areas of St. Andrew and Kingston.',
    action: 'Avoid walking or driving through floodwater. Move valuables upstairs and check on neighbours.',
    parishes: ['St. Andrew', 'Kingston'],
    issued: 'Today, 10:42 AM',
    expires: 'Today, 4:00 PM',
  },
  {
    id: 'coastal-wind-watch',
    severity: 'watch',
    label: 'Coastal wind watch',
    title: 'Rough seas expected',
    summary: 'Strong winds and rough seas are expected along the south coast through tonight.',
    action: 'Small craft should remain in port. Keep away from exposed shorelines.',
    parishes: ['Clarendon', 'St. Catherine', 'Kingston'],
    issued: 'Today, 8:15 AM',
    expires: 'Tomorrow, 6:00 AM',
  },
]

const checklistItems = [
  'Store safe drinking water for three days',
  'Pack non-perishable food and a first aid kit',
  'Charge phones and gather spare batteries',
  'Secure loose items, drains, and windows',
  'Write down an out-of-parish family contact',
  'Keep IDs and important documents waterproofed',
]

const shelters = [
  { name: 'St. Jago High School', parish: 'St. Catherine', status: 'Open', capacity: '120 spaces', features: 'Accessible · Medical support' },
  { name: 'Mona High School', parish: 'St. Andrew', status: 'Open', capacity: '80 spaces', features: 'Medical support' },
  { name: 'National Arena', parish: 'Kingston', status: 'At capacity', capacity: 'No spaces', features: 'Accessible · Pet-friendly' },
]

const navItems: { route: Route; label: string; icon: typeof House }[] = [
  { route: 'home', label: 'Live map', icon: Navigation },
  { route: 'alerts', label: 'Alerts', icon: AlertTriangle },
  { route: 'preparedness', label: 'Prepare', icon: ShieldCheck },
  { route: 'shelters', label: 'Shelters', icon: House },
  { route: 'contacts', label: 'Contacts', icon: Phone },
]

function getRoute(): Route {
  const value = window.location.hash.replace('#/', '')
  return navItems.some((item) => item.route === value) ? (value as Route) : 'home'
}

function App() {
  const [route, setRoute] = useState<Route>(getRoute)
  const [parish, setParish] = useState(() => localStorage.getItem('watchout-parish') ?? 'St. Catherine')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeAlert, setActiveAlert] = useState<Alert | null>(null)
  const [checked, setChecked] = useState<string[]>(() => JSON.parse(localStorage.getItem('watchout-checklist') ?? '[]'))
  const [shared, setShared] = useState(false)

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    localStorage.setItem('watchout-parish', parish)
  }, [parish])

  useEffect(() => {
    localStorage.setItem('watchout-checklist', JSON.stringify(checked))
  }, [checked])

  const navigate = (nextRoute: Route) => {
    window.location.hash = `/${nextRoute}`
    setIsMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleChecklist = (item: string) => {
    setChecked((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item])
  }

  const shareAlert = async (alert: Alert) => {
    const shareData = { title: `Watch Out JA: ${alert.label}`, text: `${alert.summary} ${alert.action}`, url: window.location.href }
    try {
      if (navigator.share) await navigator.share(shareData)
      else await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}`)
      setShared(true)
      window.setTimeout(() => setShared(false), 2200)
    } catch {
      setShared(false)
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => navigate('home')} aria-label="Go to Watch Out JA home">
          <span className="brand-mark">W</span>
          <span><strong>Watch Out JA</strong><small>Stay aware. Stay ready.</small></span>
        </button>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(({ route: itemRoute, label }) => <NavLink key={itemRoute} route={itemRoute} label={label} current={route} onClick={navigate} />)}
        </nav>
        <div className="topbar-actions">
          <button className="icon-button" aria-label="Search"><Search size={19} /></button>
          <button className="icon-button notification-button" aria-label="Notifications"><Bell size={19} /><span /></button>
          <button className="menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle navigation menu" aria-expanded={isMenuOpen}><Menu size={22} /></button>
        </div>
      </header>

      {isMenuOpen && <nav className="mobile-menu" aria-label="Mobile navigation">{navItems.map(({ route: itemRoute, label }) => <NavLink key={itemRoute} route={itemRoute} label={label} current={route} onClick={navigate} />)}</nav>}

      <div className="alert-strip" role="status">
        <div className="alert-strip-icon"><AlertTriangle size={18} /></div>
        <div><strong>FLASH FLOOD WARNING</strong><span>St. Andrew and Kingston · Move to higher ground</span></div>
        <button onClick={() => setActiveAlert(alerts[0])}>View alert <ArrowRight size={16} /></button>
      </div>

      <main>
        {route === 'home' && <HomePage parish={parish} setParish={setParish} navigate={navigate} openAlert={setActiveAlert} />}
        {route === 'alerts' && <AlertsPage openAlert={setActiveAlert} />}
        {route === 'preparedness' && <PreparednessPage checked={checked} toggleChecklist={toggleChecklist} />}
        {route === 'shelters' && <SheltersPage parish={parish} />}
        {route === 'contacts' && <ContactsPage />}
      </main>

      <footer><span>Watch Out JA</span><span>Information should be clear when it matters most.</span><span className="footer-status"><Radio size={14} /> Simulated data · Updated 2 min ago</span></footer>

      <nav className="bottom-nav" aria-label="Mobile navigation">{navItems.map(({ route: itemRoute, label, icon: Icon }) => <button key={itemRoute} className={route === itemRoute ? 'active' : ''} onClick={() => navigate(itemRoute)}><Icon size={19} /><span>{label}</span></button>)}</nav>

      {activeAlert && <AlertModal alert={activeAlert} onClose={() => setActiveAlert(null)} onShare={shareAlert} shared={shared} navigate={navigate} />}
    </div>
  )
}

function NavLink({ route, label, current, onClick }: { route: Route; label: string; current: Route; onClick: (route: Route) => void }) {
  return <button className={current === route ? 'nav-link active' : 'nav-link'} onClick={() => onClick(route)}>{label}{current === route && <span />}</button>
}

function HomePage({ parish, setParish, navigate, openAlert }: { parish: string; setParish: (value: string) => void; navigate: (route: Route) => void; openAlert: (alert: Alert) => void }) {
  return <>
    <section className="hero-grid page-width">
      <div className="hero-copy">
        <p className="eyebrow"><span className="live-dot" /> Live island status</p>
        <h1>Know what’s happening.<br /><em>Know what to do.</em></h1>
        <p className="hero-lede">Clear, trusted emergency information for every parish in Jamaica.</p>
        <div className="hero-controls">
          <label htmlFor="parish">Your parish</label>
          <div className="select-wrap"><MapPin size={17} /><select id="parish" value={parish} onChange={(event) => setParish(event.target.value)}><option>St. Catherine</option><option>Kingston</option><option>St. Andrew</option><option>St. Thomas</option><option>Portland</option><option>Clarendon</option></select><ChevronDown size={16} /></div>
        </div>
      </div>
      <MapPreview parish={parish} />
    </section>
    <section className="status-band"><div className="page-width status-inner"><div className="status-label"><span className="status-icon"><ShieldCheck size={21} /></span><div><span className="eyebrow">Your local status</span><strong>Watch Out for {parish}</strong></div></div><div className="status-clear"><span className="check-circle"><Check size={16} /></span><strong>All clear in your parish</strong><span>Last checked 2 min ago</span></div></div></section>
    <section className="quick-grid page-width"><ActionCard icon={<ShieldCheck />} title="Get prepared" copy="Build your 72-hour kit" onClick={() => navigate('preparedness')} accent="green" /><ActionCard icon={<House />} title="Find a shelter" copy="See open safe zones" onClick={() => navigate('shelters')} accent="gold" /><ActionCard icon={<Phone />} title="Emergency contacts" copy="Call help directly" onClick={() => navigate('contacts')} accent="black" /></section>
    <section className="content-grid page-width"><div className="section-heading"><div><p className="eyebrow">Right now</p><h2>Latest alerts</h2></div><button className="text-button" onClick={() => navigate('alerts')}>View all <ArrowRight size={16} /></button></div><div className="alert-list">{alerts.map((alert) => <AlertCard key={alert.id} alert={alert} onClick={() => openAlert(alert)} />)}</div></section>
    <section className="callout page-width"><div className="callout-icon"><Info /></div><div><p className="eyebrow">Preparedness reminder</p><h2>Quiet days are for getting ready.</h2><p>Check your emergency kit before the next warning. A few small steps now can make a hard day safer.</p></div><button className="button secondary" onClick={() => navigate('preparedness')}>Open checklist <ArrowRight size={17} /></button></section>
  </>
}

function MapPreview({ parish }: { parish: string }) {
  return <div className="map-preview" aria-label={`Simulated hazard map centered on ${parish}`}><div className="map-water-label">CARIBBEAN SEA</div><div className="island-shape"><span className="parish-chip">{parish}</span><span className="map-road road-one" /><span className="map-road road-two" /><span className="map-marker marker-one"><Droplets size={14} /></span><span className="map-marker marker-two"><Waves size={14} /></span></div><div className="map-legend"><span><i className="legend-dot red" /> Active alert</span><span><i className="legend-dot green" /> Shelter</span></div><span className="map-updated"><Clock3 size={13} /> Updated 2 min ago</span></div>
}

function ActionCard({ icon, title, copy, onClick, accent }: { icon: React.ReactNode; title: string; copy: string; onClick: () => void; accent: string }) {
  return <button className={`action-card ${accent}`} onClick={onClick}><span className="action-icon">{icon}</span><span><strong>{title}</strong><small>{copy}</small></span><ArrowRight size={18} /></button>
}

function AlertCard({ alert, onClick }: { alert: Alert; onClick: () => void }) {
  return <button className={`alert-card ${alert.severity}`} onClick={onClick}><span className="alert-card-symbol">{alert.severity === 'warning' ? <AlertTriangle /> : <Waves />}</span><span className="alert-card-body"><span className="alert-card-top"><strong>{alert.label}</strong><small>{alert.issued}</small></span><span>{alert.summary}</span><span className="alert-card-meta">{alert.parishes.join(' · ')} <ArrowRight size={15} /></span></span></button>
}

function AlertsPage({ openAlert }: { openAlert: (alert: Alert) => void }) {
  return <PageIntro eyebrow="Stay informed" title="Alerts" copy="Official-style updates and clear actions for hazards across Jamaica." action={<span className="source-badge"><ShieldCheck size={15} /> Verified source</span>}><div className="filter-row"><button className="filter active">All alerts</button><button className="filter">Active now</button><button className="filter">Flooding</button><button className="filter">Wind & storms</button></div><div className="alert-list alert-page-list">{alerts.map((alert) => <AlertCard key={alert.id} alert={alert} onClick={() => openAlert(alert)} />)}<div className="past-alert"><span className="past-icon"><Check /></span><div><strong>All clear · Tropical Storm Watch</strong><span>Issued Jun 04, 2025 · Event resolved</span></div></div></div></PageIntro>
}

function PreparednessPage({ checked, toggleChecklist }: { checked: string[]; toggleChecklist: (item: string) => void }) {
  return <PageIntro eyebrow="Build your readiness" title="Preparedness" copy="Simple steps before, during, and after a disaster. Start with what you can do today." action={<span className="saved-note"><Check size={15} /> Progress saves automatically</span>}><div className="phase-tabs"><button className="active">Before</button><button>During</button><button>After</button></div><div className="guidance-grid"><Guidance icon={<House />} title="Secure your home" copy="Clear drains, trim loose branches, and secure items outdoors." accent="gold" /><Guidance icon={<HeartPulse />} title="Make a family plan" copy="Choose a meeting point and an out-of-parish contact." accent="green" /><Guidance icon={<Radio />} title="Stay informed" copy="Keep a battery radio nearby and follow verified updates." accent="black" /></div><div className="checklist-panel"><div className="checklist-heading"><div><p className="eyebrow">72-hour emergency kit</p><h2>{checked.length} of {checklistItems.length} ready</h2></div><div className="progress-ring" style={{ '--progress': `${(checked.length / checklistItems.length) * 100}%` } as React.CSSProperties}><strong>{Math.round((checked.length / checklistItems.length) * 100)}%</strong></div></div><div className="progress-bar"><span style={{ width: `${(checked.length / checklistItems.length) * 100}%` }} /></div><div className="checklist">{checklistItems.map((item) => <label key={item} className={checked.includes(item) ? 'checked' : ''}><input type="checkbox" checked={checked.includes(item)} onChange={() => toggleChecklist(item)} /><span className="custom-check">{checked.includes(item) && <Check size={14} />}</span><span>{item}</span></label>)}</div></div></PageIntro>
}

function Guidance({ icon, title, copy, accent }: { icon: React.ReactNode; title: string; copy: string; accent: string }) { return <article className={`guidance ${accent}`}><span>{icon}</span><h3>{title}</h3><p>{copy}</p></article> }

function SheltersPage({ parish }: { parish: string }) {
  return <PageIntro eyebrow="A safe place nearby" title="Shelters" copy={`Designated safe zones near ${parish}. Status can change during an active event.`} action={<span className="source-badge"><MapPin size={15} /> Map & list view</span>}><div className="shelter-layout"><div className="shelter-map"><span className="map-water-label">JAMAICA</span><div className="island-shape"><span className="shelter-marker sm-one"><House size={14} /></span><span className="shelter-marker sm-two"><House size={14} /></span><span className="shelter-marker sm-three"><House size={14} /></span></div></div><div className="shelter-list">{shelters.map((shelter) => <article className="shelter-card" key={shelter.name}><div className={`shelter-status ${shelter.status === 'Open' ? 'open' : 'full'}`}><span />{shelter.status}</div><h3>{shelter.name}</h3><p><MapPin size={15} />{shelter.parish}</p><div className="shelter-details"><span>{shelter.capacity}</span><span>{shelter.features}</span></div><button className="text-button">Directions <ExternalLink size={14} /></button></article>)}</div></div></PageIntro>
}

function ContactsPage() {
  return <PageIntro eyebrow="Help when it matters" title="Emergency contacts" copy="Tap a number to call directly from your phone. For immediate danger, call now." action={<span className="source-badge"><Info size={15} /> Save these numbers</span>}><div className="hotline-grid"><a href="tel:119" className="hotline police"><Siren /><span>Police</span><strong>119</strong><small>National emergency line</small><Phone size={18} /></a><a href="tel:110" className="hotline fire"><Flame /><span>Fire & ambulance</span><strong>110</strong><small>National emergency line</small><Phone size={18} /></a></div><h2 className="subheading">Useful services</h2><div className="contact-list"><Contact name="ODPEM" detail="Disaster preparedness and coordination" number="(876) 906-9674" /><Contact name="JPS" detail="Power outage reporting" number="(888) 225-5577" /><Contact name="NWC" detail="Water emergency line" number="(888) 225-5692" /></div></PageIntro>
}

function Contact({ name, detail, number }: { name: string; detail: string; number: string }) { return <a className="contact-row" href={`tel:${number.replace(/\D/g, '')}`}><span className="contact-avatar"><Phone size={17} /></span><span><strong>{name}</strong><small>{detail}</small></span><span className="contact-number">{number}</span><Phone size={17} /></a> }

function PageIntro({ eyebrow, title, copy, action, children }: { eyebrow: string; title: string; copy: string; action: React.ReactNode; children: React.ReactNode }) { return <section className="page-content page-width"><div className="page-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{copy}</p></div>{action}</div>{children}</section> }

function AlertModal({ alert, onClose, onShare, shared, navigate }: { alert: Alert; onClose: () => void; onShare: (alert: Alert) => void; shared: boolean; navigate: (route: Route) => void }) {
  return <div className="modal-backdrop" role="presentation" onClick={onClose}><article className="alert-modal" role="dialog" aria-modal="true" aria-labelledby="alert-title" onClick={(event) => event.stopPropagation()}><div className={`modal-severity ${alert.severity}`}><span><AlertTriangle size={18} /> {alert.label}</span><button onClick={onClose} aria-label="Close alert"><X size={20} /></button></div><div className="modal-content"><span className="verified-label"><ShieldCheck size={15} /> Verified alert · Simulated source</span><h2 id="alert-title">{alert.title}</h2><p className="modal-summary">{alert.summary}</p><div className="action-box"><p className="eyebrow">What to do now</p><strong>{alert.action}</strong></div><dl className="alert-facts"><div><dt>Affected areas</dt><dd>{alert.parishes.join(', ')}</dd></div><div><dt>Issued</dt><dd>{alert.issued}</dd></div><div><dt>Expires</dt><dd>{alert.expires}</dd></div></dl><div className="modal-actions"><button className="button primary" onClick={() => onShare(alert)}><Share2 size={17} /> {shared ? 'Copied to clipboard' : 'Share alert'}</button><button className="button secondary" onClick={() => { onClose(); navigate('preparedness') }}>Check preparedness <ArrowRight size={17} /></button></div></div></article></div>
}

export default App
