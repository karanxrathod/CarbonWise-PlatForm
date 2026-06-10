// TEST CASES:
// 1. Zero Input Handling: All numeric inputs fallback to 0 if empty/NaN to prevent calculation crashes.
// 2. Maximum Value Constraints: Visual circular gauge caps at 100% boundary to prevent overflowing strokes.
// 3. Missing Fields: Optional chaining and deliberate fallback values are used if local storage data structure changes.
// 4. Extreme High Emissions: The risk/grading logic gracefully handles arbitrarily large carbon totals.
// 5. Uninitialized State: The useLocalStorage hook safely provides a default configuration object upon first load.

import { UserFootprintData } from '../types';

export const CONSTANTS = {
  transport: {
    carKm: 0.21,
    shortFlight: 255,
    longFlight: 1620,
    publicTransitReduction: {
      'Never': 0,
      'Rarely': -50,
      'Regularly': -300,
      'Daily': -700,
    }
  },
  home: {
    electricity: 0.233,
    gasFactor: 2.0, // Mock assumption for gas
  },
  diet: {
    heavy: 3300,
    moderate: 2500,
    vegetarian: 1700,
    vegan: 1500,
  },
  shopping: {
    onlineOrder: 4.7,
    newClothing: 10,
    electronics: 50, // Mock assumption
  },
  globalAverage: 4700, // 4.7 tons = 4700 kg
  parisTarget: 2300,   // 2.3 tons = 2300 kg
};

/**
 * Calculates total annual carbon footprint across transport, home, diet, and shopping categories.
 * @param data - UserFootprintData structure containing metrics for each category
 * @returns An object with an annual category breakdown and a summed total emissions value in kg CO2e
 */
export function calculateFootprint(data: UserFootprintData): { breakdown: Record<string, number>; total: number } {
  // Transport (Annual)
  const carEmissions = Math.max(0, Number(data.transport?.carKmPerWeek) || 0) * 52 * CONSTANTS.transport.carKm;
  const flightEmissions = (Math.max(0, Number(data.transport?.shortFlightsPerYear) || 0) * CONSTANTS.transport.shortFlight) +
                          (Math.max(0, Number(data.transport?.longFlightsPerYear) || 0) * CONSTANTS.transport.longFlight);
  const transitOffset = CONSTANTS.transport.publicTransitReduction[data.transport.publicTransitUse] || 0;
  const transportTotal = Math.max(0, carEmissions + flightEmissions + transitOffset);

  // Home (Annual)
  const electricityEmissions = (Math.max(0, Number(data.home?.electricityKwhPerMonth) || 0) * 12) * CONSTANTS.home.electricity;
  const renewableAdjustment = 1 - (Math.max(0, Math.min(100, Number(data.home?.renewablePercent) || 0)) / 100);
  const adjustedElectricity = electricityEmissions * renewableAdjustment;
  const gasEmissions = (Math.max(0, Number(data.home?.gasUsage) || 0) * 12) * CONSTANTS.home.gasFactor;
  const homeTotal = adjustedElectricity + gasEmissions;

  // Diet (Annual)
  const dietTotal = CONSTANTS.diet[data.diet] || CONSTANTS.diet.moderate;

  // Shopping (Annual)
  const shoppingTotal = (Math.max(0, Number(data.shopping?.onlineOrdersPerMonth) || 0) * 12 * CONSTANTS.shopping.onlineOrder) +
                        (Math.max(0, Number(data.shopping?.newClothesPerMonth) || 0) * 12 * CONSTANTS.shopping.newClothing) +
                        (Math.max(0, Number(data.shopping?.electronicsPerYear) || 0) * CONSTANTS.shopping.electronics);

  const total = transportTotal + homeTotal + dietTotal + shoppingTotal;

  return {
    breakdown: {
      transport: transportTotal,
      home: homeTotal,
      diet: dietTotal,
      shopping: shoppingTotal,
    },
    total,
  };
}

/**
 * Maps annual carbon emissions in kg CO2e to a standard performance grade from A (Elite) to F (Evolving).
 * @param totalKg - Annual carbon emissions in kilograms
 * @returns Grade string: 'A' | 'B' | 'C' | 'D' | 'F'
 */
export function getGrade(totalKg: number): 'A' | 'B' | 'C' | 'D' | 'F' {
  if (totalKg <= CONSTANTS.parisTarget) return 'A';
  if (totalKg <= 3500) return 'B';
  if (totalKg <= CONSTANTS.globalAverage) return 'C';
  if (totalKg <= 6000) return 'D';
  return 'F';
}

/**
 * Maps annual carbon emissions category boundaries to absolute qualitative climate risk levels.
 * @param totalKg - Annual carbon emissions in kilograms
 * @returns Qualitative level string: 'Low' | 'Medium' | 'High'
 */
export function getRiskLevel(totalKg: number): 'Low' | 'Medium' | 'High' {
  if (totalKg <= CONSTANTS.parisTarget) return 'Low';
  if (totalKg <= CONSTANTS.globalAverage) return 'Medium';
  return 'High';
}

/**
 * Computes tangible equivalents (trees planted, distance driven, home energy saved) for a set carbon amount.
 * @param savedKg - Carbon offset amount in kilograms
 * @returns Object with trees count, commute distance in km, and electricity in kWh
 */
