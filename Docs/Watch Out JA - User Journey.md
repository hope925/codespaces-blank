Watch Out JA — Citizen User Journey

1. Purpose of This Document
This document maps the end-to-end experience of a primary citizen persona using Watch Out JA, from the moment they first open the app to the moment they close it — and what brings them back. It identifies what the user sees and does at each step, what they're thinking and feeling, and where friction or drop-off is most likely to occur, so those risk points can be designed around directly.
2. Primary Persona
Name	Sasha Bennett
Age	29
Location	Portmore, St. Catherine
Occupation	Retail supervisor
Device / Connectivity	Mid-range Android phone, prepaid mobile data (limited/rationed), occasional Wi-Fi at home
Goal	Wants to know quickly and clearly if a storm, flood, or other hazard is coming to her specific area, and what she needs to do about it.
Context	Grew up hearing about Hurricane Gilbert and Ivan from her parents; has lived through flooding in her community before. Follows the news casually but finds official updates scattered and sometimes confusing.
Needs	Fast, trustworthy, parish-specific alerts; a simple way to know she's “prepared enough”; a way to check on family; doesn't want to feel like she has to hunt for information during a stressful moment.
 
3. Journey Map (Diagram)
A simplified view of Sasha's path through the app, including the return loop that brings her back during a real event:
  
