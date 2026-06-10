import { describe, it, expect } from 'vitest';
import { calculateSustainabilityScore, getGrade, getRiskLevel } from '../lib/calculations';

describe('Dashboard Metric Utilities', () => {
  it('correctly returns proper letter grade A-F based on carbon boundaries', () => {
    expect(getGrade(1500)).toBe('A'); // Under Paris limit
    expect(getGrade(3000)).toBe('B'); // Moderate
    expect(getGrade(4000)).toBe('C'); // Below Global Average
    expect(getGrade(5500)).toBe('D'); // High
    expect(getGrade(8000)).toBe('F'); // Extremely High
  });

  it('determines the proper qualitative risk status values', () => {
    expect(getRiskLevel(2000)).toBe('Low');
    expect(getRiskLevel(3500)).toBe('Medium');
    expect(getRiskLevel(7000)).toBe('High');
  });

  it('caps sustainability scores properly within the 0 to 100 limit', () => {
    expect(calculateSustainabilityScore(100000, 0)).toBe(0);
    expect(calculateSustainabilityScore(100, 100)).toBe(100);
  });

  it('proves that positive habit streaks increase overall sustainability score dynamically', () => {
    const baseScore = calculateSustainabilityScore(4500, 2);
    const regularScore = calculateSustainabilityScore(4500, 15);
    expect(regularScore).toBeGreaterThan(baseScore);
  });
});
