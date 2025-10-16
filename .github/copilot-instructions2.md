0) Project kickoff (Next.js + Tailwind + shadcn + Zustand)
Prompt (paste into Copilot Chat):
 “Create a Next.js 14 (App Router, TypeScript) project named micro-motivator. Add Tailwind CSS, shadcn/ui, lucide-react, Zustand for state, recharts for charts, and lottie-react for animations. Set up an /app layout with a glassy dark UI. Add a lib/storage.ts helper for localStorage-safe read/write, and a types.ts with types: UserProfile, Session, Badge, Streak, WeatherState, BreathPattern. Configure @/components/ui/* via shadcn. Include an accessible skip-to-content link and base SEO in metadata.”

1) Theme with Fall colors + seasonal palettes
Prompt:
 “In theme/ add a palette.ts exporting seasonal color tokens: fall (burnt orange #C24E00, amber #FFB000, deep moss #2E4026, plum #5B3758), winter, spring, summer. Implement a SeasonProvider that infers season by month and exposes useSeason(). Wire CSS variables on :root to swap tokens. Add a subtle falling-leaf background only in fall (canvas or CSS). Provide a toggle to lock a season manually in settings.”

2) Seasonal + weather-aware quotes (with animations)
Prompt:
 “Create data/quotes.ts containing curated quotes grouped by season and weather (sunny, cloudy, rainy, snowy). Build components/WeatherQuote.tsx that:
fetches geolocation (with graceful fallback to city input),


calls Open-Meteo (no API key) to infer current weather,


selects a quote by season+weather,


shows a matching Lottie animation (sun, rain, snow, wind),


includes a ‘New quote’ button and ‘Save to favorites’.
 Add WeatherBadge that shows the detected conditions with emoji + tooltip.”



3) Positive affirmations (smart rotation)
Prompt:
 “Create data/affirmations.ts (short, first-person present), and components/AffirmationCard.tsx that surfaces 1–2 per session. Implement spaced-repetition rotation: don’t repeat an affirmation within 48h; store timestamps in localStorage. Provide ‘Hear it’ (Web Speech API), ‘Copy’, and ‘Pin’ actions.”

4) Lofi audio player (fire crackling, rainy night, etc.)
Prompt:
 “Build components/LofiPlayer.tsx using Web Audio API that can layer ambient loops (fire, rain, café, night). Features: master volume, per-track volume, start/stop, smooth 500ms crossfade, ‘Focus 25’ timer that auto-starts audio. Put royalty-free placeholder .mp3/.ogg under public/audio. Expose useAudioStore (Zustand) for global play state.”

5) Guided breathing exercises (timed + voice guidance)
Prompt:
 “Create components/BreathCoach.tsx supporting Box (4-4-4-4), 4-7-8, and custom patterns. Visual: animated expanding circle and progress ring; keyboard accessible. Add optional voice cues (‘inhale…hold…exhale…’) via Web Speech API, a haptic-like screen pulse, and a ‘Session length’ selector (1/3/5/10 min). On complete, emit a sessionCompleted event with duration and pattern.”

6) Micro-breaks: stretch & movement cards
Prompt:
 “Add components/MicroBreak.tsx with a carousel of 30–90s stretch/movement prompts (neck roll, shoulder openers, stand & reach). Each card has a timer, GIF/Lottie, safety notes, and ‘Skip’. Offer ‘Auto-suggest every 25 min while studying’ toggle that schedules gentle notifications.”

7) Notifications (reminders + study timers)
Prompt:
 “Implement notifications.
In lib/notifications.ts, wrapper for the Web Notifications API with permission handling and a fallback in-app toast (shadcn).


Add a minimal service worker for scheduled reminders (when the tab is open) and a ‘Remind me in…’ quick menu (5/15/25/45 min).


Notify for: micro-breaks, breathing session start, daily quote at a chosen time.
 Make it accessible and respect Reduce Motion.”



8) Gamification: points, streaks, badges, confetti
Prompt:
 “Create a useGameStore (Zustand) with: points, streakDays, lastActiveDate, badges: Badge[]. Award:
+5 view quote, +10 breathing session <5m, +20 ≥5m, +8 micro-break, +5 affirmation listened, +2 weather check.


Maintain daily streak if any action done that day; reset after 24h inactivity.


Badges: ‘First Breath’, ‘7-Day Streak’, ‘All Seasons’, ‘Rainy Focus’.
 Add components/GamificationHUD.tsx (points, streak, small confetti on level-up) and components/BadgesGrid.tsx.”



9) Progress dashboard (charts)
Prompt:
 “Create /app/dashboard/page.tsx with recharts to display: weekly points, breathing minutes by pattern, streak history, and most-used ambience. Provide CSV export and a privacy note. Add filters (7/30/90 days). Data comes from localStorage; abstract via lib/analytics.ts.”

10) Home page assembly
Prompt:
 “Compose /app/page.tsx hero: seasonal gradient (fall palette), headline ‘Micro-Motivator’, subcopy, and 4 cards: WeatherQuote, AffirmationCard, LofiPlayer mini, BreathCoach mini. Second row: MicroBreak, GamificationHUD, ‘Start Focus 25’ button (starts timer + audio + schedules micro-breaks). Add footer with ‘Evidence’ links, accessibility statement, and settings.”

11) Settings page
Prompt:
 “Create /app/settings/page.tsx to control:
Season (auto/manual), weather location, quote themes, affirmations frequency


Breathing pattern defaults, voice on/off, volume


Ambient audio defaults and auto-play with Focus


Notification schedules and quiet hours


Gamification opt-out (still works but not shown)


Data reset/export.
 Persist via lib/storage.ts.”



12) Accessibility + performance pass
Prompt:
 “Run an a11y pass: ensure all controls have labels, aria-live for timers, prefers-reduced-motion respects reduced animations, color contrast AA with fall palette. Lazy-load heavy Lotties and audio, code-split pages, and prefetch dashboard on hover.”

13) Example tests
Prompt:
 “Add Jest + React Testing Library. Write tests for useGameStore (streak rollover), BreathCoach timers (advance fake timers), and WeatherQuote (weather branches with mocked fetch).”

14) Deployment scaffold
Prompt:
 “Add a README.md with setup steps, environment notes (Open-Meteo requires none), and Vercel deploy instructions. Include vercel.json if needed, and configure PWA meta: icons, theme color (seasonal), and manifest for ‘install as app’.”