# 🏗️ Architecture Design Specifications — CarbonWise

This document provides a comprehensive overview of the design architecture, state layouts, component relationships, and mathematical coefficients powering the CarbonWise carbon tracking platform.

---

## 🧮 1. Calculation Multipliers & Formulas

All carbon emissions in CarbonWise are compiled dynamically inside `/src/lib/calculations.ts` using coefficients derived from EPA, IPCC, and industry baseline standard models. All values reflect annual kg CO₂e counts:

### Transport Sector
*   **Car travel**: `carKmPerWeek * 52 * 0.21` (0.21 kg CO₂e per km).
*   **Aviation flights**:
    *   *Short distance*: `shortFlightsPerYear * 250` (250 kg CO₂e per short flight).
    *   *Long distance*: `longFlightsPerYear * 1100` (1100 kg CO₂e per long-haul flight).
*   **Public Transit Benefits**:
    *   *Daily*: `-700` kg CO₂e/year offset bonus.
    *   *Regularly*: `-350` kg CO₂e/year offset bonus.
    *   *Rarely*: `-100` kg CO₂e/year offset bonus.
    *   *Never*: `0` base adjustment.
*   *Transport Total Constraint*: Bounded at `Math.max(0, rawTransport)` to prevent negative calculations.

### Home Utilities Sector
*   **Electricity usage**: `(electricityKwhPerMonth * 12) * 0.475` (0.475 kg per kWh).
*   **Clean Energy Adjustment**: Raw electricity is multiplied by `(1 - (renewablePercent / 100))` to account for clean energy source mix.
*   **Gas utility factor**: `(gasUsage * 12) * 2.1` (2.1 kg per gas unit equivalent).

### Diet Sector
Emissions are assigned as absolute annual estimates depending on lifestyle categorizations:
*   `heavy` (Heavy Meat Diet): `3300` kg CO₂e/year.
*   `moderate` (Moderate Meat Diet): `2500` kg CO₂e/year.
*   `vegetarian` (Vegetarian Diet): `1700` kg CO₂e/year.
*   `vegan` (Vegan Diet): `1500` kg CO₂e/year.

### Shopping Sector
*   **Online Orders**: `onlineOrdersPerMonth * 12 * 2.5` (2.5 kg CO₂e par order).
*   **New Clothes Purchase**: `newClothesPerMonth * 12 * 14.2` (14.2 kg CO₂e per garment).
*   **Electronics Acquisition**: `electronicsPerYear * 150` (150 kg CO₂e per advanced smart device).

---

## 🔀 2. Operational Component Flowchart

The following tree represents the logical interface rendering pipeline of CarbonWise:

```
App.tsx (Bootstrapper / Global State Node / Theme Controller)
 ├── Onboarding.tsx (Initial Profile Setup - Conditional)
 ├── Sidebar Navigation (Landmarks Tab controls / ARIA tablist)
 ├── Header HUD (Search, Alerts / Language, Profile Quick Summary)
 └── Main Content Tabpanels
      ├── DashboardTab.tsx (KPIs, Recharts pie/line graphs, Benchmark Comparisons Card)
      ├── CalculatorTab.tsx (Category cards, Bounded forms with min/max filters)
      ├── TrackerTab.tsx (Streaks management, Dynamic Impact Equivalents banner)
      ├── CommunityTab.tsx (Active Indian Leaderboards, Badge visual cards)
      ├── InsightsTab.tsx (Sector-specific AI dynamic targeted suggestions list)
      └── SettingsTab.tsx (Profile changes, Data sanitization resets)
```

---

## 💾 3. State Sync & Local Storage Hydration Hook

State is managed locally at the `/src/App.tsx` level and synchronized securely across sessions via our custom hook `/src/hooks/useLocalStorage.ts`. The state holds the user’s carbon calculator variables (`UserFootprintData`), tracked habit streaks, name, target, and theme parameters.

Number parsing is strictly intercepted to ensure corrupt items fallback safely to zero, preventing application breakage.

---

Made with 💚 for optimized client performance.