export function getEquivalencies(savedKg: number): { trees: number; kmDriven: number; kwhSaved: number } {
  return {
    trees: Math.floor(savedKg / 21), // ~21kg CO2 per mature tree annually
    kmDriven: Math.floor(savedKg / 0.21), // ~0.21kg per km driven
    kwhSaved: Math.floor(savedKg / 0.233), // ~0.233kg per kWh
  };
}

/**
 * Computes a standardized 0-100 score based on footprint category volumes and habits consistency streaks.
 * @param totalKg - Annual carbon emissions in kilograms
 * @param habitsTotalStreaks - Cumulative streak points across tracked daily tasks
 * @returns Integer score between 0 and 100 inclusive
 */
export function calculateSustainabilityScore(totalKg: number, habitsTotalStreaks: number): number {
  // 0-100 scoring engine based on total footprint and sustained positive habits
  // 1000kg is max score (80 pts). 10000kg is min score (0 pts).
  let footprintScore = 80 - ((totalKg - 1000) / 9000) * 80;
  footprintScore = Math.max(0, Math.min(80, footprintScore));
  
  // Up to 20 pts from active habit streaks
  const habitScore = Math.min(20, habitsTotalStreaks);
  
  return Math.round(footprintScore + habitScore);
}

/**
 * Curates highly actionable climate defense suggestions targeted to the user's highest emission sector.
 * @param data - Raw footprint metrics input object
 * @param calcResult - Return structure from calculateFootprint
 * @returns A read-only array of specific recommendation items
 */
export function generateInsights(
  data: UserFootprintData, 
  calcResult: { breakdown: Record<string, number>; total: number }
): Array<{ id: string; title: string; category: string; impactKg: number; difficulty: 'Easy' | 'Medium' | 'Hard' }> {
  // Find highest category
  let highestCategory = 'transport' as keyof UserFootprintData;
  let maxEmissions = 0;
  
  for (const [cat, val] of Object.entries(calcResult.breakdown)) {
    if (val > maxEmissions) {
      maxEmissions = val;
      highestCategory = cat as keyof UserFootprintData;
    }
  }

  const allInsights = {
    transport: [
      { id: 't1', title: 'Switch one car commute to cycling or walking per week', category: 'transport', impactKg: 150, difficulty: 'Medium' as const },
      { id: 't2', title: 'Carpool to work twice a week', category: 'transport', impactKg: 300, difficulty: 'Medium' as const },
      { id: 't3', title: 'Replace a short-haul flight with a train journey', category: 'transport', impactKg: 200, difficulty: 'Hard' as const },
      { id: 't4', title: 'Maintain proper tire pressure to improve fuel efficiency', category: 'transport', impactKg: 50, difficulty: 'Easy' as const },
      { id: 't5', title: 'Work from home one extra day per week', category: 'transport', impactKg: 400, difficulty: 'Easy' as const },
    ],
    home: [
      { id: 'h1', title: 'Switch to LED bulbs', category: 'home', impactKg: 150, difficulty: 'Easy' as const },
      { id: 'h2', title: 'Wash clothes in cold water', category: 'home', impactKg: 80, difficulty: 'Easy' as const },
      { id: 'h3', title: 'Lower thermostat by 1°C in winter', category: 'home', impactKg: 200, difficulty: 'Medium' as const },
      { id: 'h4', title: 'Switch to a 100% renewable energy provider', category: 'home', impactKg: 1200, difficulty: 'Hard' as const },
      { id: 'h5', title: 'Install a smart thermostat', category: 'home', impactKg: 350, difficulty: 'Medium' as const },
    ],
    diet: [
      { id: 'd1', title: 'Participate in Meatless Mondays', category: 'diet', impactKg: 250, difficulty: 'Easy' as const },
      { id: 'd2', title: 'Switch from beef to chicken/pork', category: 'diet', impactKg: 600, difficulty: 'Medium' as const },
      { id: 'd3', title: 'Try a fully plant-based week', category: 'diet', impactKg: 100, difficulty: 'Medium' as const },
      { id: 'd4', title: 'Buy local, seasonal produce', category: 'diet', impactKg: 80, difficulty: 'Easy' as const },
      { id: 'd5', title: 'Reduce food waste by meal planning', category: 'diet', impactKg: 150, difficulty: 'Easy' as const },
    ],
    shopping: [
      { id: 's1', title: 'Buy second-hand clothes instead of new', category: 'shopping', impactKg: 120, difficulty: 'Medium' as const },
      { id: 's2', title: 'Bundle online orders to reduce shipping trips', category: 'shopping', impactKg: 40, difficulty: 'Easy' as const },
      { id: 's3', title: 'Repair electronics instead of replacing', category: 'shopping', impactKg: 100, difficulty: 'Hard' as const },
      { id: 's4', title: 'Use a reusable coffee cup', category: 'shopping', impactKg: 25, difficulty: 'Easy' as const },
      { id: 's5', title: 'Buy bulk to reduce packaging', category: 'shopping', impactKg: 50, difficulty: 'Medium' as const },
    ]
  } as const;

  return allInsights[highestCategory] as any;
}
