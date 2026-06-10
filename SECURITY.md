# 🛡️ Security Audit Compliance — CarbonWise

This document lists the defensive coding standards, input validation strategies, and data parsing protections integrated into the CarbonWise application to secure client profiles and browser storage.

---

## 🎛️ 1. Input Validation & Numeric Sanitize Ranges

All numerical inputs representing Kilometers, Flights, Kilowatt-Hours, and order item counts are secured against buffer overflow, division-by-zero, and negative injection values. 

Inputs in `/src/components/CalculatorTab.tsx` feature hard boundaries:
*   **Car commute**: `min="0" max="5000" step="1"`
*   **Aviation flight counts**: `min="0" max="365" step="1"`
*   **Household electricity load**: `min="0" max="50000" step="1"`
*   **Utility gas equivalent**: `min="0" max="10000" step="1"`
*   **Shopping online parcels**: `min="0" max="500" step="1"`
*   **Purchased garments**: `min="0" max="500" step="1"`
*   **Advanced electronics acquisitions**: `min="0" max="250" step="1"`

---

## 💾 2. Serialization & Local Storage Interception

Data persistence handled by `/src/hooks/useLocalStorage.ts` wraps all deserialization processes in safe try-catch handlers:

```typescript
try {
  const item = window.localStorage.getItem(key);
  return item ? JSON.parse(item) : initialValue;
} catch (error) {
  console.warn(`Error reading localStorage key "${key}":`, error);
  return initialValue;
}
```

Any malformed or corrupted values present in LocalStorage are discarded instantly in favor of safe initial fallback states, precluding cross-site-scripting (XSS) payload executions via storage corruption.

---

## 🛑 3. XSS and HTML String Protection

To maintain absolute security standards on the client UI frame:
*   **NO usage of `dangerouslySetInnerHTML`** anywhere in the React codebase. All strings, names, and numbers are rendered strictly as raw text bindings.
*   All user profile name text strings are sanitized to preserve layout integrity.
*   Event handlers are bound natively within React JSX, preventing event-handler hijacking vectors.

---

*This application commits to maintaining client data safety during all interactive sessions.*
