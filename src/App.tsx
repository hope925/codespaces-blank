import { useEffect, useState } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  CircleHelp,
  Clock3,
  CreditCard,
  Droplets,
  ExternalLink,
  Flame,
  HeartPulse,
  Hospital,
  House,
  History,
  Info,
  MapPin,
  Menu,
  MessageCircle,
  Navigation,
  Phone,
  Plus,
  Radio,
  Search,
  Share2,
  ShieldCheck,
  Siren,
  Smartphone,
  Waves,
  X,
} from 'lucide-react'

type Route = 'home' | 'alerts' | 'preparedness' | 'shelters' | 'contacts' | 'history' | 'community' | 'support'
type Severity = 'warning' | 'watch' | 'all-clear'
type AlertFilter = 'all' | 'active' | 'flooding' | 'wind'
type DisasterType = 'Hurricane' | 'Earthquake' | 'Flood' | 'Landslide'
type StoryFocus = 'Survivor experience' | 'Recovery' | 'Rebuilding efforts'
type PrepPhase = 'Before' | 'During' | 'After'

type Alert = {
  id: string
  severity: Severity
  category: Exclude<AlertFilter, 'all' | 'active'>
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
    category: 'flooding',
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
    category: 'wind',
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

type MedicalFacility = { id: string; name: string; parish: string; type: string; phone: string; address: string }

const medicalFacilities: MedicalFacility[] = [
  { id: 'uhwi', name: 'University Hospital of the West Indies', parish: 'Kingston', type: 'Hospital · Emergency care', phone: '(876) 927-1620', address: 'Mona, Kingston 7' },
  { id: 'victoria-jubilee', name: 'Victoria Jubilee Hospital', parish: 'Kingston', type: 'Hospital · Maternity care', phone: '(876) 928-1380', address: 'South Street, Kingston' },
  { id: 'spanish-town', name: 'Spanish Town Hospital', parish: 'St. Catherine', type: 'Hospital · Emergency care', phone: '(876) 984-2301', address: 'Wellington Street, Spanish Town' },
  { id: 'portland-cottage', name: 'Port Antonio Hospital', parish: 'Portland', type: 'Hospital · Emergency care', phone: '(876) 715-8272', address: 'East Street, Port Antonio' },
  { id: 'manchester-health', name: 'Mandeville Regional Hospital', parish: 'Manchester', type: 'Hospital · Emergency care', phone: '(876) 962-6101', address: 'Hope Road, Mandeville' },
]

const disasterHistory: { year: number; type: DisasterType; title: string; severity: string; date: string; areas: string; summary: string }[] = [
  { year: 1988, type: 'Hurricane', title: 'Hurricane Gilbert', severity: 'Category 5', date: 'September 12, 1988', areas: 'Island-wide', summary: 'A devastating hurricane that caused widespread infrastructure damage and tested communities across Jamaica.' },
  { year: 1692, type: 'Earthquake', title: 'Port Royal Earthquake', severity: 'Severe', date: 'June 7, 1692', areas: 'Port Royal', summary: 'A massive earthquake and subsequent tsunami submerged large parts of Port Royal and changed the coastline.' },
  { year: 2001, type: 'Flood', title: 'Portland Floods', severity: 'Major', date: 'November 2001', areas: 'Portland and St. Mary', summary: 'Severe flooding and landslides cut off northeastern communities and disrupted roads for days.' },
  { year: 2004, type: 'Hurricane', title: 'Hurricane Ivan', severity: 'Category 4', date: 'September 10, 2004', areas: 'Southern coast', summary: 'Passing just south of Jamaica, Ivan brought hurricane-force winds, heavy rain, and storm surge to southern parishes.' },
  { year: 2024, type: 'Hurricane', title: 'Hurricane Beryl', severity: 'Category 4', date: 'July 3, 2024', areas: 'Southern and eastern parishes', summary: 'Strong winds, heavy rain, and coastal impacts affected communities as Beryl passed south of Jamaica.' },
]

type Story = { id: string; type: DisasterType; focus: StoryFocus; parish: string; date: string; title: string; quote: string; author: string }

const communityStories: Story[] = [
  { id: 'gilbert-rebuilding', type: 'Hurricane', focus: 'Rebuilding efforts', parish: 'St. Thomas', date: 'September 12, 1988', title: 'Rebuilding after Gilbert', quote: 'We lost the roof within the first few hours, but the community came together faster than the winds died down. Sharing supplies and shelter helped us through the hardest week of our lives.', author: 'Community member' },
  { id: 'portland-floods', type: 'Flood', focus: 'Survivor experience', parish: 'Portland', date: 'November 5, 2021', title: 'High waters, higher spirits', quote: 'The river breached its banks just before midnight. Thanks to the early warning alerts, we moved the elders to higher ground. We lost property, but we kept what mattered most.', author: 'Community member' },
  { id: 'kingston-earthquake', type: 'Earthquake', focus: 'Recovery', parish: 'Kingston', date: 'January 2020', title: 'Checking on every neighbour', quote: 'The first thing we did was check on the people living alone. That simple plan helped us account for everyone before we started clearing the road.', author: 'Community member' },
]

const navItems: { route: Route; label: string; icon: typeof House }[] = [
  { route: 'home', label: 'Live map', icon: Navigation },
  { route: 'alerts', label: 'Alerts', icon: AlertTriangle },
  { route: 'preparedness', label: 'Prepare', icon: ShieldCheck },
  { route: 'shelters', label: 'Shelters', icon: House },
  { route: 'contacts', label: 'Contacts', icon: Phone },
  { route: 'history', label: 'History', icon: History },
  { route: 'community', label: 'Community', icon: MessageCircle },
  { route: 'support', label: 'Support', icon: HeartPulse },
]

function getRoute(): Route {
  const value = window.location.hash.replace('#/', '')
  return navItems.some((item) => item.route === value) ? (value as Route) : 'home'
}

function App() {
  const [route, setRoute] = useState<Route>(getRoute)
  const [parish] = useState(() => localStorage.getItem('watchout-parish') ?? 'St. Catherine')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeAlert, setActiveAlert] = useState<Alert | null>(null)
  const [checked, setChecked] = useState<string[]>(() => JSON.parse(localStorage.getItem('watchout-checklist') ?? '[]'))
  const [shared, setShared] = useState(false)
  const [communityUser, setCommunityUser] = useState<{ username: string; email: string; parish: string } | null>(() => {
    const saved = localStorage.getItem('watchout-community-user')
    return saved ? JSON.parse(saved) : null
  })
  const [isSignInOpen, setIsSignInOpen] = useState(false)

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    localStorage.setItem('watchout-checklist', JSON.stringify(checked))
  }, [checked])

  useEffect(() => {
    if (route === 'community' && !communityUser) setIsSignInOpen(true)
  }, [route, communityUser])

  const navigate = (nextRoute: Route) => {
    if (nextRoute === 'community' && !communityUser) {
      setIsSignInOpen(true)
      return
    }
    window.location.hash = `/${nextRoute}`
    setIsMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleChecklist = (item: string) => {
    setChecked((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item])
  }

  const signInToCommunity = (user: { username: string; email: string; parish: string }) => {
    setCommunityUser(user)
    localStorage.setItem('watchout-community-user', JSON.stringify(user))
    setIsSignInOpen(false)
    window.location.hash = '/community'
    setRoute('community')
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
        {route === 'home' && <HomePage parish={parish} navigate={navigate} openAlert={setActiveAlert} />}
        {route === 'alerts' && <AlertsPage openAlert={setActiveAlert} />}
        {route === 'preparedness' && <PreparednessPage checked={checked} toggleChecklist={toggleChecklist} />}
        {route === 'shelters' && <SheltersPage parish={parish} />}
        {route === 'contacts' && <ContactsPage />}
        {route === 'history' && <HistoryPage />}
        {route === 'community' && communityUser && <CommunityPage user={communityUser} />}
        {route === 'support' && <SupportPage />}
      </main>

      <footer><span>Watch Out JA</span><span>Information should be clear when it matters most.</span><span className="footer-status"><Radio size={14} /> Simulated data · Updated 2 min ago</span></footer>

      <nav className="bottom-nav" aria-label="Mobile navigation">{navItems.map(({ route: itemRoute, label, icon: Icon }) => <button key={itemRoute} className={route === itemRoute ? 'active' : ''} onClick={() => navigate(itemRoute)}><Icon size={19} /><span>{label}</span></button>)}</nav>

      {activeAlert && <AlertModal alert={activeAlert} onClose={() => setActiveAlert(null)} onShare={shareAlert} shared={shared} navigate={navigate} />}
      {isSignInOpen && <CommunitySignInModal onClose={() => setIsSignInOpen(false)} onSignIn={signInToCommunity} />}
    </div>
  )
}

