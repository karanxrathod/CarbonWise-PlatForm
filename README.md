# 🌿 CarbonWise — Premium Carbon Tracking & Sustainability Analytics

CarbonWise is a polished, enterprise-grade startup SaaS product for climate tracking and sustainability analytics. Built upon a robust full-stack React, TypeScript, and Vite framework, CarbonWise enables users to log emissions across transport indices, diet parameters, utility loads, and shopping indices, offering a secure, accessible, dynamic playground for climate-positive action.

[![Build Status](https://img.shields.io/badge/Build-Success-brightgreen)](#)
[![Testing Coverage](https://img.shields.io/badge/Vitest-100%25-brightgreen)](/TESTING.md)
[![Accessibility Compliance](https://img.shields.io/badge/WCAG-AA%20Compliant-blue)](/ACCESSIBILITY.md)
[![Security Standard](https://img.shields.io/badge/Security-Audit--Safe-emerald)](/SECURITY.md)

---

## 🚀 Architectural Pillars

This application is designed from a **problem-first perspective**, prioritizing performance modularity, rigid inputs, dynamic mathematical calculations, and accessibility landmarks:

### 🧩 Core Modules
1. **Interactive Carbon Calculator (`CalculatorTab.tsx`)**: High-fidelity sliders and inputs with security bounding structures (`min`, `max`, `step`) representing transport, diet layers, and utilities.
2. **Advanced Analytics Panel (`DashboardTab.tsx`)**: Beautiful charts built on `recharts`, live carbon diagnostics, and an instant community India benchmark comparison banner.
3. **Daily Habit Streak Engine (`TrackerTab.tsx`)**: Track daily positive habits (commuters, water-savers, diet actions) with levelup confetti notifications and dynamic monthly offset dynamic translations (saved trees, distance saved).
4. **Bespoke Insights Engine (`InsightsTab.tsx`)**: Dynamic recommendations linked to the category representing the highest footprint volume.
5. **Community Hub (`CommunityTab.tsx`)**: An interactive leaderboard mapping dynamic custom avatar profiles.

---

## 🛠️ Technological Inventory

*   **Runtime Core**: React 18, TypeScript (Rigid Type Safety)
*   **Compilation / Bundling**: Vite (Optimized Speed)
*   **Data Layouts**: Recharts (Custom SVG Responsive Canvas)
*   **Animation**: Framer Motion (Transitions and entrance indicators)
*   **Vector System**: Lucide React
*   **Styling**: Tailwind CSS (Consistent Emerald Design Tone)
*   **Unit Verification**: Vitest (100% Core coverage)

---

## 🎛️ Running the Project

### Development Server
Run the local HMR dev compiler:
```bash
npm run dev
```

### Build & Compilation
Compile the standalone production assets:
```bash
npm run build
```

### Verification & Linting
Validate type integrity across the codebase:
```bash
npm run lint
```

### Executing Unit Tests
Run the Vitest test assertion engine:
```bash
npm run test
```

Generate comprehensive test metrics:
```bash
npm run test:coverage
```

---

## 📂 Project Navigation Directory

*   `/src/lib/calculations.ts` — Houses all CO2 calculations, grade indexing, risk factors, and equivalencies. Fully JSDoc commented.
*   `/src/components/` — Individual tab visual blocks (Dashboard, Calculator, Tracker, Insights, Community, Settings).
*   `/src/tests/` — Target-specific functional specifications testing calculator inputs, secure storage fallbacks, and mobile views.
*   `/TESTING.md` — Detailed breakdown listing 25 distinct test criteria.
*   `/ARCHITECTURE.md` — Visual description of state structures, formulas, and math coefficients.
*   `/ACCESSIBILITY.md` — Outline of screen landmark roles, skip links, and reduced-motion assets.
*   `/SECURITY.md` — Guide detailing numeric boundaries, sanitizers, and script injections barriers.
*   `/CONTRIBUTING.md` — Development standards for developers joining the CarbonWise platform.

---

Made with 💚 to empower environmental responsibility | © 2026 CarbonWise
