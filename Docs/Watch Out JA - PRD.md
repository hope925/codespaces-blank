Product Requirements Document (PRD)
Watch Out JA — Jamaica Natural Disaster Awareness & Preparedness Platform
________________________________________
0. Project Scope & Context
This project is being designed and built solo, as a personal portfolio piece intended for a college application. It is not currently being pitched to ODPEM, the Jamaica Meteorological Service, or any other government or nonprofit body, and there is no strict deadline — but the scope below is chosen deliberately so the project stays realistic to complete alone, rather than growing indefinitely.
0.1 What this means for scope
Because this is a solo academic project rather than a funded production system, several features described later in this PRD are intentionally simplified for a first build:
•	Live map data will be simulated rather than sourced from an official ODPEM/Met Service partnership — for example, using a free public weather API (such as OpenWeatherMap) for real rainfall/radar data, layered with manually-created sample “alert” scenarios to demonstrate the map and alert-banner logic.
•	The admin/CMS backend will be a single-admin panel (just for me to publish test alerts, add shelters, and approve stories) rather than the multi-role system (Alert Publisher / Shelter Manager / Story Moderator) described in Section 5.6, since there is no team to divide those roles across.
•	Donations will be represented as a UI mockup (the form and flow exist, but no real payment processor is connected) unless integrating a real payment API becomes a specific skill I want to demonstrate.
•	Legal and business considerations (Section 5.8) are documented for completeness and to show awareness of real-world constraints, but are not implemented as actual legal documents reviewed by counsel.
0.2 Designed to extend later
The features and architecture throughout this PRD are still written at full scope — including the parts simplified above — so that the project is not artificially limited. The intent is for the MVP to be buildable solo in a reasonable timeframe, while the overall design remains realistic to extend toward a genuine ODPEM/Met Service partnership, a real donations pipeline, or a multi-admin team structure later, should that ever become worth pursuing.
0.3 Problem & Audience at a Glance
•	The problem: Jamaicans have no single, reliable place to check what’s happening during a hurricane, flood, or earthquake — official information is scattered across ODPEM, Met Service, radio, and social media, so people often don’t find out fast enough to act.
•	Who it’s for: everyday citizens across Jamaica — especially in rural and lower-connectivity areas — who need fast alerts and clear guidance before, during, and after a disaster, plus the Jamaican diaspora checking on home. (See Section 3: Target Users for the full breakdown of personas.)
1. Overview
1.1 Purpose
Watch Out JA is a public-facing website built to help Jamaican citizens stay informed, prepared, and connected before, during, and after natural disasters — including hurricanes, tropical storms, flooding, earthquakes, and landslides. It combines a live weather/hazard map, emergency alerts, preparedness resources, emergency contacts, and community engagement tools (stories, donations, volunteering) into a single trusted platform.
1.2 Problem Statement
Jamaica is highly exposed to hurricanes, flooding, and earthquakes, but citizens often lack a single, reliable, real-time source that combines official alerts with practical preparedness guidance. Information is scattered across ODPEM (Office of Disaster Preparedness and Emergency Management), the Met Service Jamaica, JIS, radio, and social media — making it hard to act quickly and confidently.
1.3 Vision
Become Jamaica's go-to digital hub for disaster awareness — trusted, fast, accessible on any device (including low bandwidth), and useful in the moments that matter most.
1.4 Naming Options
Your working name — Watch Out JA — is memorable and on-brand. A few alternates to consider:
Name	Rationale
Watch Out JA	Punchy, memorable, action-oriented (your current pick)
JaAlert / JAlert	Sounds official, easy to say, pairs well with SMS/push branding
Ready Jamaica	Emphasizes preparedness over fear
StormWatch JA	Good if hurricanes are the primary focus
SafeHaven JA	Emphasizes shelter/safety features
Guardian 876	Uses Jamaica's area code for local identity
Recommendation: keep Watch Out JA as the brand name, but consider a tagline like "Stay Aware. Stay Ready. Stay Safe." to soften the urgency of the name with a reassuring, preparedness-first tone.
________________________________________
2. Goals & Success Metrics
2.1 Goals
•	Provide real-time visibility into active weather/hazard conditions across Jamaica.
•	Reduce response time and improve preparedness before disasters strike.
•	Centralize official emergency contacts and shelter information.
•	Build a self-reinforcing community of prepared, informed, and engaged citizens.
•	Enable citizens to contribute to recovery efforts (donations, volunteering).
2.2 Success Metrics (KPIs)
•	% of visitors who opt in to push notifications
•	Number of preparedness checklists downloaded
•	Time-to-load on 3G/low bandwidth connections (<3 seconds target)
•	Number of verified community stories published
•	Total donations processed / volunteer sign-ups
•	Alert-to-notification latency (time between official alert issuance and push delivery)
•	Repeat visit rate during active weather events vs. normal periods
________________________________________
3. Target Users
Persona	Needs
General citizen (urban/rural)	Fast alerts, simple prep checklist, shelter info
Parent/household head	Family preparedness guidance, contacts, evacuation routes
Elderly / low digital literacy users	Simple UI, large text, SMS fallback, radio-style simplicity
Diaspora Jamaicans	Way to check on home, donate, or find news on family's parish
NGOs / Red Cross / ODPEM partners	Accurate distribution channel for official info
Volunteers/donors	Clear, trustworthy way to give time or money
Journalists/researchers	Historical disaster data and verified statistics
________________________________________
4. Feature Requirements
4.1 Homepage
4.1.1 Live Hazard/Weather Map
•	Interactive map outlining Jamaica (parish-level boundaries).
•	Live overlays for: 
o	Active rainfall/radar
o	Thunderstorm activity/lightning strikes
o	Wind speed and hurricane cone of uncertainty (when applicable)
o	Flood-prone zone highlighting
o	Earthquake epicenter markers (recent seismic activity)
•	Data sourced via API integration with: 
o	Jamaica Meteorological Service
o	NOAA/NHC (for hurricane tracking, since Met Service often relays this)
o	Earthquake data from the Earthquake Unit, UWI Mona
•	Zoom to parish level; tap/click a parish for localized detail.
•	Map should degrade gracefully on slow connections (static image fallback with "last updated" timestamp if live tiles fail to load).
4.1.2 Emergency Alert Banner
•	Sticky/dismissible banner at the top of every page when an active alert exists.
•	Color-coded severity levels (e.g., Green = Normal, Yellow = Watch, Orange = Warning, Red = Emergency/Evacuate) — ideally matching ODPEM's official alert color scheme for consistency.
•	Clicking the banner expands to full alert detail: hazard type, affected parishes, issued time, expiration, and recommended action.
•	Banner content should be pullable from an admin-managed alert system or official RSS/API feed — never hardcoded, so it can be updated in real time without a code deploy.
4.1.3 Branding
•	Site name, logo, and tagline prominently displayed.
•	Quick-access nav to: Live Map, Alerts, Preparedness, Contacts, Shelters, Stories, Donate/Volunteer.
4.2 History & Overview Page
•	Timeline/archive of major past disasters in Jamaica: 
o	Hurricanes (e.g., Gilbert 1988, Ivan 2004, Dean 2007, Sandy 2012, Beryl 2024)
o	Earthquakes (e.g., 1907 Kingston earthquake, 2020 offshore quake felt island-wide)
o	Floods and landslides by year/parish
•	Each entry: date, type, severity, affected areas, casualties/damage (verified sources cited), recovery notes.
•	Optional: filter by parish, disaster type, or decade.
4.3 Preparedness Guidelines
•	Structured by phase: Before / During / After
•	Broken down by disaster type (hurricane, earthquake, flood, drought/fire — consider adding drought/wildfire since Jamaica does experience these).
•	Include guidance tailored to household types (families with children, elderly, persons with disabilities, pet owners).
4.4 Downloadable Preparedness Checklist
•	Interactive on-page checklist (checkboxes) and downloadable version in PDF and Word format.
•	Suggested categories: 
o	Emergency kit (food, water, first aid, flashlight, batteries, radio)
o	Important documents (ID, insurance, birth certificates — waterproofed/copied)
o	Communication plan (out-of-parish contact, meeting point)
o	Home protection (shutters, drainage clearing, gas/electric shutoff points)
o	Evacuation plan (route, shelter location, transportation)
•	Progress-tracking checklist saved locally (or account-based) so users can pick up where they left off.
•	Auto-dated so users are prompted to "refresh" their kit annually (e.g., before hurricane season starts June 1).
4.5 Emergency Contacts
•	National emergency numbers: Police (119), Fire/Ambulance (110), ODPEM.
•	Parish-level contacts where available (parish disaster coordinators).
•	Utility companies (JPS for power outages, NWC for water).
•	Filter/search by parish and service type.
•	Click-to-call on mobile.
4.6 Resource Links
•	Jamaica Red Cross
•	ODPEM
•	Jamaica Meteorological Service
•	Jamaica Fire Brigade
•	Ministry of Health & Wellness (for health emergencies/epidemics)
•	UWI Earthquake Unit
•	Links open in new tab with brief description of each organization's role.
4.7 Shelter & Safe Zone Information
•	Map + list view of designated emergency shelters by parish.
•	Include: address, capacity, whether pet-friendly, accessibility features, current open/closed status during an active event.
•	Evacuation route suggestions per region (especially flood-prone and coastal areas).
•	Data should ideally sync with ODPEM's official shelter list, since shelter activation is decided by government during real events.
4.8 Community Stories
•	Survivors can submit written (and optionally video/audio) accounts of their disaster experience and recovery.
•	Moderation workflow required before publishing (to prevent misinformation, spam, or inappropriate content).
•	Tag stories by disaster/year/parish for easy browsing.
•	Option for storytellers to remain anonymous.
•	Consider a "lessons learned" pull-quote field to surface the most actionable insight from each story.
4.9 Push Notifications / Live Alerts
•	Opt-in web push notifications (and consider SMS integration for users without smartphones/data — critical for rural reach).
•	Notification triggers: 
o	New watch/warning issued
o	Upgrade in severity level
o	Shelter activation
o	All-clear/event resolved
•	Users can set preferences by parish so they only get alerts relevant to their location.
•	Requires a reliable backend integration with the official alert-issuing body's feed (ODPEM/Met Service) — this should never be user-generated or crowd-sourced for official alerts, to avoid spreading false information during a crisis.
•	Deep-linking from notifications: tapping a push or SMS alert must land the user directly on that specific alert's detail screen — never on the generic homepage. This is the single highest-stakes moment in the app; a broken or generic link here undermines trust immediately.
•	Delayed permission request: the native OS notification permission prompt should appear only after the user has been shown why it's useful (e.g., during parish setup, with a short explanation), rather than immediately on first open — an early, unexplained prompt risks a permanent “Don't Allow” that's difficult for the user to reverse later.
•	Share button: a simple share action on the alert detail screen lets users forward an alert to family or community group chats — supporting both personal safety coordination and organic word-of-mouth growth for the app.
4.10 Donations & Volunteering
•	Donations: Secure payment integration (credit card, possibly mobile money options common in Jamaica) directed toward verified relief organizations (e.g., ODPEM Disaster Fund, Red Cross) rather than the platform holding funds directly — this avoids regulatory/trust issues.
•	Transparent reporting: show where funds go (link to partner org's reporting) rather than the site managing disbursement itself, unless you plan to register as an NGO/nonprofit.
•	Volunteering: Sign-up form capturing skills, location, and availability; connect to actual response organizations' volunteer databases rather than building a parallel system from scratch.
________________________________________
5. Additional Recommendations to Strengthen the PRD
5.1 Data source & partnership status (open item — not yet decided)
Whether Watch Out JA operates as an independent aggregator of public feeds or pursues a formal data-sharing arrangement with ODPEM/Met Service is still to be determined. This doesn't need to be resolved before building an MVP, but it should stay flagged as a decision point since it will eventually affect how alerts are labeled (e.g., “sourced from Met Service public feed” vs. “official partner data”) and what liability language appears in the Terms of Service (see 5.8).
5.2 Accessibility (English-only)
The platform will be English-only. To still serve the widest possible audience — including elderly users and people with visual impairments who are disproportionately at risk during high-stress events — the site should meet WCAG 2.1 AA accessibility standards:
•	Screen-reader compatibility: proper semantic HTML and ARIA labels on map controls and alert banners.
•	High-contrast mode and adjustable text size: many users will be viewing this on older phones or in poor lighting, such as during a power outage on battery-saved brightness.
•	Keyboard-only navigation for all critical actions — viewing alerts, downloading the checklist, finding a shelter.
•	Never rely on color alone for alert severity — pair every color-coded alert level with a text label and icon (e.g., “WARNING” plus a triangle icon) so colorblind users aren’t dependent on hue alone.
5.3 Offline-first / low-bandwidth design
Many rural parishes lose connectivity or run on weak signal during storms, which is exactly when the site matters most. Recommended approach:
•	Text-only emergency mode: a stripped-down version of the homepage (alert banner + shelter list + contacts only, no map tiles or images) that loads in under 1 second on a 2G/3G connection.
•	Cached last-known state: use a service worker to cache the most recent alert banner content and map snapshot, so if a user’s connection drops mid-storm, they still see the last confirmed status with a visible “last updated at [time]” stamp rather than a blank error page.
•	Progressive image/tile loading: the live map should load a low-resolution static image first, then enhance to interactive tiles only if bandwidth allows — never block the whole page behind the map.
•	Data-saver toggle: let users manually switch to a lightweight mode themselves, rather than only relying on automatic detection, since some people deliberately conserve mobile data during emergencies.
5.4 SMS / USSD fallback channel
Push notifications only reach people with smartphones, data, and the site’s PWA installed or notifications enabled — a meaningful gap during island-wide events. Recommended approach:
•	Basic SMS short-code subscription (e.g., text “JOIN” to a 5-digit number) that lets any mobile phone — smart or basic — receive alerts.
•	Users can optionally register their parish via SMS reply (e.g., reply “1” for St. Andrew) so they only receive alerts relevant to their area, keeping message volume low.
•	SMS messages should be short and action-first: hazard type, area, and one clear instruction (e.g., “FLOOD WARNING — St. Thomas. Move to higher ground. Shelters open at [list]. Reply INFO for details.”).
•	This requires a relationship with a local telecom or SMS gateway provider (e.g., Digicel/Flow business SMS API) — worth scoping cost and setup time early since telecom integrations can take longer than expected to approve.
•	USSD (dial-a-code, no internet needed) is a stronger long-term option for basic-phone users but is more complex to implement; treat as a Phase 3+ consideration rather than MVP.
5.5 False information safeguard
Because the platform combines official-style data (alerts, shelter status) with user-generated content (stories, damage reports, comments), it’s important that users can never mistake one for the other, especially in a live emergency:
•	“Verified Alert” badge: every official alert should carry a persistent badge, sourced only from the admin/CMS backend (5.6) — never editable by public users.
•	Visually distinct community content: different card style, a “Community Submitted” label, and no styling that resembles the alert banner’s color-coded severity system.
•	Consider a lightweight moderation queue that flags any user submission using alarming language (e.g., “evacuate now,” “state of emergency”) for manual review before publishing, since even well-meaning citizens can accidentally spread panic or inaccurate information.
•	Add a small persistent disclaimer near any community-generated content: “This is a personal account, not an official alert. For current emergency status, see the banner above.”
5.6 Admin / CMS backend
This is arguably the most operationally important part of the system, even though it’s invisible to the public. Without it, alerts can’t be updated in real time and the site becomes a static page. Core requirements:
•	A secure, role-based login (e.g., “Alert Publisher,” “Shelter Manager,” “Story Moderator”) so different trusted people can manage different parts of the site without full admin access.
•	Alert publishing form: hazard type, severity level, affected parishes, description, recommended action, expiration/auto-expire time. Publishing this should immediately update the homepage banner, push notifications, and SMS queue in one action — not three separate manual updates.
•	Shelter status panel: toggle shelters between closed/open/at-capacity, editable in real time during an active event.
•	Story/damage-report moderation queue: approve, reject, or request edits before anything goes live.
•	Audit log: every alert published or shelter status change should be timestamped and attributed to a user, both for accountability and so response times can be reviewed after an event. Access to this backend should have stronger security than the public site (e.g., two-factor authentication), since it’s the single point that could spread false information if compromised.
5.7 Post-disaster damage reporting
A citizen-facing “report damage in your area” feature adds real value both for response coordination and for making donations feel concrete rather than abstract:
•	Simple submission form: location (pin on map or parish/community name), damage type (flooding, structural, road blockage, power/water outage), photo upload, optional description.
•	Submissions should route into the same moderation queue as community stories (see 5.5) before appearing publicly, to prevent spam or duplicate/false reports.
•	Aggregate heat-map view: a heat-map style overlay on the live hazard map showing where the most reports are concentrated, which can help both responders and everyday citizens understand where help is needed most.
•	Tie this into the donations feature (see 4.10) — e.g., “23 damage reports from Portland this week” gives donors a tangible reason to give to that specific parish’s relief effort.
•	Consider basic anti-abuse measures (rate limiting per device/IP, CAPTCHA on submission) so the map can’t be flooded with fake reports during a real crisis.
5.8 Business & legal considerations
A few foundational items to have in place before public launch, ideally reviewed by someone with local legal knowledge:
•	Terms of Service & disclaimer: clearly state that Watch Out JA supplements, but does not replace, official government emergency broadcasts (ODPEM, Met Service, JIS), and that in a conflict between this site and an official government announcement, the government announcement takes precedence.
•	Privacy policy: required given the site will handle location data (for parish-specific alerts) and potentially payment information (donations). Should cover what data is collected, how long it’s retained, and whether it’s shared with any partner organizations.
•	Donations structure: decide early whether funds are collected directly (which likely requires registering as an NGO/nonprofit or partnering with one that already has that status) or routed entirely to third-party verified organizations (simpler, lower liability, but less control over fund allocation). The latter is the lower-risk starting point for an MVP.
•	Content liability: since community stories and damage reports are user-submitted, a basic content moderation policy and takedown process should exist in case something defamatory, false, or inappropriate is posted.
5.9 Seasonal engagement plan
Hurricane season (June–November) will naturally drive most traffic and urgency, but the site risks feeling abandoned the rest of the year if there’s no off-season content plan:
•	Pre-season (April–May): a “Get Ready” campaign pushing checklist downloads, shelter list verification, and reminder notifications to refresh emergency kits.
•	In-season (June–November): primary focus on live alerts, map, and real-time updates.
•	Off-season (December–March): lighter content — community stories, “lessons learned” recaps from the past season, earthquake preparedness content (since earthquakes aren’t seasonal and stay relevant year-round), and donation/volunteer recruitment for ongoing recovery projects.
This keeps return visits happening year-round rather than the site only being useful for six months, which also helps with organic growth and search visibility.
5.10 Analytics & alert performance monitoring
To improve the system after each real event rather than guessing at what worked:
•	Alert latency: time between an official hazard being issued and it appearing on the site/push/SMS — this is the single most important metric for a disaster alert platform.
•	Notification engagement: open rate on push notifications, click-through on SMS links, and whether users who received an alert actually visited the shelter or checklist pages afterward.
•	Track checklist completion rates and repeat downloads year over year, as a proxy for whether preparedness messaging is actually landing.
•	After each hurricane season (or any major event), run a short internal post-mortem: what worked, what was slow, what got the most/least engagement, and feed that into the next season’s improvements. Be mindful of privacy when tracking location-based engagement — aggregate and anonymize wherever possible rather than tracking individuals.
5.11 Progressive Web App (PWA)
Building Watch Out JA as an installable PWA is a strong, low-cost way to get app-like functionality without committing to a native iOS/Android build for MVP:
•	Users can “Add to Home Screen” and get an app icon, offline caching (ties into 5.3), and push notifications — all from the same codebase as the website. This significantly lowers development cost and maintenance compared to maintaining separate native apps, while still giving most of the benefits.
•	Native apps (iOS/Android) can be revisited later as a Phase 4+ consideration if usage justifies the extra investment, particularly if deeper OS-level integration is needed (e.g., emergency alert-level notifications that bypass Do Not Disturb, which some native platforms support more robustly than web push).
6. Technical Considerations (High-Level)
Area	Consideration
Map/weather data	Radar/rainfall API (e.g., regional meteorological data provider), earthquake feed (USGS/UWI), hurricane tracking (NOAA/NHC)
Alerts backend	Admin-managed CMS + push notification service (e.g., web push + SMS gateway)
Hosting	Needs to handle major traffic spikes during active disaster events — plan for scalable/cloud hosting with CDN
Offline resilience	Service worker caching for PWA; lightweight fallback pages
Payments	PCI-compliant processor; consider local Jamaican payment gateways in addition to major cards
Moderation	Manual or semi-automated review queue for community stories and damage reports
________________________________________
7. Phased Rollout Suggestion
Phase 1 (MVP):
•	Homepage with live map + alert banner
•	Emergency contacts
•	Preparedness guidelines + downloadable checklist
•	Shelter directory
Phase 2:
•	Push notifications (web) + SMS opt-in
•	Community stories (moderated)
•	History/overview archive
Phase 3:
•	Donations + volunteering
•	Damage reporting/crowd-mapping
•	PWA installable app
________________________________________
8. Open Questions
•	Will there be an official partnership with ODPEM/Met Service, or is this an independent citizen initiative?
•	Who owns and moderates content 24/7, especially during an active disaster?
•	Will donations be processed directly, or routed to verified third-party organizations?
•	What's the plan for keeping map/radar data accurate and up to date (API costs, licensing)?