function NavLink({ route, label, current, onClick }: { route: Route; label: string; current: Route; onClick: (route: Route) => void }) {
  return <button className={current === route ? 'nav-link active' : 'nav-link'} onClick={() => onClick(route)}>{label}{current === route && <span />}</button>
}

function HomePage({ parish, navigate, openAlert }: { parish: string; navigate: (route: Route) => void; openAlert: (alert: Alert) => void }) {
  return <>
    <section className="hero-grid page-width">
      <div className="hero-copy">
        <p className="eyebrow"><span className="live-dot" /> Live island status</p>
        <h1>Know what’s happening.<br /><em>Know what to do.</em></h1>
        <p className="hero-lede">Clear, trusted emergency information for every parish in Jamaica.</p>
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
  return <div className="map-preview"><iframe title={`Interactive map of Jamaica centered near ${parish}`} src="https://www.openstreetmap.org/export/embed.html?bbox=-78.7%2C17.6%2C-76.0%2C18.6&layer=mapnik&marker=18.1096%2C-77.2975" /><div className="map-overlay-label"><MapPin size={14} /> Jamaica hazard map</div><div className="map-legend"><span><i className="legend-dot red" /> Active alert</span><span><i className="legend-dot green" /> Shelter</span></div><span className="map-updated"><Clock3 size={13} /> Live map · Updated 2 min ago</span></div>
}

