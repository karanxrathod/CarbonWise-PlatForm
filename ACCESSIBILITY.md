# ♿ Accessibility Compliance Specifications — CarbonWise

CarbonWise is constructed from the ground up to achieve strict **WCAG 2.1 AA Compliancy standards**. This document details our design principles, screen landmark roles, and visual accommodations.

---

## 🌟 1. Core Accommodation Standard

| Feature | Guideline compliance | Implementation Method |
| :--- | :--- | :--- |
| **Skip to Content** | WCAG 2.4.1 (Bypass Blocks) | Keyboard-focusable absolute overlay bypassing sidebars straight to content. |
| **Tab Landmark Roles** | WCAG 1.3.1 (Info and Relationships) | `role="tablist"` on lists, `role="tab"`, `aria-selected`, `role="tabpanel"` on wrappers. |
| **Visual Focus Rings** | WCAG 2.4.7 (Focus Visible) | `:focus-visible` with 2px thick custom emerald borders and offset spaces. |
| **Reduced Motion support**| WCAG 2.2.2 (Pause, Stop, Hide) | CSS directives override and compress transitions to 0.01ms if reduced motion is ON. |
| **Contrast Ratios** | WCAG 1.4.3 (Minimum Contrast) | Deep Charcoal grays (#1B2B24) and soft off-whites exceed the 4.5:1 text-to-bg ratio. |

---

## 🎹 2. Keyboard Navigation Flows

All elements follow standard HTML document flow:
1. Pressing **[TAB]** on initial entry highlights the **Skip To Content** banner.
2. Pressing **[ENTER]** from the Skip link focuses on the main container `#main-content`, completely skipping the sidebar nav list.
3. If skip is ignored, the user can navigate options in the sidebar tablist sequentially.
4. Button indicators, selector toggles, and sliding inputs are completely keyboard reachable.

---

## 🎨 3. CSS Style Implementations

Focus highlights and reduced motion states are managed globally within `src/index.css`:

```css
/* Accessibility Focus Ring and Motion Preferences */
*:focus-visible {
  outline: 2px solid #16a34a !important;
  outline-offset: 2px !important;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

*This document validates our priority to deliver an inclusive climate advocacy interface.*
