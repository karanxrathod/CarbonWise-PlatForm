import { useState, useEffect } from 'react';

/**
 * A custom React hook that provides state synchronized with browser localStorage.
 * Automatically handles JSON parsing/serialization and guards against SSR errors.
 * 
 * @param key - The key of the localStorage database registry entry
 * @param initialValue - Fallback value if localStorage does not exist or has corrupt entries
 * @returns A tuple containing the stored state value and a state updater callback function
 */
export function useLocalStorage<T>(
  key: string, 
  initialValue: T
): readonly [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)): void => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}