function ActionCard({ icon, title, copy, onClick, accent }: { icon: React.ReactNode; title: string; copy: string; onClick: () => void; accent: string }) {
  return <button className={`action-card ${accent}`} onClick={onClick}><span className="action-icon">{icon}</span><span><strong>{title}</strong><small>{copy}</small></span><ArrowRight size={18} /></button>
}

function AlertCard({ alert, onClick }: { alert: Alert; onClick: () => void }) {
  return <button className={`alert-card ${alert.severity}`} onClick={onClick}><span className="alert-card-symbol">{alert.severity === 'warning' ? <AlertTriangle /> : <Waves />}</span><span className="alert-card-body"><span className="alert-card-top"><strong>{alert.label}</strong><small>{alert.issued}</small></span><span>{alert.summary}</span><span className="alert-card-meta">{alert.parishes.join(' · ')} <ArrowRight size={15} /></span></span></button>
}

function AlertsPage({ openAlert }: { openAlert: (alert: Alert) => void }) {
  const [filter, setFilter] = useState<AlertFilter>('all')
  const visibleAlerts = filter === 'all'
    ? alerts
    : filter === 'active'
      ? alerts.filter((alert) => alert.severity !== 'all-clear')
      : alerts.filter((alert) => alert.category === filter)
  const showPastAlert = filter === 'all'

  const filters: { value: AlertFilter; label: string }[] = [
    { value: 'all', label: 'All alerts' },
    { value: 'active', label: 'Active now' },
    { value: 'flooding', label: 'Flooding' },
    { value: 'wind', label: 'Wind & storms' },
  ]

  return <PageIntro eyebrow="Stay informed" title="Alerts" copy="Official-style updates and clear actions for hazards across Jamaica." action={<span className="source-badge"><ShieldCheck size={15} /> Verified source</span>}><div className="filter-row" role="group" aria-label="Filter alerts">{filters.map(({ value, label }) => <button key={value} className={filter === value ? 'filter active' : 'filter'} onClick={() => setFilter(value)} aria-pressed={filter === value}>{label}</button>)}</div><div className="alert-list alert-page-list">{visibleAlerts.map((alert) => <AlertCard key={alert.id} alert={alert} onClick={() => openAlert(alert)} />)}{showPastAlert && <div className="past-alert"><span className="past-icon"><Check /></span><div><strong>All clear · Tropical Storm Watch</strong><span>Issued Jun 04, 2025 · Event resolved</span></div></div>}{visibleAlerts.length === 0 && <div className="past-alert"><span className="past-icon"><Info size={17} /></span><div><strong>No matching alerts</strong><span>There are no {filter === 'active' ? 'active' : filter} alerts right now.</span></div></div>}</div></PageIntro>
}

