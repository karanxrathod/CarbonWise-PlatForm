import { describe, it, expect } from 'vitest';
import {
  calculateFootprint,
  calculateSustainabilityScore,
  getGrade,
  getRiskLevel,
  getEquivalencies,
  generateInsights,
  CONSTANTS
} from './calculations';

const mockData = {
  transport: { 
    carKmPerWeek: 100, shortFlightsPerYear: 1, 
    longFlightsPerYear: 0, publicTransitUse: 'Rarely' as const
  },
  home: { 
    electricityKwhPerMonth: 250, 
    gasUsage: 50, renewablePercent: 0 
  },
  diet: 'moderate' as const,
  shopping: { 
    onlineOrdersPerMonth: 4, 
    newClothesPerMonth: 2, electronicsPerYear: 1 
  }
};

describe('calculateFootprint', () => {
  it('returns positive total for standard input', () => {
    const result = calculateFootprint(mockData);
    expect(result.total).toBeGreaterThan(0);
  });

  it('handles zero input without crashing', () => {
    const zeroData = {
      ...mockData,
      transport: { 
        carKmPerWeek: 0, shortFlightsPerYear: 0,
        longFlightsPerYear: 0, publicTransitUse: 'Never' as const
      }
    };
    const result = calculateFootprint(zeroData);
    expect(result.total).toBeGreaterThanOrEqual(0);
  });

  it('has 4 breakdown categories', () => {
    const result = calculateFootprint(mockData);
    expect(Object.keys(result.breakdown)).toHaveLength(4);
  });

  it('vegan diet lower than heavy meat', () => {
    const vegan = calculateFootprint({...mockData, diet: 'vegan'});
    const heavy = calculateFootprint({...mockData, diet: 'heavy'});
    expect(vegan.total).toBeLessThan(heavy.total);
  });

  it('renewable energy reduces home emissions', () => {
    const noRenewable = calculateFootprint(mockData);
    const withRenewable = calculateFootprint({
      ...mockData,
      home: {...mockData.home, renewablePercent: 100}
    });
    expect(withRenewable.total).toBeLessThan(noRenewable.total);
  });

  it('daily transit reduces transport emissions', () => {
    const rarely = calculateFootprint(mockData);
    const daily = calculateFootprint({
      ...mockData,
      transport: {...mockData.transport, publicTransitUse: 'Daily'}
    });
    expect(daily.total).toBeLessThan(rarely.total);
  });
});

describe('getGrade', () => {
  it('returns A for below Paris target', () => {
    expect(getGrade(2000)).toBe('A');
  });
  it('returns F for very high emissions', () => {
    expect(getGrade(9000)).toBe('F');
  });
  it('returns valid grade for average emissions', () => {
    const grade = getGrade(CONSTANTS.globalAverage);
    expect(['A','B','C','D','F']).toContain(grade);
  });
});

describe('getRiskLevel', () => {
  it('Low risk below Paris target', () => {
    expect(getRiskLevel(2000)).toBe('Low');
  });
  it('High risk above global average', () => {
    expect(getRiskLevel(8000)).toBe('High');
  });
});

describe('calculateSustainabilityScore', () => {
  it('returns score between 0 and 100', () => {
    const score = calculateSustainabilityScore(4700, 5);
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });
  it('higher streaks improve score', () => {
    const low = calculateSustainabilityScore(4700, 0);
    const high = calculateSustainabilityScore(4700, 20);
    expect(high).toBeGreaterThan(low);
  });
});

describe('getEquivalencies', () => {
  it('returns positive values for positive input', () => {
    const eq = getEquivalencies(1000);
    expect(eq.trees).toBeGreaterThan(0);
    expect(eq.kmDriven).toBeGreaterThan(0);
  });
  it('returns zeros for zero input', () => {
    const eq = getEquivalencies(0);
    expect(eq.trees).toBe(0);
  });
});

describe('generateInsights', () => {
  it('returns array of insights', () => {
    const result = calculateFootprint(mockData);
    const insights = generateInsights(mockData, result);
    expect(Array.isArray(insights)).toBe(true);
    expect(insights.length).toBeGreaterThan(0);
  });
  it('each insight has required fields', () => {
    const result = calculateFootprint(mockData);
    const insights = generateInsights(mockData, result);
    insights.forEach(i => {
      expect(i).toHaveProperty('id');
      expect(i).toHaveProperty('title');
      expect(i).toHaveProperty('impactKg');
      expect(i).toHaveProperty('difficulty');
    });
  });
});