4. Stage-by-Stage Journey
4.1 Trigger / Discovery
•	What happens: Sasha hears about Watch Out JA — maybe from a community Facebook post, a friend, or a school flyer during hurricane season — and downloads it (or opens the installed PWA) for the first time.
•	What she's thinking: “Let me see if this is actually useful before I bother making an account.”
•	Friction / drop-off risk: If the app store listing or landing page doesn't clearly explain what the app does within a few seconds, she may abandon before ever opening it.
4.2 First Open — Welcome Screen
•	What happens: A welcome screen appears with the Watch Out JA name, logo, and a short tagline (e.g., “Stay Aware. Stay Ready. Stay Safe.”) and a single clear “Get Started” button.
•	What she's thinking: “Okay, this looks official and simple enough.”
•	Friction / drop-off risk: On a slow connection, a heavy welcome screen (large images, animations) can stall here — this is the single most damaging place for lag, since it's the very first impression. Keep this screen lightweight.
4.3 Onboarding Tour
•	What happens: A short, skippable set of pointer screens (3–4 max) highlights the core features: the live map, the alert banner, the checklist, and shelters. Each screen has a visible “Skip” option.
•	What she's thinking: “I get the idea — I just want to get to the actual app now.”
•	Friction / drop-off risk: If there are too many onboarding screens, or “Skip” isn't obvious, users tap through impatiently without absorbing anything — or worse, get frustrated and close the app entirely. This is a common drop-off point across most apps, not unique to Watch Out JA.
4.4 Account Choice
•	What happens: Sasha is offered three paths: Create Account, Log In, or Continue as Guest. Guest mode still works, just without saved checklist progress or account-based notification sync across devices.
•	What she's thinking: “I don't want to sign up for another account right now — can I just try it first?”
•	Friction / drop-off risk: If account creation is required before doing anything else, this is a major drop-off point. The guest path must remain fast and obvious, since forcing signup this early is one of the most common reasons people abandon an app in the first minute.
4.5 Parish & Notification Setup
•	What happens: Sasha selects her parish (St. Catherine) from a list or by tapping the map, and is asked whether she'd like to enable push notifications.
•	What she's thinking: “I want alerts, but only for my area — I don't want notifications for parishes I don't live in.”
•	Friction / drop-off risk: If the notification permission prompt (the native OS one) appears immediately, before she understands *why* she'd want it, she's likely to tap “Don't Allow” out of habit — and on most phones, that decision is hard to reverse without digging through settings later. It's better to explain the value first, then trigger the OS prompt.
4.6 Homepage Arrival
•	What happens: Sasha lands on the homepage: the live map is centered on St. Catherine, and since there's no active alert right now, she sees a calm “all clear” state instead of the red alert banner.
•	What she's thinking: “Okay, nothing's happening right now — good to know.”
•	Friction / drop-off risk: A homepage that feels empty or purposeless during calm periods risks feeling like a “one-time use” app rather than something worth keeping. The all-clear state should still offer something useful — e.g., a gentle checklist reminder or a “last checked” timestamp — so the visit doesn't feel wasted.
4.7 Exploration
•	What happens: Curious, Sasha taps into the preparedness checklist, checks it against what she already has at home, and briefly looks at the shelter list for her area.
•	What she's thinking: “Let me see what I'm actually missing.”
•	Friction / drop-off risk: If downloading the checklist (PDF/Word) requires extra steps — permissions, unclear buttons, or a slow file generation — she may give up partway through. Multiple taps deep into shelters or resources can also make it easy to lose track of how to get back to the alert banner or homepage.
4.8 Push / SMS Notification (Return Trigger)
•	What happens: Weeks later, a tropical storm is approaching. Sasha gets a push notification: “TROPICAL STORM WATCH — St. Catherine. Heavy rain expected Thursday. Tap for details.” She taps it and is dropped directly into the alert detail screen.
•	What she's thinking: “Is this serious? What do I actually need to do?”
•	Friction / drop-off risk: This is the single most important moment in the entire journey — if the notification instead dumps her onto a generic homepage rather than the specific alert, or if the alert content is vague or stale, trust in the app breaks immediately, possibly for good.
4.9 Action Taken
•	What happens: Sasha reads the alert detail, checks her preparedness checklist to confirm she's ready, glances at the nearest shelter in case she needs it, and shares the alert with a family group chat.
•	What she's thinking: “Okay, I know what to do. Let me make sure my sister knows too.”
•	Friction / drop-off risk: If there's no simple share button, she has to take a screenshot or manually retype the information — a missed opportunity both for her convenience and for the app's organic word-of-mouth growth.
4.10 Close App
•	What happens: Sasha closes the app, ideally after seeing a brief, reassuring confirmation — e.g., “You're set. We'll notify you if anything changes for St. Catherine.”
•	What she's thinking: “Good, I don't need to keep checking manually.”
•	Friction / drop-off risk: Without any closing acknowledgment, she may feel unsure whether the app is “still watching” on her behalf, and could fall back into old habits of checking multiple other sources out of anxiety — undermining the app's core value proposition.
4.11 Return Loop
•	What happens: The cycle repeats: the next real trigger (a new watch, warning, or shelter update) brings Sasha back in via notification, re-entering at Stage 4.8.
•	What she's thinking: “Good thing I still have this installed.”
•	Friction / drop-off risk: If too much time passes with zero engagement (e.g., a quiet hurricane season), Sasha may forget the app exists or uninstall it to save storage — this is where the seasonal engagement plan (see PRD Section 5.9) matters, to keep light-touch value flowing even in the off-season.
5. Friction Points & Drop-Off Risks — Summary
Consolidated from the stage-by-stage breakdown above, roughly in order of how early they can end the journey:
Friction Point	Why It Matters
Slow first load	A heavy welcome screen on a weak connection can lose users before they ever see the app's value.
Onboarding fatigue	Too many tutorial screens, or a hard-to-find skip option, causes impatient tap-throughs or early exits.
Forced account creation	Requiring signup before any value is shown is one of the most common reasons people abandon a new app.
Premature notification prompt	Triggering the native OS permission request before explaining its value risks a permanent “Don't Allow,” which is hard to reverse later.
Empty-feeling homepage	An all-clear state with nothing else to offer can make the app feel pointless outside of active emergencies.
Checklist download friction	Extra permissions or slow file generation when downloading the PDF/Word checklist can cause users to give up mid-task.
Broken notification deep link	If tapping a push notification doesn't land the user directly on the relevant alert, trust erodes fast — this is the app's single highest-stakes moment.
No sharing mechanism	Without an easy way to share an alert, users lose a natural moment of both personal usefulness and organic growth for the app.
No closing reassurance	Leaving the app without confirmation that it's “still watching” can send anxious users back to checking multiple other sources.
Off-season disengagement	Long gaps with no relevant content risk the app being forgotten or uninstalled between hurricane seasons.
 
6. Design Implications for the PRD
A few of these directly reinforce or extend recommendations already in the PRD:
•	Lightweight welcome screen — supports the offline-first / low-bandwidth guidance in PRD Section 5.3.
•	Delayed permission request — the notification permission prompt should be shown after a short value explanation, not immediately on first open; worth adding as an explicit note under PRD Section 4.9.
•	Guest mode as default path — already supported by “Continue as Guest” in this journey; the PRD's checklist feature (4.4) should confirm it still works locally for guest users without an account.
•	Deep-linking from notifications — not currently listed in the PRD's feature set; worth adding as a small addition to Section 4.9 (Push Notifications) so a single tap from a notification always lands on the specific alert.
•	Share button — a simple share button on the alert detail screen; worth adding to Section 4.9 as a small but high-value addition.
•	Off-season content cadence — reinforces the seasonal engagement plan already in PRD Section 5.9.