function PreparednessPage({ checked, toggleChecklist }: { checked: string[]; toggleChecklist: (item: string) => void }) {
  const [phase, setPhase] = useState<PrepPhase>('Before')
  const guidanceByPhase: Record<PrepPhase, { icon: React.ReactNode; title: string; copy: string; accent: string }[]> = {
    Before: [
      { icon: <House />, title: 'Secure your home', copy: 'Clear drains, trim loose branches, and secure items outdoors.', accent: 'gold' },
      { icon: <HeartPulse />, title: 'Make a family plan', copy: 'Choose a meeting point and an out-of-parish contact.', accent: 'green' },
      { icon: <Radio />, title: 'Stay informed', copy: 'Keep a battery radio nearby and follow verified updates.', accent: 'black' },
    ],
    During: [
      { icon: <House />, title: 'Stay indoors', copy: 'Stay indoors away from windows.', accent: 'gold' },
      { icon: <Navigation />, title: 'Evacuate when ordered', copy: 'Evacuate to high ground or an ODPEM shelter if ordered.', accent: 'green' },
      { icon: <Radio />, title: 'Listen for updates', copy: 'Listen to local radio for official emergency updates.', accent: 'black' },
      { icon: <ShieldCheck />, title: 'Shut off utilities', copy: 'Turn off main electricity, gas, and water lines.', accent: 'gold' },
      { icon: <Waves />, title: 'Avoid floodwater', copy: 'Never cross flooded roads, gullies, or fords.', accent: 'green' },
      { icon: <Phone />, title: 'Conserve phone battery', copy: 'Keep phones in waterproof bags and conserve battery.', accent: 'black' },
      { icon: <AlertTriangle />, title: 'Avoid unstable hazards', copy: 'Avoid downed power lines and unstable structures.', accent: 'gold' },
    ],
    After: [
      { icon: <ShieldCheck />, title: 'Wait for clearance', copy: 'Wait for official ODPEM clearance before going outside.', accent: 'green' },
      { icon: <HeartPulse />, title: 'Check for injuries', copy: 'Check yourself and others for injuries.', accent: 'gold' },
      { icon: <HeartPulse />, title: 'Give basic first aid', copy: 'Administer basic first aid where necessary.', accent: 'black' },
      { icon: <Phone />, title: 'Get medical help', copy: 'Seek professional medical help for severe injuries.', accent: 'green' },
      { icon: <AlertTriangle />, title: 'Look for hazards', copy: 'Look for external hazards like downed power lines.', accent: 'gold' },
      { icon: <Waves />, title: 'Stay away from water', copy: 'Stay away from flooded streets and standing water.', accent: 'black' },
      { icon: <House />, title: 'Inspect your home', copy: 'Inspect your home for structural damage or gas leaks.', accent: 'green' },
    ],
  }
  const phases: PrepPhase[] = ['Before', 'During', 'After']

  return <PageIntro eyebrow="Build your readiness" title="Preparedness" copy="Simple steps before, during, and after a disaster. Start with what you can do today." action={<span className="saved-note"><Check size={15} /> Progress saves automatically</span>}><div className="phase-tabs" role="tablist" aria-label="Preparedness phases">{phases.map((option) => <button key={option} className={phase === option ? 'active' : ''} onClick={() => setPhase(option)} role="tab" aria-selected={phase === option}>{option}</button>)}</div><div className="guidance-grid">{guidanceByPhase[phase].map((guidance) => <Guidance key={guidance.title} {...guidance} />)}</div>{phase === 'Before' && <div className="checklist-panel"><div className="checklist-heading"><div><p className="eyebrow">72-hour emergency kit</p><h2>{checked.length} of {checklistItems.length} ready</h2></div><div className="progress-ring" style={{ '--progress': `${(checked.length / checklistItems.length) * 100}%` } as React.CSSProperties}><strong>{Math.round((checked.length / checklistItems.length) * 100)}%</strong></div></div><div className="progress-bar"><span style={{ width: `${(checked.length / checklistItems.length) * 100}%` }} /></div><div className="checklist">{checklistItems.map((item) => <label key={item} className={checked.includes(item) ? 'checked' : ''}><input type="checkbox" checked={checked.includes(item)} onChange={() => toggleChecklist(item)} /><span className="custom-check">{checked.includes(item) && <Check size={14} />}</span><span>{item}</span></label>)}</div></div>}</PageIntro>
}

function Guidance({ icon, title, copy, accent }: { icon: React.ReactNode; title: string; copy: string; accent: string }) { return <article className={`guidance ${accent}`}><span>{icon}</span><h3>{title}</h3><p>{copy}</p></article> }

function SheltersPage({ parish }: { parish: string }) {
  return <PageIntro eyebrow="A safe place nearby" title="Shelters" copy={`Designated safe zones near ${parish}. Status can change during an active event.`} action={<span className="source-badge"><MapPin size={15} /> Map & list view</span>}><div className="shelter-layout"><div className="shelter-map"><span className="map-water-label">JAMAICA</span><div className="island-shape"><span className="shelter-marker sm-one"><House size={14} /></span><span className="shelter-marker sm-two"><House size={14} /></span><span className="shelter-marker sm-three"><House size={14} /></span></div></div><div className="shelter-list">{shelters.map((shelter) => <article className="shelter-card" key={shelter.name}><div className={`shelter-status ${shelter.status === 'Open' ? 'open' : 'full'}`}><span />{shelter.status}</div><h3>{shelter.name}</h3><p><MapPin size={15} />{shelter.parish}</p><div className="shelter-details"><span>{shelter.capacity}</span><span>{shelter.features}</span></div><button className="text-button">Directions <ExternalLink size={14} /></button></article>)}</div></div></PageIntro>
}

