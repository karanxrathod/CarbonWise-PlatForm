# 🧪 CarbonWise Dynamic Testing Suite Documentation

This document lists the 25 primary quality assurance test cases created to validate the core UI layout states, security math sanitization, and carbon emission engines of CarbonWise.

| Test ID | Feature | Input | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-001** | Carbon Calculator | Diet = `vegan` | Dictates lower base emissions than moderate meat diets (1500 kg vs 2500 kg) | Pass | Active |
| **TC-002** | Carbon Calculator | Diet = `heavy` | Dictates highest baseline diet carbon footprint (3300 kg CO₂ annually) | Pass | Active |
| **TC-003** | Carbon Calculator | 100 car km/week | Dynamically outputs matching Co2 emissions (`100 * 52 * 0.21` = 1092 kg CO₂) | Pass | Active |
| **TC-004** | Carbon Calculator | Zero values | Ensures zero values across fields do not result in crash or infinite loop | Pass | Active |
| **TC-005** | Carbon Calculator | Renewable % = 100% | Binds raw electricity emissions to 0 kg through adjustment factor | Pass | Active |
| **TC-006** | Carbon Calculator | Public Transit = `Daily` | Applies offset reduction metric correctly under transport totals | Pass | Active |
| **TC-007** | Dashboard Metrics | emissions = 2000 kg | Formulates and displays Elite letter grade 'A' | Pass | Active |
| **TC-008** | Dashboard Metrics | emissions = 9000 kg | Formulates and displays Evolving learner letter grade 'F' | Pass | Active |
| **TC-009** | Dashboard Metrics | Offset equivalents | Maps user annual carbon footprint accurately to required offsets of trees | Pass | Active |
| **TC-010** | Sustainability Score | habits streaks = 0 | Outputs core score based solely on carbon output weights | Pass | Active |
| **TC-011** | Sustainability Score | habits streaks = 15 | Enhances core score ratings dynamically with streak multiplier rewards | Pass | Active |
| **TC-012** | Habit Tracker | Toggle active habit | Increments individual habit streak counters immediately upon checked status | Pass | Active |
| **TC-013** | Habit Tracker | Streak matches 7 | Level Up milestone triggering micro-animations (confetti overlay) | Pass | Active |
| **TC-014** | Habit Tracker | No completed habits | Shows appropriate Level-1 fallback weekly mission challenge messages | Pass | Active |
| **TC-015** | Leaderboard | Dynamic profiles | Places current user profile dynamic position based on calculated scores | Pass | Active |
| **TC-016** | Language Selector | Switch to `hi` (Hindi) | Translates general layout headers, labels, and micro prompts perfectly | Pass | Active |
| **TC-017** | Theme Controller | Toggle `isDarkMode` | Renders fully formatted eye-safe ambient dark theme backgrounds and cards | Pass | Active |
| **TC-018** | Local Storage Handler | Page reload | Preserves custom username, avatar archetype, and targets across instances | Pass | Active |
| **TC-019** | Local Storage Handler | Out of bound strings | `sanitizeNumber` utility intercepting corrupted items, fallback to 0 | Pass | Active |
| **TC-020** | Mobile Navigation | Mobile viewport menu | Collapses options panel into slide-out drawer, toggled with safe Hamburger | Pass | Active |
| **TC-021** | Keyboard Navigation | Focus Indicator | Visually outlines focused targets clearly utilizing emerald green borders | Pass | Active |
| **TC-022** | Keyboard Navigation | Tab index order | Respects logical HTML reading order across active panels and headers | Pass | Active |
| **TC-023** | ARIA Semantics | Role attributes | Attributes active roles like `role="tablist"` supporting assistive devices | Pass | Active |
| **TC-024** | Accessibility Bypass | Skip To Content | First item renders skip-to-content anchor bypassing visual layouts | Pass | Active |
| **TC-025** | Reduced Motion support| OS reduced anim | Transition and active motion timers compress to 0.01ms dynamically | Pass | Active |
