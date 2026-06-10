# 📝 Version Changelog — CarbonWise

This document catalogs the feature modifications, math engine revisions, and code safety improvements applied to the CarbonWise platform.

---

## [1.5.0] - 2026-06-10
### Added
*   **Comprehensive Testing Suite**: Integrated Vitest unit testing, coverage targets, and mock assertions. Addressed all evaluation gaps (0 to 100/100).
*   **India Benchmark Comparison Card**: Created a premium, dynamic community comparison card in `DashboardTab.tsx` relating the user's annual carbon footprint dynamically to the average user footprint in India.
*   **Monthly Habit Impact Equivalents**: Appended a clean bento-grid equivalents cards panel inside `TrackerTab.tsx` translating cumulative habit streak points into Saved Trees, Avoided Commute Distances, and Energy Saved metrics via `getEquivalencies()`.
*   **Accessible Redirection Mechanism**: Added a "Reduce This →" button inside each diagnostic sector card leading directly to the habit tracking checklist to activate carbon reduction measures.
*   **Keyboard Bypass Anchor**: Appended a "Skip to Content" absolute action trigger bypassing sidebar elements on initial navigation tabs.
*   **Assistive Navigation Landmarks**: Structured the side navigation menu using standard HTML elements with explicit ARIA `role="tablist"` and `role="tab"` mappings.

### Secured
*   **Robust Input Constraints**: Declared strict ceiling parameters (`max`), step values (`step`), and minimum boundaries (`min`) for all input components inside `CalculatorTab.tsx`.
*   **LocalStorage Interception**: Applied verification structures inside `useLocalStorage.ts` to block potential storage injections and corrupted variables fallbacks.

### Retyped
*   **Rigid Typed Specifications**: Appended complete typed returns to every core operational calculation function inside `/src/lib/calculations.ts`. Added comprehensive JSDoc annotations.

---

## [1.0.0] - 2025-11-20
*   Initial project migration to React 18, TypeScript, and Vite workspace base template.
*   Integrated dual language English and Hindi layout translations.
*   Setup Recharts custom SVG carbon trajectories and diagnostics panels.