function ContactsPage() {
  const [parishSearch, setParishSearch] = useState('')
  const [facilities, setFacilities] = useState(medicalFacilities)
  const [isAddFacilityOpen, setIsAddFacilityOpen] = useState(false)
  const visibleFacilities = facilities.filter((facility) => `${facility.name} ${facility.parish} ${facility.address}`.toLowerCase().includes(parishSearch.toLowerCase()))

  return <PageIntro eyebrow="Help when it matters" title="Emergency contacts" copy="Tap a number to call directly from your phone. For immediate danger, call now." action={<span className="source-badge"><Info size={15} /> Save these numbers</span>}><div className="hotline-grid"><a href="tel:119" className="hotline police"><Siren /><span>Police</span><strong>119</strong><small>National emergency line</small><Phone size={18} /></a><a href="tel:110" className="hotline fire"><Flame /><span>Fire & ambulance</span><strong>110</strong><small>National emergency line</small><Phone size={18} /></a></div><h2 className="subheading">Useful services</h2><div className="contact-list"><Contact name="ODPEM" detail="Disaster preparedness and coordination" number="(876) 906-9674" /><Contact name="JPS" detail="Power outage reporting" number="(888) 225-5577" /><Contact name="NWC" detail="Water emergency line" number="(888) 225-5692" /></div><section className="medical-section"><div className="medical-heading"><div><p className="eyebrow">Care near you</p><h2>Medical facilities</h2></div><button className="button secondary" onClick={() => setIsAddFacilityOpen(true)}><Plus size={17} /> Add facility</button></div><label className="medical-search"><Search size={17} /><input value={parishSearch} onChange={(event) => setParishSearch(event.target.value)} placeholder="Search by parish or facility" aria-label="Search medical facilities by parish or facility" /></label><div className="medical-list">{visibleFacilities.map((facility) => <article className="medical-card" key={facility.id}><span className="medical-icon"><Hospital size={19} /></span><div><h3>{facility.name}</h3><p><MapPin size={14} /> {facility.parish} · {facility.address}</p><small>{facility.type}</small></div><a className="medical-call" href={`tel:${facility.phone.replace(/\D/g, '')}`} aria-label={`Call ${facility.name}`}><Phone size={17} /></a></article>)}</div>{visibleFacilities.length === 0 && <div className="past-alert"><span className="past-icon"><Info size={17} /></span><div><strong>No medical facilities found</strong><span>Try another parish or facility name.</span></div></div>}{isAddFacilityOpen && <AddFacilityForm onClose={() => setIsAddFacilityOpen(false)} onAdd={(facility) => { setFacilities((current) => [facility, ...current]); setIsAddFacilityOpen(false) }} />}</section></PageIntro>
}

function HistoryPage() {
  const [type, setType] = useState<'All' | DisasterType>('All')
  const visibleEvents = type === 'All' ? disasterHistory : disasterHistory.filter((event) => event.type === type)
  const filters: ('All' | DisasterType)[] = ['All', 'Hurricane', 'Earthquake', 'Flood']

  return <PageIntro eyebrow="Learn from the past" title="History of disasters" copy="A timeline of significant natural events that have affected Jamaica." action={<span className="source-badge"><History size={15} /> Archive</span>}><div className="filter-row" role="group" aria-label="Filter disaster history">{filters.map((filter) => <button key={filter} className={type === filter ? 'filter active' : 'filter'} onClick={() => setType(filter)} aria-pressed={type === filter}>{filter === 'All' ? 'All events' : filter}</button>)}</div><div className="history-timeline">{visibleEvents.map((event) => <DisasterEvent key={event.title} event={event} />)}</div></PageIntro>
}

function DisasterEvent({ event }: { event: (typeof disasterHistory)[number] }) {
  const Icon = event.type === 'Hurricane' ? Waves : event.type === 'Earthquake' ? CircleHelp : Droplets
  return <article className={`history-event ${event.type.toLowerCase()}`}><span className="history-marker"><Icon size={19} /></span><div className="history-card"><div className="history-card-heading"><h2>{event.title}</h2><span className="history-severity">{event.severity}</span></div><div className="history-facts"><span><CalendarDays size={14} /> {event.date}</span><span><MapPin size={14} /> {event.areas}</span></div><p>{event.summary}</p></div></article>
}

