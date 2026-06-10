import { describe, it, expect } from 'vitest';
import { calculateFootprint, CONSTANTS } from '../lib/calculations';
import { UserFootprintData } from '../types';

describe('Calculator Business Logic', () => {
  const baseData: UserFootprintData = {
    transport: { carKmPerWeek: 0, shortFlightsPerYear: 0, longFlightsPerYear: 0, publicTransitUse: 'Never' },
    home: { electricityKwhPerMonth: 0, gasUsage: 0, renewablePercent: 0 },
    diet: 'vegetarian',
    shopping: { onlineOrdersPerMonth: 0, newClothesPerMonth: 0, electronicsPerYear: 0 }
  };

  it('calculates baseline diet emissions correctly', () => {
    const result = calculateFootprint(baseData);
    expect(result.breakdown.diet).toBe(CONSTANTS.diet.vegetarian);
    expect(result.total).toBe(CONSTANTS.diet.vegetarian);
  });

  it('correctly adds transport emissions from car travel', () => {
    const testData = {
      ...baseData,
      transport: { ...baseData.transport, carKmPerWeek: 100 }
    };
    const result = calculateFootprint(testData);
    const expectedCarEmissions = 100 * 52 * CONSTANTS.transport.carKm;
    expect(result.breakdown.transport).toBe(expectedCarEmissions);
  });

  it('applies transport public transit offset benefits', () => {
    // transit reduction offset for 'Daily' is -700. Let's verify transport total is bounded at 0
    const testData = {
      ...baseData,
      transport: { ...baseData.transport, publicTransitUse: 'Daily' as const }
    };
    const result = calculateFootprint(testData);
    expect(result.breakdown.transport).toBe(0); // non-negative boundary constraint
  });

  it('calculates home electricity after renewable adjustment', () => {
    const testData = {
      ...baseData,
      home: { electricityKwhPerMonth: 200, gasUsage: 0, renewablePercent: 50 }
    };
    const result = calculateFootprint(testData);
    const rawElectricity = (200 * 12) * CONSTANTS.home.electricity;
    const expectedElectric = rawElectricity * 0.50;
    expect(result.breakdown.home).toBeCloseTo(expectedElectric, 2);
  });
});
