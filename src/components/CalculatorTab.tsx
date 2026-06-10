import { UserFootprintData } from '../types';
import { CONSTANTS } from '../lib/calculations';
import { Car, Home, Utensils, ShoppingBag } from 'lucide-react';

interface CalculatorTabProps {
  data: UserFootprintData;
  setData: (fn: (d: UserFootprintData) => UserFootprintData) => void;
  calcResult: { breakdown: Record<string, number>; total: number };
}

export function CalculatorTab({ data, setData, calcResult }: CalculatorTabProps) {
  
  const updateData = <K extends keyof UserFootprintData>(
    category: K,
    field: keyof UserFootprintData[K],
    value: any
  ) => {
    setData((prev) => ({
      ...prev,
      [category]: {
        ...((prev[category] as any) || {}),
        [field]: value,
      },
    }));
  };

  const updateDiet = (value: UserFootprintData['diet']) => {
    setData(prev => ({ ...prev, diet: value }));
  };

  const targetPercentage = Math.min((calcResult.total / (CONSTANTS.globalAverage * 1.5)) * 100, 100);
  const strokeColor = calcResult.total <= CONSTANTS.parisTarget ? '#4ade80' : calcResult.total <= CONSTANTS.globalAverage ? '#facc15' : '#f87171';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        
        {/* Category: Transport */}
        <div className="bg-emerald-900/40 border border-emerald-800/50 rounded-2xl p-6 backdrop-blur-sm transition-all focus-within:ring-1 focus-within:ring-emerald-500/50">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Car className="text-emerald-400" aria-hidden="true" />
            Transport
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="carKm" className="block text-sm text-emerald-100/70 mb-1">Car travel (km/week)</label>
              <input 
                id="carKm" type="number" min="0" aria-valuemin={0}
                className="w-full bg-emerald-950/50 border border-emerald-700/50 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-shadow"
                value={data.transport?.carKmPerWeek ?? 0}
                onChange={(e) => updateData('transport', 'carKmPerWeek', e.target.value === '' ? '' : Number(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="publicTransit" className="block text-sm text-emerald-100/70 mb-1">Public transit usage</label>
              <select 
                id="publicTransit"
                className="w-full bg-emerald-950/50 border border-emerald-700/50 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none appearance-none transition-shadow"
                value={data.transport?.publicTransitUse || 'Never'}
                onChange={(e) => updateData('transport', 'publicTransitUse', e.target.value)}
              >
                <option value="Never">Never</option>
                <option value="Rarely">Rarely</option>
                <option value="Regularly">Regularly</option>
                <option value="Daily">Daily</option>
              </select>
            </div>
            <div>
              <label htmlFor="shortFlights" className="block text-sm text-emerald-100/70 mb-1">Short flights (per year)</label>
              <input 
                id="shortFlights" type="number" min="0" aria-valuemin={0}
                className="w-full bg-emerald-950/50 border border-emerald-700/50 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-shadow"
                value={data.transport?.shortFlightsPerYear ?? 0}
                onChange={(e) => updateData('transport', 'shortFlightsPerYear', e.target.value === '' ? '' : Number(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="longFlights" className="block text-sm text-emerald-100/70 mb-1">Long flights (per year)</label>
              <input 
                id="longFlights" type="number" min="0" aria-valuemin={0}
                className="w-full bg-emerald-950/50 border border-emerald-700/50 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-shadow"
                value={data.transport?.longFlightsPerYear ?? 0}
                onChange={(e) => updateData('transport', 'longFlightsPerYear', e.target.value === '' ? '' : Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Category: Home Energy */}
        <div className="bg-emerald-900/40 border border-emerald-800/50 rounded-2xl p-6 backdrop-blur-sm transition-all focus-within:ring-1 focus-within:ring-emerald-500/50">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Home className="text-emerald-400" aria-hidden="true" />
            Home Energy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="elec" className="block text-sm text-emerald-100/70 mb-1">Electricity (kWh/month)</label>
              <input 
                id="elec" type="number" min="0" aria-valuemin={0}
                className="w-full bg-emerald-950/50 border border-emerald-700/50 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-shadow"
                value={data.home?.electricityKwhPerMonth ?? 0}
                onChange={(e) => updateData('home', 'electricityKwhPerMonth', e.target.value === '' ? '' : Number(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="gas" className="block text-sm text-emerald-100/70 mb-1">Gas usage (units/month)</label>
              <input 
                id="gas" type="number" min="0" aria-valuemin={0}
                className="w-full bg-emerald-950/50 border border-emerald-700/50 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-shadow"
                value={data.home?.gasUsage ?? 0}
                onChange={(e) => updateData('home', 'gasUsage', e.target.value === '' ? '' : Number(e.target.value))}
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="renewable" className="block text-sm text-emerald-100/70 mb-1">Renewable energy source: {data.home?.renewablePercent || 0}%</label>
              <input 
                id="renewable" type="range" min="0" max="100" aria-valuemin={0} aria-valuemax={100} aria-valuenow={data.home?.renewablePercent || 0}
                className="w-full accent-emerald-500 cursor-pointer"
                value={data.home?.renewablePercent || 0}
                onChange={(e) => updateData('home', 'renewablePercent', Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Category: Diet */}
        <div className="bg-emerald-900/40 border border-emerald-800/50 rounded-2xl p-6 backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Utensils className="text-emerald-400" aria-hidden="true" />
            Diet
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3" role="radiogroup" aria-label="Diet Selection">
            {[
              { id: 'heavy', label: 'Heavy Meat' },
              { id: 'moderate', label: 'Moderate' },
              { id: 'vegetarian', label: 'Vegetarian' },
              { id: 'vegan', label: 'Vegan' },
            ].map(d => (
              <button
                key={d.id}
                role="radio"
                aria-checked={data.diet === d.id}
                onClick={() => updateDiet(d.id as any)}
                className={`py-3 px-2 rounded-xl text-sm font-medium transition-colors border focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                  data.diet === d.id 
                    ? 'bg-emerald-600/40 border-emerald-400 text-emerald-100' 
                    : 'bg-emerald-950/50 border-emerald-800/50 text-emerald-100/60 hover:bg-emerald-800/50'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category: Shopping */}
        <div className="bg-emerald-900/40 border border-emerald-800/50 rounded-2xl p-6 backdrop-blur-sm shadow-xl transition-all focus-within:ring-1 focus-within:ring-emerald-500/50">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <ShoppingBag className="text-emerald-400" aria-hidden="true" />
            Shopping
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="orders" className="block text-sm text-emerald-100/70 mb-1">Online orders/month</label>
              <input 
                id="orders" type="number" min="0" aria-valuemin={0}
                className="w-full bg-emerald-950/50 border border-emerald-700/50 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-shadow"
                value={data.shopping?.onlineOrdersPerMonth ?? 0}
                onChange={(e) => updateData('shopping', 'onlineOrdersPerMonth', e.target.value === '' ? '' : Number(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="clothes" className="block text-sm text-emerald-100/70 mb-1">New clothes/month</label>
              <input 
                id="clothes" type="number" min="0" aria-valuemin={0}
                className="w-full bg-emerald-950/50 border border-emerald-700/50 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-shadow"
                value={data.shopping?.newClothesPerMonth ?? 0}
                onChange={(e) => updateData('shopping', 'newClothesPerMonth', e.target.value === '' ? '' : Number(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="electronics" className="block text-sm text-emerald-100/70 mb-1">Electronics/year</label>
              <input 
                id="electronics" type="number" min="0" aria-valuemin={0}
                className="w-full bg-emerald-950/50 border border-emerald-700/50 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-shadow"
                value={data.shopping?.electronicsPerYear ?? 0}
                onChange={(e) => updateData('shopping', 'electronicsPerYear', e.target.value === '' ? '' : Number(e.target.value))}
              />
            </div>
          </div>
        </div>

      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-24 bg-emerald-900/60 border border-emerald-700/50 rounded-2xl p-6 backdrop-blur-md flex flex-col items-center shadow-2xl">
          <h3 className="text-lg font-medium text-emerald-100/80 mb-2 font-sans tracking-tight">Your Annual Footprint</h3>
          
          <div className="relative w-48 h-48 my-4 flex items-center justify-center" aria-label={`Current footprint ${Math.round(calcResult.total)} kg`}>
            {/* Circular Gauge Background */}
            <svg className="w-full h-full transform -rotate-90 absolute inset-0" viewBox="0 0 100 100" aria-hidden="true">
              <circle
                cx="50" cy="50" r="40"
                fill="transparent"
                stroke="rgba(6, 78, 59, 0.5)"
                strokeWidth="8"
              />
              <circle
                cx="50" cy="50" r="40"
                fill="transparent"
                stroke={strokeColor}
                strokeWidth="8"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * targetPercentage) / 100}
                className="transition-all duration-700 ease-out"
                strokeLinecap="round"
              />
            </svg>
            <div className="text-center z-10 flex flex-col items-center">
              <span className="text-3xl font-bold font-mono tracking-tighter" style={{ color: strokeColor }}>
                {Math.round(calcResult.total).toLocaleString()}
              </span>
              <span className="text-xs text-emerald-200/60 font-bold uppercase tracking-wider">kg CO₂e</span>
            </div>
          </div>

          <div className="w-full space-y-3 mt-4 text-sm px-2">
            <div className="flex justify-between items-center py-2 border-b border-emerald-800/60">
              <span className="text-emerald-100/70">Your footprint</span>
              <span className="font-mono font-bold">{(calcResult.total / 1000).toFixed(2)} t</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-emerald-800/60">
              <span className="text-emerald-100/70">Global avg.</span>
              <span className="font-mono font-bold text-yellow-400">{(CONSTANTS.globalAverage / 1000).toFixed(2)} t</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-emerald-100/70">Paris target</span>
              <span className="font-mono font-bold text-green-400">{(CONSTANTS.parisTarget / 1000).toFixed(2)} t</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