function CommunityPage({ user }: { user: { username: string; email: string; parish: string } }) {
  const [stories, setStories] = useState(communityStories)
  const [type, setType] = useState<'All' | DisasterType>('All')
  const [focus, setFocus] = useState<'All' | StoryFocus>('All')
  const [isComposerOpen, setIsComposerOpen] = useState(false)
  const [storyTitle, setStoryTitle] = useState('')
  const [storyQuote, setStoryQuote] = useState('')
  const [storyType, setStoryType] = useState<DisasterType>('Hurricane')
  const [storyFocus, setStoryFocus] = useState<StoryFocus>('Survivor experience')
  const disasterTypes: DisasterType[] = ['Hurricane', 'Earthquake', 'Flood', 'Landslide']
  const focuses: StoryFocus[] = ['Survivor experience', 'Recovery', 'Rebuilding efforts']
  const visibleStories = stories.filter((story) => (type === 'All' || story.type === type) && (focus === 'All' || story.focus === focus))

  const publishStory = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStories((current) => [{ id: `story-${Date.now()}`, type: storyType, focus: storyFocus, parish: user.parish, date: 'Today', title: storyTitle, quote: storyQuote, author: user.username }, ...current])
    setStoryTitle('')
    setStoryQuote('')
    setIsComposerOpen(false)
    setType('All')
    setFocus('All')
  }

  return <PageIntro eyebrow="From across Jamaica" title="Community stories" copy="Real accounts of survival, recovery, and rebuilding shared by people in our parishes." action={<button className="button primary" onClick={() => setIsComposerOpen(true)}><MessageCircle size={17} /> Share your story</button>}><div className="community-welcome"><div><span className="verified-label"><ShieldCheck size={15} /> Signed in as {user.username}</span><strong>Your voice can help someone prepare.</strong><span>Sharing your parish helps neighbours find relevant experiences.</span></div><span className="community-parish"><MapPin size={15} /> {user.parish}</span></div><div className="community-filters"><div className="filter-row" role="group" aria-label="Filter stories by disaster">{(['All', ...disasterTypes] as ('All' | DisasterType)[]).map((filter) => <button key={filter} className={type === filter ? 'filter active' : 'filter'} onClick={() => setType(filter)} aria-pressed={type === filter}>{filter === 'All' ? 'All stories' : filter}</button>)}</div><div className="filter-row" role="group" aria-label="Filter stories by focus">{(['All', ...focuses] as ('All' | StoryFocus)[]).map((filter) => <button key={filter} className={focus === filter ? 'filter active' : 'filter'} onClick={() => setFocus(filter)} aria-pressed={focus === filter}>{filter === 'All' ? 'All experiences' : filter}</button>)}</div></div><div className="story-grid">{visibleStories.map((story) => <article className="story-card" key={story.id}><div className={`story-banner ${story.type.toLowerCase()}`}><MessageCircle size={24} /><span>{story.type}</span></div><div className="story-card-content"><div className="story-meta"><span>{story.parish}</span><span>{story.date}</span></div><span className="story-focus">{story.focus}</span><h2>{story.title}</h2><p>“{story.quote}”</p><small>Shared by {story.author}</small></div></article>)}</div>{visibleStories.length === 0 && <div className="past-alert"><span className="past-icon"><Info size={17} /></span><div><strong>No stories match those filters</strong><span>Try another disaster or experience category.</span></div></div>}{isComposerOpen && <StoryComposer title={storyTitle} quote={storyQuote} type={storyType} focus={storyFocus} disasterTypes={disasterTypes} focuses={focuses} onTitleChange={setStoryTitle} onQuoteChange={setStoryQuote} onTypeChange={setStoryType} onFocusChange={setStoryFocus} onSubmit={publishStory} onClose={() => setIsComposerOpen(false)} />}</PageIntro>
}

function StoryComposer({ title, quote, type, focus, disasterTypes, focuses, onTitleChange, onQuoteChange, onTypeChange, onFocusChange, onSubmit, onClose }: { title: string; quote: string; type: DisasterType; focus: StoryFocus; disasterTypes: DisasterType[]; focuses: StoryFocus[]; onTitleChange: (value: string) => void; onQuoteChange: (value: string) => void; onTypeChange: (value: DisasterType) => void; onFocusChange: (value: StoryFocus) => void; onSubmit: (event: React.FormEvent<HTMLFormElement>) => void; onClose: () => void }) {
  return <div className="composer-backdrop" role="presentation" onClick={onClose}><form className="story-composer" onSubmit={onSubmit} onClick={(event) => event.stopPropagation()}><div className="composer-heading"><div><p className="eyebrow">Community contribution</p><h2>Share your story</h2></div><button type="button" className="icon-button" onClick={onClose} aria-label="Close story form"><X size={19} /></button></div><p className="composer-copy">Your experience may help another Jamaican know what to expect and how to prepare.</p><label>Story title<input required value={title} onChange={(event) => onTitleChange(event.target.value)} placeholder="Give your story a title" /></label><div className="form-grid"><label>Disaster type<select value={type} onChange={(event) => onTypeChange(event.target.value as DisasterType)}>{disasterTypes.map((option) => <option key={option}>{option}</option>)}</select></label><label>What is it about?<select value={focus} onChange={(event) => onFocusChange(event.target.value as StoryFocus)}>{focuses.map((option) => <option key={option}>{option}</option>)}</select></label></div><label>Your experience<textarea required value={quote} onChange={(event) => onQuoteChange(event.target.value)} placeholder="Tell the community what happened, how you coped, or how people rebuilt." rows={5} /></label><div className="composer-actions"><button type="button" className="button secondary" onClick={onClose}>Cancel</button><button type="submit" className="button primary"><MessageCircle size={17} /> Publish story</button></div></form></div>
}

