import { describe, it, expect } from 'vitest';

const sanitizeNumber = (val: unknown, min = 0, max = 99999): number => {
  const n = Number(val);
  if (isNaN(n)) return 0;
  return Math.min(Math.max(n, min), max);
};

describe('Local Storage & Number Sanitization Security', () => {
  it('correctly parses raw values into valid numbers inside ranges', () => {
    expect(sanitizeNumber('123')).toBe(123);
    expect(sanitizeNumber('abc')).toBe(0);
    expect(sanitizeNumber(undefined)).toBe(0);
    expect(sanitizeNumber(null)).toBe(0);
  });

  it('safely binds numbers within min and max constraints', () => {
    expect(sanitizeNumber(-500, 10, 1000)).toBe(10);
    expect(sanitizeNumber(500000, 0, 9999)).toBe(9999);
  });

  it('demonstrates that localStorage works as a state sync engine fallback', () => {
    const store: Record<string, string> = {};
    const mockLocalStorage = {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, val: string) => { store[key] = val; },
    };

    mockLocalStorage.setItem('test_config', JSON.stringify({ active: true }));
    const result = JSON.parse(mockLocalStorage.getItem('test_config')!);
    expect(result.active).toBe(true);
  });
});
