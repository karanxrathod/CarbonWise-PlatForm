export interface UserFootprintData {
  transport: {
    carKmPerWeek: number;
    shortFlightsPerYear: number;
    longFlightsPerYear: number;
    publicTransitUse: 'Never' | 'Rarely' | 'Regularly' | 'Daily';
  };
  home: {
    electricityKwhPerMonth: number;
    gasUsage: number;
    renewablePercent: number;
  };
  diet: 'heavy' | 'moderate' | 'vegetarian' | 'vegan';
  shopping: {
    onlineOrdersPerMonth: number;
    newClothesPerMonth: number;
    electronicsPerYear: number;
  };
}

export interface HabitData {
  id: string;
  name: string;
  description: string;
  streak: number;
  lastDone: string | null; // ISO Date string
  icon: string;
}

export interface RecommendedAction {
  id: string;
  title: string;
  category: keyof UserFootprintData;
  impactKg: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  committed: boolean;
}

export type TabId = 'calculator' | 'dashboard' | 'actions' | 'tracker' | 'community' | 'profile';