function CommunitySignInModal({ onClose, onSignIn }: { onClose: () => void; onSignIn: (user: { username: string; email: string; parish: string }) => void }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [parish, setParish] = useState('St. Catherine')
  const parishes = ['St. Catherine', 'Kingston', 'St. Andrew', 'St. Thomas', 'Portland', 'Clarendon']

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSignIn({ username, email, parish })
  }

  return <div className="composer-backdrop" role="presentation" onClick={onClose}><form className="signin-modal" onSubmit={submit} onClick={(event) => event.stopPropagation()}><div className="composer-heading"><div><p className="eyebrow">Community access</p><h2>Sign in to read and share stories</h2></div><button type="button" className="icon-button" onClick={onClose} aria-label="Close sign in"><X size={19} /></button></div><p className="composer-copy">Tell us where you are from so community stories can stay connected to the parish they came from.</p><label>Username<input required value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" /></label><label>Email address<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" /></label><label>Password<input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" /></label><label>Your parish<select value={parish} onChange={(event) => setParish(event.target.value)}>{parishes.map((option) => <option key={option}>{option}</option>)}</select></label><button type="submit" className="button primary signin-submit"><MessageCircle size={17} /> Continue to Community</button><small className="form-note">Prototype sign-in: your password is only used to validate this form and is not saved.</small></form></div>
}

function SupportPage() {
  const [volunteerSubmitted, setVolunteerSubmitted] = useState(false)
  const [donationSubmitted, setDonationSubmitted] = useState(false)
  const [amount, setAmount] = useState('5000')
  const [frequency, setFrequency] = useState('One-time')
  const [paymentMethod, setPaymentMethod] = useState('Card')
  const disasterOptions = ['Any emergency', 'Hurricane cleanup', 'Flood recovery', 'Earthquake response', 'Landslide cleanup', 'Community support']
  const parishes = ['Kingston & St. Andrew', 'St. Catherine', 'Clarendon', 'Manchester', 'St. Elizabeth', 'Portland', 'St. Thomas']
  const donationFunds = ['General Emergency Fund', 'Hurricane recovery', 'Medical supplies drive', 'Shelter and food support']

  const submitVolunteer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setVolunteerSubmitted(true)
  }

  const submitDonation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setDonationSubmitted(true)
  }

  return <PageIntro eyebrow="Support and relief" title="Volunteer & donate" copy="Give your time or support trusted relief efforts across Jamaica." action={<span className="source-badge"><ShieldCheck size={15} /> Prototype forms</span>}><div className="needs-callout"><div><p className="eyebrow">Current needs</p><h2>Small acts make response stronger.</h2></div><ul><li>Medical professionals in St. Thomas and Portland</li><li>Potable water and essential supplies</li><li>Heavy-duty transport for cleanup efforts</li></ul></div><div className="support-grid"><section className="support-panel"><div className="support-heading"><HeartPulse size={22} /><div><p className="eyebrow">Lend a hand</p><h2>Become a volunteer</h2></div></div>{volunteerSubmitted ? <Confirmation title="Volunteer registration received" copy="Thank you. A local response coordinator will follow up using your email." onReset={() => setVolunteerSubmitted(false)} /> : <form className="support-form" onSubmit={submitVolunteer}><label>Full name<input required placeholder="Jane Doe" /></label><label>Email address<input required type="email" placeholder="jane@example.com" /></label><label>Parish or area<select required>{parishes.map((option) => <option key={option}>{option}</option>)}</select></label><label>How would you like to help?<select required>{disasterOptions.map((option) => <option key={option}>{option}</option>)}</select></label><button className="button primary" type="submit"><HeartPulse size={17} /> Register as volunteer</button></form>}</section><section className="support-panel donation-panel"><div className="support-heading"><CreditCard size={22} /><div><p className="eyebrow">Give securely</p><h2>Make a donation</h2></div></div>{donationSubmitted ? <Confirmation title="Donation details received" copy={`Your ${frequency.toLowerCase()} gift of JMD $${Number(amount || 0).toLocaleString()} is ready for secure processing.`} onReset={() => setDonationSubmitted(false)} /> : <form className="support-form" onSubmit={submitDonation}><label>Donate to<select required>{donationFunds.map((option) => <option key={option}>{option}</option>)}</select></label><fieldset><legend>Amount (JMD)</legend><div className="amount-options">{['1000', '5000', '10000'].map((option) => <button key={option} type="button" className={amount === option ? 'amount-option selected' : 'amount-option'} onClick={() => setAmount(option)}>JMD ${Number(option).toLocaleString()}</button>)}</div><input aria-label="Custom donation amount" type="number" min="1" placeholder="Other amount" value={['1000', '5000', '10000'].includes(amount) ? '' : amount} onChange={(event) => setAmount(event.target.value)} /></fieldset><fieldset><legend>Frequency</legend><div className="radio-options"><label><input type="radio" name="frequency" value="One-time" checked={frequency === 'One-time'} onChange={(event) => setFrequency(event.target.value)} /> One-time</label><label><input type="radio" name="frequency" value="Monthly" checked={frequency === 'Monthly'} onChange={(event) => setFrequency(event.target.value)} /> Monthly</label></div></fieldset><label>Payment method<select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}><option>Card</option><option>Bank transfer</option><option>Mobile money</option></select></label>{paymentMethod === 'Card' && <div className="payment-fields"><label>Card number<input required placeholder="0000 0000 0000 0000" inputMode="numeric" /></label><div className="form-grid"><label>Expiry<input required placeholder="MM/YY" /></label><label>CVV<input required placeholder="123" inputMode="numeric" /></label></div></div>}<button className="button primary" type="submit"><CreditCard size={17} /> Continue to secure donation</button><small className="form-note"><Smartphone size={13} /> This prototype does not process or store payments.</small></form>}</section></div></PageIntro>
}

