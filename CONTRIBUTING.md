# 🤝 Contributing Guidelines — CarbonWise

Thank you for your interest in contributing to CarbonWise! We appreciate your commitment to climate awareness, clean code, security compliance, and WCAG AA accessibility standards.

Please review this document to understand our project workflows, coding styles, and verification commands.

---

## 🛠️ 1. Code Quality & Formatting

*   **Type Safety**: Avoid using `any` across the codebase. Declare explicit type interfaces and enums inside `/src/types.ts` or local files.
*   **Export Functions Typing**: All exported helpers must be strongly-typed with explicit return types and documented with high-quality JSDoc explaining its coefficients and purpose:
    ```typescript
    /**
     * Calculates user sustainability score out of 100.
     * @param totalKg - annual footprint in kg
     * @param habitsTotalStreaks - active streaks count
     * @returns final integer score
     */
    export function calculateSustainabilityScore(totalKg: number, habitsTotalStreaks: number): number
    ```
*   **Styling Consistency**: Rely exclusively on Tailwind CSS utility classes. Do not declare raw CSS selectors or separate `.css` files. Apply responsive prefixes (`sm:`, `md:`, `lg:`) to ensure layout durability on multiple viewports.

---

## ⚙️ 2. Development Workflow

1.  **Initialize Packages**: If you import any external node dependencies, use the package installation commands to append items to `package.json`.
2.  **Lint Assets**: Check for TypeScript compiling errors before committing changes using:
    ```bash
    npm run lint
    ```
3.  **Validate Tests**: Write unit tests inside `/src/tests/` matching your feature modification. Ensure all unit tests compile and run green:
    ```bash
    npm run test
    ```
4.  **Accessibility Inspection**: Assure every visual interactive trigger includes clear `:focus-visible` parameters, appropriate ARIA roles, and behaves gracefully under prefers-reduced-motion triggers.

---

## 📄 3. Submitting Contributions

*   Ensure your branch updates `/CHANGELOG.md` with high-level descriptions of your modifications.
*   Provide a scannable summary detailing visual and functional adjustments when presenting features.

Thank you for crafting CarbonWise with care! 🌿