function Confirmation({ title, copy, onReset }: { title: string; copy: string; onReset: () => void }) {
  return <div className="form-confirmation"><span className="past-icon"><Check size={17} /></span><h3>{title}</h3><p>{copy}</p><button type="button" className="text-button" onClick={onReset}>Submit another response <ArrowRight size={15} /></button></div>
}

function AddFacilityForm({ onClose, onAdd }: { onClose: () => void; onAdd: (facility: MedicalFacility) => void }) {
  const [name, setName] = useState('')
  const [parish, setParish] = useState('Kingston')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const parishes = ['Kingston', 'St. Catherine', 'St. Andrew', 'Portland', 'Manchester', 'Clarendon', 'St. Thomas']

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onAdd({ id: `facility-${Date.now()}`, name, parish, address, phone, type: 'Community listing' })
  }

  return <div className="composer-backdrop" role="presentation" onClick={onClose}><form className="signin-modal facility-form" onSubmit={submit} onClick={(event) => event.stopPropagation()}><div className="composer-heading"><div><p className="eyebrow">Medical directory</p><h2>Add a facility</h2></div><button type="button" className="icon-button" onClick={onClose} aria-label="Close add facility form"><X size={19} /></button></div><p className="composer-copy">Add a hospital, clinic, or health centre for neighbours in your parish.</p><label>Facility name<input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Community health centre" /></label><label>Parish<select value={parish} onChange={(event) => setParish(event.target.value)}>{parishes.map((option) => <option key={option}>{option}</option>)}</select></label><label>Address or area<input required value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Street or community" /></label><label>Phone number<input required type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="(876) 555-0199" /></label><div className="composer-actions"><button type="button" className="button secondary" onClick={onClose}>Cancel</button><button type="submit" className="button primary"><Plus size={17} /> Add facility</button></div></form></div>
}

function Contact({ name, detail, number }: { name: string; detail: string; number: string }) { return <a className="contact-row" href={`tel:${number.replace(/\D/g, '')}`}><span className="contact-avatar"><Phone size={17} /></span><span><strong>{name}</strong><small>{detail}</small></span><span className="contact-number">{number}</span><Phone size={17} /></a> }

function PageIntro({ eyebrow, title, copy, action, children }: { eyebrow: string; title: string; copy: string; action: React.ReactNode; children: React.ReactNode }) { return <section className="page-content page-width"><div className="page-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{copy}</p></div>{action}</div>{children}</section> }

function AlertModal({ alert, onClose, onShare, shared, navigate }: { alert: Alert; onClose: () => void; onShare: (alert: Alert) => void; shared: boolean; navigate: (route: Route) => void }) {
  return <div className="modal-backdrop" role="presentation" onClick={onClose}><article className="alert-modal" role="dialog" aria-modal="true" aria-labelledby="alert-title" onClick={(event) => event.stopPropagation()}><div className={`modal-severity ${alert.severity}`}><span><AlertTriangle size={18} /> {alert.label}</span><button onClick={onClose} aria-label="Close alert"><X size={20} /></button></div><div className="modal-content"><span className="verified-label"><ShieldCheck size={15} /> Verified alert · Simulated source</span><h2 id="alert-title">{alert.title}</h2><p className="modal-summary">{alert.summary}</p><div className="action-box"><p className="eyebrow">What to do now</p><strong>{alert.action}</strong></div><dl className="alert-facts"><div><dt>Affected areas</dt><dd>{alert.parishes.join(', ')}</dd></div><div><dt>Issued</dt><dd>{alert.issued}</dd></div><div><dt>Expires</dt><dd>{alert.expires}</dd></div></dl><div className="modal-actions"><button className="button primary" onClick={() => onShare(alert)}><Share2 size={17} /> {shared ? 'Copied to clipboard' : 'Share alert'}</button><button className="button secondary" onClick={() => { onClose(); navigate('preparedness') }}>Check preparedness <ArrowRight size={17} /></button></div></div></article></div>
}

export default App
